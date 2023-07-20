<template>
  <RightSliderContainer :menu-width="'300px'" :mobile-width="'1215px'">
    <template #visability>
      <GridContainer max-width="300px" grid-gap="0 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0px">
        <InfoItem
          title="поиск и сортировка"
          margin="0"
          :with-open-window="false"
          height="98px"
          background="#F5F5F5"
          border-color="#C4C4C4"
          :with-hover="false"
        >
          <div :style="{ width: '100%' }">
            <RemoteSearch
              :must-be-translated="true"
              :key-value="schema.patient.key"
              placeholder="Начните вводить ФИО"
              max-width="100%"
              @select="selectSearch"
            />
            <SortList class="filters-block" :store-mode="true" label-name="" max-width="100%" @load="loadPatients" />
          </div>
        </InfoItem>
      </GridContainer>
    </template>

    <template #filter>
      <GridContainer
        max-width="900px"
        grid-gap="70px 10px"
        grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))"
        margin="0 0 0 10px"
      >
        <GridContainer
          max-width="500px"
          grid-gap="10px"
          grid-template-columns="repeat(auto-fit, minmax(95px, 1fr))"
          margin="0px"
          background="#F5F6F8"
        >
          <FiltersButtonsSelect
            :filter-model="filterByRegister"
            :models="createSexFilters()"
            default-label="пол"
            :inverse="true"
            @load="$emit('load')"
          />
          <FiltersButtonsSelect
            :filter-model="filterByDisabilities"
            :models="createDisabilityFilters()"
            default-label="инвалидность"
            @load="$emit('load')"
          />
        </GridContainer>
        <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(calc(50% - 7px), 1fr))" margin="0px">
          <FiltersButtonsMultiply
            :filter-model="filterByRegister"
            :options="createRegistersOptions()"
            default-label="регистры"
            @load="$emit('load')"
          />
        </GridContainer>

        <InfoItem
          title="документы"
          margin="0"
          :with-open-window="false"
          height="98px"
          background="#F5F5F5"
          border-color="#C4C4C4"
          padding="7px"
          :with-hover="false"
        >
          <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px">
            <GridContainer
              max-width="100%"
              grid-gap="7px"
              grid-template-columns="repeat(auto-fit, minmax(calc(33% - 7px), 1fr))"
              margin="0px"
            >
              <Button text="Паспорт" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" />
              <Button text="СНИЛС" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" />
              <Button text="ОМС" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" />
            </GridContainer>
            <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(88px, 1fr))" margin="0px">
              <Button text="Свидетельство пенсионера" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" />
              <Button text="Удостоверение инвалида" button-class="button-filter" background-hover="#DFF2F8" :toggle-mode="true" />
            </GridContainer>
          </GridContainer>
        </InfoItem>
        <FiltersButtonsSelect
          v-for="question in questions"
          :key="question.id"
          :filter-model="filterByRegister"
          :models="createCustomFilterModels(question)"
          :default-label="question.name"
          :inverse="true"
          @load="$emit('load')"
        />
      </GridContainer>
    </template>
    <template #download>
      <GridContainer max-width="65px" grid-gap="27px 10px" grid-template-columns="repeat(auto-fit, minmax(65px, 1fr))" margin="0 0 0 10px">
        <InfoItem
          title="сохранить"
          margin="0"
          :with-open-window="false"
          height="98px"
          background="#F5F5F5"
          border-color="#C4C4C4"
          padding="7px"
          :with-hover="false"
        >
          <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px">
            <Button text="xlsx" button-class="button-download" background-hover="#DFF2F8"> </Button>
            <Button text="pdf" button-class="button-download" background-hover="#DFF2F8"> </Button>
          </GridContainer>
        </InfoItem>
      </GridContainer>
    </template>
  </RightSliderContainer>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import Register from '@/classes/Register';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import Button from '@/components/Base/Button.vue';
import RightSliderContainer from '@/components/Base/RightSliderContainer.vue';
import InfoItem from '@/components/Lib/InfoItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import FiltersButtonsMultiply from '@/components/TableFilters/FiltersButtonsMultiply.vue';
import FiltersButtonsSelect from '@/components/TableFilters/FiltersButtonsSelect.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/shared/IOption';
import PatientsFiltersLib from '@/libs/filters/PatientsFiltersLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminPatientsListFilters',
  components: {
    FiltersButtonsMultiply,
    FiltersButtonsSelect,
    RemoteSearch,
    SortList,
    Button,
    InfoItem,
    GridContainer,
    RightSliderContainer,
  },
  emits: ['load'],
  setup() {
    const questions: Ref<Question[]> = computed(() => Provider.store.getters['questions/items']);
    const filterByRegister: Ref<FilterModel> = ref(new FilterModel());
    const filterByDisabilities: Ref<FilterModel> = ref(new FilterModel());
    const registers: Ref<Register[]> = computed(() => Provider.store.getters['registers/items']);
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/patients/${event.value}`);
    };

    onBeforeMount(() => {
      filterByRegister.value = PatientsFiltersLib.byRegisters([]);
    });

    const createSexFilters = (): FilterModel[] => {
      return [PatientsFiltersLib.onlyMale(), PatientsFiltersLib.onlyFemale()];
    };

    const createDisabilityFilters = (): FilterModel[] => {
      return [PatientsFiltersLib.withDisabilities()];
    };

    const createRegistersOptions = (): IOption[] => {
      const ids: IOption[] = [];
      registers.value.forEach((r: Register) => ids.push({ value: r.id as string, label: r.name }));
      return ids;
    };

    const createCustomFilterModels = (question: Question): FilterModel[] => {
      const filterModels: FilterModel[] = [];
      question.answerVariants.forEach((a: AnswerVariant) => {
        if (a.id) {
          filterModels.push(PatientsFiltersLib.byQuestionVariantId(a.id, a.name));
        }
      });
      return filterModels;
    };

    return {
      createCustomFilterModels,
      questions,
      registers,
      createDisabilityFilters,
      createSexFilters,
      filterByDisabilities,
      filterByRegister,
      selectSearch,
      createRegistersOptions,
      ...Provider.getAdminLib(),
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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
  margin: 0px;
  width: auto;
  border-color: #ffffff;
  padding: 0px;
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
  padding: 0px;
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
  padding: 0px;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0px;
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
    padding: 0px;
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