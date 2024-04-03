<template>
  <ResearcheContainer v-if="mounted && !patientDiagnosis.id">
    <template #body>
      <div class="diag-title">Диагнозов нет</div>
    </template>
  </ResearcheContainer>
  <ResearcheContainer v-if="mounted && patientDiagnosis.id" background="#DFF2F8">
    <template #header>
      <div class="researche-name">
        {{ patientDiagnosis?.mkbItem?.getFullName() }}
      </div>
    </template>
    <template #body>
      <div class="diagnosis-doctorName">
        <div class="doctor-title">Диагноз поставил врач:</div>
        <el-input v-model="patientDiagnosis.doctorName" placeholder="ФИО врача, поставившего диагноз" @blur="updatePatientDiagnosis()" />
      </div>
      <div v-for="research in researches" :key="research.id">
        <div v-for="question in research.questions" :key="question.id">
          <div class="margin-class">
            {{ question.name }}
          </div>
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

<script lang="ts" setup>
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';

const mounted = ref(false);
const researches: ComputedRef<Research[]> = Store.Items('researches');

const patientDiagnosis: ComputedRef<PatientDiagnosis> = Store.Item('patientsDiagnosis');
const patient: ComputedRef<Patient> = Store.Item('patients');

const updatePatientDiagnosis = async () => {
  await Store.Update('patientsDiagnosis', patientDiagnosis.value);
};

onBeforeMount(async () => {
  const fq = new FTSP();
  fq.f.push(ResearchesFiltersLib.onlyMkb());
  await Store.FTSP('researches', { ftsp: fq });

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

  await Store.Create('patientsResearches', item);

  const researchResult = ResearchResult.Create(research, item.id);
  item.researchResults.push(researchResult);
  await Store.Create('researchesResults', researchResult);
};

const saveResearchResult = async (result: ResearchResult): Promise<void> => {
  await Store.Update('researchesResults', result);
};
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
</style>
