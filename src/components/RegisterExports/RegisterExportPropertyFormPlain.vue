<template>
  <el-button style="margin-bottom: 10px" :disabled="isAddPropertyDisabled" @click="add">Добавить свойство</el-button>
  <el-table :data="registerQueryToRegisterProperty" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="60" align="center" />

    <el-table-column label="Наименование" min-width="250">
      <template #default="scope">
        <el-form-item
          label-width="0"
          style="margin-bottom: 0"
          :prop="'registerQueryToRegisterProperty.' + scope.$index + '.registerPropertyId'"
          :rules="[{ required: true, message: 'Необходимо выбрать свойство', trigger: 'change' }]"
        >
          <el-select v-model="registerQueryToRegisterProperty[scope.$index].registerPropertyId">
            <el-option v-for="property in registerProperties" :key="property.id" :label="property.name" :value="property.id" />
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column label="Порядковый номер свойства" min-width="250">
      <template #default="scope">
        <el-input-number v-model="scope.row.order" />
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
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterQueryToRegisterProperty from '@/interfaces/registers/IRegisterQueryToRegisterProperty';
export default defineComponent({
  name: 'RegisterExportPropertyFormPlain',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();

    const isAddPropertyDisabled: ComputedRef<boolean> = computed<boolean>(() => store.getters['registerQueries/isAddPropertyDisabled']);
    const registerProperties: ComputedRef<IRegisterProperty[]> = computed<IRegisterProperty[]>(
      () => store.getters['registerProperties/registerProperties']
    );
    const registerQueryToRegisterProperty: ComputedRef<IRegisterQueryToRegisterProperty[]> = computed<IRegisterQueryToRegisterProperty[]>(
      () => store.getters['registerQueries/registerQueryToRegisterProperty']
    );

    const add = (): void => {
      store.commit('registerQueries/addQueryToProperty');
    };

    const remove = (queryToProperty: any): void => {
      // store.commit('registerQueries/removeQueryToProperty', queryToProperty);
    };

    return {
      isAddPropertyDisabled,
      registerProperties,
      registerQueryToRegisterProperty,
      add,
      remove,
    };
  },
});
</script>
