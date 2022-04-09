<template>
  <div v-if="mount" class="patient-page-container">
    <el-row>
      <el-collapse class="collapse">
        <el-form ref="form" label-position="top" :status-icon="true" :model="patient">
          <el-collapse-item>
            <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
            <HumanForm :readonly="true" store-name="patients" />
          </el-collapse-item>
          <el-collapse-item v-for="registerGroup in register.registerGroups" :key="registerGroup">
            <template #title>
              <h2 class="collapseHeader">{{ registerGroup.name }}</h2>
            </template>
            <span v-for="(prop, j) in registerGroup.registerProperties" :key="j" style="margin-bottom: 10px">
              <el-divider />
              <div>
                <h3>{{ prop.name }}</h3>
              </div>
              <ul>
                <li v-for="example in prop.registerPropertyExamples" :key="example.id">
                  {{ example.name }}
                </li>
              </ul>
              <template v-if="prop.withDates">
                <el-button @click="patient.addRegisterValueWithDate(prop)"> Добавить значение </el-button>
                <div v-for="propWithDate in patient.getRegisterValuesWithDate(prop.id)" :key="propWithDate">
                  <el-form-item>
                    <el-date-picker v-model="propWithDate.valueDate"> </el-date-picker>
                  </el-form-item>
                  <div style="display: flex; justify-content: space-between">
                    <el-form-item v-if="prop.valueType.isString()">
                      <el-input v-model="propWithDate.valueString" />
                    </el-form-item>
                    <el-form-item v-if="prop.valueType.isNumber()">
                      <el-input-number v-model="propWithDate.valueNumber" />
                    </el-form-item>
                    <el-form-item v-if="prop.valueType.isSet()">
                      <el-checkbox
                        v-for="registerPropertySet in prop.registerPropertySets"
                        :key="registerPropertySet.id"
                        :label="registerPropertySet.name"
                        :model-value="patient.getRegisterPropertyValueSet(registerPropertySet.id, propWithDate.id)"
                        @change="patient.setRegisterPropertyValueSet($event, registerPropertySet.id, propWithDate.id)"
                      >
                        {{ registerPropertySet.name }}</el-checkbox
                      >
                      <div v-for="registerPropertySet in prop.registerPropertySets" :key="registerPropertySet.id">
                        <template v-if="patient.getRegisterPropertyValueSet(registerPropertySet.id)">
                          <el-form-item
                            v-for="registerPropertyOther in registerPropertySet.registerPropertyOthers"
                            :key="registerPropertyOther.id"
                            :label="registerPropertyOther.name"
                          >
                            <el-input
                              :model-value="patient.getRegisterPropertyOthers(registerPropertyOther.id, propWithDate.id)"
                              @input="patient.setRegisterPropertyOthers($event, registerPropertyOther.id, propWithDate.id)"
                            />
                          </el-form-item>
                        </template>
                      </div>
                    </el-form-item>

                    <el-form-item v-if="prop.valueType.isRadio()">
                      <el-radio
                        v-for="registerPropertyRadio in prop.registerPropertyRadios"
                        :key="registerPropertyRadio.id"
                        v-model="propWithDate.registerPropertyRadioId"
                        :label="registerPropertyRadio.id"
                      >
                        {{ registerPropertyRadio.name }}
                      </el-radio>
                      <div v-if="prop.getOthers(patient.getRegisterPropertyValue(prop))">
                        <el-form-item
                          v-for="registerPropertyOther in prop.getOthers(patient.getRegisterPropertyValue(prop))"
                          :key="registerPropertyOther.id"
                          :label="registerPropertyOther.name"
                        >
                          <el-input
                            :model-value="patient.getRegisterPropertyOthers(registerPropertyOther.id)"
                            @input="patient.setRegisterPropertyOthers($event, registerPropertyOther.id)"
                          />
                        </el-form-item>
                      </div>
                    </el-form-item>

                    <el-button @click="patient.removeRegisterValueWithDate(propWithDate.id)"> Удалить значение </el-button>
                  </div>
                </div>
              </template>
              <template v-else>
                <el-form-item v-if="prop.valueType.isString()">
                  <el-input
                    :model-value="patient.getRegisterPropertyValue(registerGroup.registerProperties[j])"
                    @input="patient.setRegisterPropertyValue($event, prop)"
                  />
                </el-form-item>
                <el-form-item v-if="prop.valueType.isText()">
                  <el-input
                    type="textarea"
                    :rows="3"
                    :model-value="patient.getRegisterPropertyValue(registerGroup.registerProperties[j])"
                    @input="patient.setRegisterPropertyValue($event, prop)"
                  />
                </el-form-item>
                <el-form-item v-if="prop.valueType.isNumber()">
                  <el-input-number
                    :model-value="patient.getRegisterPropertyValue(prop)"
                    @change="patient.setRegisterPropertyValue($event, prop)"
                  />
                </el-form-item>
                <el-form-item v-if="prop.valueType.isDate()">
                  <DataComponentComputed :property="prop" :patient="patient" />
                </el-form-item>
                <el-form-item v-if="prop.valueType.isSet()">
                  <el-checkbox
                    v-for="registerPropertySet in prop.registerPropertySets"
                    :key="registerPropertySet.id"
                    :label="registerPropertySet.name"
                    :model-value="patient.getRegisterPropertyValueSet(registerPropertySet.id)"
                    @change="patient.setRegisterPropertyValueSet($event, registerPropertySet.id)"
                  >
                    <div>
                      {{ registerPropertySet.name }}
                    </div>
                  </el-checkbox>
                  <div v-for="registerPropertySet in prop.registerPropertySets" :key="registerPropertySet.id">
                    <template v-if="patient.getRegisterPropertyValueSet(registerPropertySet.id)">
                      <el-form-item
                        v-for="registerPropertyOther in registerPropertySet.registerPropertyOthers"
                        :key="registerPropertyOther.id"
                        :label="registerPropertyOther.name"
                      >
                        <el-input
                          :model-value="patient.getRegisterPropertyOthers(registerPropertyOther.id)"
                          @input="patient.setRegisterPropertyOthers($event, registerPropertyOther.id)"
                        />
                      </el-form-item>
                    </template>
                  </div>
                </el-form-item>
                <el-form-item v-if="prop.valueType.isRadio()">
                  <el-radio
                    v-for="registerPropertyRadio in prop.registerPropertyRadios"
                    :key="registerPropertyRadio.id"
                    :label="registerPropertyRadio.id"
                    :model-value="patient.getRegisterPropertyValue(prop)"
                    @change="patient.setRegisterPropertyValue(registerPropertyRadio.id, prop)"
                  >
                    {{ registerPropertyRadio.name }}
                  </el-radio>
                  <div v-if="prop.getOthers(patient.getRegisterPropertyValue(prop))">
                    <el-form-item
                      v-for="registerPropertyOther in prop.getOthers(patient.getRegisterPropertyValue(prop))"
                      :key="registerPropertyOther.id"
                      :label="registerPropertyOther.name"
                    >
                      <el-input
                        :model-value="patient.getRegisterPropertyOthers(registerPropertyOther.id)"
                        @input="patient.setRegisterPropertyOthers($event, registerPropertyOther.id)"
                      />
                    </el-form-item>
                  </div>
                  <el-input
                    v-if="prop.withOther"
                    style="margin-top: 10px"
                    placeholder="Другое, указать"
                    type="textarea"
                    :rows="3"
                    :model-value="patient.getOtherPropertyValue(registerGroup.registerProperties[j])"
                    @input="patient.setRegisterPropertyValueOther($event, prop)"
                  />
                </el-form-item>
              </template>
            </span>
          </el-collapse-item>
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

    const register: Ref<IRegister> = computed(() => store.getters['registers/item']);
    const patient: Ref<IPatient> = computed(() => store.getters['patients/patient']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(true);
    const mount: Ref<boolean> = ref(false);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      const query = store.getters['filter/filterQuery'];
      query.id = route.params.registerId;
      await store.dispatch('registers/get', query);
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
      if (!validate(form.value)) {
        return;
      }
      patient.value.representativeToPatient = [];
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
