<template>
  <el-button style="margin-bottom: 10px" @click="add">Добавить свойство</el-button>
  <el-table :data="registerPropertyToRegisterGroup" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="60" align="center" />

    <el-table-column label="Наименование" min-width="250">
      <template #default="scope">
        <el-form-item
          label-width="0"
          style="margin-bottom: 0"
          :prop="'registerPropertyToRegisterGroup.' + scope.$index + '.registerPropertyId'"
          :rules="[{ required: true, message: 'Необходимо выбрать группу', trigger: 'change' }]"
        >
          <el-select v-model="inRegisterPropertyToRegisterGroup[scope.$index].registerPropertyId">
            <el-option v-for="item in inRegisterPropertyOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="Порядковый номер свойства" min-width="250">
      <template #default="scope">
        <el-input-number v-model="scope.row.order"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="200">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';
import { useStore } from 'vuex';

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';

export default defineComponent({
  name: 'RegisterGroupPage',

  setup() {
    const store = useStore();

    const registerPropertyToRegisterGroup: Ref<IRegisterPropertyToRegisterGroup[]> = computed(
      () => store.getters['registerGroups/registerPropertyToRegisterGroup']
    );
    const registerProperties: Ref<IRegisterProperty[]> = computed(() => store.getters['registerProperties/registerProperties']);

    onBeforeMount(async () => {
      await store.dispatch('registerProperties/getAll');
    });

    const add = (): void => {
      store.commit('registerGroups/addProperty');
    };
    const remove = (item: IRegisterPropertyToRegisterGroup): void => {
      store.commit('registerProperties/addRadioItem', item);
    };

    return {
      add,
      remove,
      registerProperties,
      registerPropertyToRegisterGroup,
    };
  },
});
</script>
