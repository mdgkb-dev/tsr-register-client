<template>
  <div v-if="mount" class="patient-page-container">
    <el-row>
      <el-collapse>
        <el-form ref="form" label-position="top" :status-icon="true" :model="patient">
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
                <span
                  v-for="(prop, j) in registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup"
                  :key="j"
                  style="margin-bottom: 10px"
                >
                  <el-form-item v-if="prop.registerProperty.valueType.isString()" :label="prop.registerProperty.name">
                    <el-input
                      :label="prop.registerProperty.name"
                      :model-value="
                        patient.getRegisterPropertyValue(
                          registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[j].registerProperty
                        )
                      "
                      @input="patient.setRegisterPropertyValue($event, prop.registerProperty)"
                    />
                  </el-form-item>
                  <el-form-item v-if="prop.registerProperty.valueType.isText()" :label="prop.registerProperty.name">
                    <el-input
                      type="textarea"
                      :rows="3"
                      :label="prop.registerProperty.name"
                      :model-value="
                        patient.getRegisterPropertyValue(
                          registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[j].registerProperty
                        )
                      "
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
                        :key="registerPropertySet.id"
                        :label="registerPropertySet.name"
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
                      :key="registerPropertyRadio.id"
                      :model-value="patient.getRegisterPropertyValue(prop.registerProperty)"
                      :label="registerPropertyRadio.id"
                      @change="patient.setRegisterPropertyValue(registerPropertyRadio.id, prop.registerProperty)"
                      >{{ registerPropertyRadio.name }}
                    </el-radio>
                    <el-input
                      v-if="prop.registerProperty.withOther"
                      style="margin-top: 10px"
                      placeholder="Другое, указать"
                      type="textarea"
                      :rows="3"
                      :model-value="
                        patient.getOtherPropertyValue(
                          registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[j].registerProperty
                        )
                      "
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
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import HumanForm from '@/components/HumanForm.vue';
import DataComponentComputed from '@/components/Registers/DataComponentComputed.vue';
import IPatient from '@/interfaces/patients/IPatient';
import IRegister from '@/interfaces/registers/IRegister';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterPatientPage',
  components: {
    HumanForm,
    DataComponentComputed,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const register: Ref<IRegister> = computed(() => store.getters['registers/register']);
    const patient: Ref<IPatient> = computed(() => store.getters['patients/patient']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(true);
    const mount: Ref<boolean> = ref(false);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      await store.dispatch('registers/get', route.params.registerId);
      await store.dispatch('patients/get', route.params.patientId);

      pushToLinks(['/register-link-list/', `/registers/patients/${route.params.registerId}`], ['Регистры пациентов', register.value.name]);
      store.commit('main/setMainHeader', new MainHeader({ title: patient.value.human.getFullName(), links, save: submitForm }));

      mount.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(register, formUpdated, { deep: true });
      watch(patient, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('patients', patient.value, next, `registers/patients/${route.params.registerId}`);
    };

    return {
      form,
      patient,
      register,
      isEditMode,
      links,
      mount,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
