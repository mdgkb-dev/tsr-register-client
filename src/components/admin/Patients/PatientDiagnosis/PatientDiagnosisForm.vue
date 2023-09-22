<template>
  <ResearcheContainer v-if="mounted && !patientDiagnosis.id">
    <template #body> <div class="diag-title">Диагнозов нет</div></template>
  </ResearcheContainer>
  <ResearcheContainer v-if="mounted && patientDiagnosis.id" background="#DFF2F8">
    <template #header>
      <div class="researche-name">{{ patientDiagnosis?.mkbItem?.getFullName() }}</div>
    </template>
    <template #body>
      <div class="diagnosis-doctorName">
        <div class="doctor-title">Диагноз поставил врач:</div>
        <el-input
          v-model="patientDiagnosis.doctorName"
          placeholder="ФИО врача, поставившего диагноз"
          @blur="updatePatientDiagnosis()"
        ></el-input>
      </div>
      <div v-for="research in researches" :key="research.id">
        <div v-for="question in research.questions" :key="question.id">
          <div class="margin-class">{{ question.name }}</div>
          <QuestionComponent
            :question="question"
            :research-result="patient.getResearchResult(research.id)"
            @fill="saveResearchResult(patient.getResearchResult(research.id))"
          />
        </div>
      </div>
      <div class="margin-class">
        <AnamnesesList :mkb-item="patientDiagnosis.mkbItem" :patient="patient" />
      </div>
    </template>
  </ResearcheContainer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';

import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import AnamnesesList from '@/components/admin/Patients/Anamnesis/AnamnesesList.vue';
import QuestionComponent from '@/components/admin/Patients/QuestionComponent.vue';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientDiagnosisForm',
  components: {
    AnamnesesList,
    ResearcheContainer,
    QuestionComponent,
  },

  setup() {
    const mounted = ref(false);
    const researches: ComputedRef<Research[]> = computed(() => Provider.store.getters['researches/items']);
    const patientDiagnosis: ComputedRef<PatientDiagnosis> = computed(() => Provider.store.getters['patientDiagnosis/item']);
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);

    const updatePatientDiagnosis = async () => {
      await Provider.store.dispatch('patientDiagnosis/updateWithoutReset', patientDiagnosis.value);
    };

    onBeforeMount(async () => {
      const fq = new FilterQuery();
      fq.setFilterModel(ResearchesFiltersLib.onlyMkb());
      await Provider.store.dispatch('researches/getAll', { filterQuery: fq });

      for (const r of researches.value) {
        await createPatientResearch(r);
      }
      mounted.value = true;
    });

    const createPatientResearch = async (research: Research) => {
      if (patient.value.getPatientResearch(research.id)) {
        return;
      }
      const item = PatientResearch.Create(patient.value.id, research);
      patient.value.patientsResearches.push(item);
      await Provider.store.dispatch('patientsResearches/create', item);

      const researchResult = ResearchResult.Create(research, item.id);
      item.researchResults.push(researchResult);
      await Provider.store.dispatch('researchesResults/createWithoutReset', researchResult);
    };

    const saveResearchResult = async (result: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/updateWithoutReset', result);
    };

    return {
      mounted,
      researches,
      patient,
      saveResearchResult,
      updatePatientDiagnosis,
      patientDiagnosis,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.diag-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  width: 50%;
  min-width: 220px;
  height: 100px;
  background: #f5f5f5;
  color: #b0a4c0;
  text-transform: uppercase;
  border: $normal-darker-border;
  border-radius: $normal-border-radius;
}

.margin-class {
  margin-top: 10px;
}

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
