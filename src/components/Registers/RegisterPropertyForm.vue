<template>
  <draggable tag="el-collapse" :list="registerGroup.registerProperties" item-key="id" @end="onEndFunc">
    <template #item="{ element, index }">
      <el-collapse v-model="activeCollapseName" accordion>
        <el-collapse-item class="register-property-collapse" :name="String(index)">
          <template #title>
            <div class="collapse-header-container">
              <h2 v-if="!element.isEdit" class="collapse-header">{{ element.shortName }}</h2>
              <el-form-item v-else style="width: 100%; margin: 0 10px 0 0" prop="name">
                <!-- :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }" -->
                <el-input v-model="element.name" placeholder="Название свойства" @click.stop></el-input>
              </el-form-item>
              <div class="card-button-group">
                <el-tooltip v-if="!element.isEdit" effect="light" placement="top-end" content="Редактировать свойство">
                  <el-button icon="el-icon-edit" @click.stop="editRegisterProperty(element, index)"></el-button>
                </el-tooltip>
                <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
                  <el-button icon="el-icon-folder-checked" @click.stop="editRegisterProperty(element, index)"></el-button>
                </el-tooltip>
                <el-popconfirm
                  confirm-button-text="Да"
                  cancel-button-text="Отмена"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Вы уверены, что хотите удалить свойство?"
                  @confirm="removeRegisterProperty(index)"
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
          <div class="property-form">
            <el-form-item label-width="170px" label="Имя">
              <el-input v-model="element.name"></el-input>
            </el-form-item>
            <el-form-item label-width="170px" label="Короткое имя">
              <el-input v-model="element.shortName"></el-input>
            </el-form-item>
            <div class="flex-row">
              <el-form-item label-width="170px" label="Ширина столбца">
                <el-input v-model="element.colWidth"></el-input>
              </el-form-item>
              <el-form-item label-width="170px" label="Тип свойства">
                <el-select v-model="element.valueTypeId" placeholder="Тип свойства" @change="element.changeRelation(valueTypes)">
                  <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label-width="170px" label='Добавить поле "Другое"'>
              <el-checkbox v-model="element.withOther" />
            </el-form-item> -->
              <el-form-item label-width="170px" label="Возможно несколько значений">
                <el-switch v-model="element.withDates" active-text="Да" inactive-text="Нет"></el-switch>
              </el-form-item>
            </div>
            <!-- <el-form-item label-width="170px" label="Тэг">
              <el-input v-model="element.tag"></el-input>
            </el-form-item> -->
            <RegisterPropertyRadioForm v-if="element.showRadio" :register-property="element" />
            <RegisterPropertySetForm v-if="element.showSet" :register-property="element" />
            <el-form ref="newRegisterPropertyExampleForm" class="new-register-example-container" :model="newRegisterPropertyExample">
              <el-form-item
                style="width: 100%; margin-right: 10px"
                prop="name"
                :rules="{ required: true, message: 'Пожалуйста укажите название примера', trigger: 'blur' }"
              >
                <el-input v-model="newRegisterPropertyExample.name" placeholder="Название примера"></el-input>
              </el-form-item>
              <el-button type="primary" @click="addRegisterPropertyExample(element)">Добавить пример</el-button>
            </el-form>

            <!-- <el-button type="primary" @click="element.addRegisterPropertyExample()">Добавить пример</el-button> -->
            <div v-if="element.registerPropertyExamples.length" class="property-row">
              <el-form-item v-for="(example, i) in element.registerPropertyExamples" :key="i" label-width="170px" label="Пример">
                <el-input v-model="example.name"> </el-input>
                <div class="card-button-group">
                  <el-popconfirm
                    confirm-button-text="Да"
                    cancel-button-text="Отмена"
                    icon="el-icon-info"
                    icon-color="red"
                    title="Вы уверены, что хотите удалить пример?"
                    @confirm="element.removeRegisterPropertyExample(i)"
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
        </el-collapse-item>
      </el-collapse>
    </template>
  </draggable>
</template>

<script lang="ts">
import Sortable from 'sortablejs';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import RegisterPropertyExample from '@/classes/registers/RegisterPropertyExample';
import RegisterPropertyRadioForm from '@/components/Registers/RegisterPropertyRadioForm.vue';
import RegisterPropertySetForm from '@/components/Registers/RegisterPropertySetForm.vue';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyExample from '@/interfaces/registers/IRegisterPropertyExample';
import IValueType from '@/interfaces/valueTypes/IValueType';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterPropertyForm',
  components: {
    RegisterPropertyRadioForm,
    RegisterPropertySetForm,
    draggable,
  },
  props: {
    registerGroup: {
      type: Object as PropType<IRegisterGroup>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const drag = ref(false);
    const valueTypes: Ref<IValueType[]> = computed(() => store.getters['registers/valueTypes']);
    const activeCollapseName: Ref<string> = ref('');
    const form = ref();
    const mount: Ref<boolean> = ref(false);
    const activeTab = ref(0);
    const newRegisterPropertyExample: Ref<IRegisterPropertyExample> = ref(new RegisterPropertyExample());
    const newRegisterPropertyExampleForm = ref();
    const { validateWithoutMessageBox } = useValidate();

    const onEndFunc = (evt: Sortable.SortableEvent): void => {
      if (evt.oldIndex === undefined || evt.newIndex === undefined) {
        return;
      }
      props.registerGroup.sortProperties();
      activeTab.value = evt.newIndex;
    };

    const editRegisterProperty = (registerProperty: IRegisterProperty, index: number): void => {
      registerProperty.editRegisterProperty();
      // store.commit('registers/setActiveCollapseName', String(index));
    };

    const removeRegisterProperty = (index: number) => {
      props.registerGroup.removeRegisterProperty(index);
    };

    const addRegisterPropertyExample = (registerProperty: IRegisterProperty): void => {
      if (!validateWithoutMessageBox(newRegisterPropertyExampleForm.value)) {
        return;
      }
      registerProperty.addRegisterPropertyExample(newRegisterPropertyExample.value);
      newRegisterPropertyExample.value = new RegisterPropertyExample();
    };

    return {
      addRegisterPropertyExample,
      onEndFunc,
      activeTab,
      removeRegisterProperty,
      drag,
      valueTypes,
      form,
      mount,
      editRegisterProperty,
      activeCollapseName,
      newRegisterPropertyExample,
      newRegisterPropertyExampleForm,
    };
  },
});
</script>

<style lang="scss" scoped>
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
:deep(.register-property-collapse) {
  background-color: #eef1f6 !important;
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
.new-register-example-container {
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
