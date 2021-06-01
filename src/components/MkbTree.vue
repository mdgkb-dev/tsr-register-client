<template>
  <el-button @click="edit">{{ editing ? 'Сохранить' : 'Редактировать' }}</el-button
  ><el-button @click="showRelevant">{{ onlyRelevant ? 'Показать все' : 'Показать активные' }}</el-button>
  <el-tree
    ref="tree"
    :check-strictly="true"
    :data="mkbClasses"
    node-key="id"
    :load="load"
    lazy
    :render-after-expand="false"
    accordion
    :props="{ isLeaf: 'leaf' }"
    @check="setDiagnosis"
    @node-expand="handleNodeExpand"
    :show-checkbox="selectable"
    :expand-on-click-node="editing ? false : true"
    :check-on-click-node="editing ? false : true"
  >
    <template #default="{ node, data }">
      <el-checkbox v-if="editing" v-model="data.relevant" @click="update(data)"></el-checkbox>
      <span class="custom-tree-node" style="font-size: 16px" :isLeaf="data.leaf">
        <span style="margin-bottom: 10px" v-if="node.level === 1 && !data.code">
          <span style="font-weight: bold">{{ data.number }} </span> <span>{{ data.name }}</span>
        </span>
        <span v-else-if="node.level === 1 && data.code">
          <span style="font-weight: bold">{{ data.code }}</span>
          <span>data.name</span>
        </span>
        <span v-else-if="node.level === 2 && !data.code"> {{ `${data.rangeStart}-${data.rangeEnd} ${data.name}` }}</span>
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

import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';

@Options({
  props: ['selectable', 'checked-diagnosis'],
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
      updateRelevant: 'mkb/updateRelevant',
    }),
  },
})
export default class MkbTree extends Vue {
  $refs!: {
    tree: any;
  };
  $message!: any;

  checkedDiagnosis!: IPatientDiagnosis[];
  getAllMkbClasses!: () => Promise<void>;
  getGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubSubGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubDiagnosisByDiagnosisId!: (mkbIdSet: MkbIdSet) => Promise<void>;
  updateRelevant!: (id: string) => Promise<void>;

  mount = false;
  title = 'МКБ10';
  mkbClasses: IMkbClass[] = [];
  selectable!: boolean;
  onlyRelevant = false;
  editing = false;

  setDiagnosis(checkedNode: any): void {
    const curNode = this.$refs.tree.getNode(checkedNode.id);

    if (!curNode.checked) {
      this.$refs.tree.setChecked(checkedNode.id, false, false);
      let notChildrenChecked = true;
      curNode.parent.childNodes.forEach((child: any) => {
        if (child.checked) notChildrenChecked = false;
      });
      const curDiagnosis = this.checkedDiagnosis.find((d: IPatientDiagnosis) => checkedNode.mkbDiagnosisId === d.mkbDiagnosisId && !d.mkbSubDiagnosisId);
      if (notChildrenChecked && !curDiagnosis) curNode.parent.checked = false;
      curNode.childNodes.forEach((child: any) => this.$refs.tree.setChecked(child.data.id, false, false));
      if (checkedNode.code || checkedNode.subCode > -1) this.$emit('removeDiagnosis', checkedNode);
      return;
    }

    if (checkedNode.code) {
      this.$refs.tree.getCheckedNodes();
      this.$refs.tree.setChecked(checkedNode.id, true, false);
      if (checkedNode.code) this.$emit('setDiagnosis', checkedNode);
    }

    if (checkedNode.subCode > -1) {
      this.$refs.tree.setChecked(checkedNode.id, true, false);
      this.$refs.tree.setChecked(checkedNode.mkbDiagnosisId, true, false);
      const diagnosis = this.$refs.tree.getNode(checkedNode.id).parent.data;
      if (checkedNode.subCode > -1) this.$emit('setSubDiagnosis', checkedNode, diagnosis);
    }
  }

