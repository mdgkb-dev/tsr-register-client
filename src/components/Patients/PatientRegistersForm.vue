<template>
  <div class="form-under-collapse">
    <el-table
      ref="tableRegisters"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="registers"
      class="table-shadow"
      header-row-class-name="header-style"
      border
    >
      <el-table-column :selectable="selectable" type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="Название регистра" min-width="150" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

@Options({
  props: ['registerToPatient', 'patientDiagnosis'],
  computed: {
    ...mapState('registers', ['registers']),
  },
  methods: {
    ...mapActions({
      getAll: 'registers/getAll',
    }),
  },
})
export default class PatientRegistersForm extends Vue {
  $refs!: {
    tableRegisters: any;
  };
  patientDiagnosis!: IPatientDiagnosis[];
  registers!: IRegister[];
  registerToPatient!: IRegisterToPatient[];
  getAll!: () => Promise<void>;
  mount = false;

  selectable(row: IRegister) {
    if (row.registerDiagnosis.length === 0) {
      return true;
    }
    const diagnosis = this.patientDiagnosis.find((d: IPatientDiagnosis) => {
      if (row.registerDiagnosis.length > 0) {
        const comparedDiagnosis = row.registerDiagnosis.find((i) => i.mkbDiagnosisId === d.mkbDiagnosisId);
        if (comparedDiagnosis) {
          return true;
        }
      }
      return false;
    });
    return !!diagnosis;
  }

  async created(): Promise<void> {
    await this.getAll();
    this.mount = true;
    this.$refs.tableRegisters.data.forEach((register: IRegister) => {
      const reg = this.registerToPatient.find((registerToPatient: IRegisterToPatient) => registerToPatient.registerId === register.id);
      if (reg) {
        this.$refs.tableRegisters.toggleRowSelection(register);
      }
    });
  }

  handleSelectionChange(registers: IRegister[]) {
    const newObj = registers.map((register: IRegister) => {
      const r = this.registerToPatient.find((registerToPatient: IRegisterToPatient) => registerToPatient.registerId === register.id);
      if (!r) {
        const registerToPatient = new RegisterToPatient();
        registerToPatient.registerId = register.id;
        return registerToPatient;
      }
      r.patient = undefined;
      r.register = undefined;
      return r;
    });
    this.$emit('update:registerToPatient', newObj);
  }
}
</script>
