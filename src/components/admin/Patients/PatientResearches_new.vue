<template>
  <div v-if="mounted">
    <RightTabsContainer>
      <template #icon>
        <svg class="icon-plus" >
          <use xlink:href="#plus"></use>
        </svg>
      </template>
      <template #slider-body>
        <div class="slider-body">
          <div class="slider-item-active">СМА</div>
          <div class="slider-item">Анафилаксия</div>
          <div class="slider-item">Альфа- маннозидоз</div>
          <div class="slider-item">Болезнь Помпе</div>
          <div class="slider-item">Антропо- метрия</div>
        </div>
      </template>
      <template #tabs>
        <div class="tabs-item-active">СМА</div>
        <div class="tabs-item">Анафилаксия</div>
        <div class="tabs-item">Альфа- маннозидоз</div>
      </template>
      <template #body>
        <div class="body">
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
            <div class="researches-item">
              <div class="green" :style="{ width: '100%'}" ></div>
              <div class="researches-item-title">ДИАГНОЗ</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '80%'}" ></div>
              <div class="researches-item-title">МОЛЕКУЛЯРНО-ГЕНЕТИЧЕСКОЕ ПОДТВЕРЖДЕНИЕ</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '50%'}" ></div>
              <div class="researches-item-title">СОСТОЯНИЕ ПАЦИЕНТА</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '80%'}" ></div>
              <div class="researches-item-title">РЕАБИЛИТАЦИОННЫЕ МЕРОПРИЯТИЯ</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '30%'}" ></div>
              <div class="researches-item-title">НУТРИЕВАЯ ПОДДЕРЖКА</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '10%'}" ></div>
              <div class="researches-item-title">ПАТОГЕНЕТИЧЕСКАЯ ТЕРАПИЯ</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '80%'}" ></div>
              <div class="researches-item-title">ИНТРАТЕКАЛЬНАЯ ТЕРАПИЯ</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '90%'}" ></div>
              <div class="researches-item-title">ФУНКЦИЯ ВНЕШНЕГО ДЫХАНИЯ (ФВД)</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '100%'}" ></div>
              <div class="researches-item-title">ЭЛЕКТРОКАРДИОГРАФИЯ (ЭКГ)</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '0%'}" ></div>
              <div class="researches-item-title">ЭХОЭНЦЕФАЛОГРАММА (ЭхоЭГ)</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '0%'}" ></div>
              <div class="researches-item-title">ЭЛЕКТРОМИОГРАФИЯ (ЭМГ)</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '0%'}" ></div>
              <div class="researches-item-title">ИГОЛЬЧАТАЯ ЭЛЕКТРОМИОГРАФИЯ (ЭМГ)</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '0%'}" ></div>
              <div class="researches-item-title">СТИМУЛЯЦИОННАЯ ЭЛЕКТРОНЕЙРОМИОГРАФИЯ (ЭНМГ)</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '100%'}" ></div>
              <div class="researches-item-title">УЛЬТРАЗВУКОВОЕ ИССЛЕДОВАНИЕ СЕРДЦА</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '0%'}" ></div>
              <div class="researches-item-title">МАГНИТНО-РЕЗОНАНСНАЯ ТОМОГРАФИЯ</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '0%'}" ></div>
              <div class="researches-item-title">РЕНТГЕНОДЕНСИТОМЕТРИЯ (поясничного отдела позвоночника)</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '70%'}" ></div>
              <div class="researches-item-title">РЕНТГЕНОГРАММА ПОЗВОНОЧНИКА</div>
            </div>
            <div class="researches-item">
              <div class="green" :style="{ width: '60%'}" ></div>
              <div class="researches-item-title">РЕНТГЕНОГРАФИЯ ОРГАНОВ ГРУДНОЙ КЛЕТКИ</div>
            </div>
          </div>
        </div>
      </template>
    </RightTabsContainer>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="plus">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z" ></path>
    </symbol>
  </svg>
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
import RightTabsContainer from '@/components/admin/Patients/RightTabsContainer.vue';

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
    RightTabsContainer,
  },
  setup(_, {emit}) {
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
  border: 1px solid #379FFF;
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
  border: 1px solid #B0A4C0;
  border-radius: $normal-border-radius;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #B0A4C0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item-active {
  width: 101px;
  height: 40px;
  border: 1px solid #379FFF;
  border-radius: $normal-border-radius;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;  
  font-size: 14px;
  color: #343E5C;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #B0A4C0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #B0A4C0;
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
  border: 1px solid #379FFF;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;  
  font-size: 14px;
  color: #343E5C;
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
  border-right: 1px solid #379FFF;
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
  color: #343E5C;
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}

.filter-item:hover {
  background: #343E5C;
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
  color: #343E5C;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
}

.green {
  position: absolute;
  background: #C7ECEA;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
}

</style>
