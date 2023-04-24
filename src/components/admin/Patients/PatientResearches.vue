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
                  marginRight="10px"
                  height="42px"
                  fontSize="16px"
                  borderRadius="5px"
                  color="#343e5c"
                  @click.prevent="cancelResearchResultsFilling"
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
              <GridContainer
                maxWidth="600px"
                gridGap="6px"
                gridTemplateColumns="repeat(auto-fit, minmax(60px, 1fr))"
                marginTop="10px"
              >
                <template #grid-items>
                  <Button :border="false" text="А-В" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="Г-Ё" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="Ж-К" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="Л-Н" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="О-Р" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="С-У" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="Ф-Ч" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="Ш-Щ" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
                  <Button :border="false" text="Э-Я" :colorSwap="true" width="60px" 
                  height="40px" fontSize="16px" color="#343E5C" background="#DFF2F8" :withIcon="false"></Button>
              </template>
              </GridContainer>
            </template>
          </template>

          <template #body>
            <template v-if="research.id && patientResearch">
              <div v-for="result in patientResearch.researchResults" :key="result.id">
                <GeneralItem 
                  :ready="`${result.fillingPercentage}%`"
                  @click="selectResult(result.id)" 
                  margin="10px 0px" 
                  :scale="false" 
                >
                  <template #general-item>
                    {{ result.date }}
                  </template>
                </GeneralItem>

                <template v-if="researchResult.id">
                    <div class="blur"></div>
                    <div class="research-info">
                      <div class="tools">
                        <Button
                          text="Сохранить"
                          :colorSwap="true" 
                          width="100%"
                          height="60px"
                          fontSize="22px"
                          borderRadius="5px"
                          color="#00B5A4"
                          background="#C7ECEA"
                          :withIcon="false"
                          @click="saveResult(researchResult)" 
                        ></Button>  
                      </div>
                      <div class="scroll-block">
                        <div class="question-item" v-for="question in research.questions" :key="question.id">
                          <div class="question-name">{{ question.name }}</div>
                          <!-- {{ researchResult.getAnswer(question.id).filled }} -->
                          <StringProp
                            v-if="question.valueType.isString() || question.valueType.isText()"
                            :research-result="researchResult"
                            :question="question"
                          />
                          <NumberProp v-if="question.valueType.isNumber()" :research-result="researchResult" :question="question" />
                          <DataComponentComputed v-if="question.valueType.isDate()" :research-result="researchResult" :question="question" />
                          <RadioProp v-if="question.valueType.isRadio()" :research-result="researchResult" :question="question" />
                          <SetProp v-if="question.valueType.isSet()" :research-result="researchResult" :question="question" />
                        </div>
                      </div>
                    </div>
                </template>
              </div>
            </template>
            <template v-else>
              <GridContainer gridGap="5px" marginTop="5px">
                <template #grid-items>
                <GeneralItem 
                  :ready="$stringsService.formatToPercentage(patient.getResearchFillingPercentage(researchesPoolResearch.research.id))"
                  v-for="researchesPoolResearch in researchesPool.researchesPoolsResearches"
                  :key="researchesPoolResearch.id"
                  @click="selectResearch(researchesPoolResearch.research)"
                >
                  <template #general-item>
                    {{ researchesPoolResearch.research.name }}
                  </template>
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
                fontSize="16px"
                borderRadius="5px"
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
            <template v-else>

            </template>
          </template>
        </ResearcheContainer>
      </div>
      
    </template>
  </RightTabsContainer>
  <svg width="0" height="0" class="hidden">
    <symbol stroke="none" id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" id="back">
      <path d="M7.33333 7.8C13.901 7.20467 18.1253 9.738 20 15.4C16.4217 11.4227 11.9681 10.6905 7.33333 12.8667V16.6667L1 10.3333L7.33333 4V7.8Z" stroke-linecap="round" stroke-linejoin="round"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { Delete, Document, Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import PatientResearchesPool from '@/classes/PatientResearchesPool';
import Research from '@/classes/Research';
import ResearchesPool from '@/classes/ResearchesPool';
import ResearchResult from '@/classes/ResearchResult';
import RightTabsContainer from '@/components/admin/Patients/RightTabsContainer.vue';
import DataComponentComputed from '@/components/admin/Research/DataComponentComputed.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import RadioProp from '@/components/admin/Research/RadioProp.vue';
import SetProp from '@/components/admin/Research/SetProp.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import Provider from '@/services/Provider/Provider';
import Button from '@/components/Base/Button.vue'
import ResearcheContainer from '@/components/admin/Patients/ResearcheContainer.vue';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import GeneralItem from '@/components/admin/Patients/GeneralItem.vue';

export default defineComponent({
  name: 'PatientResearches',
  components: {
    RightTabsContainer,
    SetProp,
    RadioProp,
    RemoteSearch,
    NumberProp,
    DataComponentComputed,
    StringProp,
    // FilesProp,
    // HumanForm,
    // DataComponentComputed,
    // StringProp,
    // TextProp,
    // NumberProp,
    // SetProp,
    // RadioProp,
    // PropertyHeader,
    Button,
    ResearcheContainer,
    GridContainer,
    GeneralItem,
  },
  setup() {
    const mounted = ref(false);
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

    const createPatientResearch = async (research: Research) => {
      if (!patient.value.getPatientResearch(research.id)) {
        const item = PatientResearch.Create(patient.value.id, research);
        patient.value.patientsResearches.push(item);
        await Provider.store.dispatch('patientsResearches/create', item);
      }
      await Provider.store.dispatch('researches/get', research.id);
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
  top:0px;
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
  height: calc(92% - 102px);
  transform: translate(-50%, -50%);
  background: #DFF2F8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  margin: 10px 10px 0 0;
  padding: 90px 10px 10px 10px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 21;
}

.tools {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: left;
  align-items: center;
  height: auto;
  padding: 10px;
  width: calc(100% - 22px);
  background: #DFF2F8;
}

.scroll-block {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.question-item {
  background: #DFF2F8;
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
</style>
