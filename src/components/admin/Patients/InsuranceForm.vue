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
              <el-option v-for="item in insuranceCompaniesOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
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

      <el-table-column v-if="isEditMode" width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TableButtonGroup from '@/components/TableButtonGroup.vue';

export default defineComponent({
  name: 'InsuranceForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    // const store = useStore();

    // const insuranceCompanies: ComputedRef<InsuranceCompany[]> = computed(() => store.getters['insuranceCompanies/insuranceCompanies']);
    // const insuranceCompaniesOfPatient = computed(() => store.getters['patients/insuranceCompanies']);
    // const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);
    // const insuranceCompaniesOptions: Ref<IOption[]> = ref([]);

    // onBeforeMount(async () => {
    //   await store.dispatch('insuranceCompanies/getAll');
    //   if (insuranceCompanies.value) {
    //     for (const item of insuranceCompanies.value) {
    //       insuranceCompaniesOptions.value.push({
    //         label: `${item.name}`,
    //         value: `${item.id}`,
    //       });
    //     }
    //   }
    // });

    return {
      // insuranceCompaniesOfPatient,
      // insuranceCompaniesOptions,
      // isEditMode,
    };
  },
});
</script>
