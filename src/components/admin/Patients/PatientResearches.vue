<template>
  <RightTabsContainer :is-toggle="researchesPoolsIsToggle" @toggle="toggleResearchesPools">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <div class="slider-item-active">СМА</div>
        <div v-for="pool in researchesPools" :key="pool.id" class="slider-item" @click="addResearchesPool(pool.id)">{{ pool.name }}</div>
      </div>
    </template>
    <template #tabs>
      <div
        v-for="patientResearchesPool in patient.patientsResearchesPools"
        :key="patientResearchesPool.id"
        :class="{ 'tabs-item-active': researchesPool.id === patientResearchesPool.researchesPoolId }"
        class="tabs-item"
        @click="selectResearchesPool(patientResearchesPool.researchesPoolId)"
      >
        {{ patientResearchesPool.researchesPool.name }}
      </div>
    </template>
    <template #body>
      <div class="body">
        <ResearcheContainer background="#DFF2F8">
          <template #header>
            <template v-if="research.id && patientResearch">
              <div class="researche-title">
                <Button
                  text="Назад"
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  @click.prevent="cancelResearchResultsFilling"
                  :colorSwap="true"
                  :withIcon="false"
                >
                  <template #icon>
                    <svg class="icon-back">
                      <use xlink:href="#back"></use>
                    </svg>
                  </template>
                </Button>
                <div class="researche-name">{{ research.name }}</div>
              </div>
            </template>
            <template v-else>
              <GridContainer max-width="600px" grid-gap="6px" grid-template-columns="repeat(auto-fit, minmax(60px, 1fr))">
                <template #grid-items>
                  <AlphabetFilter />
                </template>
              </GridContainer>
            </template>
          </template>

          <template #body>
            <template v-if="research.id && patientResearch">
              <div v-for="result in patientResearch.researchResults" :key="result.id">
                <GeneralItem :ready="`${result.fillingPercentage}%`" margin="10px 0px" :scale="false" @click="selectResult(result.id)">
                  <template #general-item> Исследование от {{ $dateTimeFormatter.format(result.date) }} </template>
                </GeneralItem>

                <template v-if="researchResult.id">
                  <div class="blur"></div>
                  <div class="research-info">
                    <div class="patient-name">{{ patient.human.getFullName() }}</div>
                    <div class="header-container">
                      <div class="researche-title-name">{{ research.name }}</div>
                      <div class="researche-counter">Заполнено: {{ researchResult.fillingPercentage }}%</div>
                      <div class="researche-counter">Кол-во баллов: {{ researchResult.calculateScores(research.getAnswerVariants()) }}</div>
                    </div>
                    <div class="tools">
                      <div class="control-buttons">
                        <div class="left">
                          <Button
                            text="Назад"
                            background="#ffffff"
                            margin-right="10px"
                            height="42px"
                            font-size="16px"
                            border-radius="5px"
                            color="#343e5c"
                            :colorSwap="true"
                            :withIcon="false"
                            @click.prevent="cancelResearchResultsFilling"
                          >
                            <template #icon>
                              <svg class="icon-back">
                                <use xlink:href="#back"></use>
                              </svg>
                            </template>
                          </Button>
                          <div class="search">
                            <RemoteSearch
                              :must-be-translated="true"
                              key-value="representative"
                              placeholder="Начните вводить название диагноза"
                              @select="addRepresentative"
                            />
                          </div>
                        </div>
                        <div class="right">
                          <Button
                            text="Прерыдущий"
                            background="#ffffff"
                            margin-right="10px"
                            height="42px"
                            font-size="16px"
                            border-radius="5px"
                            color="#343e5c"
                            :colorSwap="true"
                            :withIcon="false"
                          >
                          </Button>
                          <Button
                            text="Следующий"
                            background="#ffffff"
                            margin-right="10px"
                            height="42px"
                            font-size="16px"
                            border-radius="5px"
                            color="#343e5c"
                            :colorSwap="true"
                            :withIcon="false"
                          >
                          </Button>
                        </div>
                      </div>
                      <Button
                        text="Сохранить"
                        :color-swap="true"
                        width="100%"
                        height="60px"
                        font-size="22px"
                        border-radius="5px"
                        color="#00B5A4"
                        background="#C7ECEA"
                        :with-icon="false"
                        @click="saveResult(researchResult)"
                      ></Button>
                    </div>
                    <div class="scroll-block">
                      <CollapseContainer>
                        <div v-for="(question, i) in research.questions" :key="question.id">
                          <CollapseItem
                            :title="`${i + 1}. ${question.name}`"
                            :is-collaps="true"
                            :change-color="researchResult.getOrCreateAnswer(question).filled"
                            background="#DFF2F8"
                            background-attention="#EECEAF"
                            margin-top="20px"
                          >
                            <template #inside-content>
                              <div class="background-container">
                                <QuestionComponent :question="question" :research-result="researchResult" />
                                <div v-for="res in getCalculationsResults(research)" :key="res.name">
                                  <div>{{ res.formulaName }}</div>
                                  <div>{{ res.value }}</div>
                                  <div :style="{ color: res.color }">{{ res.result }}</div>
                                </div>
                              </div>
                            </template>
                          </CollapseItem>
                        </div>
                      </CollapseContainer>
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <GridContainer grid-gap="5px" margin-top="5px">
                <template #grid-items>
                  <GeneralItem
                    v-for="(researchesPoolResearch, i) in researchesPool.researchesPoolsResearches"
                    :key="researchesPoolResearch.id"
                    :ready="$stringsService.formatToPercentage(patient.getResearchFillingPercentage(researchesPoolResearch.research.id))"
                    @click="selectResearch(researchesPoolResearch.research)"
                  >
                    <template #general-item> {{ i + 1 }}. {{ researchesPoolResearch.research.name }} </template>
                  </GeneralItem>
                </template>
              </GridContainer>
            </template>
          </template>

          <template #footer>
            <template v-if="research.id && patientResearch">
              <Button
                width="100%"
                height="60px"
                font-size="16px"
                border-radius="5px"
                color="#00B5A4"
                background="#C7ECEA"
                @click.prevent="addResult(research, patientResearch.id)"
              >
                <template #icon>
                  <svg class="icon-plus">
                    <use xlink:href="#plus"></use>
                  </svg>
                </template>
              </Button>
            </template>
            <template v-else> </template>
          </template>
        </ResearcheContainer>
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
import { Delete, Document, Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Formula from '@/classes/Formula';
import FormulaResult from '@/classes/FormulaResult';
import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import PatientResearchesPool from '@/classes/PatientResearchesPool';
import Question from '@/classes/Question';
import Research from '@/classes/Research';
import ResearchesPool from '@/classes/ResearchesPool';
import ResearchResult from '@/classes/ResearchResult';
import AlphabetFilter from '@/components/admin/Patients/AlphabetFilter.vue';
import GeneralItem from '@/components/admin/Patients/GeneralItem.vue';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import QuestionComponent from '@/components/admin/Patients/QuestionComponent.vue';
import ResearcheContainer from '@/components/admin/Patients/ResearcheContainer.vue';
import RightTabsContainer from '@/components/admin/Patients/RightTabsContainer.vue';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import Provider from '@/services/Provider/Provider';
import RemoteSearch from '@/components/RemoteSearch.vue';

export default defineComponent({
  name: 'PatientResearches',
  components: {
    RightTabsContainer,
    QuestionComponent,
    Button,
    ResearcheContainer,
    GridContainer,
    GeneralItem,
    CollapseContainer,
    CollapseItem,
    AlphabetFilter,
    RemoteSearch,
  },
  setup() {
    const mounted = ref(false);
    // c3.generate();
    const selectedTab = ref('');
    const researchesPoolsIsToggle: Ref<boolean> = ref(false);
    const researchesPool: Ref<ResearchesPool> = computed(() => Provider.store.getters['researchesPools/item']);
    const researchesPools: Ref<ResearchesPool[]> = computed(() => Provider.store.getters['researchesPools/items']);
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: Ref<PatientResearch | undefined> = computed(() => patient.value.getPatientResearch(research.value.id));
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);
    // const researches: Ref<Register> = computed(() => Provider.store.getters['researches/items']);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    // const activeCollapseName: Ref<string> = ref('');
    const addResearchesPool = async (id: string) => {
      if (patient.value.hasResearchesPool(id)) {
        return ElMessage.warning('Выбранный набор исследований уже есть у пациента');
      }
      await Provider.store.dispatch('researchesPools/get', id);
      const item = PatientResearchesPool.Create(patient.value.id, researchesPool.value);
      patient.value.patientsResearchesPools.push(item);
      await Provider.store.dispatch('patientsResearchesPools/create', item);
      await toggleResearchesPools(false);
    };

    const selectFirstPool = async (): Promise<void> => {
      if (patient.value.patientsResearchesPools[0]) {
        await selectResearchesPool(patient.value.patientsResearchesPools[0].researchesPoolId as string);
      }
    };

    onBeforeMount(async () => {
      // const query = Provider.store.getters['researchesPools/getAll'];
      // query.id = Provider.route().params.registerId;

      await selectFirstPool();
      mounted.value = true;
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // showConfirmModal(submitForm, next);
    });

    const selectOrAddResult = async (research: Research) => {
      if (!research.withDates && patientResearch.value) {
        if (patientResearch.value.researchResults.length > 0) {
          await selectResult(patientResearch.value.researchResults[0].id as string);
        } else {
          await addResult(research, patientResearch.value.id);
        }
      }
    };

    const createPatientResearch = async (research: Research) => {
      if (!patient.value.getPatientResearch(research.id)) {
        const item = PatientResearch.Create(patient.value.id, research);
        patient.value.patientsResearches.push(item);
        await Provider.store.dispatch('patientsResearches/create', item);
      }
      await Provider.store.dispatch('researches/get', research.id);
      await selectOrAddResult(research);
    };

    const selectResearchesPool = async (id: string) => {
      Provider.store.commit('researches/set');
      await Provider.store.dispatch('researchesPools/get', id);
    };

    const selectResearch = async (item: Research) => {
      if (!patientResearch.value) {
        return await createPatientResearch(item);
      }
      await Provider.store.dispatch('researches/get', item.id);
      await selectOrAddResult(research.value);
    };

    const selectResult = async (id: string) => {
      await Provider.store.dispatch('researchesResults/get', id);
    };

    const addResult = async (research: Research, patientResearchId?: string): Promise<void> => {
      const item = ResearchResult.Create(research, patientResearchId);
      patientResearch.value?.researchResults.push(item);
      await Provider.store.dispatch('researchesResults/createWithoutReset', item);
      Provider.store.commit('researchesResults/set', item);
    };

    const saveResult = async (result: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/update', result);
      if (patientResearch.value) {
        patientResearch.value.recalculate(result);
        await Provider.store.dispatch('patientsResearches/update', patientResearch.value);
      }
      if (!research.value.withDates) {
        Provider.store.commit('researchesResults/set');
        Provider.store.commit('researches/set');
      }
    };

    const toggleResearchesPools = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('researchesPools/getAll');
      }
      researchesPoolsIsToggle.value = toggle;
    };

    const cancelResearchResultsFilling = () => {
      patientResearch.value = undefined;
      Provider.store.commit('researches/set');
      // Provider.store.commit('researchesResults/set');
    };

    const birthDateToMonth = (birthDate: string): number => {
      return (new Date().getFullYear() - new Date(birthDate).getFullYear()) * 12;
    };

    const getCalculationsResults = (research: Research): FormulaResult[] => {
      const results: FormulaResult[] = [];

      let item: { [key: string]: number } = {};
      const monthsToResearch = researchResult.value.date.getMilliseconds() - patient.value.human.dateBirth.getMilliseconds();
      const months = birthDateToMonth(monthsToResearch.toString());

      research.questions.forEach((q: Question) => {
        if (q.code) {
          item[q.code] = researchResult.value.getAnswerByQuestionId(q.id as string)?.valueNumber as number;
        }
      });
      research.formulas.forEach((f: Formula) => {
        const res = f.getResult(item, patient.value.human.isMale, months);
        res.formulaName = f.name;
        results.push(res);
      });
      return results;
    };

    return {
      cancelResearchResultsFilling,
      toggleResearchesPools,
      researchesPoolsIsToggle,
      saveResult,
      addResult,
      researchResult,
      selectResult,
      patientResearch,
      selectResearch,
      selectResearchesPool,
      researchesPool,
      researchesPools,
      research,
      createPatientResearch,
      mounted,
      addResearchesPool,
      Delete,
      selectedTab,
      patient,

      Edit,
      Document,
      getCalculationsResults,
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
  width: 442px;
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

.slider-item {
  width: 101px;
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
  width: 101px;
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
  margin-left: 0px;
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
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 20;
}

.research-info {
  position: fixed;
  top: 52%;
  left: 50%;
  width: calc(99% - 22px);
  height: calc(92% - 22px);
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
  // position: absolute;
  // top: 0;
  // left: 0;
  // z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  height: auto;
  padding: 10px 0;
  width: calc(100% - 2px);
  background: #dff2f8;
}

.scroll-block {
  width: 100%;
  height: calc(100% - 200px);
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
  align-items: start;
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
  align-items: start;
  text-transform: uppercase;
  white-space: nowrap;
  height: 100%;
}

.control-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.left {
  min-width: 300px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.right {
  max-width: 300px;
  display: flex;
  justify-content: right;
  align-items: center;
}

.search {
  display: flex;
  justify-content: left;
  align-items: center;
}


</style>
