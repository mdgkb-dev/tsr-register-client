<template>
  <RightTabsContainer :is-toggle="isToggle" slider-on-width="180px" @toggle="toggle">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <div class="slider-item-search">
          <RemoteSearch
            :must-be-translated="true"
            key-value="mkbItem"
            placeholder="Начните вводить название диагноза"
            @select="addMkbItem"
          />
        </div>
      </div>
    </template>
    <template #tabs>
      <div
        v-for="patientDiagnosis in patient.patientDiagnosis"
        :key="patientDiagnosis.id"
        :class="{ 'tabs-item-active': selectedPatientDiagnosis && selectedPatientDiagnosis.id === patientDiagnosis.id }"
        class="tabs-item"
        @click="selectPatientDiagnosis(patientDiagnosis.id)"
      >
        <div class="tab-item-text">
          {{ patientDiagnosis.mkbItem.getCode() }}
        </div>
      </div>
    </template>
    <template #body>
      <div class="body">
        <div v-if="selectedPatientDiagnosis">
          <ResearcheContainer background="#DFF2F8">
            <template #header>
              <div class="researche-name">{{ selectedPatientDiagnosis.mkbItem.getFullName() }}</div>
              <div class="diagnosis-doctorName">
                <div class="doctor-title">Диагноз поставил врач:</div>
                <el-input
                  v-model="selectedPatientDiagnosis.doctorName"
                  placeholder="ФИО врача, поставившего диагноз"
                  @blur="updatePatientDiagnosis(selectedPatientDiagnosis)"
                ></el-input>
              </div>
            </template>
            <template #body>
              <div v-for="research in researches" :key="research.id">
                <div v-for="question in research.questions" :key="question.id">
                  <div>{{ question.name }}</div>
                  <QuestionComponent
                    :question="question"
                    :research-result="patient.getResearchResult(research.id)"
                    @fill="saveResearchResult(patient.getResearchResult(research.id))"
                  />
                </div>
              </div>
              <AnamnesesList :mkb-item="selectedPatientDiagnosis.mkbItem" :patient="patient" />
            </template>
          </ResearcheContainer>
        </div>
      </div>
    </template>
  </RightTabsContainer>
  <svg width="0" height="0" class="hidden">
    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="back" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
      <path
        d="M7.33333 7.8C13.901 7.20467 18.1253 9.738 20 15.4C16.4217 11.4227 11.9681 10.6905 7.33333 12.8667V16.6667L1 10.3333L7.33333 4V7.8Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import AnamnesesList from '@/components/admin/Patients/Anamnesis/AnamnesesList.vue';
