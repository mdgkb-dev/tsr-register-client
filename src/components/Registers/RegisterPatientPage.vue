<template>
  <div class="patient-page-container">
    <PageHead v-if="mount" :title="patient.human.getFullName()" :links="links" titles="" @submitForm="submitForm" />
    <el-row>
      <el-collapse>
        <el-form ref="form" :model="patient" label-width="20%" label-position="left">
          <div v-if="mount">
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
              <HumanForm :human="patient.human" />
            </el-collapse-item>
            <div v-for="registerGroupToRegister in register.registerGroupToRegister" :key="registerGroupToRegister">
              <el-collapse-item>
                <template #title>
                  <h2 class="collapseHeader">{{ registerGroupToRegister.registerGroup.name }}</h2>
                </template>
                <el-form-item v-for="(prop, j) in registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup" :key="j" style="margin-bottom: 10px">
                  <el-form-item v-if="prop.registerProperty.valueType.name === 'string'" :label="prop.registerProperty.name">
                    <el-input
                      :label="prop.registerProperty.name"
                      :model-value="
                        patient.getRegisterPropertyValue(registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[j].registerProperty.id, 'string')
                      "
                      @input="patient.setRegisterPropertyValue($event, prop.registerProperty.id, 'string')"
                    />
                  </el-form-item>
                  <el-form-item v-if="prop.registerProperty.valueType.name === 'number'" :label="prop.registerProperty.name">
                    <el-input-number
                      :model-value="patient.getRegisterPropertyValue(prop.registerProperty.id, 'number')"
                      @change="patient.setRegisterPropertyValue($event, prop.registerProperty.id, 'number')"
                    />
                  </el-form-item>
                  <el-form-item v-if="prop.registerProperty.valueType.name === 'date'" :label="prop.registerProperty.name">
                    <DataComponentComputed :propertyId="prop.registerProperty.id" :patient="patient" />
                  </el-form-item>
                  <el-form-item v-if="prop.registerProperty.valueType.name === 'set'" :label="prop.registerProperty.name">
                    <el-checkbox
                      v-for="registerPropertySet in prop.registerProperty.registerPropertySet"
                      :label="registerPropertySet.name"
                      :key="registerPropertySet.id"
                      :model-value="patient.getRegisterPropertyValue(registerPropertySet.id, 'set')"
                      @change="patient.setRegisterPropertyValueSet($event, registerPropertySet.id)"
                    >
                      {{ registerPropertySet.name }}</el-checkbox
                    >
                  </el-form-item>
                  <el-form-item v-if="prop.registerProperty.valueType.name === 'radio'" :label="prop.registerProperty.name">
                    <el-radio
                      v-for="registerPropertyRadio in prop.registerProperty.registerPropertyRadio"
                      :model-value="patient.getRegisterPropertyValue(prop.registerProperty.id, 'radio')"
                      @change="patient.setRegisterPropertyValue(registerPropertyRadio.id, prop.registerProperty.id, 'radio')"
                      :label="registerPropertyRadio.id"
                      :key="registerPropertyRadio.id"
                      >{{ registerPropertyRadio.name }}</el-radio
                    >
                  </el-form-item>
                </el-form-item>
              </el-collapse-item>
            </div>
          </div>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import Patient from '@/classes/patients/Patient';
import Register from '@/classes/registers/Register';
import HumanForm from '@/components/HumanForm.vue';
import PageHead from '@/components/PageHead.vue';
import DataComponentComputed from '@/components/Registers/DataComponentComputed.vue';
import IRegister from '@/interfaces/registers/IRegister';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import FormMixin from '@/mixins/FormMixin.vue';

@Options({
  components: {
    PageHead,
    HumanForm,
    DataComponentComputed,
  },
  computed: {
    ...mapGetters('registers', ['register']),
    ...mapGetters('patients', ['patient']),
  },
  methods: {
    ...mapActions({
      patientGet: 'patients/get',
      registerGet: 'registers/get',
    }),
  },
})
export default class RegisterPatientPage extends mixins(FormMixin, BreadCrumbsLinks) {
  mount = false;
  register: IRegister = new Register();
  patient = new Patient();
  isEditMode = true;

  registerGet!: (registerId: string) => Promise<void>;
  patientGet!: (patientId: string) => Promise<void>;

  async mounted(): Promise<void> {
    await this.registerGet(`${this.$route.params.registerId}`);
    this.register = this.$store.getters['registers/register'];
    await this.patientGet(`${this.$route.params.patientId}`);
    this.patient = this.$store.getters['patients/patient'];
    this.pushToLinks(['/register-link-list/', `/registers/patients/${this.$route.params.registerId}`], ['Регистры пациентов', this.register.name]);
    this.mount = true;
  }

  async submitForm() {
    this.patient.registerToPatient = undefined;
    await this.$store.dispatch('patients/edit', this.patient);
    await this.$router.push(`/registers/patients/${this.$route.params.registerId}`);
  }
}
</script>

<style lang="scss" scoped>
.patient-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>
