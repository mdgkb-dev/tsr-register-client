<template>
  <RemoteSearch key-value="patient" placeholder="Начните вводить ФИО" @select="addPatient" />
  <el-table v-if="mount" :data="representative.representativeToPatient" style="width: 600px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />
    <el-table-column type="index" width="50" align="center" />
    <el-table-column label="ФИО" align="start">
      <template #default="scope">
        <div>
          {{ scope.row.patient.human.getFullName() }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Роль подопечного" width="250" align="center">
      <template #default="scope">
        <el-form-item label-width="0" style="margin: 0" :rules="rules.representativeTypeId" :prop="`representativeToPatient.${scope.$index}.representativeTypeId`">
          <el-select v-model="scope.row.representativeTypeId" placeholder="Роль подопечного" :disabled="!scope.row.patientId">
            <el-option v-for="item in representativeTypes" :key="item.id" :label="item.childMaleType" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup
          :show-remove-button="true"
          @remove="$classHelper.RemoveFromClassByIndex(scope.$index, representative.representativeToPatient, representative.representativeToPatientForDelete)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Patient from '@/classes/Patient';
import Representative from '@/classes/Representative';
import RepresentativeToPatientRules from '@/classes/RepresentativeToPatientRules';
import RepresentativeType from '@/classes/RepresentativeType';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';

export default defineComponent({
  name: 'RepresentativeToPatientForm',
  components: {
    TableButtonGroup,
    RemoteSearch,
  },
  props: {
    representative: {
      type: Object as PropType<Representative>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const mount = ref(false);
    const rules = RepresentativeToPatientRules;
    const patientsOptions = ref([{}]);
    const patient: Ref<Patient> = computed(() => store.getters['patients/item']);
    const representativeTypes: Ref<RepresentativeType[]> = computed(() => store.getters['representativeTypes/items']);

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      mount.value = true;
    });

    const addPatient = async (event: ISearchObject) => {
      if (props.representative.patientExists(event.value)) {
        ElMessage({
          type: 'warning',
          message: 'Выбранный пациент уже добавлен',
        });
        return;
      }
      await store.dispatch('patients/get', event.value);
      props.representative.addPatient(patient.value);
    };

    // const getRepresentativeTypeLabel = (item: IRepresentativeType, index: number): string => {
    //   const patient = patients.value.find((i: Patient) => {
    //     return i.id === representativeToPatient.value[index].patientId;
    //   });
    //   if (patient?.human.isMale) {
    //     return item.childMaleType;
    //   } else {
    //     return item.childWomanType;
    //   }
    // };

    return {
      rules,
      patientsOptions,
      representativeTypes,
      addPatient,
      mount,
      // getRepresentativeTypeLabel,
    };
  },
});
</script>
<style lang="scss">
:deep(.el-form-item__content) {
  margin: 0 !important;
}
</style>
