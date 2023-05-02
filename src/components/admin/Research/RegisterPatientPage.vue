<template>
  <div v-if="mount" class="patient-page-container">
    <el-row>
      <el-collapse v-model="activeCollapseName" class="collapse" accordion @change="collapseChangeHandler">
        <el-form ref="form" label-position="top" :status-icon="true" :model="patient">
          <el-collapse-item name="info">
            <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
            <el-divider></el-divider>
            <HumanForm :readonly="true" store-name="patients" />
          </el-collapse-item>
          <el-collapse-item
            v-for="(registerGroup, i) in register.registerGroups"
            :id="`collapse-${i}`"
            :key="registerGroup"
            :name="String(i)"
          >
            <template #title>
              <h2 class="collapseHeader">{{ registerGroup.name }}</h2>
            </template>
            <el-divider> </el-divider>
            <el-tabs
              v-if="registerGroup.withDates"
              v-model="selectedTab"
              type="card"
              editable
              addable
              @tab-remove="removeTab"
              @tab-add="addTab(registerGroup.id)"
            >
              <el-tab-pane
                v-for="registerGroupToPatient in patient.getRegisterGroupsToPatientByGroupId(registerGroup.id)"
                :key="registerGroupToPatient.id"
                :label="registerGroupToPatient.id + '1'"
                :name="registerGroupToPatient.id"
              >
                <template #label>
                  <span v-if="registerGroupToPatient.editMode">
                    <el-button
                      class="table-button"
                      data-test="tableButtonGroupEditButton"
                      :icon="Document"
                      @click="registerGroupToPatient.editMode = false"
                    />
                    <el-date-picker v-model="registerGroupToPatient.date"></el-date-picker>
                  </span>
                  <span v-else>
                    <span>
                      <el-button
                        class="table-button"
                        :icon="Edit"
                        data-test="tableButtonGroupEditButton"
                        @click="registerGroupToPatient.editMode = true"
                      />
                      {{ $dateTimeFormatter.format(registerGroupToPatient.date) }}
                    </span>
                  </span>
                </template>
                <div v-for="(prop, j) in registerGroup.questions" :key="j" class="register-property-block">
                  <PropertyHeader :prop="prop" :index="j" />
                  <StringProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <TextProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <NumberProp
                    v-if="prop.questionVariants.length === 0"
                    :prop="prop"
                    :register-group-to-patient="registerGroupToPatient"
                    :register-group="registerGroup"
                  />
                  <DataComponentComputed :property="prop" :register-group-to-patient="registerGroupToPatient" />
                  <SetProp
                    v-model="prop.setFilterString"
                    :prop="prop"
                    :register-group-to-patient="registerGroupToPatient"
                    :register-group="registerGroup"
                  />
                  <RadioProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <FilesProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <div v-if="prop.questionVariants.length > 0">
                    <el-button @click="registerGroupToPatient.pushRegisterProperty(prop.id)">Добавить аллерген</el-button>
                    <div v-for="propToPatient in registerGroupToPatient.getRegisterPropertyToPatient(prop.id)" :key="propToPatient">
                      <el-select v-model="propToPatient.questionVariantId" filterable="true" placeholder="Выберите вариант">
                        <el-option v-for="variant in prop.questionVariants" :key="variant.id" :label="variant.name" :value="variant.id" />
                      </el-select>
                      <el-input-number v-model="propToPatient.valueNumber" :step="0.1" :precision="2" />
                      <el-button
                        :icon="Delete"
                        @click="
                          RemoveFromClassById(
                            propToPatient.id,
                            registerGroupToPatient.patientQuestions,
                            registerGroupToPatient.patientQuestionsForDelete
                          )
                        "
                      ></el-button>
                    </div>
                  </div>
                  <span v-if="prop.ageCompare && prop.valueType.isDate()">
                    Возраст пациента на момент взятия анализа:
                    {{ DateHelper.DateDiff(registerGroupToPatient.getRegisterPropertyValue(prop, false), patient.human.dateBirth) }}
                  </span>
                </div>
              </el-tab-pane>
            </el-tabs>
            <template v-else>
              <template
                v-for="registerGroupToPatient in patient.getRegisterGroupsToPatientByGroupId(registerGroup.id)"
                :key="registerGroupToPatient.id"
                :label="registerGroupToPatient.id + '1'"
                :name="registerGroupToPatient.id"
              >
                <div v-for="(prop, j) in registerGroup.questions" :key="j" class="register-property-block">
                  <PropertyHeader :prop="prop" :index="j" />
                  <StringProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <TextProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <NumberProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <DataComponentComputed :property="prop" :register-group-to-patient="registerGroupToPatient" />
                  <SetProp
                    v-model="prop.setFilterString"
                    :prop="prop"
                    :register-group-to-patient="registerGroupToPatient"
                    :register-group="registerGroup"
                  />
                  <RadioProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <FilesProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                </div>
              </template>
            </template>
          </el-collapse-item>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Delete, Document, Edit } from '@element-plus/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Patient from '@/classes/Patient';
