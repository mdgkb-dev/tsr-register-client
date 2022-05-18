<template>
  <div v-if="mounted" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <RemoteSearch :key-value="schema.patient.key" @select="selectSearch" />
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="patients"
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
              <FilterTextForm :table="schema.human.tableName" :col="schema.human.fullName" />
              <SortButton :table="schema.human.tableName" :col="schema.human.fullName" />
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
              <FilterSelectForm :select-list="genderFilter" :table="schema.human.tableName" :col="schema.human.isMale" />
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
              <FilterDateForm :table="schema.human.tableName" :col="schema.human.dateBirth" />
            </div>
          </template>
          <template #default="scope">
            {{ formatDate(scope.row.human.dateBirth) }}
          </template>
        </el-table-column>

        <el-table-column width="130" label="ЗАКОННЫЕ ПРЕДСТАВИТЕЛИ" align="center">
          <template #default="scope">
            <div v-for="rep in scope.row.representativeToPatient" :key="rep">
              <el-tooltip class="item" effect="dark" placement="top-end">
                <template #content>
                  <div>
                    {{ rep.representative.human.getFullName() }}
                  </div>
                  <div v-if="rep.representative.human.contact.phone">Телефон: {{ rep.representative.human.contact.phone }}</div>
                  <div v-if="rep.representative.human.contact.email">Email: {{ rep.representative.human.contact.email }}</div>
                </template>
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
                :table="schema.patientDiagnosis.tableName"
                :col="schema.patientDiagnosis.mkbDiagnosisId"
                :join-table="schema.patientDiagnosis.joinTable"
                :join-table-fk="schema.patientDiagnosis.joinTableFk"
                :join-table-pk="schema.patientDiagnosis.joinTablePk"
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
              <FilterDateForm :table="schema.patient.tableName" :col="schema.patient.createdAt" />
              <SortButton :table="schema.patient.tableName" :col="schema.patient.createdAt" />
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
              <FilterDateForm :table="schema.patient.tableName" :col="schema.patient.updatedAt" />
              <SortButton :table="schema.patient.tableName" :col="schema.patient.updatedAt" />
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
import { computed, defineComponent, Ref, ref } from 'vue';

import SelectFilter from '@/classes/filters/SelectFilter';
import Human from '@/classes/humans/Human';
import Crud from '@/classes/shared/Crud';
import MainHeader from '@/classes/shared/MainHeader';
import Pagination from '@/components/Pagination.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import FilterDateForm from '@/components/TableFilters/FilterDateForm.vue';
import FilterResetButton from '@/components/TableFilters/FilterResetButton.vue';
import FilterSelectForm from '@/components/TableFilters/FilterSelectForm.vue';
import FilterSet from '@/components/TableFilters/FilterSet.vue';
import FilterTextForm from '@/components/TableFilters/FilterTextForm.vue';
import SortButton from '@/components/TableFilters/SortButton.vue';
import ISelectFilter from '@/interfaces/filters/ISelectFilter';
import ISearchObject from '@/interfaces/ISearchObject';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchPatient from '@/interfaces/shared/ISearchPatient';
import useDateFormat from '@/mixins/useDateFormat';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import PatientsSortsLib from '@/services/Provider/libs/sorts/PatientsSortsLib';
export default defineComponent({
  name: 'PatientsList',
  components: {
    RemoteSearch,
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
    const patients: Ref<IPatient[]> = computed(() => Provider.store.getters['patients/patients']);
    const filteredPatients: Ref<IPatient[]> = computed(() => Provider.store.getters['patients/filteredPatients']);
    const { formatDate } = useDateFormat();
    const genderFilter: Ref<ISelectFilter[]> = ref([new SelectFilter({ title: 'Пол', options: Human.GetIsMaleOptions() })]);

    const crud = new Crud('patients');

    const load = async () => {
      Provider.store.commit('main/setMainHeader', new MainHeader({ title: 'Список пациентов', create: crud.create }));
      Provider.store.commit('filter/setStoreModule', 'patients');
      Provider.setSortModels(PatientsSortsLib.byFullName());
      await Provider.store.dispatch('patients/getAll', Provider.filterQuery.value);
      await Provider.store.dispatch('registers/getAll');
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'patients', action: 'getAll' },
      sortModels: [],
    });

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await Provider.store.dispatch('patients/getAll', Provider.store.getters['filter/filterQuery']);
      }
      Provider.store.commit('pagination/setCurPage', 0);
    };

    const findPatients = async (query: string, resolve: CallableFunction): Promise<void> => {
      const patients: ISearchPatient[] = [];
      if (query.length > 2) {
        await Provider.store.dispatch('patients/searchPatients', query);
        filteredPatients.value.forEach((p: IPatient) => {
          if (p.id) patients.push({ value: p.human.getFullName(), id: p.id, patient: p });
        });
      }
      resolve(patients);
    };

    const handlePatientSelect = async (item: ISearch): Promise<void> => {
      await Provider.store.dispatch('patients/getAllById', item.id);
    };

    const children = (representative: IRepresetnationType) => {
      if (representative.patient) {
        return representative.patient.human.isMale
          ? representative.representativeType?.childMaleType
          : representative.representativeType?.childWomanType;
      }
      return '';
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/patients/${event.id}`);
    };

    return {
      selectSearch,
      crud,
      formatDate,
      children,
      filteredPatients,
      findPatients,
      handlePatientSelect,
      handleSearchInput,
      patients,
      genderFilter,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
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
