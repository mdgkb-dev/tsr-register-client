<template>
  <el-button style="margin-bottom: 20px" @click="add">Добавить подопечного</el-button>
  <el-table :data="representativeToPatient" style="width: 950px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="Пациент" width="250" sortable align="center">
      <template #default="scope">
        <el-form-item
          label-width="0"
          style="margin: 0"
          :rules="{ required: true, message: 'Необходимо указать подопечного', trigger: 'blur' }"
          :prop="`representativeToPatient.${scope.$index}.patientId`"
        >
          <el-select placeholder="Подопечный" v-model="representativeToPatient[scope.$index].patientId">
            <el-option v-for="item in patientsOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column label="Роль представителя" align="center">
      <template #default="scope">
        <el-form-item
          label-width="0"
          style="margin: 0"
          :rules="{ required: true, message: 'Необходимо указать тип представителя', trigger: 'blur' }"
          :prop="`representativeToPatient.${scope.$index}.representativeTypeId`"
        >
          <el-select placeholder="Тип представителя" v-model="representativeToPatient[scope.$index].representativeTypeId">
            <el-option v-for="item in representativeTypesOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column width="40" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IOption from '@/interfaces/patients/IOption';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import RepresentativeToPatientRules from '@/classes/representatives/RepresentativeToPatientRules';
export default defineComponent({
  name: 'RepresentativeToPatientForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();

    const rules = RepresentativeToPatientRules;
    const patientsOptions = ref([{}]);
    const patients: Ref<IPatient[]> = computed(() => store.getters['patients/patients']);
    const representativeTypes: Ref<IRepresentativeType[]> = computed(() => store.getters['representativeTypes/representativeTypes']);
    const representativeToPatient: Ref<IRepresentativeToPatient[]> = computed(
      () => store.getters['representatives/representativeToPatient']
    );
    const representativeTypesOptions: Ref<IOption[]> = ref([]);

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      await store.dispatch('patients/getAll');

      for (const item of representativeTypes.value) {
        if (item.id) {
          representativeTypesOptions.value.push({
            label: item.name,
            value: item.id,
          });
        }
      }

      patientsOptions.value.splice(0, 1);
      for (const item of patients.value) {
        patientsOptions.value.push({
          label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
          value: item.id,
          human: item.human,
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
      rules,
      patientsOptions,
      representativeTypesOptions,
      representativeToPatient,
      remove,
      add,
    };
  },
});
</script>
<style lang="scss">
:deep(.el-form-item__content) {
  margin: 0 !important;
}
</style>
