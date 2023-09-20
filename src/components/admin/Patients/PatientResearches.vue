<template>
  <ResearcheContainer>
    <template #header>
      <div v-if="research.id && patientResearch" class="header-container">
        <Button button-class="grey-button" text="Назад" @click="beforeLeave('', true)" />
        <Button icon="back" button-class="edit-button" icon-class="edit-icon" @click="cancelResearchResultsFilling(true)" />
        <TopSliderContainer>
          <template #title>
            <span>{{ research.name }}</span>
            <span v-if="researchResult">&nbsp;Дата: {{ $dateTimeFormatter.format(researchResult.date) }}</span>
            <span v-if="research.withScores"> &nbsp;(Баллов: {{ researchResult.calculateScores(research.getAnswerVariants()) }})</span>
          </template>
          <div v-if="research.withScores" class="flex-line">
            <StringItem string="Кол-во баллов:" font-size="14px" padding="0 10px 0 0" />
            <StringItem :string="researchResult.calculateScores(research.getAnswerVariants())" font-size="14px" padding="0 10px 0 0" />
          </div>
          <div class="flex-line">
            <StringItem string="Скрыть&nbsp;заполненные" font-size="14px" padding="0 10px 0 0" />
            <el-switch v-model="showOnlyNotFilled" placeholder="Отобразить только незаполненные" />
          </div>
          <div class="search">
            <el-input v-model="questionsFilterString" placeholder="Найти вопрос" />
          </div>
          <!-- <div v-for="res in getCalculationsResults(research)" :key="res.name" class="flex-line4">
              <div v-if="Number.isFinite(res.value)" class="res-name">{{ res.formulaName + ':' }}</div>
              <div v-if="Number.isFinite(res.value)">{{ res.value.toFixed(2) }}</div>
              <div :style="{ color: res.color }">{{ res.result }}</div>
            </div> -->
        </TopSliderContainer>
        <Button v-show="confirmLeave" button-class="grey-button" text="Сохранить" @click="saveResult()" />
        <Button icon="save" button-class="edit-button" icon-class="edit-icon" @click="saveResult()" />
      </div>
    </template>
    <template #body>
      <template v-if="research.id && patientResearch && patientResearch.researchId === research.id">
        <PatientResearchesResultsList
          :research="research"
          :patient-research="patientResearch"
          @select="selectResult"
          @show-chart="toggleChart"
          @before-leave="beforeLeave"
        />
      </template>
      <template v-else>
        <PatientResearchesList type="researches" :filter-model="researchesFilter" @select="selectResearch" />
      </template>
      <PatientResearchesQuestion
        v-if="researchResult.id"
        :key="researchResult.id"
        :questions-filter-string="questionsFilterString"
        :show-only-not-filled="showOnlyNotFilled"
        @save="saveResult"
        @cancel="cancelResearchResultsFilling"
        @fill="formUpdated"
      />
      <PatientResearchChart v-if="chartOpened" :research="research" :patient-research="patientResearch" @close="toggleChart" />
      <Xlsx />
    </template>
  </ResearcheContainer>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { computed, defineComponent, onBeforeUnmount, Ref, ref, WritableComputedRef } from 'vue';

