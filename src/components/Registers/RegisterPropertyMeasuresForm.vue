<template>
  <el-form ref="newRegisterPropertyMeasureForm" class="new-register-measure-container" :model="newRegisterPropertyMeasure">
    <el-form-item
      style="width: 100%; margin-right: 10px"
      prop="name"
      :rules="{ required: true, message: 'Пожалуйста укажите название примера', trigger: 'blur' }"
    >
      <el-input v-model="newRegisterPropertyMeasure.name" placeholder="Название примера"></el-input>
    </el-form-item>
    <el-button type="primary" @click="addRegisterPropertyMeasure(registerProperty)">Добавить единицу измерения</el-button>
  </el-form>

  <draggable
    handle=".el-icon-s-grid"
    tag="el-collapse"
    :list="registerProperty.registerPropertyMeasures"
    item-key="id"
    @end="sortByDrug(registerProperty.registerPropertyMeasures, $event)"
  >
    <template #item="{ element, index }">
      <div v-if="registerProperty.registerPropertyMeasures.length" class="property-row">
        <el-form-item label-width="170px" label="Единица измерения">
          <i class="el-icon-s-grid drug-icon" />
          <el-input v-model="element.name"> </el-input>
          <div class="card-button-group">
            <el-popconfirm
              confirm-button-text="Да"
              cancel-button-text="Отмена"
              icon="el-icon-info"
              icon-color="red"
              title="Вы уверены, что хотите удалить пример?"
              @confirm="
                RemoveFromClass(index, registerProperty.registerPropertyMeasures, registerProperty.registerPropertyMeasuresForDelete)
              "
              @cancel="() => null"
            >
              <template #reference>
                <el-button icon="el-icon-delete"></el-button>
              </template>
            </el-popconfirm>
          </div>
        </el-form-item>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import RegisterPropertyMeasure from '@/classes/registers/RegisterPropertyMeasure';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyMeasure from '@/interfaces/registers/IRegisterPropertyMeasure';
import sortByDrug from '@/mixins/sortByDrug';
import useValidate from '@/mixins/useValidate';
import RemoveFromClass from '@/services/RemoveFromClass';

export default defineComponent({
  name: 'RegisterPropertyMeasuresForm',
  components: {
    draggable,
  },
  props: {
    registerProperty: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  setup(props) {
    const drag = ref(false);
    const activeCollapseName: Ref<string> = ref('');
    const form = ref();
    const newMeasure: Ref<IRegisterPropertyMeasure> = ref(new RegisterPropertyMeasure());
    const newRegisterPropertyMeasureForm = ref();
    const { validateWithoutMessageBox } = useValidate();

    // const onEndFunc = (evt: Sortable.SortableEvent): void => {
    //   if (evt.oldIndex === undefined || evt.newIndex === undefined) {
    //     return;
    //   }
    //   props.registerProperty.sortMeasures();
    // };

    const addRegisterPropertyMeasure = (registerProperty: IRegisterProperty): void => {
      if (!validateWithoutMessageBox(newRegisterPropertyMeasureForm.value)) {
        return;
      }
      registerProperty.addRegisterPropertyMeasure(newMeasure.value);
      newMeasure.value = new RegisterPropertyMeasure();
    };

    return {
      RemoveFromClass,
      sortByDrug,
      addRegisterPropertyMeasure,
      // onEndFunc,
      drag,
      form,
      activeCollapseName,
      newRegisterPropertyMeasure: newMeasure,
      newRegisterPropertyMeasureForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.drug-icon {
  margin-right: 5px;
  margin-top: 3px;
  &:hover {
    color: #409eff;
  }
}

.el-collapse {
  width: 100%;
  margin-bottom: 10px;
  border: none;
}
:deep(.el-collapse-item) {
  background-color: #eef1f6;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}
:deep(.el-collapse-item__header),
:deep(.el-collapse-item__wrap) {
  border: none;
  background-color: #eef1f6;
}
:deep(.el-collapse-item__wrap) {
  padding: 0 10px;
}

.collapse-header {
  display: flex;
  justify-content: space-between;
}

.property-form {
  .el-form-item {
    margin-bottom: 5px;
  }
  :deep(.el-form-item__label) {
    padding-bottom: 0;
  }
}
h3 {
  margin: 0;
  line-height: 1;
}
// Collapse header
.collapse-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .el-button {
    margin-right: 20px;
    background: #eef1f6;
    &:hover {
      background: white;
    }
  }
}
.el-collapse-item {
  position: relative;
}
:deep(.el-collapse-item__header) {
  height: auto;
}
.collapse-header {
  margin: 0;
  line-height: 1.1;
}
.card-button-group {
  display: flex;
  align-items: center;
  margin-left: 10px;
  .el-switch {
    margin: 5px;
  }
  .el-button {
    margin: 0;
  }
}
.flex-row {
  display: flex;
  justify-content: space-between;
}
.new-register-measure-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  .el-form-item {
    margin: 0;
  }
}
.property-row {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  &-main {
    width: auto;
    display: flex;
    margin-bottom: 10px;
  }
  &-others {
    padding-left: 20px;
  }
  :deep(.el-form-item__content) {
    display: flex;
  }
}
</style>
79377
