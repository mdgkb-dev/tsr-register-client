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
      :show-checkbox="selectable"
      :expand-on-click-node="editing ? false : true"
      @check="setDiagnosis"
      @node-expand="handleNodeExpand"
    >
      <template #default="{ node, data }">
        <el-checkbox v-if="editing" v-model="data.relevant" @change="updateRelevantHandler(data)"></el-checkbox>
        <i v-if="editing && !data.isEditMode" class="el-icon-edit" style="margin: 0 5px; color: blue" @click="data.isEditMode = true"></i>
        <i
          v-else-if="editing && data.isEditMode"
          class="el-icon-folder-checked"
          style="margin: 0 5px; color: blue"
          @click="updateNameHandler(data)"
        ></i>
        <el-input v-if="editing && data.isEditMode" v-model="data.name"></el-input>
        <div v-else>
          <span class="custom-tree-node" style="font-size: 16px" :isLeaf="data.leaf">
            <span v-if="node.level === 1 && !data.code" style="margin-bottom: 10px">
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
import { ElTree } from 'element-plus';
import Node from 'element-plus/lib/el-tree/src/model/node';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbGroup from '@/classes/mkb/MkbGroup';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import MkbSubSubGroup from '@/classes/mkb/MkbSubSubGroup';
import MkbClass from '@/classes/mkb/MkbСlass';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';
import IMkbNode from '@/interfaces/mkb/mkbTree/IMkbNode';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';

