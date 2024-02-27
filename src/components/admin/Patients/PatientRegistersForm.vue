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
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Patient from '@/classes/Patient';
import Register from '@/classes/Register';

export default defineComponent({
  name: 'PatientRegistersForm',
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const registers: Ref<Register[]> = computed(() => store.getters['registers/items']);
    const tableRegisters = ref();
    onBeforeMount(async () => {
      await store.dispatch('registers/getAll');
      tableRegisters.value.data.forEach((register: Register) => {
        if (register.patientInRegister(props.patient.patientsRegisters)) tableRegisters.value.toggleRowSelection(register);
      });
    });

    const selectable = (row: Register) => row.patientIncludableByDiagnosis(props.patient.patientDiagnosis);

    const add = (): void => {
      store.commit('representatives/addPatient');
    };

    const handleSelectionChange = (_: Register[], register: Register): void => {
      if (props.patient.inRegister(register.id)) {
        // ClassHelper.RemoveFromClassById(register.id, props.patient.patientsRegisters, props.patient.representativeToPatientForDelete);
      } else {
        // props.patient.addRegisterToPatient(register);
      }
    };

    return {
      tableRegisters,
      handleSelectionChange,
      registers,
      selectable,
      add,
    };
  },
});
</script>

<style lang="scss" scoped>
.disabled-checkbox {
}
</style>
