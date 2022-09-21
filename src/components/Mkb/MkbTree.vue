<template>
  <div class="wrapper">
    <el-button @click="editing = !editing">{{ editing ? 'Выйти из редактирования' : 'Редактировать' }}</el-button
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
      <template #default="{ data }">
        <el-checkbox v-if="editing" v-model="data.relevant" @change="updateRelevantHandler(data)"></el-checkbox>
        <el-icon v-if="editing && !data.isEditMode" style="margin: 0 5px; color: blue" @click="data.isEditMode = true">
          <Edit />
        </el-icon>
        <el-icon v-else-if="editing && data.isEditMode" style="margin: 0 5px; color: blue" @click="updateNameHandler(data)">
          <FolderChecked />
        </el-icon>
        <el-input v-if="editing && data.isEditMode" v-model="data.name"></el-input>
        <div v-else>
          <span class="custom-tree-node" style="font-size: 16px" :is-leaf="data.leaf">
            <span style="margin-bottom: 10px">
              {{ data.getFullName() }}
            </span>
          </span>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import { ElTree } from 'element-plus';
import Node from 'element-plus/lib/components/tree/src/model/node';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref, toRefs, UnwrapRef } from 'vue';
import { useStore } from 'vuex';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbGroup from '@/classes/mkb/MkbGroup';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import MkbSubSubGroup from '@/classes/mkb/MkbSubSubGroup';
import MkbClass from '@/classes/mkb/MkbСlass';
import IWithDiagnosis from '@/interfaces/IWithDiagnosis';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';
import { MkbLevel } from '@/interfaces/mkb/MkbLevel';
import IMkbNode from '@/interfaces/mkb/mkbTree/IMkbNode';