export default defineComponent({
  name: 'MkbTree',
  props: {
    selectable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    checkedDiagnosis: {
      type: Array as PropType<(IPatientDiagnosis | IRegisterDiagnosis)[]>,
      default: () => [],
    },
  },
  emits: ['removeDiagnosis', 'setDiagnosis', 'setSubDiagnosis'],
  setup(props, { emit }) {
    const store = useStore();
    const { selectable, checkedDiagnosis } = toRefs(props);

    const tree = ref<InstanceType<typeof ElTree>>();
    const editing: Ref<boolean> = ref(false);
    const onlyRelevant: Ref<boolean> = ref(false);

    const mkbClasses: ComputedRef<IMkbClass[]> = computed(() => store.getters['mkb/mkbClasses']);

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('mkb/getAllMkbClasses');
    });

    const setDiagnosis = (checkedNode: IMkbNode): void => {
      if (!tree?.value) {
        return;
      }
      const curNode = tree.value.getNode(checkedNode.id);

      if (!curNode.checked) {
        tree.value.setChecked(checkedNode.id, false, false);
        let notChildrenChecked = true;

        curNode.parent.childNodes.forEach((child: Node) => {
          if (child.checked) notChildrenChecked = false;
        });

        const curDiagnosis = checkedDiagnosis.value.find(
          (d: IPatientDiagnosis | IRegisterDiagnosis) => checkedNode.mkbDiagnosisId === d.mkbDiagnosisId && !d.mkbSubDiagnosisId
        );

        if (notChildrenChecked && !curDiagnosis) curNode.parent.checked = false;

        curNode.childNodes.forEach((child: Node) => {
          tree?.value?.setChecked(child.data.id, false, false);
        });
        if (checkedNode.code || checkedNode.subCode > -1) emit('removeDiagnosis', checkedNode);
        return;
      }

      if (checkedNode.code) {
        tree.value.getCheckedNodes(false, false);
        tree.value.setChecked(checkedNode.id, true, false);
        if (checkedNode.code) emit('setDiagnosis', checkedNode);
      }

      if (checkedNode.subCode > -1) {
        tree.value.setChecked(checkedNode.id, true, false);
        tree.value.setChecked(checkedNode.mkbDiagnosisId, true, false);
        const diagnosis = tree.value.getNode(checkedNode.id).parent.data;

        if (checkedNode.subCode > -1) emit('setSubDiagnosis', checkedNode, diagnosis);
      }
    };

    const handleNodeExpand = async (first: IMkbNode): Promise<void> => {
      if (!selectable.value) {
        return;
      }

      setTimeout(() => {
        if (first.mkbDiagnosis && first.mkbDiagnosis.length > 0) {
          checkDiagnosis(first.mkbDiagnosis);
        }

        if (first.mkbSubDiagnosis && first.mkbSubDiagnosis.length > 0) {
          checkSubDiagnosis(first.mkbSubDiagnosis);
        }
      }, 100);
    };

    const load = async (node: IMkbNode, resolve: CallableFunction): Promise<void> => {
      const mkbIdSet = new MkbIdSet();

      if (node.level === 0) {
        return resolve(mkbClasses.value);
      }

      if (node.level === 1) {
        mkbIdSet.classId = node.data.id;
        return resolve(await getNodeOne(mkbIdSet));
      }

      if (node.level === 2) {
        mkbIdSet.classId = node.parent.data.id;
        mkbIdSet.groupId = node.data.id;
        mkbIdSet.diagnosisId = node.data.id;
        return resolve(await getNodeTwo(mkbIdSet));
      }

      if (node.level === 3) {
        mkbIdSet.classId = node.parent.parent.data.id;
        mkbIdSet.groupId = node.parent.data.id;
        mkbIdSet.subGroupId = node.data.id;
        mkbIdSet.diagnosisId = node.data.id;
        return resolve(await getNodeThree(node, mkbIdSet));
      }

      if (node.level === 4) {
        mkbIdSet.classId = node.parent.parent.parent.data.id;
        mkbIdSet.groupId = node.parent.parent.data.id;
        mkbIdSet.subGroupId = node.parent.data.id;
        mkbIdSet.diagnosisId = mkbIdSet.diagnosisId = node.data.id;
        return resolve(await getNodeFour(mkbIdSet));
      }

      return resolve([]);
    };

    const checkDiagnosis = (diagnosisArr: IMkbDiagnosis[]): void => {
      diagnosisArr.forEach((diagnosis: IMkbDiagnosis) => {
        checkedDiagnosis.value.forEach((d: IPatientDiagnosis | IRegisterDiagnosis) => {
          if (diagnosis.id && diagnosis.id === d.mkbDiagnosisId) tree?.value?.setChecked(tree.value.getNode(diagnosis.id), true, false);
        });
      });
    };

    const checkSubDiagnosis = (diagnosisArr: IMkbSubDiagnosis[]): void => {
      diagnosisArr.forEach((diagnosis: IMkbSubDiagnosis) => {
        checkedDiagnosis.value.forEach((d: IPatientDiagnosis | IRegisterDiagnosis) => {
          const diagnosisId = diagnosis.id;
          if (diagnosisId && diagnosisId === d.mkbSubDiagnosisId) tree?.value?.setChecked(tree.value.getNode(diagnosisId), true, false);
        });
      });
    };

    const getNodeOne = async (mkbIdSet: MkbIdSet): Promise<(IMkbGroup | IMkbDiagnosis)[]> => {
      await store.dispatch('mkb/getGroupById', mkbIdSet);
      const classN = mkbClasses.value.find((m: IMkbClass) => m.id === mkbIdSet.classId);
      return classN ? classN.getChildren(onlyRelevant.value) : [];
    };

    const getNodeTwo = async (mkbIdSet: MkbIdSet): Promise<(IMkbSubGroup | IMkbDiagnosis)[]> => {
      await store.dispatch('mkb/getSubGroupById', mkbIdSet);
      const classN = mkbClasses.value.find((m: IMkbClass) => m.id === mkbIdSet.classId);

      if (classN && classN.mkbGroups) {
        const group = classN.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
        return group ? group.getChildren(onlyRelevant.value) : [];
      }

      return [];
    };

    const getNodeThree = async (node: IMkbNode, mkbIdSet: MkbIdSet): Promise<(IMkbSubSubGroup | IMkbDiagnosis | IMkbSubDiagnosis)[]> => {
      if (!node.data.code) {
        await store.dispatch('mkb/getSubSubGroupById', mkbIdSet);
        const classN = mkbClasses.value.find((m: IMkbClass) => m.id === mkbIdSet.classId);

        if (classN && classN.mkbGroups) {
          const subGroup = classN.getSubGroup(mkbIdSet);
          return subGroup ? subGroup.getChildren(onlyRelevant.value) : [];
        }
      }

      await store.dispatch('mkb/getSubDiagnosisByDiagnosisId', mkbIdSet);
      return findSubDiagnosisFromTree(mkbIdSet);
    };

    const getNodeFour = async (mkbIdSet: MkbIdSet): Promise<IMkbSubDiagnosis[] | undefined> => {
      await store.dispatch('mkb/getSubDiagnosisByDiagnosisId', mkbIdSet);
      return onlyRelevant.value ? findSubDiagnosisFromTree(mkbIdSet)?.filter((item) => item.relevant) : findSubDiagnosisFromTree(mkbIdSet);
    };

    const findSubDiagnosisFromTree = (mkbIdSet: MkbIdSet): IMkbSubDiagnosis[] => {
      let diagnosis: IMkbDiagnosis | undefined = new MkbDiagnosis();
      const mkbClass = mkbClasses.value.find((m: IMkbClass) => m.id === mkbIdSet.classId);

      if (!mkbClass) return [];

      diagnosis = mkbClass.getDiagnosisFromTree(mkbIdSet);

      if (diagnosis) return diagnosis.mkbSubDiagnosis;

      return [];
    };

    const showRelevant = async () => {
      if (onlyRelevant.value) {
        await store.dispatch('mkb/getAllMkbClasses');
      } else {
        store.commit(
          'mkb/setAll',
          mkbClasses.value.filter((item) => item.relevant)
        );
      }

      onlyRelevant.value = !onlyRelevant.value;
    };

    const editMkbTree = () => {
      editing.value = !editing.value;
    };

    const updateNameHandler = (data: MkbClass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis) => {
      data.isEditMode = false;
      store.dispatch('mkb/updateName', data);
    };

    const updateRelevantHandler = (mkb: MkbClass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis) => {
      store.dispatch('mkb/updateRelevant', mkb);
    };

    return {
      editing,
      mkbClasses,
      onlyRelevant,
      tree,
      editMkbTree,
      handleNodeExpand,
      load,
      setDiagnosis,
      showRelevant,
      updateNameHandler,
      updateRelevantHandler,
    };
  },
});
</script>

<style scoped>
:deep(.el-input__inner) {
  border-radius: 10px;
  height: 30px;
  padding: 0 10px;
}

:deep(.el-tree-node) {
  margin: 7px 0;
}
</style>
