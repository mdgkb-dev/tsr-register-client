<template>
  <el-collapse-item v-for="(registerGroup, i) in register.registerGroups" :id="`collapse-${i}`" :key="i" :name="String(i)">
    <template #title>
      <div class="collapse-header-container">
        <h2 v-if="!registerGroup.isEdit" class="collapse-header">{{ registerGroup.name }}</h2>
        <el-form-item v-else style="width: 100%; margin: 0 10px 0 0" prop="name">
          <!-- :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }" -->
          <el-input v-model="registerGroup.name" placeholder="Название группы" @click.stop></el-input>
        </el-form-item>
        <div class="card-button-group">
          <el-tooltip v-if="!registerGroup.isEdit" effect="light" placement="top-end" content="Редактировать группу">
            <el-button icon="el-icon-edit" @click.stop="editRegisterGroup(registerGroup, i)"></el-button>
          </el-tooltip>
          <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
            <el-button icon="el-icon-folder-checked" @click.stop="editRegisterGroup(registerGroup, i)"></el-button>
          </el-tooltip>
          <el-tooltip effect="light" placement="top-end" content="Добавить свойство">
            <el-button icon="el-icon-plus" @click.stop="addRegisterProperty(registerGroup, i)"></el-button>
          </el-tooltip>
          <el-popconfirm
            confirm-button-text="Да"
            cancel-button-text="Отмена"
            icon="el-icon-info"
            icon-color="red"
            title="Вы уверены, что хотите удалить группу?"
            @confirm="removeRegisterGroup(i)"
            @cancel="() => {}"
          >
            <template #reference>
              <el-button icon="el-icon-delete"></el-button>
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
        <el-button type="primary" @click="addRegisterProperty(registerGroup, i)">Добавить свойство</el-button>
      </el-form-item>
    </el-form>
    <RegisterPropertyForm :register-group="registerGroup" />
  </el-collapse-item>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import RegisterProperty from '@/classes/registers/RegisterProperty';
import RegisterPropertyForm from '@/components/Registers/RegisterPropertyForm.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterGroupForm',
  components: {
    RegisterPropertyForm,
  },
  setup() {
    const store = useStore();
    const register: Ref<IRegister> = computed<IRegister>(() => store.getters['registers/item']);
    const activeCollapseName: Ref<string> = computed(() => store.getters['registers/activeCollapseName']);
    const newRegisterProperty: Ref<IRegisterProperty> = ref(new RegisterProperty());
    const newRegisterPropertyForm = ref();
    const { validateWithoutMessageBox } = useValidate();

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
      registerGroup.addRegisterProperty(newRegisterProperty.value);
      newRegisterProperty.value = new RegisterProperty();
      // store.commit('registers/setActiveCollapseName', String(index));
    };

    return {
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