export default defineComponent({
  name: 'MkbTree',
  props: {
    selectable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    checkedDiagnosis: {
      type: Array as PropType<IWithDiagnosis[]>,
      default: () => [],
    },
  },
  emits: ['removeDiagnosis', 'setDiagnosis', 'setSubDiagnosis', 'setConcreteDiagnosis'],
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
        const curDiagnosis = checkedDiagnosis.value.find(
          (d: UnwrapRef<IWithDiagnosis>) => checkedNode.mkbDiagnosisId === d.mkbDiagnosisId && !d.mkbSubDiagnosisId
        );
        let someChildrenChecked = curNode.parent.childNodes.some((child: Node) => child.checked);
        if (!someChildrenChecked && !curDiagnosis) {
          curNode.parent.checked = false;
        }

        curNode.childNodes.forEach((child: Node) => tree?.value?.setChecked(child.data.id, false, false));
        if (checkedNode.code || checkedNode.subCode > -1) {
          emit('removeDiagnosis', checkedNode);
        }
        return;
      }
      tree.value.setChecked(checkedNode.id, true, false);
      if (checkedNode.code) {
        emit('setDiagnosis', checkedNode);
      }

      if (checkedNode.subCode > -1) {
        tree.value.setChecked(checkedNode.mkbDiagnosisId, true, false);
        const diagnosis = tree.value.getNode(checkedNode.id).parent.data;
        emit('setSubDiagnosis', checkedNode, diagnosis);
      }
      if (!checkedNode.subCode && !checkedNode.code) {
        tree.value.setChecked(checkedNode.mkbSubDiagnosisId, true, false);
        mkbClasses.value.forEach((c: IMkbClass) => {
          const sd = c.getAllSubDiagnosis();
          const sdItem = sd.find((sd: IMkbSubDiagnosis) => sd.id === checkedNode.mkbSubDiagnosisId);
          if (sdItem && sdItem.mkbDiagnosisId && tree.value) {
            tree.value.setChecked(sdItem.mkbDiagnosisId, true, false);
          }
        });
        const diagnosis = tree.value.getNode(checkedNode.id).parent.parent.data;
        const subDiagnosis = tree.value.getNode(checkedNode.id).parent.data;
        emit('setConcreteDiagnosis', checkedNode, subDiagnosis, diagnosis);
      }
    };

    const load = async (node: IMkbNode, resolve: CallableFunction): Promise<void> => {
      const mkbIdSet = new MkbIdSet();
      mkbIdSet.setIds(node);
      switch (node.level) {
        case MkbLevel.MkbClassLevel: {
          return resolve(mkbClasses.value);
        }
        case MkbLevel.MkbGroupLevel: {
          return resolve(await getNodeOne(mkbIdSet));
        }
        case MkbLevel.MkbSubGroupLevel: {
          return resolve(await getNodeTwo(mkbIdSet));
        }
        case MkbLevel.MkbSubSubGroupLevel: {
          return resolve(await getNodeThree(node, mkbIdSet));
        }
        case MkbLevel.MkbDiagnosisLevel: {
          return resolve(await getNodeFour(mkbIdSet));
        }
        default: {
          resolve([]);
        }
      }
    };

    const handleNodeExpand = async (first: IMkbNode): Promise<void> => {
      if (!selectable.value) {
        return;
      }
      setTimeout(() => {
        checkDiagnosis([...(first.mkbDiagnosis ?? []), ...(first.mkbSubDiagnosis ?? []), ...(first.mkbConcreteDiagnosis ?? [])]);
      }, 100);
    };

    const checkDiagnosis = (diagnosisArr: (IMkbDiagnosis | IMkbSubDiagnosis | IMkbConcreteDiagnosis)[]): void => {
      const di = diagnosisArr.filter((diagnosis: IMkbDiagnosis | IMkbSubDiagnosis | IMkbConcreteDiagnosis) => {
        return checkedDiagnosis.value.some((d: UnwrapRef<IWithDiagnosis>) => {
          return diagnosis.id ? [d.mkbDiagnosisId, d.mkbSubDiagnosisId, d.mkbConcreteDiagnosisId].includes(diagnosis.id) : false;
        });
      });
      di.forEach((diagnosis: IMkbDiagnosis | IMkbSubDiagnosis | IMkbConcreteDiagnosis) => {
        if (diagnosis.id) {
          tree?.value?.setChecked(tree.value.getNode(diagnosis.id), true, false);
        }
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

    const getNodeThree = async (
      node: IMkbNode,
      mkbIdSet: MkbIdSet
    ): Promise<(IMkbSubSubGroup | IMkbDiagnosis | IMkbSubDiagnosis | IMkbConcreteDiagnosis)[]> => {
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

    const getNodeFour = async (mkbIdSet: MkbIdSet): Promise<IMkbSubDiagnosis[] | IMkbConcreteDiagnosis[] | undefined> => {
      // await store.dispatch('mkb/getSubDiagnosisByDiagnosisId', mkbIdSet);
      await store.dispatch('mkb/getConcreteDiagnosisBySubDiagnosisId', mkbIdSet);
      return onlyRelevant.value ? findSubDiagnosisFromTree(mkbIdSet) : findSubDiagnosisFromTree(mkbIdSet);
    };

    const findSubDiagnosisFromTree = (mkbIdSet: MkbIdSet): IMkbSubDiagnosis[] | IMkbConcreteDiagnosis[] => {
      let diagnosis: IMkbDiagnosis | undefined = new MkbDiagnosis();
      const mkbClass = mkbClasses.value.find((m: IMkbClass) => m.id === mkbIdSet.classId);
      if (!mkbClass) {
        return [];
      }
      diagnosis = mkbClass.getDiagnosisFromTree(mkbIdSet);
      if (mkbIdSet.subDiagnosisId === '' && diagnosis) {
        return diagnosis.mkbSubDiagnosis;
      }
      const concreteDiagnosis = mkbClass.getAllConcreteDiagnosis();
      // const cd = concreteDiagnosis.filter((c: IMkbConcreteDiagnosis) => c.id === mkbIdSet.concreteDiagnosisId);
      if (concreteDiagnosis.length) {
        return concreteDiagnosis;
      }
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
