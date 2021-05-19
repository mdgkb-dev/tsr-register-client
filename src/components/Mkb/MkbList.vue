<template>
  <ListHead :title="title" />
  <el-tree :data="mkbClasses" v-if="mount" node-key="id" :load="load" lazy accordion allow-drop="true`" :props="{ isLeaf: 'leaf' }">
    <template #default="{ node, data }">
      <span accordion class="custom-tree-node" style="font-size: 16px" :isLeaf="data.leaf">
        <span style="margin-bottom: 10px" v-if="node.level === 1 && !data.code">
          <span style="font-weight: bold">{{ data.number }} </span> <span>{{ data.name }}</span>
        </span>
        <span v-else-if="node.level === 1 && data.code">
          <span style="font-weight: bold">{{ data.code }}</span>
          <span>data.name</span>
        </span>
        <span v-else-if="node.level === 2 && !data.code">{{ `${data.rangeStart}-${data.rangeEnd} ${data.name}` }}</span>
        <span v-else-if="node.level === 2 && data.code">{{ `${data.code} ${data.name}` }}</span>
        <span v-else-if="node.level === 3 && data.subCode">{{ `${node.parent.data.code}.${data.subCode} ${data.name}` }}</span>
        <span v-else-if="node.level === 3 && !data.code">{{ `${data.rangeStart}-${data.rangeEnd} ${data.name}` }}</span>
        <span v-else-if="node.level === 3 && data.code">{{ `${data.code} ${data.name}` }}</span>
        <span v-else-if="node.level === 4 && data.subCode >= 0">{{ `${node.parent.data.code}.${data.subCode} ${data.name}` }}</span>
        <span v-else-if="node.level === 4 && !data.code">{{ `${data.rangeStart}-${data.rangeEnd} ${data.name}` }}</span>
        <span v-else-if="node.level === 4 && data.code">{{ `${data.code} ${data.name}` }}</span>
        <span v-else-if="node.level === 5">
          {{ `${node.parent.data.code}.${data.subCode} ${data.name}` }}
        </span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IMkbClass from '@/interfaces/mkb/IMkbClass';

import ListHead from '@/components/ListHead.vue';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';

@Options({
  components: {
    ListHead,
  },
  computed: {
    ...mapState('mkb', ['mkbClasses']),
  },
  methods: {
    ...mapActions({
      getAllMkbClasses: 'mkb/getAllMkbClasses',
      getGroupById: 'mkb/getGroupById',
      getSubGroupById: 'mkb/getSubGroupById',
      getSubSubGroupById: 'mkb/getSubSubGroupById',
      getSubDiagnosisByDiagnosisId: 'mkb/getSubDiagnosisByDiagnosisId',
    }),
  },
})
export default class MkbList extends Vue {
  getAllMkbClasses!: () => Promise<void>;
  getGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubSubGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubDiagnosisByDiagnosisId!: (mkbIdSet: MkbIdSet) => Promise<void>;

  mount = false;
  title = 'МКБ10';
  mkbClasses: IMkbClass[] = [];

  async mounted(): Promise<void> {
    await this.getAllMkbClasses();
    this.mkbClasses = [];
    await this.getAllMkbClasses();
    this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    this.mount = true;
  }

  async load(node: any, resolve: any): Promise<void> {
    const mkbIdSet = new MkbIdSet();
    if (node.level === 0) return resolve(this.mkbClasses);

    if (node.level === 1) {
      mkbIdSet.classId = node.data.id;
      return resolve(await this.getNodeOne(node, mkbIdSet));
    }

    if (node.level === 2) {
      mkbIdSet.classId = node.parent.data.id;
      mkbIdSet.groupId = node.data.id;
      mkbIdSet.diagnosisId = node.data.id;
      return resolve(await this.getNodeTwo(node, mkbIdSet));
    }

    if (node.level === 3) {
      mkbIdSet.classId = node.parent.parent.data.id;
      mkbIdSet.groupId = node.parent.data.id;
      mkbIdSet.subGroupId = node.data.id;
      mkbIdSet.diagnosisId = node.data.id;
      return resolve(await this.getNodeThree(node, mkbIdSet));
    }

    if (node.level === 4) {
      mkbIdSet.classId = node.parent.parent.parent.data.id;
      mkbIdSet.groupId = node.parent.parent.data.id;
      mkbIdSet.subGroupId = node.parent.data.id;
      mkbIdSet.diagnosisId = node.data.id;
      return resolve(await this.getNodeFour(node, mkbIdSet));
    }
    return resolve([]);
  }

  async getNodeOne(node: any, mkbIdSet: MkbIdSet): Promise<any | undefined> {
    await this.getGroupById(mkbIdSet);
    this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);
    return classN ? [...classN.mkbGroups, ...classN.mkbDiagnosis] : undefined;
  }

  async getNodeTwo(node: any, mkbIdSet: MkbIdSet): Promise<any | undefined> {
    await this.getSubGroupById(mkbIdSet);
    this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);
    if (classN && classN.mkbGroups) {
      const group = classN.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
      if (group && group.mkbSubGroups && group.mkbDiagnosis) {
        return group ? [...group.mkbDiagnosis, ...group.mkbSubGroups] : [];
      }
    }

    return undefined;
  }

  async getNodeThree(node: any, mkbIdSet: MkbIdSet): Promise<any | undefined> {
    if (!node.data.code) {
      await this.getSubSubGroupById(mkbIdSet);
      this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
      const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);
      if (classN && classN.mkbGroups) {
        const group = classN.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
        if (group && group.mkbSubGroups) {
          const subGroup = group.mkbSubGroups.find((m: IMkbSubGroup) => m.id === mkbIdSet.subGroupId);
          if (subGroup && subGroup.mkbSubSubGroups && subGroup.mkbDiagnosis) {
            return subGroup ? [...subGroup.mkbDiagnosis, ...subGroup.mkbSubSubGroups] : undefined;
          }
        }
      }
    }
    await this.getSubDiagnosisByDiagnosisId(mkbIdSet);
    return this.findSubDiagnosisFromTree(mkbIdSet);
  }

  async getNodeFour(node: any, mkbIdSet: MkbIdSet): Promise<IMkbSubDiagnosis[] | undefined> {
    await this.getSubDiagnosisByDiagnosisId(mkbIdSet);
    this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    return this.findSubDiagnosisFromTree(mkbIdSet);
  }

  findSubDiagnosisFromTree(mkbIdSet: MkbIdSet): IMkbSubDiagnosis[] | undefined {
    let diagnosis: IMkbDiagnosis | undefined = new MkbDiagnosis();
    const mkbClass = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);

    if (!mkbClass) return undefined;
    diagnosis = mkbClass ? mkbClass.getDiagnosis(mkbIdSet.diagnosisId) : undefined;
    if (diagnosis && diagnosis.mkbSubDiagnosis) return diagnosis.mkbSubDiagnosis;

    const mkbGroup = mkbClass.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
    diagnosis = mkbGroup ? mkbGroup.getDiagnosis(mkbIdSet.diagnosisId) : undefined;

    if (diagnosis && diagnosis.mkbSubDiagnosis) return diagnosis.mkbSubDiagnosis;
    if (!mkbGroup) return undefined;

    const subGroup = mkbGroup.mkbSubGroups.find((m: IMkbSubGroup) => m.id === mkbIdSet.subGroupId);
    diagnosis = subGroup ? subGroup.getDiagnosis(mkbIdSet.diagnosisId) : undefined;

    if (diagnosis && diagnosis.mkbSubDiagnosis) return diagnosis.mkbSubDiagnosis;
    return undefined;
  }
}
</script>
