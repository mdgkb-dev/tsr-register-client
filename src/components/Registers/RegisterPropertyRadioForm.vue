<template>
  <el-form ref="newRegisterPropertyRadioForm" class="new-register-property-set-container" :model="newRegisterPropertyRadio">
    <el-form-item
      style="width: 100%; margin-right: 10px"
      prop="name"
      :rules="{ required: true, message: 'Пожалуйста укажите сокращенное название свойства', trigger: 'blur' }"
    >
      <el-input v-model="newRegisterPropertyRadio.name" placeholder="Название свойства"></el-input>
    </el-form-item>
    <el-button type="primary" @click="addRadioItem()">Добавить в набор свойств</el-button>
  </el-form>

  <div v-for="(registerPropertyRadio, i) in registerProperty.registerPropertyRadios" :key="i" class="property-row">
    <el-form-item style="width: 100%; margin: 0 10px 0 0" label="Название свойства">
      <!-- :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }" -->
      <el-input v-model="registerPropertyRadio.name" placeholder="Название свойства" @click.stop @input="inputHandler(e)"></el-input>
      <div class="card-button-group">
        <el-tooltip effect="light" placement="top-end" content="Добавить доп.значение">
          <el-button icon="el-icon-plus" @click.stop="addRegisterPropertyOther(registerPropertyRadio, i)"></el-button>
        </el-tooltip>
        <el-popconfirm
          confirm-button-text="Да"
          cancel-button-text="Отмена"
          icon="el-icon-info"
          icon-color="red"
          title="Вы уверены, что хотите удалить свойство?"
          @confirm="registerProperty.removeRadioItem(i)"
          @cancel="() => {}"
        >
          <template #reference>
            <el-button icon="el-icon-delete"></el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-form-item>
    <div
      v-for="(registerPropertyOther, registerPropertyOtherIndex) in registerPropertyRadio.registerPropertyOthers"
      :key="registerPropertyOtherIndex"
      class="property-row-main property-row-others"
    >
      <el-form-item label="Название доп.значения">
        <el-input v-model="registerPropertyOther.name" placeholder="Название доп.значения"></el-input>
        <div class="card-button-group">
          <el-popconfirm
            confirm-button-text="Да"
            cancel-button-text="Отмена"
            icon="el-icon-info"
            icon-color="red"
            title="Вы уверены, что хотите удалить доп.значение свойства?"
            @confirm="registerPropertyRadio.removeRegisterPropertyOther(registerPropertyOtherIndex)"
            @cancel="() => {}"
          >
            <template #reference>
              <el-button icon="el-icon-delete"></el-button>
            </template>
          </el-popconfirm>
        </div>
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterPropertyRadioForm',
  props: {
    registerProperty: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  setup(props) {
    const activeCollapseName: Ref<string> = ref('');
    const newRegisterPropertyRadio: Ref<IRegisterPropertyRadio> = ref(new RegisterPropertyRadio());
    const newRegisterPropertyRadioForm = ref();
    const { validateWithoutMessageBox } = useValidate();

    const addRadioItem = (): void => {
      if (!validateWithoutMessageBox(newRegisterPropertyRadioForm.value)) {
        return;
      }
      props.registerProperty.addRadioItem(newRegisterPropertyRadio.value);
      newRegisterPropertyRadio.value = new RegisterPropertyRadio();
    };

    const addRegisterPropertyOther = (registerPropertyRadio: IRegisterPropertyRadio, index: number) => {
      registerPropertyRadio.addRegisterPropertyOther();
      activeCollapseName.value = String(index);
    };

    const inputHandler = (e: Event) => {
      e.stopPropagation();
    };

    return {
      addRadioItem,
      activeCollapseName,
      newRegisterPropertyRadio,
      newRegisterPropertyRadioForm,
      addRegisterPropertyOther,
      inputHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
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
