<template>
  <div class="form-under-collapse">
    <el-table
      ref="tableRegisters"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="registers"
      class="table-shadow"
      header-row-class-name="header-style"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column :selectable="selectable" type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="Название регистра" min-width="150" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

export default defineComponent({
  name: 'PatientRegistersForm',
  setup() {
    const store = useStore();

    const patientDiagnosis: Ref<IPatientDiagnosis[]> = computed(() => store.getters['patients/patientDiagnosis']);
    const registerToPatient: Ref<IRegisterToPatient[]> = computed(() => store.getters['patients/registerToPatient']);
    const registers: Ref<IRegisterToPatient[]> = computed(() => store.getters['registers/registers']);
    const tableRegisters = ref();
    onBeforeMount(async () => {
      await store.dispatch('registers/getAll');
      tableRegisters.value.data.forEach((register: IRegister) => {
        const reg = registerToPatient.value.find((registerToPatient: IRegisterToPatient) => registerToPatient.registerId === register.id);
        if (reg) {
          tableRegisters.value.toggleRowSelection(register);
        }
      });
    });

    const selectable = (row: IRegister) => {
      if (row.registerDiagnosis.length === 0) {
        return true;
      }
      const diagnosis = patientDiagnosis.value.find((d: IPatientDiagnosis) => {
        if (row.registerDiagnosis.length > 0) {
          const comparedDiagnosis = row.registerDiagnosis.find((i) => i.mkbDiagnosisId === d.mkbDiagnosisId);
          if (comparedDiagnosis) {
            return true;
          }
        }
        return false;
      });
      return !!diagnosis;
    };

    const add = (): void => {
      store.commit('representatives/addPatient');
    };

    const remove = (item: IRepresentativeToPatient): void => {
      store.commit('representatives/removePatient', item);
    };

    const handleSelectionChange = (registers: IRegister[]): void => {
      const newObj = registers.map((register: IRegister) => {
        const r = registerToPatient.value.find((registerToPatient: IRegisterToPatient) => registerToPatient.registerId === register.id);
        if (!r) {
          const registerToPatient = new RegisterToPatient();
          registerToPatient.registerId = register.id;
          return registerToPatient;
        }
        r.patient = undefined;
        r.register = undefined;
        return r;
      });
      console.log(newObj);
      store.commit('patients/setRegisterts', newObj);
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
