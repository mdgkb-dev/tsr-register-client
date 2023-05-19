<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      Количество пациентов: {{ count }}
      <RemoteSearch
        :must-be-translated="true"
        :key-value="schema.patient.key"
        placeholder="Начните вводить ФИО пациента"
        @select="selectSearch"
      />
      <FilterMultipleSelect
        placeholder="Выбрать регистры"
        class="filters-block"
        :filter-model="filterByRegister"
        :options="createRegistersOptions()"
        @load="loadPatients"
      />

      <FiltersList default-label="Мужской и женский пол" :models="createSexFilters()" @load="loadPatients" />
      <SortList class="filters-block" :store-mode="true" @load="loadPatients" />
    </template>
    <template #sort>

    </template>
    <div class="scroll-block">
    <div v-for="patient in patients" :key="patient.id">
      <CollapseItem
        :is-collaps="false"
      >
        <template #inside-title>
          
          <div class="flex-block">
            <Button 
              :withIcon="true"
              width="40px" 
              height="40px" 
              border-radius="5px" 
              color="#006BB4" 
              background="#DFF2F8"
              backgroundHover="#DFF2F8"
              :colorSwap="false"
              @click="edit(patient.id)"
              >

              <template #icon>
                <svg class="icon-edit">
                  <use xlink:href="#edit"></use>
                </svg>
              </template>
            </Button>
            <StringItem :string="patient.human.getFullName()" color="#006BB4" font-size="17px" minWidth="300px" width="100%"/>
            <StringItem :string="patient.human.getGender()" color="#343E5C" font-size="20px" />
            <InfoItem  min-width="113px" margin="0 0 0 0px"> 
              <template #title>
                <StringItem string="инвалидность" font-size="10px" padding="0 0 0 3px"/>
              </template>
              <template #inside-content>
                <StringItem string="До" font-size="14px" padding="0"/>
                  <Button
                    text="A"
                    :withIcon="false"
                    width="25px" 
                    height="25px" 
                    border-radius="15px" 
                    background="#ffffff"
                    backgroundHover="#ffffff"
                    :colorSwap="false"
                    margin="0 0 0 7px"
                    padding="0"
                  >
                 </Button>
                  <Button
                    text="B"
                    :withIcon="false"
                    width="25px" 
                    height="25px" 
                    border-radius="15px" 
                    background="#ffffff"
                    backgroundHover="#ffffff"
                    :colorSwap="false"
                    margin="0 0 0 7px"
                    padding="0"
                  >
                 </Button>
                  <Button
                    text="C"
                    :withIcon="false"
                    width="25px" 
                    height="25px" 
                    border-radius="15px" 
                    background="#ffffff"
                    backgroundHover="#ffffff"
                    :colorSwap="false"
                    margin="0 0 0 7px"
                    padding="0"
                  >
                 </Button>
              </template>
            </InfoItem>
            <div class="line-item">
              <InfoItem  min-width="calc(50% - 5px)" margin="0 5px 0 0"> 
                <template #title>
                  <StringItem string="дата рождения" font-size="10px" padding="0 0 0 3px"/>
                </template>
                <template #inside-content>
                  <StringItem :string="$dateTimeFormatter.format(patient.human.dateBirth)" font-size="16px" padding="0"/>
                </template>
              </InfoItem>              
              <InfoItem  min-width="calc(50% - 5px)" margin="0 0 0 5px"> 
                <template #title>
                  <StringItem string="представители" font-size="10px" padding="0 0 0 3px"/>
                </template>
                <template #inside-content>
                  <div v-for="rep in patient.patientsRepresentatives" :key="rep">
                    <StringItem :string="rep.getRepresentativeParentType()" font-size="14px" padding="0"/>
                  </div>
                </template>
              </InfoItem>
            </div>
            <InfoItem  min-width="200px" margin="0 0 0 10px"> 
              <template #title>
                <StringItem string="регистры" font-size="10px" padding="0 0 0 3px"/>
              </template>
              <template #inside-content>
                <div class="block">
                <div v-for="patientRegister in patient.patientsRegisters" :key="patientRegister.id" >
                  <StringItem :string="patientRegister.register.getTagName() + ','" font-size="14px" padding="0"/>
                </div>
                </div>
              </template>
            </InfoItem>
            <InfoItem  min-width="200px" margin="0 0 0 10px"> 
              <template #title>
                <StringItem string="диагнозы" font-size="10px" padding="0 0 0 3px"/>
              </template>
              <template #inside-content>
                <div v-for="diagnosis in patient.patientDiagnosis" :key="diagnosis">
                  <StringItem :string="diagnosis.mkbItem.getCode() + ',&nbsp'" font-size="14px" padding="0"/>
                </div>
              </template>
            </InfoItem>
            <InfoItem  min-width="200px" margin="0 0 0 10px"> 
              <template #title>
                <StringItem string="документы" font-size="10px" padding="0 0 0 3px"/>
              </template>
              <template #inside-content>
                <div v-for="document in patient.human.documents" :key="document">
                  <StringItem :string="document.documentType.getTagName()" font-size="14px" padding="0"/>
                </div>
              </template>
            </InfoItem>
          </div>

        </template>

        <template #inside-content>

        </template>
      </CollapseItem>
    </div>
    </div>



    <!-- <el-table
      ref="table"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    > -->
      <!-- <el-table-column width="60" align="center" /> -->

      <!-- <el-table-column prop="human.surname">
        <template #header>
          <span class="table-header">
            <span>ФИО</span>
          </span>
        </template>
        <template #default="scope">
          <div class="patient-link" @click="$router.push(`/admin/patients/${scope.row.id}`)">
            {{ scope.row.human.getFullName() }}
          </div>
        </template>
      </el-table-column> -->

      <!-- <el-table-column width="110" prop="human.isMale" align="center">
        <template #header>
          <span class="table-header">
            <span>Пол</span>
          </span>
        </template>
        <template #default="scope">
          {{ scope.row.human.getGender() }}
        </template>
      </el-table-column> -->

      <!-- <el-table-column prop="human.dateBirth" width="150" align="center">
        <template #header>
          <div class="table-header">
            <span>Дата рождения</span>
          </div>
        </template>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.human.dateBirth) }}
        </template>
      </el-table-column> -->

      <!-- <el-table-column width="130" label="ЗАКОННЫЕ ПРЕДСТАВИТЕЛИ" align="center">
        <template #default="scope">
          <div v-for="rep in scope.row.patientsRepresentatives" :key="rep">
            <el-tooltip class="item" effect="dark" placement="top-end">
              <template #content>
                <div>
                  {{ rep.representative.human.getFullName() }}
                </div>
                <a :href="'tel:' + rep.representative.human.contact.phone" style="color: white">
                  <div v-if="rep.representative.human.contact.phone">Телефон: {{ rep.representative.human.contact.phone }}</div>
                </a>
                <div v-if="rep.representative.human.contact.email">Email: {{ rep.representative.human.contact.email }}</div>
              </template>
              <el-tag class="tag-link" size="small" @click="$router.push(`/admin/representatives/${rep.representative.id}`)">
                {{ rep.getRepresentativeParentType() }}
              </el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column> -->

      <!-- <el-table-column width="120" label="ДИАГНОЗЫ" align="center">
        <template #header>
          <span class="table-header">
            <span>Диагнозы</span>
          </span>
        </template>
        <template #default="scope">
          <div v-for="diagnosis in scope.row.patientDiagnosis" :key="diagnosis">
            <div>
              <span class="underline-label">{{ diagnosis.mkbItem.getCode() }}</span>
              <el-tooltip class="item" effect="dark" :content="diagnosis.mkbItem.getFullName()" placement="top-end">
                <el-icon :size="17" style="margin-left: 5px">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="ИНВАЛИДНОСТЬ" width="200" align="center">
        <template #default="scope">
          <el-space v-if="scope.row.getActuallyDisability()" direction="vertical">
            <span>До {{ $dateTimeFormatter.format(scope.row.getActuallyDisability().period.dateEnd) }}</span>
            <div v-if="scope.row.getActuallyDisability().getActuallyEdv()" class="disability-circles">
              <el-button
                size="mini"
                disabled
                :type="scope.row.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined"
                circle
              >
                A
              </el-button>
              <el-button
                size="mini"
                disabled
                :type="scope.row.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined"
                circle
                >B</el-button
              >
              <el-button
                size="mini"
                disabled
                :type="scope.row.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined"
                circle
                >C</el-button
              >
            </div>
            <div v-else>Нет справок ЕДВ</div>
          </el-space>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="РЕГИСТРЫ" width="115" align="center">
        <template #default="scope">
          <div v-for="patientRegister in scope.row.patientsRegisters" :key="patientRegister.id">
            <el-tooltip class="item" effect="dark" :content="patientRegister.register.name" placement="top-end">
              <el-tag class="tag-link" size="small" @click="$router.push(`/admin/patients/${scope.row.id}?menu=registers`)">
                <span>{{ patientRegister.register.getTagName() }}</span>
              </el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="ДОКУМЕНТЫ" width="115" align="center">
        <template #default="scope">
          <div v-if="scope.row.human.documents">
            <div v-for="document in scope.row.human.documents" :key="document">
              <el-tooltip class="item" effect="dark" :content="document.documentType.name" placement="top-end">
                <el-tag size="small">
                  <el-icon style="margin-right: 3px">
                    <Document />
                  </el-icon>
                  <span>{{ document.documentType.getTagName() }}</span>
                </el-tag>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column> -->

      <!-- <el-table-column width="50" align="center" class-name="sticky-right">
        <template #header>
          <FilterResetButton />
        </template>
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />

          <el-popover placement="top-end" :width="200" trigger="hover">
            <template #reference>
              <el-button class="table-button" icon="el-icon-view" @click="$router.push(`/patients/history/${scope.row.id}`)" />
            </template>
            <el-timeline>
              <el-timeline-item :timestamp="$dateTimeFormatter.format(scope.row.createdAt)"
                >Создано {{ scope.row.createdBy?.email }}</el-timeline-item
              >
              <el-timeline-item :timestamp="$dateTimeFormatter.format(scope.row.updatedAt)"
                >Обновлено {{ scope.row.updatedBy?.email }}</el-timeline-item
              >
            </el-timeline>
          </el-popover>
        </template>
      </el-table-column>
    </el-table> -->
  </AdminListWrapper>
  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="edit">
      <path d="M13 3C9.145 3 6 6.145 6 10C6 12.41 7.23 14.55 9.094 15.813C5.527 17.343 3 20.883 3 25H5C5 20.57 8.57 17 13 17C15.145 17 17.063 17.879 18.5 19.25L13.781 23.969L13.719 24.281L13.031 27.813L12.719 29.281L14.188 28.969L17.718 28.281L18.031 28.219L28.125 18.125C29.285 16.965 29.285 15.035 28.125 13.875C27.5652 13.3197 26.8103 13.0056 26.0218 12.9998C25.2333 12.994 24.4739 13.297 23.906 13.844L19.938 17.813C19.0565 16.9686 18.0292 16.291 16.906 15.813C17.8575 15.1707 18.637 14.3049 19.1764 13.2915C19.7158 12.2782 19.9986 11.148 20 10C20 6.145 16.855 3 13 3ZM13 5C15.773 5 18 7.227 18 10C18 12.773 15.773 15 13 15C10.227 15 8 12.773 8 10C8 7.227 10.227 5 13 5ZM26 15C26.254 15 26.52 15.082 26.719 15.281C26.8134 15.3721 26.8885 15.4813 26.9398 15.6021C26.9911 15.7229 27.0175 15.8528 27.0175 15.984C27.0175 16.1152 26.9911 16.2451 26.9398 16.3659C26.8885 16.4867 26.8134 16.5959 26.719 16.687L17.031 26.375L15.25 26.75L15.625 24.969L25.313 15.281C25.4022 15.1897 25.5092 15.1177 25.6274 15.0693C25.7455 15.021 25.8724 14.9974 26 15Z"></path>
      <path d="M13 3C9.145 3 6 6.145 6 10C6 12.41 7.23 14.55 9.094 15.813C5.527 17.343 3 20.883 3 25H5C5 20.57 8.57 17 13 17C15.145 17 17.063 17.879 18.5 19.25L13.781 23.969L13.719 24.281L13.031 27.813L12.719 29.281L14.188 28.969L17.718 28.281L18.031 28.219L28.125 18.125C29.285 16.965 29.285 15.035 28.125 13.875C27.5652 13.3197 26.8103 13.0056 26.0218 12.9998C25.2333 12.994 24.4739 13.297 23.906 13.844L19.938 17.813C19.0565 16.9686 18.0292 16.291 16.906 15.813C17.8575 15.1707 18.637 14.3049 19.1764 13.2915C19.7158 12.2782 19.9986 11.148 20 10C20 6.145 16.855 3 13 3ZM13 5C15.773 5 18 7.227 18 10C18 12.773 15.773 15 13 15C10.227 15 8 12.773 8 10C8 7.227 10.227 5 13 5ZM26 15C26.254 15 26.52 15.082 26.719 15.281C26.8134 15.3721 26.8885 15.4813 26.9398 15.6021C26.9911 15.7229 27.0175 15.8528 27.0175 15.984C27.0175 16.1152 26.9911 16.2451 26.9398 16.3659C26.8885 16.4867 26.8134 16.5959 26.719 16.687L17.031 26.375L15.25 26.75L15.625 24.969L25.313 15.281C25.4022 15.1897 25.5092 15.1177 25.6274 15.0693C25.7455 15.021 25.8724 14.9974 26 15Z" ></path>
    </symbol>
    <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" id="iconamoon_edit-light">
      <path d="M6.2513 2.50053L7.5013 3.75053M5.41797 8.33386H8.7513M2.08464 6.66719L1.66797 8.33386L3.33464 7.91719L8.16214 3.08969C8.31836 2.93342 8.40612 2.7215 8.40612 2.50053C8.40612 2.27956 8.31836 2.06763 8.16214 1.91136L8.09047 1.83969C7.9342 1.68347 7.72227 1.5957 7.5013 1.5957C7.28033 1.5957 7.06841 1.68347 6.91214 1.83969L2.08464 6.66719Z" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { Document, QuestionFilled } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref, ref } from 'vue';

