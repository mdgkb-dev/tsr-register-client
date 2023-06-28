<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <RightSliderContainer :menu-width="'300px'" :mobile-width="'1215px'">
      <template #visability>
        <GridContainer max-width="300px" grid-gap="0 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0px">
          <InfoItem
            title="поиск и сортировка"
            margin="0"
            :with-open-window="false"
            height="76px"
            background="#F5F5F5"
            border-color="#C4C4C4"
            padding="7px"
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
          grid-gap="27px 10px"
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
              @load="loadPatients"
            />
            <FiltersButtonsSelect
              :filter-model="filterByDisabilities"
              :models="createDisabilityFilters()"
              default-label="инвалидность"
              @load="loadPatients"
            />
          </GridContainer>
          <GridContainer
            max-width="100%"
            grid-gap="7px"
            grid-template-columns="repeat(auto-fit, minmax(calc(50% - 7px), 1fr))"
            margin="0px"
          >
            <FiltersButtonsMultiply
              :filter-model="filterByRegister"
              :options="createRegistersOptions()"
              default-label="регистры"
              @load="loadPatients"
            />
          </GridContainer>

          <InfoItem
            title="документы"
            margin="0"
            :with-open-window="false"
            height="76px"
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
        </GridContainer>
      </template>
      <template #download>
        <GridContainer
          max-width="65px"
          grid-gap="27px 10px"
          grid-template-columns="repeat(auto-fit, minmax(65px, 1fr))"
          margin="0 0 0 10px"
        >
          <InfoItem
            title="сохранить"
            margin="0"
            :with-open-window="false"
            height="76px"
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

    <div class="scroll-block">
      <div class="patient-count">Количество пациентов: {{ count }}</div>
      <div v-for="patient in patients" :key="patient.id">
        <CollapseItem :is-collaps="false" padding="0 8px">
          <template #inside-title>
            <div class="flex-block" @click.prevent="() => undefined">
              <div class="item-flex">
                <div class="line-item-left">
                  <Button button-class="edit-button" color="#006bb4" icon="edit" icon-class="edit-icon" @click="edit(patient.id)" />
                  <InfoItem
                    :close="infoItemToggle"
                    margin="0 0 0 10px"
                    border-color="#ffffff"
                    :with-hover="false"
                    :with-open-window="editMode"
                  >
                    <StringItem :string="patient.human.getFullName()" custom-class="patient-name" @click="patient.editNameMode = true" />

                    <template #open-inside-content>
                      <GridContainer custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0">
                        <InfoItem
                          title="фамилия"
                          icon="edit-title"
                          :with-open-window="false"
                          :with-hover="false"
                          border-color="#ffffff"
                          padding="0"
                        >
                          <el-input v-model="patient.human.surname" @click.stop="() => undefined" />
                        </InfoItem>
                        <InfoItem
                          title="имя"
                          icon="edit-title"
                          :with-open-window="false"
                          :with-hover="false"
                          border-color="#ffffff"
                          padding="0"
                        >
                          <el-input v-model="patient.human.name" @click.stop="() => undefined" />
                        </InfoItem>
                        <InfoItem
                          title="отчество"
                          icon="edit-title"
                          :with-open-window="false"
                          :with-hover="false"
                          border-color="#ffffff"
                          padding="0"
                        >
                          <el-input v-model="patient.human.patronymic" @click.stop="() => undefined" />
                        </InfoItem>
                        <Button button-class="save-button" text="Сохранить" @click="updateHumanName(patient)" />
                      </GridContainer>
                    </template>
                  </InfoItem>
                </div>

                <div class="line-item-right">
                  <Button button-class="gender-button" :text="patient.human.getGender()" @click="updateIsMale(patient.human)" />
                  <InfoItem title="инвалидность" icon="edit-title" margin="0" :with-open-window="false" :with-hover="editMode">
                    <div v-if="patient.getActuallyDisability()?.getActuallyEdv()" class="disability-circles">
                      <StringItem
                        string="А"
                        :custom-class="patient.getActuallyDisability()?.getActuallyEdv()?.parameter1 ? 'edv-active' : 'edv'"
                      />
                      <StringItem
                        string="В"
                        :custom-class="patient.getActuallyDisability()?.getActuallyEdv()?.parameter2 ? 'edv-active' : 'edv'"
                      />
                      <StringItem
                        string="С"
                        :custom-class="patient.getActuallyDisability()?.getActuallyEdv()?.parameter3 ? 'edv-active' : 'edv'"
                        margin="0 0 0 0"
                      />
                      <StringItem string=", до 29.12.23г." font-size="12px" />
                    </div>
                    <div v-else>Нет справок ЕДВ</div>
                  </InfoItem>
                </div>
              </div>
              <div class="item-flex">
                <GridContainer
                  max-width="1920px"
                  custom-class="grid"
                  grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))"
                  margin="0"
                >
                  <GridContainer custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))" margin="0px">
                    <InfoItem title="дата рождения" margin="0" :with-open-window="false" :with-hover="editMode">
                      <SmallDatePicker
                        v-model:model-value="patient.human.dateBirth"
                        placeholder="Выбрать"
                        @change="updateHuman(patient.human)"
                      />
                    </InfoItem>
                    <InfoItem title="представители" margin="0" open-width="290px" :with-hover="editMode" :with-open-window="editMode">
                      <div class="block">
                        <div v-for="rep in patient.patientsRepresentatives" :key="rep">
                          <StringItem
                            v-if="patient.patientsRepresentatives"
                            :string="rep.getRepresentativeParentType() + ','"
                            font-size="14px"
                          />
                        </div>
                      </div>

                      <template #open-inside-content>
                        <GridContainer custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(276px, 1fr))">
                          <div v-for="(rep, key, index) in patient.patientsRepresentatives" :key="index">
                            <InfoItem margin="0" :with-open-window="false" height="32px">
                              <template #title>
                                <StringItem
                                  :string="rep.getRepresentativeParentType()"
                                  font-size="10px"
                                  padding="0 0 0 3px"
                                  color="#D42E61"
                                />
                              </template>
                              <div>
                                <StringItem
                                  v-if="rep.representative.human.contact.phone"
                                  :string="rep.representative.human.contact.phone"
                                  font-size="12px"
                                  padding="0 0 0 3px"
                                  color="#1979CF"
                                />
                                <StringItem :string="rep.representative.human.getFullName()" font-size="12px" padding="0 0 0 3px" />
                              </div>
                            </InfoItem>
                          </div>
                          <Button button-class="plus-button" icon="plus" icon-class="icon-plus" />

                          <RemoteSearch
                            :must-be-translated="true"
                            key-value="representative"
                            placeholder="Начните вводить имя представителя"
                            @click.stop="() => undefined"
                            @select="(e) => addRepresentative(e, patient)"
                          />
                        </GridContainer>
                      </template>
                    </InfoItem>
                  </GridContainer>
                  <InfoItem title="регистры" margin="0 0 0 0px" open-width="100%" :with-hover="editMode" :with-open-window="editMode">
                    <div class="block">
                      <div v-for="patientRegister in patient.patientsRegisters" :key="patientRegister.id">
                        <StringItem :string="patientRegister.register.getTagName() + ','" font-size="14px" />
                      </div>
                    </div>

                    <template #open-inside-content>
                      <GridContainer custom-class="grid" grid-gap="7px">
                        <Button
                          v-for="register in registers"
                          :key="register.id"
                          :text="register.name"
                          button-class="button-register"
                          background-hover="#DFF2F8"
                          :is-toggle="patient.inRegister(register.id) ? true : false"
                          :toggle-mode="true"
                          @click="toggleRegister(register, patient)"
                        />
                      </GridContainer>
                    </template>
                  </InfoItem>
                  <InfoItem title="диагнозы" margin="0 0 0 0px" :with-hover="editMode" :with-open-window="editMode">
                    <div v-for="diagnosis in patient.patientDiagnosis" :key="diagnosis">
                      <StringItem :string="diagnosis.mkbItem.getCode() + ',&nbsp'" font-size="14px" />
                    </div>

                    <template #open-inside-content>
                      <GridContainer max-width="100%" grid-gap="7px" margin="0 0 10px 0">
                        <div v-for="diagnosis in patient.patientDiagnosis" :key="diagnosis">
                          <InfoItem
                            margin="0"
                            :with-open-window="false"
                            height="32px"
                            icon="del"
                            color-selected="#E46862"
                            @click="removeMkbItem(diagnosis.id, patient)"
                          >
                            <StringItem :string="diagnosis.mkbItem.getCode() + ',&nbsp'" font-size="11px" />
                          </InfoItem>
                        </div>
                      </GridContainer>

                      <RemoteSearch
                        :must-be-translated="true"
                        key-value="mkbItem"
                        placeholder="Начните вводить диагноз"
                        @click.stop="() => undefined"
                        @select="(e) => addMkbItem(e, patient)"
                      />
                    </template>
                  </InfoItem>
                  <InfoItem title="документы" margin="0 0 0 0px" :with-hover="editMode" :with-open-window="editMode">
                    <div v-for="document in patient.human.documents" :key="document">
                      <StringItem :string="document.documentType.getTagName()" font-size="14px" />
                    </div>

                    <template #open-inside-content>
                      <GridContainer custom-class="grid" grid-gap="7px">
                        <div v-for="document in patient.human.documents" :key="document">
                          <InfoItem icon="del" margin="0" :with-open-window="false" height="32px" color-selected="#E46862">
                            <StringItem :string="document.documentType.getTagName()" font-size="11px" />
                          </InfoItem>
                        </div>

                        <Button button-class="plus-button" icon="plus" icon-class="icon-plus" />
                      </GridContainer>
                    </template>
                  </InfoItem>
                </GridContainer>
              </div>
            </div>
          </template>
        </CollapseItem>
      </div>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Human from '@/classes/Human';
