<template>
  <draggable tag="el-collapse" :list="registerGroup.registerProperties" item-key="id" @end="onEndFunc">
    <template #item="{ element, index }">
      <el-collapse-item :name="element.name" :title="element.shortName">
        <template #title>
          <!--          <div class="collapse-header">-->
          <span class="collapseHeader">{{ element.shortName }}</span>
          <el-button style="height: 10px" icon="el-icon-delete" @click="removeRegisterProperty(index)"></el-button>
          <!--          </div>-->
        </template>
        <div class="property-form">
          <div>
            <el-form-item label-width="170px" label="Имя">
              <el-input v-model="element.name"></el-input>
            </el-form-item>
            <el-form-item label-width="170px" label="Короткое имя">
              <el-input v-model="element.shortName"></el-input>
            </el-form-item>
            <el-form-item label-width="170px" label="Ширина столбца">
              <el-input v-model="element.colWidth"></el-input>
            </el-form-item>
            <el-form-item label-width="170px" label="Тип свойства">
              <el-select v-model="element.valueTypeId" @change="element.changeRelation(valueTypes)">
                <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="170px" label='Добавить поле "Другое"'>
              <el-checkbox v-model="element.withOther" />
            </el-form-item>
            <el-form-item label-width="170px" label='Добавить "'>
              <el-checkbox v-model="element.withDates" />
            </el-form-item>
            <el-form-item label-width="170px" label="Тэг">
              <el-input v-model="element.tag"></el-input>
            </el-form-item>
            <el-button @click="element.addRegisterPropertyExample()">Добавить пример</el-button>
            <el-form-item label-width="170px" label="Тип свойства">
              <el-input v-for="(example, i) in element.registerPropertyExamples" :key="example" v-model="example.name">
                <el-button @click="element.removeRegisterPropertyExample(i)">Удалить пример</el-button>
              </el-input>
            </el-form-item>
          </div>
          <el-divider direction="vertical" style="height: 100%" />
          <div>
            <RegisterPropertyRadioForm v-if="element.showRadio" :register-property="element" />
            <RegisterPropertySetForm v-if="element.showSet" :register-property="element" />
          </div>
        </div>
      </el-collapse-item>
    </template>
  </draggable>
</template>

<script lang="ts">
import Sortable from 'sortablejs';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import RegisterPropertyRadioForm from '@/components/Registers/RegisterPropertyRadioForm.vue';
import RegisterPropertySetForm from '@/components/Registers/RegisterPropertySetForm.vue';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';

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

    const form = ref();
    const mount: Ref<boolean> = ref(false);
    const activeTab = ref(0);

    const onEndFunc = (evt: Sortable.SortableEvent): void => {
      if (evt.oldIndex === undefined || evt.newIndex === undefined) {
        return;
      }
      props.registerGroup.sortProperties();
      activeTab.value = evt.newIndex;
    };

    const removeRegisterProperty = (index: number) => {
      props.registerGroup.removeRegisterProperty(index);
    };

    const addSetItem = (registerProperty: IRegisterProperty) => registerProperty.addSetItem();
    const addRadioItem = (registerProperty: IRegisterProperty) => registerProperty.addRadioItem();

    return {
      onEndFunc,
      addSetItem,
      addRadioItem,
      activeTab,
      removeRegisterProperty,
      drag,
      valueTypes,
      form,
      mount,
    };
  },
});
</script>

<style>
.collapse-header {
  display: flex;
  justify-content: space-between;
}

.property-form {
  display: flex;
  justify-content: space-between;
}
</style>
