<template>
  <RSContainer :menu-width="'300px'" :mobile-width="'6000px'">
    <template #visability>
      <GridContainer max-width="300px" grid-gap="0 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))"
        margin="0px">
        <InfoItem title="поиск и сортировка" margin="0" :with-open-window="false" height="98px" background="#F5F5F5"
          border-color="#C4C4C4" :with-hover="false">
          <div :style="{ width: '100%' }">
            <RemoteSearch key-value="patient" placeholder="Начните вводить ФИО" max-width="100%"
              @select="selectSearch" />
            <SortList class="filters-block" :store-mode="true" label-name="" max-width="100%" @load="$emit('load')" />
          </div>
        </InfoItem>
      </GridContainer>
    </template>

    <template #title-tools>
      <div class="tools-field">
        <FTSPPanel @change="$emit('load')" />
      </div>
    </template>

    <template #filter>
      <div class="filter-field">
        <!-- <GridContainer
        max-width="1500px"
        grid-gap="10px 10px"
        grid-template-columns="repeat(auto-fit, minmax(300px, 1fr))"
        margin="0"
      > -->
        <StringItem string="Выберите пол пациента:" font-size="14px" padding="0" margin="20px 0 0 10px" />
        <InfoItem title="пол" margin="10px 0" :with-open-window="false" height="auto" background="#F5F5F5"
          border-color="#C4C4C4" padding="7px" :with-hover="false">
          <Switch3Pos :first-model="onlyMaleFilter" :second-model="onlyFemaleFilter" default-label="пол"
            @load="$emit('load')" />
        </InfoItem>
        <FiltersButtonsSelect :models="createDisabilityFilters()" default-label="Инвалидность" @load="$emit('load')" />
        <StringItem string="Задайте диапазон дат рождения:" font-size="14px" padding="0" margin="20px 0 0 10px" />
        <FilterDatesRange :model="dateBirthFilter" @load="$emit('load')" />
        <div v-for="question in questions" :key="question.id">
          <FiltersButtonsSelect :models="createCustomFilterModels(question)" :default-label="question.name"
            :inverse="true" @load="$emit('load')" />
        </div>
        <!-- <InfoItem -->
        <!--   title="документы" -->
        <!--   margin="0" -->
        <!--   :with-open-window="false" -->
        <!--   height="98px" -->
        <!--   background="#F5F5F5" -->
        <!--   border-color="#C4C4C4" -->
        <!--   padding="7px" -->
        <!--   :with-hover="false" -->
        <!-- > -->
        <!--   <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px"> -->
        <!--     <GridContainer -->
        <!--       max-width="100%" -->
        <!--       grid-gap="7px" -->
        <!--       grid-template-columns="repeat(auto-fit, minmax(calc(33% - 7px), 1fr))" -->
        <!--       margin="0px" -->
        <!--     > -->
        <!--       <Button text="Паспорт" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" /> -->
        <!--       <Button text="СНИЛС" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" /> -->
        <!--       <Button text="ОМС" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" /> -->
        <!--     </GridContainer> -->
        <!--     <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(88px, 1fr))" margin="0px"> -->
        <!--       <Button text="Свидетельство пенсионера" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" /> -->
        <!--       <Button text="Удостоверение инвалида" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" /> -->
        <!--     </GridContainer> -->
        <!--   </GridContainer> -->
        <!-- </InfoItem> -->
      </div>
    </template>
    <template #download>
      <GridContainer max-width="65px" grid-gap="27px 10px" grid-template-columns="repeat(auto-fit, minmax(65px, 1fr))"
        margin="0 0 0 10px">
        <InfoItem title="сохранить" margin="0" :with-open-window="false" height="98px" background="#F5F5F5"
          border-color="#C4C4C4" padding="7px" :with-hover="false">
          <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))"
            margin="0px">
            <Button v-for="exportObj in exports" :key="exportObj.exportType" button-class="button-download"
              background-hover="#DFF2F8" :text="exportObj.exportType" @click="exportData(exportObj)" />
          </GridContainer>
        </InfoItem>
      </GridContainer>
    </template>
  </RSContainer>
  <ModalWindow v-if="ftspModalOpened" :show="ftspModalOpened">
    <PInput v-model="ftspName" />
    <Button text="Сохранить" @click="saveFTSP" />
  </ModalWindow>