  handleNodeExpand(first: any) {
    setTimeout(() => {
      if (first.mkbDiagnosis && first.mkbDiagnosis.length > 0) this.checkDiagnosis(first.mkbDiagnosis);
      if (first.mkbSubDiagnosis > -1 && first.mkbSubDiagnosis.length > 0) this.checkSubDiagnosis(first.mkbSubDiagnosis);
    }, 100);
  }

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

  checkDiagnosis(diagnosisArr: IMkbDiagnosis[]) {
    diagnosisArr.forEach((diagnosis: any) => {
      this.checkedDiagnosis.forEach((d: IPatientDiagnosis) => {
        if (diagnosis.id === d.mkbDiagnosisId) {
          this.$refs.tree.setChecked(this.$refs.tree.getNode(diagnosis.id), true, false);
        }
      });
    });
  }

  checkSubDiagnosis(diagnosisArr: IMkbSubDiagnosis[]) {
    diagnosisArr.forEach((diagnosis: any) => {
      this.checkedDiagnosis.forEach((d: IPatientDiagnosis) => {
        if (diagnosis.id === d.mkbSubDiagnosisId) {
          this.$refs.tree.setChecked(this.$refs.tree.getNode(diagnosis.id), true, false);
        }
      });
    });
  }

  async getNodeOne(node: any, mkbIdSet: MkbIdSet): Promise<any | undefined> {
    await this.getGroupById(mkbIdSet);
    // this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);
    if (this.onlyRelevant) return classN ? [...classN.mkbGroups.filter((item) => item.relevant), ...classN.mkbDiagnosis.filter((item) => item.relevant)] : undefined;
    return classN ? [...classN.mkbGroups, ...classN.mkbDiagnosis] : undefined;
  }

  async getNodeTwo(node: any, mkbIdSet: MkbIdSet): Promise<any | undefined> {
    // console.log(node);
    await this.getSubGroupById(mkbIdSet);
    // this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);

    if (classN && classN.mkbGroups) {
      const group = classN.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
      if (group && group.mkbSubGroups && group.mkbDiagnosis) {
        if (this.onlyRelevant) return group ? [...group.mkbDiagnosis.filter((item) => item.relevant), ...group.mkbSubGroups.filter((item) => item.relevant)] : [];
        return group ? [...group.mkbDiagnosis, ...group.mkbSubGroups] : [];
      }
    }

    return undefined;
  }

  async getNodeThree(node: any, mkbIdSet: MkbIdSet): Promise<any | undefined> {
    if (!node.data.code) {
      await this.getSubSubGroupById(mkbIdSet);
      // this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
      const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);
      if (classN && classN.mkbGroups) {
        const group = classN.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
        if (group && group.mkbSubGroups) {
          const subGroup = group.mkbSubGroups.find((m: IMkbSubGroup) => m.id === mkbIdSet.subGroupId);

          if (subGroup && subGroup.mkbSubSubGroups && subGroup.mkbDiagnosis) {
            if (this.onlyRelevant) {
              return subGroup ? [...subGroup.mkbDiagnosis.filter((item) => item.relevant), ...subGroup.mkbSubSubGroups.filter((item) => item.relevant)] : undefined;
            }
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
    // this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    return this.onlyRelevant ? this.findSubDiagnosisFromTree(mkbIdSet)?.filter((item) => item.relevant) : this.findSubDiagnosisFromTree(mkbIdSet);
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

  async showRelevant() {
    if (this.onlyRelevant) {
      await this.getAllMkbClasses();
      this.mkbClasses = this.$store.getters['mkb/mkbClasses'];
    } else {
      this.mkbClasses = this.mkbClasses.filter((item) => item.relevant);
    }
    this.onlyRelevant = !this.onlyRelevant;
  }

  edit() {
    this.editing = !this.editing;
  }

  update(data: any) {
    this.updateRelevant({ ...data, mkbGroupName: data.constructor.name });
  }
}
</script>
