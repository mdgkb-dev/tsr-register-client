<template>
  <div class="patient-page-container">
    <RemoteSearch
      :must-be-translated="true"
      key-value="researchesPool"
      placeholder="Начните вводить шаблон исследований"
      @select="addResearchesPool"
    />

    {{ patient.patientResearches }}
    <div v-for="patientResearch in patient.patientResearches" :key="patientResearch.id">
      <button @click.prevent="patientResearch.addResult()">Добавить результат</button>
      <div v-for="researchResult in patientResearch.researchResults" :key="researchResult.id">
        <button @click.prevent="patientResearch.addResult">добавить результат</button>
        <div v-for="(question, i) in patientResearch.research.questions" :key="question.id">
          {{ researchResult.answers[i] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Delete, Document, Edit } from '@element-plus/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Patient from '@/classes/Patient';
import ResearchesPool from '@/classes/ResearchesPool';
import RemoteSearch from '@/components/RemoteSearch.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientResearches',
  components: {
    RemoteSearch,
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
    const selectedTab = ref('');
    const researchesPool: Ref<ResearchesPool> = computed(() => Provider.store.getters['researchesPools/item']);
    // const researches: Ref<Register> = computed(() => Provider.store.getters['researches/items']);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    // const activeCollapseName: Ref<string> = ref('');
    const addResearchesPool = async (e: ISearchObject) => {
      await Provider.store.dispatch('researchesPools/get', e.value);
      patient.value.createPatientResearches(researchesPool.value.researches);
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {};

    onBeforeMount(async () => {
      const query = Provider.store.getters['filter/filterQuery'];
      query.id = Provider.route().params.registerId;
      await Provider.store.dispatch('registers/get', query);
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // showConfirmModal(submitForm, next);
    });

    return {
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
