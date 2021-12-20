<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-autocomplete
        v-model="queryStringsPatient"
        style="width: 100%; margin-bottom: 20px; margin-right: 10px"
        popper-class="wide-dropdown"
        :fetch-suggestions="findPatients"
        placeholder="Найти пациента"
        @select="handlePatientSelect"
        @input="handleSearchInput"
      >
      </el-autocomplete>
      <el-input
        v-model="search"
        prefix-icon="el-icon-search"
        style="border-radius: 90%"
        placeholder="Отфильтровать текущий список"
        class="table-search"
      />
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="filterTable(patients)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; overflow: auto"
        height="calc(100vh - 310px)"
      >
        <el-table-column width="60" align="center" />

        <el-table-column prop="human.surname" align="left" min-width="130" resizable>
          <template #header>
            <span class="table-header">
              <span>Фамилия Имя Отчество</span>
              <FilterTextForm :table="schema.humanSchema.tableName" :col="schema.humanSchema.fullName" />
              <SortButton :table="schema.humanSchema.tableName" :col="schema.humanSchema.fullName" />
            </span>
          </template>
          <template #default="scope">
            <div class="patient-link" @click="$router.push(`/patients/${scope.row.id}/view`)">
              {{ scope.row.human.getFullName() }}
            </div>
          </template>
        </el-table-column>

        <el-table-column width="110" prop="human.isMale" align="center">
          <template #header>
            <span class="table-header">
              <span>Пол</span>
              <FilterSelectForm :select-list="genderFilter" :table="schema.humanSchema.tableName" :col="schema.humanSchema.isMale" />
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
              <FilterDateForm :table="schema.humanSchema.tableName" :col="schema.humanSchema.dateBirth" />
            </div>
          </template>
          <template #default="scope">
            {{ formatDate(scope.row.human.dateBirth) }}
          </template>
        </el-table-column>

        <el-table-column width="130" label="ЗАКОННЫЕ ПРЕДСТАВИТЕЛИ" align="center">
          <template #default="scope">
            <div v-for="rep in scope.row.representativeToPatient" :key="rep">
              <el-tooltip
                class="item"
                effect="dark"
                :content="`${rep.representative.human.surname} ${rep.representative.human.name} ${rep.representative.human.patronymic}`"
                placement="top-end"
              >
                <el-tag class="tag-link" size="small" @click="$router.push(`/representatives/${rep.representative.id}`)">
                  {{ rep.getRepresentativeParentType() }}
                </el-tag>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

        <el-table-column width="75" label="ВЕС РОСТ" align="center">
          <template #default="scope">
            <span>{{ scope.row.getHeightWeightShort() }}</span>
          </template>
        </el-table-column>

        <el-table-column width="75" label="Окружность головы" align="center">
          <template #default="scope">
            <span>{{ scope.row.getLastCircumference(scope.row.headCircumference)?.value }}</span>
          </template>
        </el-table-column>

        <el-table-column width="75" label="Окружность груди" align="center">
          <template #default="scope">
            <span>{{ scope.row.getLastCircumference(scope.row.chestCircumference)?.value }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120" label="ДИАГНОЗЫ" align="center">
          <template #header>
            <span class="table-header">
              <span>Диагнозы</span>
              <FilterSet
                :table="schema.patientDiagnosisSchema.tableName"
                :col="schema.patientDiagnosisSchema.mkbDiagnosisId"
                :join-table="schema.patientDiagnosisSchema.joinTable"
                :join-table-fk="schema.patientDiagnosisSchema.joinTableFk"
                :join-table-pk="schema.patientDiagnosisSchema.joinTablePk"
              />
            </span>
          </template>
          <template #default="scope">
            <div v-for="diagnosis in scope.row.patientDiagnosis" :key="diagnosis">
              <div v-if="diagnosis.mkbSubDiagnosis">
                <span v-if="diagnosis.mkbSubDiagnosis" class="underline-label"
                  >{{ diagnosis.mkbDiagnosis.code }}.{{ diagnosis.mkbSubDiagnosis.subCode }}</span
                >
                <el-tooltip
                  v-if="diagnosis.mkbSubDiagnosis"
                  class="item"
                  effect="dark"
                  :content="diagnosis.mkbSubDiagnosis.name"
                  placement="top-end"
                >
                  <i class="el-icon-question" style="font-size: 17px; margin-left: 5px"></i>
                </el-tooltip>
              </div>
              <div v-else>
                <span v-if="diagnosis.mkbDiagnosis" class="underline-label">{{ diagnosis.mkbDiagnosis.code }}</span>
                <el-tooltip
                  v-if="diagnosis.mkbDiagnosis"
                  class="item"
                  effect="dark"
                  :content="diagnosis.mkbDiagnosis.name"
                  placement="top-end"
                >
                  <i class="el-icon-question" style="font-size: 17px; margin-left: 5px"></i>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="ИНВАЛИДНОСТЬ" width="200" align="center">
          <template #default="scope">
            <el-space v-if="scope.row.getActuallyDisability()" direction="vertical">
              <span>До {{ formatDate(scope.row.getActuallyDisability().period.dateEnd) }}</span>
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
            <div v-if="scope.row.registerToPatient && scope.row.registerToPatient.length">
              <div v-for="registerToPatient in scope.row.registerToPatient" :key="registerToPatient.id">
                <el-tooltip class="item" effect="dark" :content="registerToPatient.register.name" placement="top-end">
                  <el-tag class="tag-link" size="small" @click="$router.push(`/registers/patients/${registerToPatient.register.id}`)">
                    <span>{{ registerToPatient.register.getTagName() }}</span>
                  </el-tag>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="ДОКУМЕНТЫ" width="115" align="center">
          <template #default="scope">
            <div v-if="scope.row.human.documents">
              <div v-for="document in scope.row.human.documents" :key="document">
                <el-tooltip class="item" effect="dark" :content="document.documentType.name" placement="top-end">
                  <el-tag size="small">
                    <i class="el-icon-document" style="margin-right: 3px"></i>
                    <span>{{ document.documentType.getTagName() }}</span>
                  </el-tag>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" width="150" align="center">
          <template #header>
            <div class="table-header">
              <span>Дата создания</span>
              <FilterDateForm :table="schema.patientSchema.tableName" :col="schema.patientSchema.createdAt" />
              <SortButton :table="schema.patientSchema.tableName" :col="schema.patientSchema.createdAt" />
            </div>
          </template>
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>

        <el-table-column prop="updatedAt" width="150" align="center">
          <template #header>
            <div class="table-header">
              <span>Дата последнего обновления</span>
              <FilterDateForm :table="schema.patientSchema.tableName" :col="schema.patientSchema.updatedAt" />
              <SortButton :table="schema.patientSchema.tableName" :col="schema.patientSchema.updatedAt" />
            </div>
          </template>
          <template #default="scope">
            {{ formatDate(scope.row.updatedAt) }}
          </template>
        </el-table-column>

        <el-table-column width="50" align="center" fixed="right">
          <template #header>
            <FilterResetButton />
          </template>
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-info-button="true"
              :show-remove-button="true"
              @edit="crud.edit(scope.row.id)"
              @remove="crud.remove(scope.row.id)"
            />

            <!-- <el-popover placement="top-end" :width="200" trigger="hover">
              <template #reference>
            <el-button class="table-button" icon="el-icon-view" @click="$router.push(`/patients/history/${scope.row.id}`)" />
            </template>
              <el-timeline>
                <el-timeline-item :timestamp="formatDate(scope.row.createdAt)">Создано {{ scope.row.createdBy?.login }}</el-timeline-item>
                <el-timeline-item :timestamp="formatDate(scope.row.updatedAt)">Обновлено {{ scope.row.updatedBy?.login }}</el-timeline-item>
              </el-timeline>
            </el-popover> -->
          </template>
        </el-table-column>
      </el-table>
      <Pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import SelectFilter from '@/classes/filters/SelectFilter';
import Human from '@/classes/humans/Human';
import Crud from '@/classes/shared/Crud';
import MainHeader from '@/classes/shared/MainHeader';
import Pagination from '@/components/Pagination.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import FilterDateForm from '@/components/TableFilters/FilterDateForm.vue';
import FilterResetButton from '@/components/TableFilters/FilterResetButton.vue';
import FilterSelectForm from '@/components/TableFilters/FilterSelectForm.vue';
import FilterSet from '@/components/TableFilters/FilterSet.vue';
import FilterTextForm from '@/components/TableFilters/FilterTextForm.vue';
import SortButton from '@/components/TableFilters/SortButton.vue';
import ISelectFilter from '@/interfaces/filters/ISelectFilter';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import ISchema from '@/interfaces/schema/ISchema';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchPatient from '@/interfaces/shared/ISearchPatient';
import useDateFormat from '@/mixins/useDateFormat';
export default defineComponent({
  name: 'PatientsList',
  components: {
    SortButton,
    Pagination,
    TableButtonGroup,
    FilterTextForm,
    FilterSelectForm,
    FilterDateForm,
    FilterSet,
    FilterResetButton,
  },
  setup() {
    const store = useStore();
    const patients: Ref<IPatient[]> = computed(() => store.getters['patients/patients']);
    const filteredPatients: Ref<IPatient[]> = computed(() => store.getters['patients/filteredPatients']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const { formatDate } = useDateFormat();
    const genderFilter: Ref<ISelectFilter[]> = ref([new SelectFilter({ title: 'Пол', options: Human.GetIsMaleOptions() })]);

    const crud = new Crud('patients');

    const mount: Ref<boolean> = ref(false);
    const queryStringsPatient: Ref<string> = ref('');

    const searchFullName = ref('');
    const searchAddress = ref('');
    const search = ref('');

    onBeforeMount(async () => {
      store.commit('filter/resetId');
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('main/setMainHeader', new MainHeader({ title: 'Список пациентов', create: crud.create }));
      store.commit('filter/setStoreModule', 'patients');
      await store.dispatch('patients/getAll', store.getters['filter/filterQuery']);
      await store.dispatch('registers/getAll');
      mount.value = true;
      loading.close();
    });

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await store.dispatch('patients/getAll', store.getters['filter/filterQuery']);
      }
      store.commit('pagination/setCurPage', 0);
    };

    const findPatients = async (query: string, resolve: CallableFunction): Promise<void> => {
      const patients: ISearchPatient[] = [];
      if (query.length > 2) {
        await store.dispatch('patients/searchPatients', query);
        filteredPatients.value.forEach((p: IPatient) => {
          if (p.id) patients.push({ value: p.human.getFullName(), id: p.id, patient: p });
        });
      }
      resolve(patients);
    };

    const handlePatientSelect = async (item: ISearch): Promise<void> => {
      await store.dispatch('patients/getAllById', item.id);
    };

    const children = (representative: IRepresetnationType) => {
      if (representative.patient) {
        return representative.patient.human.isMale
          ? representative.representativeType?.childMaleType
          : representative.representativeType?.childWomanType;
      }
      return '';
    };

    const filterTable = (patients: IPatient[]) => {
      let filteredPatients = patients;

      const searchLocal = search.value.toLowerCase();
      const searchFullNameLocal = searchFullName.value.toLowerCase();
      const searchAddressLocal = searchAddress.value.toLowerCase();

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const address = patient.human.addressRegistration.toLowerCase();
        return !searchAddress.value || address.includes(searchAddressLocal);
      });

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const name = patient.human.getFullName().toLowerCase();
        return !searchFullName.value || name.includes(searchFullNameLocal);
      });

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const name = patient.human.getFullName().toLowerCase();
        const date = patient.human.dateBirth;
        return !search.value || name.includes(searchLocal) || date.includes(searchLocal);
      });

      return filteredPatients;
    };

    return {
      // resetAllFilters,
      crud,
      schema,
      queryStringsPatient,
      formatDate,
      children,
      filteredPatients,
      filterTable,
      findPatients,
      handlePatientSelect,
      handleSearchInput,
      mount,
      patients,
      search,
      searchAddress,
      searchFullName,
      genderFilter,
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
</style>
