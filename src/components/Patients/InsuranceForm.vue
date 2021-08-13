<template>
  <div class="table-under-collapse">
    <el-button style="margin-bottom: 20px" @click="add">Добавить страховку</el-button>

    <el-table :data="insuranceCompaniesOfPatient" style="width: 710px" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column label="Компания" width="300" align="center" sortable>
        <template #default="scope">
          <el-form-item
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.insuranceCompanyId'"
            :rules="[{ required: true, message: 'Пожалуйста, выберите страховую компанию' }]"
            label-width="0"
            style="margin-bottom: 0"
          >
            <el-select v-model="insuranceCompaniesOfPatient[scope.$index].insuranceCompanyId" placeholder="Выберите компанию">
              <el-option v-for="item in insuranceCompaniesOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="Номер страховки" width="300" align="center">
        <template #default="scope">
          <el-form-item
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.number'"
            :rules="[{ required: true, message: 'Пожалуйста, заполните номер страховки', trigger: 'blur' }]"
            style="margin-bottom: 0"
            label-width="0"
          >
            <el-input v-model.lazy="insuranceCompaniesOfPatient[scope.$index].number" label="Введите номер страховки"></el-input>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IOption from '@/interfaces/patients/IOption';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

export default defineComponent({
  name: 'InsuranceForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();

    const insuranceCompanies: Ref<IInsuranceCompany[]> = computed(() => store.getters['insuranceCompanies/insuranceCompanies']);
    const insuranceCompaniesOfPatient: Ref<IRepresentativeToPatient[]> = computed(() => store.getters['patients/insuranceCompanies']);
    const insuranceCompaniesOptions: Ref<IOption[]> = ref([]);

    onBeforeMount(async () => {
      await store.dispatch('insuranceCompanies/getAll');
      for (const item of insuranceCompanies.value) {
        insuranceCompaniesOptions.value.push({
          label: `${item.name}`,
          value: `${item.id}`,
        });
      }
    });

    const add = (): void => {
      store.commit('representatives/addPatient');
    };

    const remove = (item: IRepresentativeToPatient): void => {
      store.commit('representatives/removePatient', item);
    };

    return {
      insuranceCompaniesOfPatient,
      insuranceCompaniesOptions,
      remove,
      add,
    };
  },
});
</script>
