<template>
  <el-form ref="newRegisterPropertySetForm" class="new-register-property-set-container" :model="newRegisterPropertySet">
    <el-form-item
      style="width: 100%; margin-right: 10px"
      prop="name"
      :rules="{ required: true, message: 'Пожалуйста укажите сокращенное название свойства', trigger: 'blur' }"
    >
      <el-input v-model="newRegisterPropertySet.name" placeholder="Название свойства"></el-input>
    </el-form-item>
    <el-button type="primary" @click="addSetItem()">Добавить в набор свойств</el-button>
  </el-form>
  <draggable
    handle=".el-icon-s-grid"
    tag="el-collapse"
    :list="registerProperty.registerPropertySets"
    item-key="id"
    @end="sortByDrug(registerProperty.registerPropertySets, $event)"
  >
    <template #item="{ element, index }">
      <div class="property-row">
        <el-form-item style="width: 100%; margin: 0 10px 0 0" label="Название свойства">
          <!-- :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }" -->
          <i class="el-icon-s-grid drug-icon" />
          <el-input v-model="element.name" placeholder="Название свойства" @click.stop @input="inputHandler(e)"></el-input>
          <div class="card-button-group">
            <el-tooltip effect="light" placement="top-end" content="Добавить доп.значение">
              <el-button icon="el-icon-plus" @click.stop="addRegisterPropertyOther(element, index)"></el-button>
            </el-tooltip>
            <el-popconfirm
              confirm-button-text="Да"
              cancel-button-text="Отмена"
              icon="el-icon-info"
              icon-color="red"
              title="Вы уверены, что хотите удалить свойство?"
              @confirm="registerProperty.removeSetItem(index)"
              @cancel="() => null"
            >
              <template #reference>
                <el-button icon="el-icon-delete"></el-button>
              </template>
            </el-popconfirm>
          </div>
        </el-form-item>
        <RegisterPropertyOthersForm :register-property="element" />
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import RegisterPropertyOthersForm from '@/components/Registers/RegisterPropertyOthersForm.vue';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import sortByDrug from '@/mixins/sortByDrug';
import useValidate from '@/mixins/useValidate';
export default defineComponent({
  name: 'RegisterPropertySetForm',
  props: {
    registerProperty: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  components: {
    draggable,
    RegisterPropertyOthersForm,
  },
  setup(props) {
    const activeCollapseName: Ref<string> = ref('');
    const newRegisterPropertySet: Ref<IRegisterPropertySet> = ref(new RegisterPropertySet());
    const newRegisterPropertySetForm = ref();
    const { validateWithoutMessageBox } = useValidate();

    const addSetItem = (): void => {
      if (!validateWithoutMessageBox(newRegisterPropertySetForm.value)) {
        return;
      }
      props.registerProperty.addSetItem(newRegisterPropertySet.value);
      newRegisterPropertySet.value = new RegisterPropertySet();
    };

    const addRegisterPropertyOther = (registerPropertySet: IRegisterPropertySet, index: number) => {
      registerPropertySet.addRegisterPropertyOther();
      activeCollapseName.value = String(index);
    };

    const inputHandler = (e: Event) => {
      e.stopPropagation();
    };

    return {
      sortByDrug,
      addSetItem,
      activeCollapseName,
      newRegisterPropertySet,
      newRegisterPropertySetForm,
      addRegisterPropertyOther,
      inputHandler,
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
}
.el-form-item {
  margin: 0;
  width: 100%;
}
:deep(.el-form-item__content) {
  display: flex;
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

.new-register-property-set-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
}
</style>
