<template>
  <div v-if="mounted">
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
          <template v-if="research.id && patientResearch">
            <div>
              <button @click.prevent="cancelResearchResultsFilling">Назад</button>
              <button @click.prevent="addResult(research, patientResearch.id)">добавить результат</button>
              <div v-for="result in patientResearch.researchResults" :key="result.id">
                <div @click="selectResult(result.id)">{{ result.date }}, {{ result.fillingPercentage }}%</div>

                <template v-if="researchResult.id">
                  {{ researchResult.fillingPercentage }}%
                  <el-button @click="saveResult(researchResult)">Сохранить</el-button>
                  <div v-for="question in research.questions" :key="question.id">
                    <div>{{ question.name }}, {{ question.valueType.name }}</div>
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
                </template>
                <hr />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="filters">
              <div class="filter-item">А-В</div>
              <div class="filter-item">Г-Ё</div>
              <div class="filter-item">Ж-К</div>
              <div class="filter-item">Л-Н</div>
              <div class="filter-item">О-Р</div>
              <div class="filter-item">С-У</div>
              <div class="filter-item">Ф-Ч</div>
              <div class="filter-item">Ш-Щ</div>
              <div class="filter-item">Э-Я</div>
            </div>
            <div class="researches">
              <div
                v-for="researchesPoolResearch in researchesPool.researchesPoolsResearches"
                :key="researchesPoolResearch.id"
                class="researches-item"
                @click="selectResearch(researchesPoolResearch.research)"
              >
                <div
                  class="green"
                  :style="{
                    width: $stringsService.formatToPercentage(patient.getResearchFillingPercentage(researchesPoolResearch.research.id)),
                  }"
                ></div>
                <div class="researches-item-title">{{ researchesPoolResearch.research.name }}</div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </RightTabsContainer>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>

  <!--    <div v-if="research.id && patientResearch">-->
  <!--      <div v-for="result in patientResearch.researchResults" :key="result.id">-->

  <!--        <div v-for="question in research.questions" :key="question.id">-->
  <!--          <div>{{ question.name }}, {{ question.valueType.name }}</div>-->
  <!--          <StringProp v-if="question.valueType.isString()" :research-result="result" :question="question" />-->
  <!--          <NumberProp v-if="question.valueType.isNumber()" :research-result="result" :question="question" />-->
  <!--          <DataComponentComputed v-if="question.valueType.isDate()" :research-result="result" :question="question" />-->
  <!--          <RadioProp v-if="question.valueType.isRadio()" :research-result="result" :question="question" />-->
  <!--          <SetProp v-if="question.valueType.isSet()" :research-result="result" :question="question" />-->
  <!--        </div>-->
  <!--        <hr />-->
  <!--      </div>-->
  <!--    </div>-->

  <!--    &lt;!&ndash;&ndash;&gt;-->
  <!--    &lt;!&ndash;    {{ researchesPoolResearches.research.formulas[0].calculate(researchesPoolResearches.research.getAnswers(result)) }}&ndash;&gt;-->
  <!--    &lt;!&ndash;    {{ researchesPoolResearches.research.formulas[0].getResult(researchesPoolResearches.research.getAnswers(result)) }}&ndash;&gt;-->
  <!--    &lt;!&ndash;  </div>&ndash;&gt;-->
  <!--    &lt;!&ndash;    </div>&ndash;&gt;-->

  <!--    &lt;!&ndash;      &lt;!&ndash;        <div v-for="(question, i) in patientResearch.research.questions" :key="question.id">&ndash;&gt;&ndash;&gt;-->
  <!--    &lt;!&ndash;      &lt;!&ndash;          {{ researchResult.answers[i] }}&ndash;&gt;&ndash;&gt;-->
  <!--    &lt;!&ndash;      &lt;!&ndash;        </div>&ndash;&gt;&ndash;&gt;-->
  <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
  <!--  </div>-->
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
      // patientResearch.value = undefined;
      Provider.store.commit('researches/set');
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
  transition: 0.3s;
  opacity: 1;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
}

.filters {
  padding-top: 10px;
  max-width: 600px;
  height: auto;
  display: grid;
  grid-gap: 6px;
  grid-template-rows: repeat(0 0px);
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  margin-left: auto;
  margin-right: auto;
}

.filter-item {
  font-size: 16px;
  color: #343e5c;
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}

.filter-item:hover {
  background: #343e5c;
  color: #ffffff;
}

.researches {
  // margin-top: 20px;
  width: auto;
  height: auto;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: repeat(0 0px);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
}

.researches-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
  background: #ffffff;
  border-radius: $normal-border-radius;
  border: $custom-border;
  text-align: center;
  overflow: hidden;
}

.researches-item:hover {
  transform: scale(1.03, 1.03);
  // border: 1px solid #379FFF;
  // color: #ffffff;
}

.researches-item-title {
  font-size: 12px;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
}

.green {
  position: absolute;
  background: #c7ecea;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
}
</style>
