<template>
  <RightTabsContainer :is-toggle="isToggle" slider-on-width="180px" @toggle="toggle">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <div class="slider-item-search">
          <RemoteSearch key-value="representative" placeholder="Начните вводить имя представителя" @select="addRepresentative" />
        </div>
        <div class="slider-item" @click="openRepresentativeModal()">Создать представителя</div>
      </div>
    </template>
    <template #tabs>
      <div
        v-for="patientRepresentative in patient.patientsRepresentatives"
        :key="patientRepresentative.id"
        :class="{
          'tabs-item-active': selectedPatientRepresentative && selectedPatientRepresentative.id === patientRepresentative.id,
          'tabs-item': selectedPatientRepresentative.id !== patientRepresentative.id,
        }"
        @click="selectPatientRepresentative(patientRepresentative.id)"
      >
        <div class="tab-item-text">
          {{ patientRepresentative.getRepresentativeParentType() }}
        </div>
      </div>
    </template>
    <template #body>
      <div v-if="selectedPatientRepresentative && selectedPatientRepresentative.id" class="body">
        <ResearcheContainer background="#DFF2F8">
          <template #header>
            <div class="researche-name">Информация о представителе</div>
            <TopSliderContainer>
              <template #title>
                <StringItem width="100%" string="Управление представителем" />
              </template>
            </TopSliderContainer>
          </template>
          <template #body>
            <div class="line-item">
              <div class="item-left">
                <el-form>
                  <el-form-item label="Роль представителя">
                    <el-select
                      v-model="selectedPatientRepresentative.representativeTypeId"
                      placeholder="Выберите роль"
                      @change="(e) => selectRepresentativeType(e, selectedPatientRepresentative)"
                    >
                      <el-option
                        v-for="item in representativeTypes"
                        :key="item.id"
                        :label="item.getParentTypeName(selectedPatientRepresentative.representative.human.isMale)"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <div class="item-right">
                <Button
                  text="Удалить"
                  background="#ffffff"
                  margin="0"
                  height="42px"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :color-swap="true"
                  :with-icon="false"
                  @click="remove(selectedPatientRepresentative.id)"
                >
                </Button>
              </div>
            </div>
            <RepresentativePageInfo />
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
  <RepresentativeModal :show="showModal" @close="showModal = false" @save="createAndSaveRepresentative" />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, WritableComputedRef } from 'vue';
import { useStore } from 'vuex';

