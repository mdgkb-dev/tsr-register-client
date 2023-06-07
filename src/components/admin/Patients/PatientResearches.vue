<template>
  <RightTabsContainer :is-toggle="researchesPoolsIsToggle" slider-on-width="180px" @toggle="toggleResearchesPools">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
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
                  margin="0 10px 0 0"
                  height="42px"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :color-swap="true"
                  :with-icon="false"
                  @click="cancelResearchResultsFilling(true)"
                >
                </Button>
                <div class="researche-name">{{ research.name }}</div>
              </div>
            </template>
            <template v-else>
              <div class="line-item">
                <GridContainer max-width="600px" grid-gap="6px" grid-template-columns="repeat(auto-fit, minmax(60px, 1fr))">
                  <template #grid-items>
                    <AlphabetFilter />
                  </template>
                </GridContainer>
                <svg class="icon-xlsx">
                  <use xlink:href="#xlsx"></use>
                </svg>
              </div>
            </template>
          </template>

          <template #body>
            <template v-if="research.id && patientResearch && patientResearch.researchId === research.id">
              <el-timeline style="margin-top: 20px">
                <el-timeline-item v-for="result in patientResearch.researchResults" :key="result.id" placement="top" center>
                  <GeneralItem
                    :ready="`${result.fillingPercentage}%`"
                    margin="0px"
                    :scale="false"
                    :with-icon="true"
                    @click="selectResult(result.id)"
                  >
                    <template #general-item> Исследование от {{ $dateTimeFormatter.format(result.date) }} </template>
                  </GeneralItem>

                  <template v-if="researchResult.id">
                    <div class="blur"></div>
                    <div class="research-info">
                      <div class="patient-name">{{ patient.human.getFullName() }}</div>
                      <div class="header-container">
                        <div class="researche-title-name">{{ research.name }}</div>
                        <div class="researche-counter">Заполнено: {{ researchResult.fillingPercentage }}%</div>
                        <div v-if="research.withScores" class="researche-counter">
                          Кол-во баллов: {{ researchResult.calculateScores(research.getAnswerVariants()) }}
                        </div>
                      </div>
                      <div class="tools">
                        <div class="control-buttons">
                          <div class="left">
                            <Button
                              text="Назад"
                              background="#ffffff"
                              margin="0 10px 0 0"
                              height="42px"
                              font-size="16px"
                              border-radius="5px"
                              color="#343e5c"
                              :color-swap="true"
                              :with-icon="false"
                              @click="cancelResearchResultsFilling(false)"
                            >
                            </Button>
                            <div class="search">
                              <span>Отобразить только незаполненные</span
                              ><el-switch v-model="showOnlyNotFilled" placeholder="Отобразить только незаполненные" />
                            </div>
                            <div class="search">
                              <el-input v-model="questionsFilterString" placeholder="Найти вопрос" />
                            </div>
                          </div>
                          <div class="right"></div>
                        </div>
                        <Button
                          text="Сохранить"
                          :color-swap="false"
                          width="100%"
                          height="60px"
                          font-size="16px"
                          border-radius="5px"
                          color="#00B5A4"
                          background="#C7ECEA"
                          background-hover="#C7ECEA"
                          :with-icon="false"
                          @click="saveResult(researchResult)"
                        ></Button>
                      </div>
                      <div class="scroll-block">
                        <CollapseContainer>
                          <div v-for="question in filteredQuestions" :key="question.id">
                            <CollapseItem
                              :title="`${question.order + 1}. ${question.name}`"
                              :is-collaps="true"
                              :change-color="researchResult.getOrCreateAnswer(question).filled"
                              background="#DFF2F8"
                              background-attention="#EECEAF"
                              margin-top="20px"
                            >
                              <template #inside-content>
                                <div :id="question.getIdWithoutDashes()" class="background-container">
                                  <QuestionComponent
                                    :question="question"
                                    :research-result="researchResult"
                                    @fill="scroll(question.getIdWithoutDashes())"
                                  />
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
                </el-timeline-item>
              </el-timeline>
            </template>
            <template v-else>
              <GridContainer grid-gap="5px" margin-top="5px">
                <template #grid-items>
                  <GeneralItem
                    v-for="(researchesPoolResearch, i) in researchesPool.researchesPoolsResearches"
                    :key="researchesPoolResearch.id"
                    :ready="$stringsService.formatToPercentage(patient.getResearchFillingPercentage(researchesPoolResearch.research.id))"
                    height="60px"
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
                background-hover="#C7ECEA"
                @click="addResult(research, patientResearch.id)"
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
    <symbol id="xlsx" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <g clip-path="url(#clip0_3532_3963)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M35 11.25V27.5H32.5V11.25H27.5C26.5054 11.25 25.5516 10.8549 24.8483 10.1517C24.1451 9.44839 23.75 8.49456 23.75 7.5V2.5H10C9.33696 2.5 8.70107 2.76339 8.23223 3.23223C7.76339 3.70107 7.5 4.33696 7.5 5V27.5H5V5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0L23.75 0L35 11.25ZM19.65 37.1025C19.6643 37.4964 19.7609 37.883 19.9336 38.2373C20.1062 38.5917 20.3511 38.906 20.6525 39.16C20.9775 39.43 21.3775 39.64 21.85 39.79C22.325 39.9425 22.8775 40.0175 23.5125 40.0175C24.3575 40.0175 25.0725 39.885 25.6575 39.6225C26.25 39.36 26.6975 38.9925 27.0075 38.5225C27.3228 38.0344 27.4855 37.4635 27.475 36.8825C27.475 36.3225 27.3625 35.8575 27.1375 35.4825C26.9086 35.108 26.5853 34.8002 26.2 34.59C25.7579 34.3456 25.2819 34.1687 24.7875 34.065L23.235 33.705C22.8682 33.6381 22.5217 33.4876 22.2225 33.265C22.1089 33.1768 22.0174 33.0633 21.9554 32.9335C21.8933 32.8038 21.8624 32.6613 21.865 32.5175C21.865 32.1275 22.0175 31.8075 22.325 31.5575C22.6375 31.305 23.065 31.1775 23.6075 31.1775C23.965 31.1775 24.2725 31.235 24.5325 31.3475C24.7709 31.4454 24.9813 31.6009 25.145 31.8C25.2989 31.9856 25.4022 32.2078 25.445 32.445H27.32C27.2894 31.9362 27.1171 31.446 26.8225 31.03C26.5065 30.5813 26.0744 30.2269 25.5725 30.005C24.9586 29.7357 24.2926 29.6059 23.6225 29.625C22.89 29.625 22.2425 29.75 21.68 30C21.12 30.2475 20.68 30.6 20.3625 31.0525C20.045 31.5075 19.8875 32.04 19.8875 32.65C19.8875 33.1525 19.9875 33.59 20.195 33.96C20.4 34.3325 20.6925 34.635 21.0725 34.8775C21.455 35.115 21.9025 35.295 22.4225 35.41L23.9675 35.77C24.485 35.8925 24.8675 36.0525 25.1225 36.2525C25.2475 36.3472 25.3477 36.4708 25.4143 36.6128C25.481 36.7548 25.5121 36.9108 25.505 37.0675C25.5087 37.325 25.4347 37.5777 25.2925 37.7925C25.1316 38.0121 24.91 38.1798 24.655 38.275C24.3775 38.3925 24.03 38.45 23.6225 38.45C23.33 38.45 23.0625 38.4175 22.8225 38.35C22.6006 38.289 22.3903 38.1919 22.2 38.0625C22.0336 37.9548 21.8911 37.814 21.7814 37.6488C21.6717 37.4836 21.5972 37.2977 21.5625 37.1025H19.65ZM10.335 29.83H12.5675L9.3825 34.8475L12.5175 39.8275H10.2475L8.1225 36.29H8.035L5.9025 39.8275H3.75L6.85 34.7875L3.78 29.83H6.1075L8.1875 33.425H8.2775L10.335 29.83ZM15.1425 38.1425H19.385V39.8275H13.165V29.83H15.1425V38.1425ZM34.2325 29.83H36.465L33.28 34.8475L36.415 39.8275H34.145L32.02 36.29H31.9325L29.8 39.8275H27.6475L30.7475 34.7875L27.6775 29.83H30.005L32.085 33.425H32.175L34.2325 29.83Z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_3532_3963">
          <rect width="40" height="40" fill="white"></rect>
        </clipPath>
      </defs>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { Delete, Document, Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, WritableComputedRef } from 'vue';

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
import scroll from '@/services/Scroll';
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
  },
  setup() {
    const questionsFilterString: Ref<string> = ref('');
    // c3.generate();

    const selectedTab = ref('');
    const researchesPoolsIsToggle: Ref<boolean> = ref(false);
    const showOnlyNotFilled: Ref<boolean> = ref(false);
    const researchesPool: Ref<ResearchesPool> = computed(() => Provider.store.getters['researchesPools/item']);
    const researchesPools: Ref<ResearchesPool[]> = computed(() => Provider.store.getters['researchesPools/items']);
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: WritableComputedRef<PatientResearch | undefined> = computed(() =>
      patient.value.getPatientResearch(research.value.id)
    );
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const filteredQuestions: ComputedRef<Question[]> = computed(() => {
      return research.value.getFilteredQuestions(questionsFilterString.value, showOnlyNotFilled.value, researchResult.value);
    });

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

    onBeforeMount(async () => {
      if (patient.value.patientsResearchesPools[0]) {
        await selectResearchesPool(patient.value.patientsResearchesPools[0].researchesPoolId as string);
      }
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
      Provider.store.commit('researches/set');
      Provider.store.commit('researchesResults/set');
      await selectOrAddResult(research.value);

      await Provider.store.dispatch('researches/get', item.id);
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

    const cancelResearchFilling = () => {
      Provider.store.commit('researches/set');
    };

    const cancelResearchResultsFilling = (s: boolean) => {
      Provider.store.commit('researchesResults/set');
      if (s || !research.value.withDates) {
        Provider.store.commit('researches/set');
      }
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
      showOnlyNotFilled,
      cancelResearchFilling,
      questionsFilterString,
      filteredQuestions,
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
      addResearchesPool,
      Delete,
      selectedTab,
      patient,

      Edit,
      Document,
      getCalculationsResults,
      scroll,
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
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
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

.slider-item:hover {
  border: 1px solid #379fff;
  background: $base-background;
  color: #379fff;
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

.slider-item:active {
  border: 1px solid #379fff;
  background: $custom-background;
  color: #343e5c;
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
  transition: 0.3s;
}

.tabs-item:hover {
  width: 105px;
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

.tabs-item-active:hover {
  width: 106px;
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

.icon-xlsx {
  width: 40px;
  height: 40px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

.icon-xlsx:hover {
  fill: #379fff;
}

.line-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  max-width: 100%;
}

:deep(.el-timeline) {
  padding: 0 0 0 10px;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

:deep(.el-timeline-item__node) {
  background: #b0a4c0;
}
</style>