import Xlsx from '@/assets/svg/Xlsx.svg';
import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import PatientResearchChart from '@/components/admin/Patients/PatientResearchChart.vue';
import PatientResearchesList from '@/components/admin/Patients/PatientResearchesList.vue';
import PatientResearchesQuestion from '@/components/admin/Patients/PatientResearchesQuestion.vue';
import PatientResearchesResultsList from '@/components/admin/Patients/PatientResearchesResultsList.vue';
import Button from '@/components/Base/Button.vue';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';
import MessageSuccess from '@/services/classes/messages/MessageSuccess';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import StringItem from '@/services/components/StringItem.vue';
import TopSliderContainer from '@/services/components/TopSliderContainer.vue';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'PatientResearches',
  components: {
    PatientResearchesResultsList,
    Xlsx,
    PatientResearchesQuestion,
    PatientResearchesList,
    PatientResearchChart,
    TopSliderContainer,
    Button,
    StringItem,
    ResearcheContainer,
  },
  setup() {
    const researchesPoolsIsToggle: Ref<boolean> = ref(false);
    const showOnlyNotFilled: Ref<boolean> = ref(false);
    const questionsFilterString: Ref<string> = ref('');
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: WritableComputedRef<PatientResearch | undefined> = computed(() =>
      patient.value.getPatientResearch(research.value.id)
    );
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const confirmLeave: Ref<boolean> = ref(false);

    const formUpdated = () => {
      confirmLeave.value = true;
    };

    const createPatientResearch = async (research: Research) => {
      if (!patient.value.getPatientResearch(research.id)) {
        console.log('NoPatientResearch2');
        const item = PatientResearch.Create(patient.value.id, research);
        patient.value.patientsResearches.push(item);
        await Provider.store.dispatch('patientsResearches/create', item);
      }
      await Provider.store.dispatch('researches/get', research.id);
    };

    const selectResearch = async (item: Research) => {
      await Provider.store.dispatch('researches/get', item.id);
      if (!patientResearch.value) {
        console.log('NoPatientResearch');
        return await createPatientResearch(item);
      }
      Provider.store.commit('researchesResults/set');
      console.log(patientResearch.value?.researchResults);
      if (patientResearch.value?.researchResults.length === 0) {
        console.log('addResearchResul');
        const item = patientResearch.value?.addResult(research.value, patientResearch.value?.id);
        await Provider.store.dispatch('researchesResults/createWithoutReset', item);
        // return;
      }
      await selectResult(patientResearch.value?.researchResults[patientResearch.value?.researchResults.length - 1].id as string);
    };

    const selectResult = async (id: string) => {
      await Provider.store.dispatch('researchesResults/get', id);
      confirmLeave.value = false;
    };

    const updateReserchResults = async () => {
      await Provider.store.dispatch('researchesResults/updateWithoutReset', researchResult.value);
    };

    const updatePatientsResearches = async () => {
      if (patientResearch.value) {
        patientResearch.value.recalculate(researchResult.value);
        await Provider.store.dispatch('patientsResearches/updateWithoutReset', patientResearch.value);
      }
      if (!research.value.withDates) {
        Provider.store.commit('researchesResults/set');
        Provider.store.commit('researches/set');
      }
    };

    const beforeLeave = async (id: string, back: boolean) => {
      if (confirmLeave.value) {
        await ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Сохранить',
          cancelButtonText: 'Не сохранять',
        })
          .then(() => {
            // Вызывается при сохранении
            Promise.resolve(saveResult()).then(() => {
              back ? cancelResearchResultsFilling(true) : selectResult(id);
            });
          })
          .catch((action: string) => {
            if (action === 'cancel') {
              ElMessage({
                type: 'warning',
                message: 'Изменения не были сохранены',
              });
              back ? cancelResearchResultsFilling(true) : selectResult(id);
            }
          });
      } else {
        back ? cancelResearchResultsFilling(true) : selectResult(id);
      }
    };

    const saveResult = async (): Promise<void> => {
      Promise.all([updateReserchResults(), updatePatientsResearches()]).then(() => {
        ElNotification.success(new MessageSuccess());
      });
    };

    const toggleResearchesPools = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('researchesPools/getAll');
      }
      researchesPoolsIsToggle.value = toggle;
    };

    const cancelResearchFilling = () => {
      Provider.store.commit('researches/set');
    };

    const cancelResearchResultsFilling = (s: boolean) => {
      chartOpened.value = false;
      Provider.store.commit('researchesResults/set');
      if (s || !research.value.withDates) {
        Provider.store.commit('researches/set');
      }
    };

    onBeforeUnmount(() => {
      Provider.store.commit('researches/set');
      Provider.store.commit('researchesResults/set');
    });

    const chartOpened: Ref<boolean> = ref(false);
    const toggleChart = () => {
      chartOpened.value = !chartOpened.value;
    };

    return {
      researchesFilter: ResearchesFiltersLib.onlyLaboratory(),
      questionsFilterString,
      showOnlyNotFilled,
      chartOpened,
      toggleChart,
      cancelResearchFilling,
      cancelResearchResultsFilling,
      toggleResearchesPools,
      researchesPoolsIsToggle,
      saveResult,
      researchResult,
      selectResult,
      patientResearch,
      selectResearch,
      research,
      createPatientResearch,
      patient,
      scroll,
      beforeLeave,
      confirmLeave,
      formUpdated,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.header-container {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grey-button {
  width: 120px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #f5f5f5;
  margin: 0 10px;
  font-size: 14px;
}

.edit-button {
  display: none;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #f5f5f5;
}

.flex-line {
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.search {
  display: flex;
  justify-content: left;
  align-items: center;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  fill: #006bb4;
}

@media screen and (max-width: 768px) {
  .grey-button {
    display: none;
  }

  .edit-button {
    display: flex;
  }
}
</style>