import Patient from '@/classes/Patient';
import PatientRepresentative from '@/classes/PatientRepresentative';
import Representative from '@/classes/Representative';
import RepresentativeToPatientRules from '@/classes/RepresentativeToPatientRules';
import RepresentativeType from '@/classes/RepresentativeType';
import RepresentativeModal from '@/components/admin/Patients/RepresentativeModal.vue';
import RepresentativePageInfo from '@/components/admin/Representatives/RepresentativePageInfo.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import Button from '@/services/components/Button.vue';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import RightTabsContainer from '@/services/components/RightTabsContainer.vue';
import StringItem from '@/services/components/StringItem.vue';
import TopSliderContainer from '@/services/components/TopSliderContainer.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientRepresentatives',
  components: {
    RepresentativeModal,
    RemoteSearch,
    RightTabsContainer,
    ResearcheContainer,
    RepresentativePageInfo,
    Button,
    TopSliderContainer,
    StringItem,
  },
  setup() {
    const store = useStore();
    const isToggle: Ref<boolean> = ref(false);
    const toggle = async (toggle: boolean) => {
      Provider.store.commit('representatives/set');
      isToggle.value = toggle;
    };
    const mount = ref(false);
    const rules = RepresentativeToPatientRules;
    const showModal: Ref<boolean> = ref(false);
    const patient: ComputedRef<Patient> = computed(() => store.getters['patients/item']);
    const representative: ComputedRef<Representative> = computed(() => store.getters['representatives/item']);
    const creatingIndex: Ref<number | undefined> = ref(undefined);
    const representativeTypes: ComputedRef<RepresentativeType[]> = computed(() => store.getters['representativeTypes/items']);

    const selectedPatientRepresentative: WritableComputedRef<PatientRepresentative> = computed(() => store.getters['patientsRepresentatives/item']);
    // const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      mount.value = true;
      // const pR = patient.value.patientsRepresentatives.length > 0 ? patient.value.patientsRepresentatives[0] : undefined;
      // if (!pR) {
      //   return;
      // }
      // Provider.store.commit('patientsRepresentatives/set', pR);
      // Provider.store.commit('representatives/set', pR?.representative);
    });

    const getRepresentativeTypeLabel = (item: RepresentativeType): string => {
      if (!selectedPatientRepresentative.value.representativeType) {
        return 'Неизвестный представитель';
      }
      return '';
      // if (selectedPatientRepresentative.value.representative.human.isMale) {
      //   return item.parentMaleType;
      // } else {
      //   return item.parentWomanType;
      // }
    };

    const addRepresentative = async (event: ISearchObject) => {
      if (patient.value.representativeExists(event.value)) {
        return ElMessage.warning('Выбранный представитель уже добавлен');
      }
      await store.dispatch('representatives/get', event.value);
      const item = patient.value.addRepresentative(representative.value);
      await store.dispatch('patientsRepresentatives/create', item);
    };
    //
    const openRepresentativeModal = (index?: number) => {
      creatingIndex.value = index;
      showModal.value = true;
      // store.commit('representatives/resetRepresentative');
    };

    const createAndSaveRepresentative = async (representative: Representative) => {
      const patientRepresentative = patient.value.addRepresentative(representative);
      await Provider.store.dispatch(`representatives/create`, representative);
      await store.dispatch('patientsRepresentatives/create', patientRepresentative);
      selectPatientRepresentative(patientRepresentative.id as string);
      showModal.value = false;
      await toggle(false);
    };

    const remove = async (id: string): Promise<void> => {
      // ClassHelper.RemoveFromClassById(id, patient.value.patientsRepresentatives, []);
      await store.dispatch('patientsRepresentatives/remove', id);
      // if (patient.value.patientsRepresentatives.length > 0) {
      //   return;
      // }
      Provider.store.commit('patientsRepresentatives/set');
      // selectPatientRepresentative(patient.value.patientsRepresentatives[patient.value.patientsRepresentatives.length - 1].id as string);
    };

    const selectRepresentativeType = async (e: string, patientRepresentative: PatientRepresentative): Promise<void> => {
      // const i = patient.value.patientsRepresentatives.findIndex((pr: PatientRepresentative) => pr.id === patientRepresentative.id);
      // if (i < 0) {
      //   return;
      // }
      // const t = representativeTypes.value.find((r: RepresentativeType) => r.id === e);
      // patient.value.patientsRepresentatives[i].representativeType = t as RepresentativeType;
      // patient.value.patientsRepresentatives[i].representativeTypeId = e;
      await Provider.store.dispatch('patientsRepresentatives/update', patientRepresentative);
    };

    const selectPatientRepresentative = (id: string): void => {
      // const v = patient.value.patientsRepresentatives.find((p: PatientRepresentative) => p.id === id);
      // Provider.store.commit('patientsRepresentatives/set', v);
      // Provider.store.commit('representatives/set', v?.representative);
    };

    return {
      selectPatientRepresentative,
      selectedPatientRepresentative,
      isToggle,
      toggle,
      selectRepresentativeType,
      remove,
      createAndSaveRepresentative,
      showModal,
      patient,
      // saveAndAddRepresentative,
      // representativeModal,
      openRepresentativeModal,
      addRepresentative,
      mount,
      rules,
      representativeTypes,
      // representativeToPatient,
      // remove,
      // add,
      getRepresentativeTypeLabel,
      // isEditMode,
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
}

.slider-item-search {
  width: 164px;
  height: 40px;
  border-radius: $normal-border-radius;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  cursor: pointer;
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
  margin-left: 0;
  margin-top: 5px;
  z-index: 2;
  cursor: default;
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
  margin-top: 60px;
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
  top: 0;
  left: 0;
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
  display: flex;
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
  align-items: flex-start;
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
  align-items: flex-start;
  text-transform: uppercase;
  white-space: nowrap;
  height: 100%;
}

.item-left {
  width: 50%;
  color: #343e5c;
  margin-right: 10px;
}

.item-right {
  width: 50%;
  color: #343e5c;
  margin-left: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: right;
}

.line-item {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 12px);
  margin: 0 10px 0 10px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

.el-select {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-timeline) {
  padding: 0;
}


@media screen and (max-width: 768px) {
  .tabs-item {
    width: 40px;
    height: 100px;
  }

  .tabs-item:hover {
    width: 44px;
  }

  .tabs-item-active {
    position: relative;
    width: 45px;
    height: 100px;
  }

  .tabs-item-active:hover {
    width: 45px;
  }

  .tab-item-text {
    transform: rotate(90deg);
  }
}
</style>
