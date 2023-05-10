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
      <!--      <FiltersList :models="createFilters()" @load="loadItems" />-->
      <FiltersList default-label="Мужской и женский пол" :models="createSexFilters()" @load="loadPatients" />
      <SortList class="filters-block" :store-mode="true" @load="loadPatients" />
    </template>
    <template #sort>
      <!--      <SortList :max-width="400" @load="loadItems" />-->
    </template>
    <el-table
      ref="table"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column width="60" align="center" />

      <el-table-column prop="human.surname">
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
      </el-table-column>

      <el-table-column width="110" prop="human.isMale" align="center">
        <template #header>
          <span class="table-header">
            <span>Пол</span>
          </span>
        </template>
        <template #default="scope">
          {{ scope.row.human.getGender() }}
        </template>
      </el-table-column>

      <el-table-column prop="human.dateBirth" width="150" align="center">
        <template #header>
          <div class="table-header">
            <span>Дата рождения</span>
          </div>
        </template>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.human.dateBirth) }}
        </template>
      </el-table-column>

      <el-table-column width="130" label="ЗАКОННЫЕ ПРЕДСТАВИТЕЛИ" align="center">
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
      </el-table-column>

      <!--      <el-table-column width="75" label="ВЕС РОСТ" align="center">-->
      <!--        <template #default="scope">-->
      <!--          <span>{{ scope.row.getHeightWeightShort() }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column width="75" label="Окружность головы" align="center">-->
      <!--        <template #default="scope">-->
      <!--          <span>{{ scope.row.getLastCircumference(scope.row.headCircumference)?.value }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column width="75" label="Окружность груди" align="center">-->
      <!--        <template #default="scope">-->
      <!--          <span>{{ scope.row.getLastCircumference(scope.row.chestCircumference)?.value }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column width="120" label="ДИАГНОЗЫ" align="center">
        <template #header>
          <span class="table-header">
            <span>Диагнозы</span>
            <!--            <FilterSet-->
            <!--              :table="schema.patientDiagnosis.tableName"-->
            <!--              :col="schema.patientDiagnosis.mkbDiagnosisId"-->
            <!--              :join-table="schema.patientDiagnosis.joinTable"-->
            <!--              :join-table-fk="schema.patientDiagnosis.joinTableFk"-->
            <!--              :join-table-pk="schema.patientDiagnosis.joinTablePk"-->
            <!--            />-->
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
      </el-table-column>

      <el-table-column label="ИНВАЛИДНОСТЬ" width="200" align="center">
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
      </el-table-column>

      <el-table-column label="РЕГИСТРЫ" width="115" align="center">
        <template #default="scope">
          <div v-for="patientRegister in scope.row.patientsRegisters" :key="patientRegister.id">
            <el-tooltip class="item" effect="dark" :content="patientRegister.register.name" placement="top-end">
              <el-tag class="tag-link" size="small" @click="$router.push(`/admin/patients/${scope.row.id}?menu=registers`)">
                <span>{{ patientRegister.register.getTagName() }}</span>
              </el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="ДОКУМЕНТЫ" width="115" align="center">
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
      </el-table-column>

      <el-table-column width="50" align="center" class-name="sticky-right">
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
    </el-table>
  </AdminListWrapper>
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
</style>
