<template>
  <draggable handle=".el-icon-s-grid" tag="el-collapse" :list="register.registerGroups" item-key="id" @end="onEndFunc">
    <template #item="{ element, index }">
      <el-collapse-item :id="`collapse-${index}`" :key="index" :name="String(index)">
        <template #title>
          <div class="collapse-header-container">
            <div v-if="!element.isEdit" style="display: flex">
              <el-icon size="20" class="el-icon-s-grid drug-icon">
                <Grid />
              </el-icon>
              <h2 class="collapse-header">{{ element.name }}</h2>
            </div>
            <template v-else>
              <el-form-item style="width: 80%; margin: 0 10px 0 0" prop="name">
                <el-input v-model="element.name" placeholder="Название группы" @keyup.stop="key" @click.stop></el-input>
              </el-form-item>
              <el-form-item style="width: 20%; margin: 0 10px 0 0" prop="withDates">
                <el-checkbox v-model="element.withDates" @keyup.stop="key" @click.stop>C несколькими значениями</el-checkbox>
              </el-form-item>
            </template>
            <div class="card-button-group">
              <el-tooltip v-if="!element.isEdit" effect="light" placement="top-end" content="Редактировать группу">
                <el-button :icon="Edit" @click.stop="editRegisterGroup(element, index)"></el-button>
              </el-tooltip>
              <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
                <el-button :icon="FolderChecked" @click.stop="editRegisterGroup(element, index)"></el-button>
              </el-tooltip>
              <el-tooltip effect="light" placement="top-end" content="Добавить свойство">
                <el-button :icon="Plus" @click.stop="addRegisterProperty(element, index)"></el-button>
              </el-tooltip>
              <el-popconfirm
                confirm-button-text="Да"
                cancel-button-text="Отмена"
                :icon="InfoFilled"
                icon-color="red"
                title="Вы уверены, что хотите удалить группу?"
                @confirm="removeRegisterGroup(index)"
                @cancel="() => null"
              >
                <template #reference>
                  <el-button :icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
        <el-divider></el-divider>
        <el-form ref="newRegisterPropertyForm" class="new-register-property-container" :model="newRegisterProperty">
          <el-form-item
            style="width: 100%; margin-right: 10px"
            prop="shortName"
            :rules="{ required: true, message: 'Пожалуйста укажите сокращенное название свойства', trigger: 'blur' }"
          >
            <el-input v-model="newRegisterProperty.shortName" placeholder="Сокращенное название свойства"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addRegisterProperty(element, index)">Добавить свойство</el-button>
          </el-form-item>
        </el-form>
        <RegisterPropertyForm :register-group="element" />
      </el-collapse-item>
    </template>
  </draggable>
</template>

<script lang="ts">
import { Delete, Edit, FolderChecked, Grid, InfoFilled, Plus } from '@element-plus/icons-vue';
import Sortable from 'sortablejs';
import { computed, defineComponent, Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import RegisterProperty from '@/classes/registers/RegisterProperty';
import RegisterPropertyForm from '@/components/Registers/RegisterPropertyForm.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';
import useValidate from '@/mixins/useValidate';
export default defineComponent({
  name: 'RegisterGroupForm',
  components: {
    RegisterPropertyForm,
    draggable,
    Grid,
  },
  setup() {
    const store = useStore();
    const register: Ref<IRegister> = computed<IRegister>(() => store.getters['registers/item']);
    const activeCollapseName: Ref<string> = computed(() => store.getters['registers/activeCollapseName']);
    const newRegisterProperty: Ref<IRegisterProperty> = ref(new RegisterProperty());
    const newRegisterPropertyForm = ref();
    const { validateWithoutMessageBox } = useValidate();
    const valueTypes: Ref<IValueType[]> = computed(() => store.getters['registers/valueTypes']);
    const editRegisterGroup = (registerGroup: IRegisterGroup, index: number): void => {
      registerGroup.editRegisterGroup();
      store.commit('registers/setActiveCollapseName', String(index));
    };
    const removeRegisterGroup = (index: number): void => {
      register.value.removeRegisterGroup(index);
      if (Number(activeCollapseName.value) !== index && Number(activeCollapseName.value) > index) {
        store.commit('registers/setActiveCollapseName', String(Number(activeCollapseName.value) - 1));
      }
      if (Number(activeCollapseName.value) === index) activeCollapseName.value = '';
    };
    const addRegisterProperty = (registerGroup: IRegisterGroup, index: number): void => {
      if (!validateWithoutMessageBox(newRegisterPropertyForm.value)) {
        return;
      }
      newRegisterProperty.value.name = newRegisterProperty.value.shortName;
      if (valueTypes.value[0]) {
        newRegisterProperty.value.valueTypeId = valueTypes.value[0].id;
      }
      registerGroup.addRegisterProperty(newRegisterProperty.value);
      newRegisterProperty.value = new RegisterProperty();
      // store.commit('registers/setActiveCollapseName', String(index));
    };
    const key = (k: InputEvent) => {
      k.stopPropagation();
    };

    const onEndFunc = (evt: Sortable.SortableEvent): void => {
      if (evt.oldIndex === undefined || evt.newIndex === undefined) {
        return;
      }
      register.value.sortGroups();
      // activeTab.value = evt.newIndex;
    };

    return {
      Edit,
      FolderChecked,
      Plus,
      InfoFilled,
      Delete,
      onEndFunc,
      key,
      register,
      editRegisterGroup,
      removeRegisterGroup,
      addRegisterProperty,
      newRegisterProperty,
      newRegisterPropertyForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.drug-icon {
  line-height: 1.1;
  height: 20px;
  margin-right: 5px;
  margin-top: 4px;

  &:hover {
    color: #409eff;
  }
}
@import '@/assets/elements/collapse.scss';
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
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
  .el-switch {
    margin: 5px;
  }
  .el-button {
    margin: 0;
  }
}
.new-register-property-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
