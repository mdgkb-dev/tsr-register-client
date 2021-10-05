<template>
  <div class="form-under-collapse">
    <el-table
      ref="tableRegisters"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="registers"
      class="table-shadow"
      header-row-class-name="header-style"
      border
      @select="handleSelectionChange"
    >
      <el-table-column class="disabled-checkbox" :selectable="selectable" type="selection" width="55" />
      <el-table-column prop="name" label="Название регистра" min-width="150" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

export default defineComponent({
  name: 'PatientRegistersForm',
  setup() {
    const store = useStore();

    const patientDiagnosis: Ref<IPatientDiagnosis[]> = computed(() => store.getters['patients/diagnosis']);
    const registerToPatient: Ref<IRegisterToPatient[]> = computed(() => store.getters['patients/registerToPatient']);
    const registers: Ref<IRegister[]> = computed(() => store.getters['registers/registers']);
    const tableRegisters = ref();
    onBeforeMount(async () => {
      await store.dispatch('registers/getAll');
      tableRegisters.value.data.forEach((register: IRegister) => {
        if (register.patientInRegister(registerToPatient.value)) tableRegisters.value.toggleRowSelection(register);
      });
    });

    const selectable = (row: IRegister) => row.patientIncludableByDiagnosis(patientDiagnosis.value);

    const add = (): void => {
      store.commit('representatives/addPatient');
    };

    const remove = (item: IRepresentativeToPatient): void => {
      store.commit('representatives/removePatient', item);
    };

    const handleSelectionChange = (_: IRegister[], register: IRegister): void => {
      if (register.patientInRegister(registerToPatient.value)) store.commit('patients/removeRegister', register.id);
      else store.commit('patients/addRegister', register.id);
    };

    return {
      tableRegisters,
      handleSelectionChange,
      patientDiagnosis,
      registers,
      registerToPatient,
      selectable,
      remove,
      add,
    };
  },
});
</script>

<style lang="scss" scoped>
.disabled-checkbox {
}
</style>