import Register from '@/classes/Register';
import ResearchResult from '@/classes/ResearchResult';
import MainHeader from '@/classes/shared/MainHeader';
import DataComponentComputed from '@/components/admin/Research/DataComponentComputed.vue';
import FilesProp from '@/components/admin/Research/FilesProp.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import PropertyHeader from '@/components/admin/Research/PropertyHeader.vue';
import RadioProp from '@/components/admin/Research/RadioProp.vue';
import SetProp from '@/components/admin/Research/SetProp.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';
import TextProp from '@/components/admin/Research/TextProp.vue';
import HumanForm from '@/components/HumanForm.vue';

export default defineComponent({
  name: 'RegisterPatientPage',
  components: {
    FilesProp,
    HumanForm,
    DataComponentComputed,
    StringProp,
    TextProp,
    NumberProp,
    SetProp,
    RadioProp,
    PropertyHeader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const selectedTab = ref('');
    const register: Ref<Register> = computed(() => store.getters['registers/item']);
    const patient: Ref<Patient> = computed(() => store.getters['patients/patient']);
    const activeCollapseName: Ref<string> = ref('');

    const form = ref();
    const isEditMode: Ref<boolean> = ref(true);
    const mount: Ref<boolean> = ref(false);

    // const { links, pushToLinks } = useBreadCrumbsLinks();
    // const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    // const { submitHandling } = useForm(isEditMode.value);
    // const { validate } = useValidate();

    onBeforeMount(async () => {
      const query = store.getters['filter/filterQuery'];
      query.id = route.params.registerId;
      await store.dispatch('registers/get', query);
      await store.dispatch('patients/get', route.params.patientId);
      // pushToLinks(['/register-link-list/', `/registers/patients/${route.params.registerId}`], ['Регистры пациентов', register.value.name]);
      store.commit('main/setMainHeader', new MainHeader({ title: patient.value.human.getFullName(), links, save: submitForm }));

      mount.value = true;
      // window.addEventListener('beforeunload', beforeWindowUnload);
      // watch(register, formUpdated, { deep: true });
      // watch(patient, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      // saveButtonClick.value = true;
      // if (!validate(form.value)) {
      //   return;
      // }
      patient.value.patientsRepresentatives = [];
      // await submitHandling('patients', patient.value, next, `registers/patients/${route.params.registerId}`);
    };

    const scroll = (groupIndex: number) => {
      const obj = document.getElementById(`collapse-${groupIndex}`);
      if (!obj) return;
      // setTimeout(() => {
      //   obj.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      // }, 500);
    };

    const collapseChangeHandler = (groupIndex: number) => {
      const group = register.value.registerGroups[groupIndex];
      if (!group || !group.id) {
        return;
      }
      if (group.withDates) {
        const selectedGroup = patient.value.registerGroupsToPatient.filter((r: ResearchResult) => r.researchId === group.id);
        if (selectedGroup[0]) {
          selectTab(selectedGroup[0].id);
        }
      } else {
        patient.value.initRegisterGroupsToPatient(group.id);
      }
      scroll(groupIndex);
    };

    const selectTab = (tabId: string | undefined) => {
      if (tabId) {
        selectedTab.value = tabId;
      } else {
        selectedTab.value = '';
      }
    };

    const addTab = (registerGroupId: string) => {
      patient.value.addRegisterGroupToPatient(registerGroupId);
      const sel = patient.value.registerGroupsToPatient[patient.value.registerGroupsToPatient.length - 1].id;
      selectTab(sel);
    };

    const removeTab = (name: string) => {
      const group = patient.value.registerGroupsToPatient.find((r: ResearchResult) => r.id === name);
      if (group && group.researchSectionId) {
        const selectedGroup = patient.value.registerGroupsToPatient.filter((r: ResearchResult) => r.researchId === group.researchSectionId);
        if (selectedGroup[0]) {
          selectTab(selectedGroup[0].id);
        }
      }
      patient.value.removeRegisterGroupToPatient(name);
    };

    return {
      Delete,
      removeTab,
      addTab,
      selectedTab,
      collapseChangeHandler,
      form,
      patient,
      register,
      isEditMode,
      mount,
      submitForm,
      activeCollapseName,
      Edit,
      Document,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
.register-property-block {
  background-color: #eef1f6;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  h3 {
    margin-top: 0;
  }
}
.el-form-item {
  margin: 0;
}
.el-divider {
  margin: 10px 0;
}
</style>
