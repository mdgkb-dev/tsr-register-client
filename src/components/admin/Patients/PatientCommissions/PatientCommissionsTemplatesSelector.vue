<template>
  <RightTabsContainer :is-toggle="isToggle" slider-on-width="180px" @toggle="toggle">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <div v-for="commissionTemplate in commissionsTemplates" :key="commissionTemplate.id" class="slider-item" @click="addCommission(commissionTemplate)">
          {{ commissionTemplate.name.substring(12) }}
        </div>
      </div>
    </template>
    <template #tabs>
      <div
        v-for="commission in patient.commissions"
        :key="commission.id"
        :class="{
          'tabs-item-active': selectedCommission && commission.id === selectedCommission.id,
          'tabs-item': selectedCommission && commission.id !== selectedCommission.id,
        }"
        @click="selectCommission(commission)"
      >
        <div class="tab-item-text">№{{ commission.number }}</div>
      </div>
    </template>
    <template #body>
      <ModalWindow :show="showModalDoctorList" title="Список врачей" @close="showModalDoctorList = false">
        <PersonalityList />
      </ModalWindow>
      <ModalWindow :show="showModalDiagnosis" title="Выберите диагноз" @close="showModalDiagnosis = false">
        <GridContainer grid-gap="5px" margin="10px 0">
          <Button
            v-for="patientDiagnosis in patient.patientDiagnosis"
            :key="patientDiagnosis.id"
            button-class="change-button"
            :text="patientDiagnosis.mkbItem.getFullName()"
            @click="setPatientDiagnosis(patientDiagnosis)"
          />
        </GridContainer>
      </ModalWindow>

      <ModalWindow :show="showModalMedicine" title="Выберите лекарство" @close="showModalMedicine = false">
        <DrugSelectForm @select="(e) => setDrugRecipe(e, selectedCommission)" />
      </ModalWindow>

      <div class="body">
        <div v-if="selectedCommission">
          <ResearcheContainer background="#DFF2F8">
            <template #header>
              <div class="researche-name">
                <span>Заболевание СПИНАЛЬНО МЫШЕЧНАЯ АТРОФИЯ</span>
              </div>

              <div class="line-item">
                <div class="item-name">Протокол №{{ selectedCommission.number }}</div>
                <Button
                  text="Удалить"
                  background="#ffffff"
                  margin="0"
                  height="42px"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :color-swap="true"
                  @click="removeCommission"
                >
                </Button>
              </div>

              <div class="line-item">
                <div class="item-left">
                  <el-form>
                    <el-form-item label="Дата проведения" @change="updateCommission">
                      <DatePicker v-model="selectedCommission.date" />
                    </el-form-item>
                  </el-form>
                </div>
                <div class="item-right">
                  <el-form>
                    <el-form-item label="Стасус заявки:">
                      <el-select v-model="status">
                        <el-option v-for="s in statuses" :key="s" :label="s" :value="s"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </template>
            <template #body>
              <div class="line-item">
                <div class="item-left">
                  <el-form>
                    <el-form-item label="Дата начала периода:" @change="updateCommission">
                      <DatePicker v-model="selectedCommission.startDate" />
                    </el-form-item>
                  </el-form>
                </div>
                <div class="item-right">
                  <el-form>
                    <el-form-item label="Дата окончания периода:" @change="updateCommission">
                      <DatePicker v-model="selectedCommission.endDate" />
                    </el-form-item>
                  </el-form>
                </div>
              </div>

              <!-- <CommissionDoctors :commission="selectedCommission" /> -->

              <!-- <CommissionDrug :commission="selectedCommission" /> -->
              <!-- <el-select v-model="selectedCommission.patientDiagnosisId" @change="updateCommission">
                <el-option
                  v-for="patientDiagnosis in patient.patientDiagnosis"
                  :key="patientDiagnosis.id"
                  :label="patientDiagnosis.mkbItem.getFullName()"
                  :value="patientDiagnosis.id"
                />
              </el-select> -->
              <div class="flex-block">
                <div class="flex-block-left">
                  <Button text="Состав врачебной комиссии" button-class="medical-commission-button" color="#006bb4" @click="openModalDoctorList()" />
                  <Button
                    :text="selectedCommission.patientDiagnosis ? selectedCommission.patientDiagnosis.mkbItem.getFullName() : 'Выбрать диагноз'"
                    button-class="medical-commission-button"
                    :color="selectedCommission.patientDiagnosis ? '#006bb4' : '#B0A4C0'"
                    @click="openModalDiagnosis()"
                  />
                  <Button
                    :text="selectedCommission.drugRecipe ? selectedCommission.drugRecipe.drug?.getName() : 'Выбрать лекарство'"
                    button-class="medical-commission-button"
                    :color="selectedCommission.drug ? '#006bb4' : '#B0A4C0'"
                    margin="0"
                    @click="openModalMedicine()"
                  />
                </div>
                <Button
                  text="Сформировать протокол"
                  button-class="protocol-button"
                  :color="selectedCommission.drug && selectedCommission.patientDiagnosis ? '#006bb4' : '#B0A4C0'"
                  margin="0 0 0 10px"
                  @click="fillCommissionDownload"
                />
              </div>

              <Button
                text="Рассчитать потребность"
                button-class="protocol-button"
                :color="selectedCommission.drug && selectedCommission.patientDiagnosis ? '#006bb4' : '#B0A4C0'"
                margin="0 0 0 10px"
                @click="calculateDrugNeeding"
              />
            </template>
          </ResearcheContainer>
        </div>
      </div>
    </template>
  </RightTabsContainer>
  <Plus />
  <Back />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Back from '@/assets/svg/Back.svg';
