<template>
  <div class="wrapper">
    <el-button @click="editMkbTree">{{ editing ? 'Выйти из редактирования' : 'Редактировать' }}</el-button
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
    >
      <template #default="{ node, data }">
        <el-checkbox v-if="editing" v-model="data.relevant" @change="updateRelevantHandler(data)"></el-checkbox>
        <i v-if="editing && !data.isEditMode" @click="data.isEditMode = true" class="el-icon-edit" style="margin: 0 5px; color: blue"></i>
        <i v-else-if="editing && data.isEditMode" @click="updateNameHandler(data)" class="el-icon-folder-checked" style="margin: 0 5px; color: blue"></i>
        <el-input v-if="editing && data.isEditMode" v-model="data.name"></el-input>
        <div v-else>
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
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbGroup from '@/classes/mkb/MkbGroup';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import MkbSubSubGroup from '@/classes/mkb/MkbSubSubGroup';
import MkbCLass from '@/classes/mkb/MkbСlass';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';

@Options({
  props: ['selectable', 'checked-diagnosis', 'patientDiagnosis'],
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
      updateName: 'mkb/updateName',
    }),
  },
})
export default class MkbTree extends Vue {
  declare $refs: {
    tree: any;
  };
  $message!: any;

  checkedDiagnosis!: Array<IPatientDiagnosis | IRegisterDiagnosis>;
  patientDiagnosis!: IPatientDiagnosis[];

  getAllMkbClasses!: () => Promise<void>;
  getGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubSubGroupById!: (mkbIdSet: MkbIdSet) => Promise<void>;
  getSubDiagnosisByDiagnosisId!: (mkbIdSet: MkbIdSet) => Promise<void>;
  updateRelevant!: (mkb: MkbCLass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis) => Promise<void>;
  updateName!: (mkb: MkbCLass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis) => Promise<void>;

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
      const curDiagnosis = this.checkedDiagnosis.find(
        (d: IPatientDiagnosis | IRegisterDiagnosis) => checkedNode.mkbDiagnosisId === d.mkbDiagnosisId && !d.mkbSubDiagnosisId,
      );
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
    if (!this.selectable) return;
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
      console.log(this.checkDiagnosis);
      this.checkedDiagnosis.forEach((d: IPatientDiagnosis | IRegisterDiagnosis) => {
        if (diagnosis.id === d.mkbDiagnosisId) {
          this.$refs.tree.setChecked(this.$refs.tree.getNode(diagnosis.id), true, false);
        }
      });
    });
  }

  checkSubDiagnosis(diagnosisArr: IMkbSubDiagnosis[]) {
    diagnosisArr.forEach((diagnosis: any) => {
      console.log(this.checkDiagnosis);
      this.checkedDiagnosis.forEach((d: IPatientDiagnosis | IRegisterDiagnosis) => {
        if (diagnosis.id === d.mkbSubDiagnosisId) {
          this.$refs.tree.setChecked(this.$refs.tree.getNode(diagnosis.id), true, false);
        }
      });
    });
  }

  async getNodeOne(node: any, mkbIdSet: MkbIdSet): Promise<(IMkbGroup | IMkbDiagnosis)[]> {
    await this.getGroupById(mkbIdSet);
    const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);
    return classN ? classN.getChildren(this.onlyRelevant) : [];
  }

  async getNodeTwo(node: any, mkbIdSet: MkbIdSet): Promise<(IMkbSubGroup | IMkbDiagnosis)[]> {
    await this.getSubGroupById(mkbIdSet);
    const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);

    if (classN && classN.mkbGroups) {
      const group = classN.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
      return group ? group.getChildren(this.onlyRelevant) : [];
    }
    return [];
  }

  async getNodeThree(node: any, mkbIdSet: MkbIdSet): Promise<(IMkbSubSubGroup | IMkbDiagnosis | IMkbSubDiagnosis)[]> {
    if (!node.data.code) {
      await this.getSubSubGroupById(mkbIdSet);
      const classN = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);
      if (classN && classN.mkbGroups) {
        const subGroup = classN.getSubGroup(mkbIdSet);
        return subGroup ? subGroup.getChildren(this.onlyRelevant) : [];
      }
    }
    await this.getSubDiagnosisByDiagnosisId(mkbIdSet);
    return this.findSubDiagnosisFromTree(mkbIdSet);
  }

  async getNodeFour(node: any, mkbIdSet: MkbIdSet): Promise<IMkbSubDiagnosis[] | undefined> {
    await this.getSubDiagnosisByDiagnosisId(mkbIdSet);
    return this.onlyRelevant ? this.findSubDiagnosisFromTree(mkbIdSet)?.filter((item) => item.relevant) : this.findSubDiagnosisFromTree(mkbIdSet);
  }

  findSubDiagnosisFromTree(mkbIdSet: MkbIdSet): IMkbSubDiagnosis[] {
    let diagnosis: IMkbDiagnosis | undefined = new MkbDiagnosis();
    const mkbClass = this.mkbClasses.find((m: IMkbClass) => m.id === mkbIdSet.classId);

    if (!mkbClass) return [];
    diagnosis = mkbClass.getDiagnosisFromTree(mkbIdSet);
    if (diagnosis) return diagnosis.mkbSubDiagnosis;
    return [];
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

  editMkbTree() {
    this.editing = !this.editing;
  }

  updateNameHandler(data: MkbCLass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis) {
    const mkb = data;
    mkb.isEditMode = false;
    this.updateName(data);
  }

  updateRelevantHandler(mkb: MkbCLass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis) {
    this.updateRelevant(mkb);
  }
}
</script>

<style lang="scss" scoped>
.wrapper:deep {
  .el-input__inner {
    border-radius: 10px;
    height: 30px;
    padding: 0 10px;
  }

  .el-tree-node {
    margin: 7px 0;
  }
}
</style>