import QuestionComponent from '@/components/admin/Patients/QuestionComponent.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import ClassHelper from '@/services/ClassHelper';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import RightTabsContainer from '@/services/components/RightTabsContainer.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PaCollapseItemtientDiagnosis',
  components: {
    AnamnesesList,
    RemoteSearch,
    RightTabsContainer,
    ResearcheContainer,
    QuestionComponent,
  },

  setup() {
    const mounted = ref(false);
    const isToggle: Ref<boolean> = ref(false);
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    const researches: ComputedRef<Research[]> = computed(() => Provider.store.getters['researches/items']);
    const selectedPatientDiagnosis: Ref<PatientDiagnosis | undefined> = ref(
      patient.value.patientDiagnosis.length > 0 ? patient.value.patientDiagnosis[0] : undefined
    );
    const toggle = async (toggle: boolean) => {
      isToggle.value = toggle;
    };

    let expandRowKeys: Ref<(string | undefined)[]> = ref([]);
    const searchFormRef = ref();
    // const { formatDate } = useDateFormat();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => Provider.store.getters['patients/isEditMode']);
    const mkbItem: ComputedRef<MkbItem> = computed<MkbItem>(() => Provider.store.getters['mkbItems/item']);

    onBeforeMount(async () => {
      const fq = new FilterQuery();
      fq.setFilterModel(ResearchesFiltersLib.onlyMkb());
      await Provider.store.dispatch('researches/getAll', fq);

      for (const r of researches.value) {
        await createPatientResearch(r);
      }
    });

    const createPatientResearch = async (research: Research) => {
      if (!patient.value.getPatientResearch(research.id)) {
        const item = PatientResearch.Create(patient.value.id, research);
        patient.value.patientsResearches.push(item);
        await Provider.store.dispatch('patientsResearches/create', item);

        const researchResult = ResearchResult.Create(research, item.id);
        item.researchResults.push(researchResult);
        await Provider.store.dispatch('researchesResults/createWithoutReset', researchResult);
      }
    };

    const addMkbItem = async (event: ISearchObject): Promise<void> => {
      await Provider.store.dispatch('mkbItems/get', event.value);
      patient.value.addMkbItem(mkbItem.value);
      const diagnosisLinks = patient.value.getMkbItems();
      await Provider.store.dispatch('patientDiagnosis/create', diagnosisLinks[diagnosisLinks.length - 1]);
      selectPatientDiagnosis(diagnosisLinks[diagnosisLinks.length - 1].id as string);
    };

    const removePatientDiagnosis = async (id: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, patient.value.patientDiagnosis, []);
      await Provider.store.dispatch('patientDiagnosis/remove', id);
    };

    const updatePatientDiagnosis = async (patientDiagnosis: PatientDiagnosis) => {
      await Provider.store.dispatch('patientDiagnosis/update', patientDiagnosis);
    };

    const selectPatientDiagnosis = (patientDiagnosisId: string): void => {
      selectedPatientDiagnosis.value = patient.value.patientDiagnosis.find((p: PatientDiagnosis) => p.id === patientDiagnosisId);
    };

    const saveResearchResult = async (result: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/update', result);
    };

    return {
      saveResearchResult,
      researches,
      isToggle,
      selectPatientDiagnosis,
      selectedPatientDiagnosis,
      toggle,
      mounted,
      updatePatientDiagnosis,
      removePatientDiagnosis,
      searchFormRef,
      expandRowKeys,
      isEditMode,
      schema: Provider.schema,
      addMkbItem,
      patient,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

.slider-body {
  width: 180px;
  height: auto;
  border: 1px solid #379fff;
  border-top-left-radius: $normal-border-radius;
  border-bottom-left-radius: $normal-border-radius;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  display: grid;
  grid-gap: 6px;
  grid-template-rows: repeat(0 0px);
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
}

.slider-item-search {
  width: 164px;
  height: 40px;
  border-radius: $normal-border-radius;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item {
  width: 163px;
  height: 40px;
  border: 1px solid #b0a4c0;
  border-radius: $normal-border-radius;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item-active {
  width: 163px;
  height: 40px;
  border: 1px solid #379fff;
  border-radius: $normal-border-radius;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #b0a4c0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
}

.tabs-item-active {
  position: relative;
  width: 106px;
  height: 56px;
  border: 1px solid #379fff;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  font-weight: bold;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 0;
  z-index: 2;
}

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
}

.researche-title {
  width: calc(100% - 2px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.researche-name {
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  font-size: 14px;
  text-transform: uppercase;
}

.icon-back {
  width: 24px;
  height: 24px;
}

.patient-research {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 32px);
  height: 40px;
  border-radius: $normal-border-radius;
  border: $light-pink-border;
  background: #ffffff;
  padding: 0 10px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 20;
}

.research-info {
  position: fixed;
  top: 49%;
  left: 50%;
  width: calc(99% - 22px);
  height: calc(98% - 22px);
  transform: translate(-50%, -50%);
  background: #dff2f8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  margin: 10px 10px 0 0;
  padding: 10px 10px 10px 10px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 21;
}

.tools {
  display: flex;
  justify-content: left;
  align-items: center;
  height: auto;
  padding: 10px 0;
  width: calc(100% - 2px);
  background: #dff2f8;
}

.scroll-block {
  width: 100%;
  height: calc(100% - 220px);
  overflow: hidden;
  overflow-y: auto;
}

.question-item {
  background: #dff2f8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.question-name {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 22px;
  color: #343e5c;
  margin-bottom: 10px;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 10px 10px 10px;
  background: #dff2f8;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.patient-name {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  height: 40px;
  color: #343e5c;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.researche-title-name {
  font-size: 20px;
  display: block;
  color: #343e5c;
  padding: 10px 0;
}

.researche-counter {
  font-size: 20px;
  color: #379fff;
  display: flex;
  justify-content: right;
  align-items: flex-start;
  text-transform: uppercase;
  white-space: nowrap;
  height: 100%;
}

.diagnosis-doctorName {
  padding: 10px 0;
}

.doctor-title {
  padding: 10px 0;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

:deep(.el-timeline) {
  padding: 0 0 0 10px;
}

:deep(.el-timeline-item__node) {
  background: #b0a4c0;
}

@media screen and (max-width: 768px) {
  .tabs-item {
    width: 40px;
    height: 100px;
  }

  .tabs-item:hover {
    width: 44px;
  }

  .tabs-item-active {
    position: relative;
    width: 45px;
    height: 100px;
  }

  .tabs-item-active:hover {
    width: 45px;
  }

  .tab-item-text {
    transform: rotate(90deg);
  }
}
</style>
