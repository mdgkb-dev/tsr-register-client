<template>
  <ResearcheContainer>
    <template #header>
      <div v-if="research.id && patientResearch" class="header-container">
        <Button button-class="grey-button" text="Назад" @click="cancelResearchResultsFilling" />
        <Button icon="back" button-class="edit-button" icon-class="edit-icon" @click="cancelResearchResultsFilling" />
        <TopSliderContainer>
          <template #title>
            <div class="title">{{ research.name }}</div>
            <div class="title" v-if="research.withScores"> &nbsp;(Баллов: {{ researchResult.calculateScores(research.getAnswerVariants()) }})</div>
          </template>
          <div v-if="research.withScores" class="flex-line">
            <StringItem string="Кол-во баллов:" font-size="14px" padding="0 10px 0 0" />
            <StringItem :string="researchResult.calculateScores(research.getAnswerVariants())" font-size="14px" padding="0 10px 0 0" />
          </div>
          <div class="flex-line">
            <StringItem string="Скрыть&nbsp;заполненные" font-size="14px" padding="0 10px 0 0" />
            <el-switch v-model="research.showOnlyNotFilled" placeholder="Отобразить только незаполненные" />
          </div>
          <div class="search">
            <el-input v-model="research.filterString" placeholder="Найти вопрос" />
          </div>
          <!-- <div v-for="res in getCalculationsResults(research)" :key="res.name" class="flex-line4">
              <div v-if="Number.isFinite(res.value)" class="res-name">{{ res.formulaName + ':' }}</div>
              <div v-if="Number.isFinite(res.value)">{{ res.value.toFixed(2) }}</div>
              <div :style="{ color: res.color }">{{ res.result }}</div>
            </div> -->
        </TopSliderContainer>
        <Button v-if="researchResult.changed" button-class="grey-button" text="Сохранить" @click="saveResult" />
        <Button v-if="researchResult.changed" icon="save" button-class="edit-button" icon-class="edit-icon" @click="saveResult" />
      </div>
    </template>

    <template #body>
      <PatientResearchComponent v-if="research.id" @save="saveResult" />
      <PatientResearchesList v-else type="anamnesis" :filter-model="researchesFilter" @select="selectResearch" />
    </template>
  </ResearcheContainer>
  <Xlsx />
</template>

<script lang="ts">
import { ElMessage, MessageBoxData } from 'element-plus';
import { computed, ComputedRef, defineComponent, Ref } from 'vue';

import Xlsx from '@/assets/svg/Xlsx.svg';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import PatientResearchComponent from '@/components/admin/Patients/PatientResearchComponent.vue';
import PatientResearchesList from '@/components/admin/Patients/PatientResearchesList.vue';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';
// import MessageConfirmSave, { Close } from '@/services/classes/messages/MessageConfirmSave';
import Button from '@/services/components/Button.vue';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import StringItem from '@/services/components/StringItem.vue';
import TopSliderContainer from '@/services/components/TopSliderContainer.vue';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';
export default defineComponent({
  name: 'PatientAnamneses',
  components: {
    Xlsx,
    Button,
    ResearcheContainer,
    StringItem,
    PatientResearchesList,
    TopSliderContainer,
    PatientResearchComponent,
  },
  setup() {
    const researches: Ref<Research[]> = computed(() => Provider.store.getters['researches/items']);
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: ComputedRef<PatientResearch> = computed(() => Provider.store.getters['patientsResearches/item']);
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const selectResearch = async (item: Research) => {
      await Provider.store.dispatch('researches/get', item.id);
    };

    const confirmChangeResult = async (): Promise<MessageBoxData | undefined> => {
      if (!researchResult.value.changed) {
        return;
      }
      // return await MessageConfirmSave();
    };

    const cancelResearchResultsFilling = async () => {
      try {
        await confirmChangeResult();
        await saveResult();
      } catch (e) {
        // if (e === Close) {
        //   return;
        // }
      }
      Provider.store.commit('researchesResults/set');
      Provider.store.commit('patientsResearches/set');
      Provider.store.commit('researches/set');
    };

    const saveResult = async (): Promise<void> => {
      if (researchResult.value.changed) {
        await Provider.store.dispatch('researchesResults/update', researchResult.value);
        if (patientResearch.value) {
          patientResearch.value.recalculate(researchResult.value);
          await Provider.store.dispatch('patientsResearches/update', patientResearch.value);
        }
        ElMessage.success('Исследование успешно сохранено');
      }

      if (!research.value.withDates) {
        Provider.store.commit('researchesResults/set');
        Provider.store.commit('researches/set');
      }
      researchResult.value.changed = false;
    };

    return {
      researchesFilter: ResearchesFiltersLib.onlyAnamneses(),
      saveResult,
      cancelResearchResultsFilling,
      researchResult,
      patientResearch,
      selectResearch,
      researches,
      researchesPools: researches,
      research,
      scroll,
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

.title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
