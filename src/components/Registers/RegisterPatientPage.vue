<template>
  <div class="patient-page-container" v-if="mount">
    <PageHead :title="patient.human.getFullName()" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <el-collapse>
        <el-form :status-icon="true" ref="form" :model="patient">
          <div>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
              <HumanForm :human="patient.human" />
            </el-collapse-item>
            <div v-for="registerGroupToRegister in register.registerGroupToRegister" :key="registerGroupToRegister">
              <el-collapse-item>
                <template #title>
                  <h2 class="collapseHeader">{{ registerGroupToRegister.registerGroup.name }}</h2>
                </template>
                <div class="form-under-collapse">
                  <el-form-item v-for="(prop, j) in registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup" :key="j" style="margin-bottom: 10px">
                    <el-form-item v-if="prop.registerProperty.valueType.isString()" :label="prop.registerProperty.name">
                      <el-input
                        :label="prop.registerProperty.name"
                        :model-value="patient.getRegisterPropertyValue(registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[j].registerProperty)"
                        @input="patient.setRegisterPropertyValue($event, prop.registerProperty)"
                      />
                    </el-form-item>
                    <el-form-item v-if="prop.registerProperty.valueType.isText()" :label="prop.registerProperty.name">
                      <el-input
                        type="textarea"
                        :rows="3"
                        :label="prop.registerProperty.name"
                        :model-value="patient.getRegisterPropertyValue(registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[j].registerProperty)"
                        @input="patient.setRegisterPropertyValue($event, prop.registerProperty)"
                      />
                    </el-form-item>
                    <el-form-item v-if="prop.registerProperty.valueType.isNumber()" :label="prop.registerProperty.name">
                      <el-input-number
                        :model-value="patient.getRegisterPropertyValue(prop.registerProperty)"
                        @change="patient.setRegisterPropertyValue($event, prop.registerProperty)"
                      />
                    </el-form-item>
                    <el-form-item v-if="prop.registerProperty.valueType.isDate()" :label="prop.registerProperty.name">
                      <DataComponentComputed :property="prop.registerProperty" :patient="patient" />
                    </el-form-item>
                    <el-form-item v-if="prop.registerProperty.valueType.isSet()" :label="prop.registerProperty.name">
                      <el-checkbox
                        v-for="registerPropertySet in prop.registerProperty.registerPropertySet"
                        :label="registerPropertySet.name"
                        :key="registerPropertySet.id"
                        :model-value="patient.getRegisterPropertyValueSet(registerPropertySet.id)"
                        @change="patient.setRegisterPropertyValueSet($event, registerPropertySet.id)"
                      >
                        {{ registerPropertySet.name }}</el-checkbox
                      >
                    </el-form-item>
                    <el-form-item v-if="prop.registerProperty.valueType.isRadio()" :label="prop.registerProperty.name">
                      <el-radio
                        v-for="registerPropertyRadio in prop.registerProperty.registerPropertyRadio"
                        :model-value="patient.getRegisterPropertyValue(prop.registerProperty)"
                        @change="patient.setRegisterPropertyValue(registerPropertyRadio.id, prop.registerProperty)"
                        :label="registerPropertyRadio.id"
                        :key="registerPropertyRadio.id"
                        >{{ registerPropertyRadio.name }}</el-radio
                      >
                    </el-form-item>
                  </el-form-item>
                </div>
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
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mapActions, mapGetters } from 'vuex';

import Patient from '@/classes/patients/Patient';
import Register from '@/classes/registers/Register';
import HumanForm from '@/components/HumanForm.vue';
import PageHead from '@/components/PageHead.vue';
import DataComponentComputed from '@/components/Registers/DataComponentComputed.vue';
import IRegister from '@/interfaces/registers/IRegister';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';

@Options({
  name: 'RegisterPatientPage',
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
export default class RegisterPatientPage extends mixins(FormMixin, BreadCrumbsLinks, ConfirmLeavePage) {
  // Types.
  registerGet!: (registerId: string) => Promise<void>;
  patientGet!: (patientId: string) => Promise<void>;

  // Local state.
  mount = false;
  register: IRegister = new Register();
  patient = new Patient();
  isEditMode = true;

  // Lifecycle methods.
  async mounted(): Promise<void> {
    await this.registerGet(`${this.$route.params.registerId}`);
    this.register = this.$store.getters['registers/register'];
    await this.patientGet(`${this.$route.params.patientId}`);
    this.patient = this.$store.getters['patients/patient'];
    this.pushToLinks(['/register-link-list/', `/registers/patients/${this.$route.params.registerId}`], ['Регистры пациентов', this.register.name]);
    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('patient', this.formUpdated, { deep: true });
    this.$watch('register', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  async submitForm(next?: NavigationGuardNext) {
    this.saveButtonClick = true;
    this.patient.registerToPatient = undefined;
    await this.submitHandling('patients', this.patient, next, `registers/patients/${this.$route.params.registerId}`);
  }
}
</script>

<style lang="scss" scoped>
.patient-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>
