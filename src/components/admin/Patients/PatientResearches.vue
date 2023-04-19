<template>
  <div v-if="mounted" class="patient-page-container">
    <RemoteSearch
      :must-be-translated="true"
      key-value="researchesPool"
      placeholder="Начните вводить шаблон исследований"
      @select="addResearchesPool"
    />

    <div v-for="researchesPool in researchesPools" :key="researchesPool.id" @click="addResearchesPool(researchesPool.id)">
      <!--      <button @click.prevent="patientResearch.patientsResearchesPools()">Добавить результат</button>-->
      <!--      {{ patientResearchesPool.researchesPool.name }}-->

      {{ researchesPool.name }}
    </div>
    <!--    <div-->
    <!--      v-for="researchesPoolResearches in patientResearchesPool.researchesPool.researchesPoolsResearches"-->
    <!--      :key="researchesPoolResearches.id"-->
    <!--    >-->
    <!--      <div>-->
    <!--        {{ researchesPoolResearches.research.name }}-->
    <!--      </div>-->
    <!--      &lt;!&ndash;        <button @click.prevent="createPatientResearch(researchesPoolResearches.research)">Создать исследование</button>&ndash;&gt;-->
    <!--      <div v-for="question in researchesPoolResearches.research.questions" :key="question.id">-->
    <!--        {{ question.name }}-->
    <!--        <button-->
    <!--          @click.prevent="patient.getPatientResearch(researchesPoolResearches.research.id).addResult(researchesPoolResearches.research)"-->
    <!--        >-->
    <!--          Добавить результат исследований-->
    <!--        </button>-->
    <!--        <div-->
    <!--          v-for="researchResult in patient.getPatientResearch(researchesPoolResearches.research.id).researchResults"-->
    <!--          :key="researchResult"-->
    <!--        >-->
    <!--          <div v-for="result in patient.getPatientResearch(researchesPoolResearches.research.id).researchResults" :key="result.id">-->
    <!--            <NumberProp :research-result="result" :question="question" />-->

    <!--            {{ researchesPoolResearches.research.formulas[0].calculate(researchesPoolResearches.research.getAnswers(result)) }}-->
    <!--            {{ researchesPoolResearches.research.formulas[0].getResult(researchesPoolResearches.research.getAnswers(result)) }}-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      &lt;!&ndash;        <button @click.prevent="patientResearch.addResult">добавить результат</button>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <div v-for="(question, i) in patientResearch.research.questions" :key="question.id">&ndash;&gt;-->
    <!--      &lt;!&ndash;          {{ researchResult.answers[i] }}&ndash;&gt;-->
    <!--      &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { Delete, Document, Edit } from '@element-plus/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import PatientResearchesPool from '@/classes/PatientResearchesPool';
import Research from '@/classes/Research';
import ResearchesPool from '@/classes/ResearchesPool';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientResearches',
  components: {
    RemoteSearch,
    NumberProp,
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
    const researchesPool: Ref<ResearchesPool> = computed(() => Provider.store.getters['researchesPools/item']);
    const researchesPools: Ref<ResearchesPool[]> = computed(() => Provider.store.getters['researchesPools/items']);
    // const researches: Ref<Register> = computed(() => Provider.store.getters['researches/items']);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    // const activeCollapseName: Ref<string> = ref('');
    const addResearchesPool = async (id: string) => {
      await Provider.store.dispatch('researchesPools/get', id);
      const item = PatientResearchesPool.Create(patient.value.id, researchesPool.value);
      patient.value.patientsResearchesPools.push(item);
      await Provider.store.dispatch('patientsResearchesPools/create', item);
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {};

    onBeforeMount(async () => {
      // const query = Provider.store.getters['researchesPools/getAll'];
      // query.id = Provider.route().params.registerId;
      await Provider.store.dispatch('researchesPools/getAll');
      mounted.value = true;
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // showConfirmModal(submitForm, next);
    });

    const createPatientResearch = async (research: Research) => {
      const item = PatientResearch.Create(patient.value.id, research);
      patient.value.patientsResearches.push(item);
      await Provider.store.dispatch('patientsResearches/create', item);
    };

    return {
      researchesPools,
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
