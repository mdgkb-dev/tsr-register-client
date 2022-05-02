<template>
  <el-button style="margin-bottom: 20px" @click="add">Добавить подопечного</el-button>
  <el-table v-if="mount" :data="representativeToPatient" style="width: 600px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="Пациент" width="250" sortable align="center">
      <template #default="scope">
        <el-form-item
          label-width="0"
          style="margin: 0"
          :rules="rules.patientId"
          :prop="`representativeToPatient.${scope.$index}.patientId`"
        >
          <el-select v-model="representativeToPatient[scope.$index].patientId" filterable placeholder="Подопечный">
            <el-option v-for="item in patientsOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column label="Роль подопечного" width="250" align="center">
      <template #default="scope">
        <el-form-item
          label-width="0"
          style="margin: 0"
          :rules="rules.representativeTypeId"
          :prop="`representativeToPatient.${scope.$index}.representativeTypeId`"
        >
          <el-select
            v-model="representativeToPatient[scope.$index].representativeTypeId"
            placeholder="Роль подопечного"
            :disabled="representativeToPatient[scope.$index].patientId ? false : true"
          >
            <el-option
              v-for="item in representativeTypes"
              :key="item.id"
              :label="getRepresentativeTypeLabel(item, scope.$index)"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column width="40" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup
          :show-remove-button="true"
          :show-edit-button="true"
          @remove="remove(scope.row)"
          @edit="$router.push(`/patients/${representativeToPatient[scope.$index].patientId}`)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import RepresentativeToPatientRules from '@/classes/representatives/RepresentativeToPatientRules';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
export default defineComponent({
  name: 'RepresentativeToPatientForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();

    const mount = ref(false);
    const rules = RepresentativeToPatientRules;
    const patientsOptions = ref([{}]);
    const patients: Ref<IPatient[]> = computed(() => store.getters['patients/patients']);
    const representativeTypes: Ref<IRepresentativeType[]> = computed(() => store.getters['representativeTypes/representativeTypes']);
    const representativeToPatient: Ref<IRepresentativeToPatient[]> = computed(
      () => store.getters['representatives/representativeToPatient']
    );

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      await store.dispatch('patients/getAll');

      patientsOptions.value.splice(0, 1);
      for (const item of patients.value) {
        patientsOptions.value.push({
          label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
          value: item.id,
          human: item.human,
        });
      }
      mount.value = true;
    });

    const add = (): void => {
      store.commit('representatives/addPatient');
    };

    const remove = (item: IRepresentativeToPatient): void => {
      store.commit('representatives/removePatient', item);
    };

    const getRepresentativeTypeLabel = (item: IRepresentativeType, index: number): string => {
      const patient = patients.value.find((i: IPatient) => {
        return i.id === representativeToPatient.value[index].patientId;
      });
      if (patient?.human.isMale) {
        return item.childMaleType;
      } else {
        return item.childWomanType;
      }
    };

    return {
      rules,
      patientsOptions,
      representativeTypes,
      representativeToPatient,
      remove,
      add,
      mount,
      getRepresentativeTypeLabel,
    };
  },
});
</script>
<style lang="scss">
:deep(.el-form-item__content) {
  margin: 0 !important;
}
</style>
