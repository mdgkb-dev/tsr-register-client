<template>
  <draggable
    handle=".el-icon-s-grid"
    tag="el-collapse"
    :list="registerProperty.registerPropertyOthers"
    item-key="id"
    @end="sortByDrug(registerProperty.registerPropertyOthers, $event)"
  >
    <template #item="{ element, index }">
      <div class="property-row-main property-row-others">
        <el-form-item label="Название доп.значения">
          <i class="el-icon-s-grid drug-icon" />
          <el-input v-model="element.name" placeholder="Название доп.значения"></el-input>

          <div class="card-button-group">
            <el-popconfirm
              confirm-button-text="Да"
              cancel-button-text="Отмена"
              icon="el-icon-info"
              icon-color="red"
              title="Вы уверены, что хотите удалить доп.значение свойства?"
              @confirm="registerProperty.removeRegisterPropertyOther(index)"
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

import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import sortByDrug from '@/mixins/sortByDrug';
export default defineComponent({
  name: 'RegisterPropertyRadioForm',
  props: {
    registerProperty: {
      type: Object as PropType<IRegisterPropertyRadio | IRegisterPropertySet>,
      required: true,
    },
  },
  components: {
    draggable,
  },
  setup(props) {
    const activeCollapseName: Ref<string> = ref('');
    const newRegisterPropertyRadio: Ref<IRegisterPropertyRadio> = ref(new RegisterPropertyRadio());
    const newRegisterPropertyRadioForm = ref();

    return {
      sortByDrug,
      activeCollapseName,
      newRegisterPropertyRadio,
      newRegisterPropertyRadioForm,
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