import Patient from '@/classes/Patient';
import Register from '@/classes/Register';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import Pagination from '@/components/Pagination.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
// import FilterDateForm from '@/components/TableFilters/FilterDateForm.vue';
import FilterResetButton from '@/components/TableFilters/FilterResetButton.vue';
import FiltersList from '@/components/TableFilters/FiltersList.vue';
import SortButton from '@/components/TableFilters/SortButton.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/shared/IOption';
import PatientsFiltersLib from '@/libs/filters/PatientsFiltersLib';
import PatientsSortsLib from '@/libs/sorts/PatientsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
// import PatientsFiltersLib from '@/services/Provider/Provider/libs/filters/PatientsFiltersLib';
// import PatientsSortsLib from '@/services/Provider/libs/sorts/PatientsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import Button from '@/components/Base/Button.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue'
import InfoItem from '@/components/admin/Patients/InfoItem.vue'

export default defineComponent({
  name: 'AdminPatientsList',
  components: {
    FilterMultipleSelect,
    RemoteSearch,
    SortButton,
    Pagination,
    TableButtonGroup,
    SortList,
    // FilterDateForm,
    // FilterSet,
    FilterResetButton,
    AdminListWrapper,
    FiltersList,
    QuestionFilled,
    Document,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
  },
  setup() {
    const patients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/items']);
    const count: Ref<number> = computed(() => Provider.store.getters['patients/count']);
    const registers: Ref<Register[]> = computed(() => Provider.store.getters['registers/items']);
    const filterByRegister: Ref<FilterModel> = ref(new FilterModel());
    // const filteredPatients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/filteredPatients']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);

    const loadPatients = async () => {
      await Provider.loadItems();
    };

    const load = async () => {
      await Provider.store.dispatch('registers/getAll');
      await loadPatients();

      await Provider.store.dispatch('meta/getOptions', registers);
      filterByRegister.value = PatientsFiltersLib.byRegisters([]);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Пациенты',
        buttons: [{ text: 'Добавить пациента', type: 'primary', action: Provider.createAdmin }],
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
    //

    const createRegistersOptions = (): IOption[] => {
      const ids: IOption[] = [];
      registers.value.forEach((r: Register) => ids.push({ value: r.id as string, label: r.name }));
      return ids;
    };

    return {
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
    };
  },
});
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/elements/base-style.scss';

  .hidden {
    display: none;
  }

  .scroll-block {
    height: 70vh;
    overflow: hidden;
    overflow-y: scroll;
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

  .icon-edit {
    width: 28px;
    height: 28px;
  }

  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 170px;
    padding: 0 44px 0 10px;
  }

</style>