import Plus from '@/assets/svg/Plus.svg';
import Commission from '@/classes/Commission';
import CommissionTemplate from '@/classes/CommissionTemplate';
import Drug from '@/classes/Drug';
import DrugNeedingOptions from '@/classes/DrugNeedingOptions';
import DrugRecipe from '@/classes/DrugRecipe';
import Patient from '@/classes/Patient';
// import DrugSelectForm from '@/components/admin/Commissions/DrugSelectForm.vue';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import DrugSelectForm from '@/components/admin/Commissions/DrugSelectForm.vue';
import PersonalityList from '@/components/admin/Patients/PersonalityList.vue';
import Button from '@/services/components/Button.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
import IAnthropomentry from '@/interfaces/IAnthropomentry';
import PatientDiagnosisFiltersLib from '@/libs/filters/PatientDiagnosisFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import ClassHelper from '@/services/ClassHelper';
import DatePicker from '@/services/components/DatePicker.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import RightTabsContainer from '@/services/components/RightTabsContainer.vue';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'PatientCommissionsTemplatesSelector',
  components: {
    RightTabsContainer,
    ResearcheContainer,
    Button,
    DatePicker,
    PersonalityList,
    ModalWindow,
    // DrugSelectForm,
    GridContainer,
    DrugSelectForm,
    Plus,
    Back,
  },

  setup() {
    const mounted = ref(false);
    const statuses: string[] = ['Собрана врачебная комиссия', 'Заявка отправлена в Фонд', 'Заявка подтверждена'];
    const status: Ref<string> = ref('');
    const drugs: ComputedRef<Drug[]> = computed(() => Provider.store.getters['drugs/items']);

    const isToggle: Ref<boolean> = ref(false);
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    const actualAnthropomentry: ComputedRef<IAnthropomentry> = computed(() => Provider.store.getters['patients/actualAnthropometry']);
    const commissionsTemplates: ComputedRef<CommissionTemplate[]> = computed(() => Provider.store.getters['commissionsTemplates/items']);

    const showModalDiagnosis: Ref<boolean> = ref(false);
    const showModalMedicine: Ref<boolean> = ref(false);
    const showModalDoctorList: Ref<boolean> = ref(false);

    const selectedCommission: Ref<Commission | undefined> = ref(patient.value.commissions.length > 0 ? patient.value.commissions[0] : undefined);
    const toggle = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('commissionsTemplates/getAll');
      }
      isToggle.value = toggle;
    };

    const addCommission = async (template: CommissionTemplate): Promise<void> => {
      const item = patient.value.addCommission(template);

      await Provider.store.dispatch('patientsDiagnosis/getAll', FilterQuery.Create([PatientDiagnosisFiltersLib.byPatientId(patient.value.id as string)], []));

      await Provider.store.dispatch('commissions/createAndSetNumber', item);
      selectedCommission.value = patient.value.commissions[patient.value.commissions.length - 1];
      isToggle.value = false;
    };

    const updateCommission = async (): Promise<void> => {
      await Provider.store.dispatch('commissions/update', selectedCommission.value);
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('drugs/getAll');
    });

    const selectCommission = (c?: Commission): void => {
      selectedCommission.value = c;
    };

    const removeCommission = async (): Promise<void> => {
      if (!selectedCommission.value) {
        return;
      }
      ClassHelper.RemoveFromClassById(selectedCommission.value.id, patient.value.commissions, []);
      await Provider.store.dispatch('commissions/remove', selectedCommission.value.id);
      selectedCommission.value = patient.value.commissions.length > 0 ? patient.value.commissions[patient.value.commissions.length - 1] : undefined;
    };

    const openModalDiagnosis = () => {
      Provider.store.commit('commissions/set', selectedCommission.value);
      showModalDiagnosis.value = true;
    };
    const openModalMedicine = async () => {
      await Provider.store.dispatch('drugs/getAll');
      Provider.store.commit('commissions/set', selectedCommission.value);
      showModalMedicine.value = true;
    };

    const openModalDoctorList = () => {
      Provider.store.commit('commissions/set', selectedCommission.value);
      showModalDoctorList.value = true;
    };

    const setPatientDiagnosis = async (patientDiagnosis: PatientDiagnosis): Promise<void> => {
      // const findedCommission = c.value.find((com: Commission) => com.id === c.id);
      if (!selectedCommission.value) {
        return;
      }
      selectedCommission.value.setPatientDiagnosis(patientDiagnosis);
      showModalDiagnosis.value = false;
      await updateCommission();
    };

    const selectDrug = async (item: DrugRecipe): Promise<void> => {
      if (!selectedCommission.value) {
        return;
      }
      selectedCommission.value?.setDrugRecipe(item);
      showModalMedicine.value = false;
      await updateCommission();
    };

    const fillCommissionDownload = async (): Promise<void> => {
      await Provider.store.dispatch('commissions/filledApplicationDownload', selectedCommission.value);
    };

    const setDrugRecipe = async (drugRecipe: DrugRecipe, c: Commission): Promise<void> => {
      selectedCommission.value?.setDrugRecipe(drugRecipe);
      showModalMedicine.value = false;
      await updateCommission();
    };

    const calculateDrugNeeding = async () => {
      await Provider.store.dispatch('patients/getActualAnthropomentry', patient.value.id);
      if (selectedCommission.value) {
        const opt = DrugNeedingOptions.Create(
          actualAnthropomentry.value.weight,
          actualAnthropomentry.value.height,
          selectedCommission.value.startDate,
          selectedCommission.value.endDate,
          selectedCommission.value.drugRecipe?.drugDozeId
        );
        await Provider.store.dispatch('drugDozes/calculateNeeding', opt);
      }
    };

    return {
      calculateDrugNeeding,
      setDrugRecipe,
      fillCommissionDownload,
      selectDrug,
      drugs,
      setPatientDiagnosis,
      updateCommission,
      removeCommission,
      status,
      statuses,
      selectCommission,
      selectedCommission,
      commissionsTemplates,
      addCommission,
      isToggle,
      toggle,
      mounted,
      patient,
      openModalDiagnosis,
      showModalDiagnosis,
      openModalMedicine,
      showModalMedicine,
      openModalDoctorList,
      showModalDoctorList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';
import { ElMessage } from 'element-plus';

.hidden {
  display: none;
}

:deep(.change-button) {
  width: 100%;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
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

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #b0a4c0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: #dff2f8;
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
  border-left: #dff2f8;
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

.diagnosis-doctorName {
  padding: 10px 0;
}

.doctor-title {
  padding: 10px 0;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

.el-select {
  width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
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
}

.line-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-name {
  min-height: 42px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  color: #343e5c;
  font-size: 16px;
  margin-bottom: 20px;
  // text-transform: uppercase;
}

.container-item {
  width: 100%;
}

:deep(.medical-commission-button) {
  width: 33%;
  height: 40px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  margin: 0 10px 0 0;
  // color: #006bb4;
  background: #ffffff;
}

:deep(.protocol-button) {
  width: 25%;
  height: 62px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  // color: #006bb4;
  background: #ffffff;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-block-left {
  width: 75%;
  padding: 10px;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
