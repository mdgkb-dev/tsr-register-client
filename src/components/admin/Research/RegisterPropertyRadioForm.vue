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
  <draggable
    handle=".el-icon-s-grid"
    tag="el-collapse"
    :list="registerProperty.registerPropertyRadios"
    item-key="id"
    @end="sortByDrug(registerProperty.registerPropertyRadios, $event)"
  >
    <template #item="{ element, index }">
      <div class="property-row">
        <div class="property-row-header">
          <el-icon :size="20" class="el-icon-s-grid drug-icon">
            <Grid />
          </el-icon>
          <div class="card-button-group">
            <el-tooltip effect="light" placement="top-end" content="Добавить доп.значение">
              <el-button :icon="Plus" @click.stop="addRegisterPropertyOther(element, index)"></el-button>
            </el-tooltip>
            <el-popconfirm
              confirm-button-text="Да"
              cancel-button-text="Отмена"
              :icon="InfoFilled"
              icon-color="red"
              title="Вы уверены, что хотите удалить свойство?"
              @confirm="registerProperty.removeRadioItem(index)"
              @cancel="() => null"
            >
              <template #reference>
                <el-button :icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
        <el-form-item style="width: 100%; margin-bottom: 10px" label="Название свойства">
          <!-- :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }" -->
          <el-input v-model="element.name" placeholder="Название свойства" @click.stop @input="inputHandler(e)"></el-input>
        </el-form-item>

        <RegisterPropertyOthersForm :register-property="element" />
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { Delete, Grid, InfoFilled, Plus } from '@element-plus/icons-vue';
import { defineComponent, PropType, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import RegisterPropertyOthersForm from '@/components/admin/Research/RegisterPropertyOthersForm.vue';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyRadio from '@/interfaces/IRegisterPropertyRadio';
export default defineComponent({
  name: 'RegisterPropertyRadioForm',
  components: {
    draggable,
    RegisterPropertyOthersForm,
    Grid,
  },
  props: {
    registerProperty: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  setup(props) {
    const activeCollapseName: Ref<string> = ref('');
    const newRegisterPropertyRadio: Ref<IRegisterPropertyRadio> = ref(new AnswerVariants());
    const newRegisterPropertyRadioForm = ref();
    // const { validateWithoutMessageBox } = useValidate();

    const addRadioItem = (): void => {
      // if (!validateWithoutMessageBox(newRegisterPropertyRadioForm.value)) {
      //   return;
      // }
      props.registerProperty.addRadioItem(newRegisterPropertyRadio.value);
      newRegisterPropertyRadio.value = new AnswerVariants();
    };

    const addRegisterPropertyOther = (registerPropertyRadio: IRegisterPropertyRadio, index: number) => {
      registerPropertyRadio.addRegisterPropertyOther();
      activeCollapseName.value = String(index);
    };

    const inputHandler = (e: Event) => {
      e.stopPropagation();
    };

    return {
      // sortByDrug,
      addRadioItem,
      activeCollapseName,
      newRegisterPropertyRadio,
      newRegisterPropertyRadioForm,
      addRegisterPropertyOther,
      inputHandler,
      Plus,
      InfoFilled,
      Delete,
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
  &-header {
    display: flex;
    justify-content: space-between;
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
.el-collapse {
  border: none;
}
</style>
