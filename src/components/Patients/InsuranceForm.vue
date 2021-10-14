<template>
  <div class="table-under-collapse">
    <el-button v-if="isEditMode" style="margin-bottom: 20px" @click="add">Добавить страховку</el-button>

    <el-table :data="insuranceCompaniesOfPatient" style="width: 710px" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column label="Компания" align="start" sortable>
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.insuranceCompanyId'"
            :rules="[{ required: true, message: 'Пожалуйста, выберите страховую компанию' }]"
            label-width="0"
            style="margin-bottom: 0"
          >
            <el-select v-model="insuranceCompaniesOfPatient[scope.$index].insuranceCompanyId" placeholder="Выберите компанию">
              <el-option v-for="item in insuranceCompaniesOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <span v-else>{{ scope.row.insuranceCompany.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Номер страховки" align="start">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.number'"
            :rules="[{ required: true, message: 'Пожалуйста, заполните номер страховки', trigger: 'blur' }]"
            style="margin-bottom: 0"
            label-width="0"
          >
            <el-input v-model.lazy="insuranceCompaniesOfPatient[scope.$index].number" label="Введите номер страховки"></el-input>
          </el-form-item>
          <span v-else>{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="isEditMode" width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IOption from '@/interfaces/shared/IOption';

export default defineComponent({
  name: 'InsuranceForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();

    const insuranceCompanies: ComputedRef<IInsuranceCompany[]> = computed(() => store.getters['insuranceCompanies/insuranceCompanies']);
    const insuranceCompaniesOfPatient: ComputedRef<IRepresentativeToPatient[]> = computed(
      () => store.getters['patients/insuranceCompanies']
    );
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);
    const insuranceCompaniesOptions: Ref<IOption[]> = ref([]);

    onBeforeMount(async () => {
      await store.dispatch('insuranceCompanies/getAll');
      if (insuranceCompanies.value) {
        for (const item of insuranceCompanies.value) {
          insuranceCompaniesOptions.value.push({
            label: `${item.name}`,
            value: `${item.id}`,
          });
        }
      }
    });

    const add = (): void => {
      store.commit('patients/addInsurance');
    };

    const remove = (item: IRepresentativeToPatient): void => {
      store.commit('patients/removeInsurance', item);
    };

    return {
      insuranceCompaniesOfPatient,
      insuranceCompaniesOptions,
      remove,
      add,
      isEditMode,
    };
  },
});
</script>
