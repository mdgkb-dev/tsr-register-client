<template>
  <div class="patient-page-container" v-if="mount">
    <PageHead :title="patient.human.getFullName()" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <el-collapse>
        <el-form label-position="top" :status-icon="true" ref="form" :model="patient">
          <div>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
              <HumanForm :readonly="true" :human="patient.human" />
            </el-collapse-item>
            <div v-for="registerGroupToRegister in register.registerGroupToRegister" :key="registerGroupToRegister">
              <el-collapse-item>
                <template #title>
                  <h2 class="collapseHeader">{{ registerGroupToRegister.registerGroup.name }}</h2>
                </template>
                <span v-for="(prop, j) in registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup" :key="j" style="margin-bottom: 10px">
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
                    <el-checkbox-group>
                      <el-checkbox
                        v-for="registerPropertySet in prop.registerProperty.registerPropertySet"
                        :label="registerPropertySet.name"
                        :key="registerPropertySet.id"
                        :model-value="patient.getRegisterPropertyValueSet(registerPropertySet.id)"
                        @change="patient.setRegisterPropertyValueSet($event, registerPropertySet.id)"
                      >
                        {{ registerPropertySet.name }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item v-if="prop.registerProperty.valueType.isRadio()" :label="prop.registerProperty.name">
                    <el-radio
                      v-for="registerPropertyRadio in prop.registerProperty.registerPropertyRadio"
                      :model-value="patient.getRegisterPropertyValue(prop.registerProperty)"
                      @change="patient.setRegisterPropertyValue(registerPropertyRadio.id, prop.registerProperty)"
                      :label="registerPropertyRadio.id"
                      :key="registerPropertyRadio.id"
                      >{{ registerPropertyRadio.name }}
                    </el-radio>
                    <el-input
                      style="margin-top: 10px"
                      v-if="prop.registerProperty.withOther"
                      placeholder="Другое, указать"
                      type="textarea"
                      :rows="3"
                      :model-value="patient.getOtherPropertyValue(registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[j].registerProperty)"
                      @input="patient.setRegisterPropertyValueOther($event, prop.registerProperty)"
                    />
                  </el-form-item>
                </span>
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
.el-collapse-item__header {
  background-color: rgb(242, 242, 242) !important;
  border-bottom: 1px solid rgb(200, 200, 200) !important;
}

.el-collapse-item__wrap {
  top: 50px;
  right: 20px;
  left: 0;
  z-index: 1;
  padding: 10px;
  background-color: rgb(242, 242, 242) !important;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
}

.el-collapse-item__content {
  user-select: none;
}
.patient-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}

.collapseHeader {
  padding-left: 10px;
}
.collapseStatus {
  margin-left: 5%;
  margin-top: 3px;
}
</style>