import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientRegister from '@/classes/PatientRegister';
import Register from '@/classes/Register';
import Representative from '@/classes/Representative';
import User from '@/classes/User';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import RightSliderContainer from '@/components/Base/RightSliderContainer.vue';
import InfoItem from '@/components/Lib/InfoItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import FiltersButtonsMultiply from '@/components/TableFilters/FiltersButtonsMultiply.vue';
import FiltersButtonsSelect from '@/components/TableFilters/FiltersButtonsSelect.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/shared/IOption';
import PatientsFiltersLib from '@/libs/filters/PatientsFiltersLib';
import PatientsSortsLib from '@/libs/sorts/PatientsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPatientsList',
  components: {
    FiltersButtonsMultiply,
    FiltersButtonsSelect,
    RemoteSearch,
    SortList,
    AdminListWrapper,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
    GridContainer,
    SmallDatePicker,
    RightSliderContainer,
  },
  setup() {
    const patients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/items']);
    const count: Ref<number> = computed(() => Provider.store.getters['patients/count']);
    const registers: Ref<Register[]> = computed(() => Provider.store.getters['registers/items']);
    const filterByRegister: Ref<FilterModel> = ref(new FilterModel());
    const filterByDisabilities: Ref<FilterModel> = ref(new FilterModel());
    // const filteredPatients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/filteredPatients']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const editMode: Ref<boolean> = ref(true);
    const infoItemToggle: Ref<boolean> = ref(false);
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);
    const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
    const loadPatients = async () => {
      await Provider.loadItems();
    };

    const load = async () => {
      await Provider.store.dispatch('registers/getAll');
      await loadPatients();
      filterByRegister.value = PatientsFiltersLib.byRegisters([]);
    };

    const addPatient = async (): Promise<void> => {
      const patient = new Patient();
      await Provider.store.dispatch('patients/createWithoutReset', patient);
      Provider.store.commit('patients/unshiftToAll', patient);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Пациенты',
        buttons: [
          { text: 'Добавить пациента', type: 'normal-button', action: addPatient },
          {
            text: computed(() => (editMode.value ? 'Просмотр' : 'Редактирование')),
            action: () => (editMode.value = !editMode.value),
            type: 'normal-button',
          },
        ],
      },
      sortsLib: PatientsSortsLib,
      getAction: 'getAllWithCount',
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/patients/${event.value}`);
    };

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

    const updateHuman = async (human: Human): Promise<void> => {
      await Provider.withHeadLoader(async () => {
        await Provider.store.dispatch('humans/update', human);
      });
    };

    const updateIsMale = async (human: Human): Promise<void> => {
      human.isMale = !human.isMale;
      await updateHuman(human);
    };
    const updateHumanName = async (patient: Patient): Promise<void> => {
      patient.editNameMode = false;
      infoItemToggle.value = !infoItemToggle.value;
      await updateHuman(patient.human);
    };

    const representative: ComputedRef<Representative> = computed(() => Provider.store.getters['representatives/item']);
    const addRepresentative = async (event: ISearchObject, patient: Patient) => {
      if (patient.representativeExists(event.value)) {
        return ElMessage.warning('Выбранный представитель уже добавлен');
      }
      await Provider.store.dispatch('representatives/get', event.value);
      const item = patient.addRepresentative(representative.value);
      await Provider.store.dispatch('patientsRepresentatives/create', item);
    };

    const toggleRegister = async (register: Register, patient: Patient): Promise<void> => {
      let patientRegister = patient.patientsRegisters.find((pr: PatientRegister) => pr.registerId === register.id);
      if (patientRegister) {
        ClassHelper.RemoveFromClassById(patientRegister.id, patient.patientsRegisters, []);
        return await Provider.store.dispatch('patientsRegisters/remove', patientRegister.id);
      }
      patientRegister = patient.addRegister(register, user.value);
      return await Provider.store.dispatch('patientsRegisters/create', patientRegister);
    };

    const mkbItem: ComputedRef<MkbItem> = computed<MkbItem>(() => Provider.store.getters['mkbItems/item']);
    const addMkbItem = async (event: ISearchObject, patient: Patient): Promise<void> => {
      const patientDiagnosis = patient.getMkbItems().find((pd: PatientDiagnosis) => pd.mkbItemId === event.value);
      if (patientDiagnosis) {
        ElMessage.warning('Выбранный диагноз уже добавлен');
        return;
      }
      await Provider.store.dispatch('mkbItems/get', event.value);
      patient.addMkbItem(mkbItem.value);
      const diagnosisLinks = patient.getMkbItems();
      await Provider.store.dispatch('patientDiagnosis/create', diagnosisLinks[diagnosisLinks.length - 1]);
    };

    const removeMkbItem = async (id: string, patient: Patient): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, patient.patientDiagnosis, []);
      return await Provider.store.dispatch('patientDiagnosis/remove', id);
    };

    return {
      filterByDisabilities,
      createDisabilityFilters,
      removeMkbItem,
      addMkbItem,
      toggleRegister,
      registers,
      addRepresentative,
      updateHumanName,
      updateIsMale,
      updateHuman,
      count,
      filterByStatus,
      createRegistersOptions,
      authModalVisible,
      selectSearch,
      filterByRegister,
      loadPatients,
      patients,
      createSexFilters,
      ...Provider.getAdminLib(),
      infoItemToggle,
      editMode,
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
  width: 40px;
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
  min-width: 240px;
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