</template>

<script setup lang="ts">
import AnswerVariant from '@/classes/AnswerVariant';
import ExportOptions from '@/classes/exportOptions/ExportOptions';
import PatientsExportOptionLib from '@/classes/exportOptions/libs/PatientsExportOptionLib';
import ResearchesExportOptionLib from '@/classes/exportOptions/libs/ResearchesExportOptionLib';
import Question from '@/classes/Question';
import ISearchObject from '@/interfaces/ISearchObject';
import PatientsFiltersLib from '@/libs/filters/PatientsFiltersLib';
import QuestionsFiltersLib from '@/libs/filters/QuestionsFiltersLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Provider from '@/services/Provider/Provider';

defineEmits(['load']);
const exports: ExportOptions[] = [ExportOptions.XLSX(PatientsExportOptionLib.allPatients(), ResearchesExportOptionLib.allResearches())];

const questions: Ref<Question[]> = Store.Items('questions');
const filterByRegister: Ref<FilterModel> = ref(new FilterModel());
const ftspModalOpened = ref(false);

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push(`/admin/patients/${event.value}`);
};

onBeforeMount(async () => {
  await Store.GetAll('ftspPresets');
  filterByRegister.value = PatientsFiltersLib.byRegisters([]);

  const fq = new FilterQuery();
  fq.setFilterModel(QuestionsFiltersLib.onlyFiltersQuetions());
  await Provider.store.dispatch('questions/getAll', { filterQuery: fq });
});

const createDisabilityFilters = (): FilterModel[] => {
  return [PatientsFiltersLib.withDisabilities()];
};

const createCustomFilterModels = (question: Question): FilterModel[] => {
  const filterModels: FilterModel[] = [];
  if (question.valueType.isRadio()) {
    question.answerVariants.forEach((a: AnswerVariant) => {
      if (a.id) {
        filterModels.push(PatientsFiltersLib.byQuestionVariantId(a.id, a.name));
      }
    });
  }
  if (question.valueType.isSet()) {
    question.answerVariants.forEach((a: AnswerVariant) => {
      if (a.id) {
        filterModels.push(PatientsFiltersLib.bySelectedAnswerVariantId(a.id, a.name));
      }
    });
  }
  return filterModels;
};

const exportData = async (exportOptions: ExportOptions): Promise<void> => {
  await Provider.store.dispatch('dataExport/export', { exportOptions: exportOptions, ftsp: Provider.ftsp.value });
};

const onlyMaleFilter = PatientsFiltersLib.onlyMale();
const onlyFemaleFilter = PatientsFiltersLib.onlyFemale();
const dateBirthFilter = PatientsFiltersLib.byDateBirth();
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

// .filter-save {
//   position: sticky;
//   top: 0px;
//   height: 40px;
//   width: 100%;
//   background: #006bb4;
// }

.admin-add2 {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
  margin-left: -6px;
}

.admin-add2:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.admin-del {
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
  margin-left: -6px;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.filter-field {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 0 10px;
  height: calc(100% - 110px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.tools-field {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0 8px 10px 10px;
}

.button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  font-size: 12px;

  &-filter {
    background: #ffffff;
  }

  &-download {
    background: #dff2f8;
  }
}

:deep(.button-register) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

:deep(.name-item) {
  margin: 0;
  width: auto;
  border-color: #ffffff;
  padding: 0;
}

.grid {
  max-width: auto;
  grid-gap: 10px;
  margin: 0;
  grid-template-columns: repeat(auto-fit, minmax(99px, 1fr));
}

.plus-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
}

.save-picker-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

.gender-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 18px;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

:deep(.edit-button) {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

:deep(.files-buttons) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;

  &:hover {
    background: #dff2f8;
  }
}

.edv {
  font-size: 14px;
  padding: 0;
  margin: 0 5px 0 0;

  &-active {
    color: #b0a4c0;
  }
}

.patient-name {
  color: #006bb4;
  font-size: 17px;
  min-width: 150px;
  width: 100%;
  padding: 0;
}

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}

.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-filter {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }

  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}
</style>
