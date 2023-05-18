<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      Количество заявок: {{ count }}
      <!--      <RemoteSearch-->
      <!--        :must-be-translated="true"-->
      <!--        :key-value="schema.patient.key"-->
      <!--        placeholder="Начните вводить ФИО пациента"-->
      <!--        @select="selectSearch"-->
      <!--      />-->
      <!--      <FilterMultipleSelect-->
      <!--        placeholder="Выбрать регистры"-->
      <!--        class="filters-block"-->
      <!--        :filter-model="filterByRegister"-->
      <!--        :options="createRegistersOptions()"-->
      <!--        @load="loadcommissions"-->
      <!--      />-->
      <!--      <FiltersList :models="createFilters()" @load="loadItems" />-->
      <!--      <FiltersList default-label="Мужской и женский пол" :models="createSexFilters()" @load="loadcommissions" />-->
      <!--      <SortList class="filters-block" :store-mode="true" @load="loadcommissions" />-->
    </template>
    <template #sort>
      <!--      <SortList :max-width="400" @load="loadItems" />-->
    </template>
    <el-table
      ref="table"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="commissions"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column width="100px">
        <template #header>
          <span class="table-header">
            <span>Номер врачебной комиссии</span>
          </span>
        </template>
        <template #default="scope">
          <div class="patient-link" @click="$router.push(`/admin/commissions/${scope.row.id}`)">№{{ scope.row.number }}</div>
        </template>
      </el-table-column>

      <el-table-column width="150px">
        <template #header>
          <span class="table-header">
            <span>ID заявки</span>
          </span>
        </template>
        <template #default="scope">
          <div class="patient-link">77-000033-04-2{{ scope.row.number }}</div>
        </template>
      </el-table-column>

      <el-table-column width="150px">
        <template #header>
          <span class="table-header">
            <span>Статус</span>
          </span>
        </template>
        <template #default="scope">
          <div class="patient-link">{{ scope.row.number % 2 ? 'На рассмотрении' : 'Заявка одобрена' }}</div>
          <div class="patient-link" @click="openExpertCommittee(scope.row.fundContract)">
            <hr />
            {{ scope.row.number % 2 ? '' : 'Протокол № ЭС № 29 от 20.04.2023' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="150px">
        <template #header>
          <span class="table-header">
            <span>Договор</span>
          </span>
        </template>

        <template #default="scope">
          <div class="patient-link" @click="openDrugContract(scope.row.fundContract)">
            {{ scope.row.number % 2 ? '' : '466-2022' }}
          </div>
          <span v-if="scope.row.number === 4" style="color: red">Задержка поставки</span>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <span class="table-header">
            <span>ПАЦИЕНТ</span>
          </span>
        </template>
        <template #default="scope">
          <div class="patient-link" @click="$router.push(`/admin/patients/${scope.row.patient.id}`)">
            {{ scope.row.patient.human.getFullName() }}
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <span class="table-header">
            <span>ЗАБОЛЕВАНИЕ</span>
          </span>
        </template>
        <template #default="scope">СПИНАЛЬНАЯ МЫШЕЧНАЯ АТРОФИЯ (G12.1)</template>
      </el-table-column>

      <el-table-column label="ВРАЧЕБНАЯ КОММИССИЯ" width="200" align="center">
        <template #default="scope">
          <div v-for="commissionDoctor in scope.row.commissionsDoctors" :key="commissionDoctor.id">
            <el-tooltip class="item" effect="dark" :content="commissionDoctor.doctor.position" placement="top-end">
              <el-tag class="tag-link" size="small">
                <span v-if="commissionDoctor.doctor">{{ commissionDoctor.doctor.name }}</span>
              </el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="human.dateBirth" width="150" align="center">
        <template #header>
          <div class="table-header">
            <span>Дата комиссии</span>
          </div>
        </template>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date) }}
        </template>
      </el-table-column>

      <el-table-column prop="human.dateBirth" width="150" align="center">
        <template #header>
          <div class="table-header">
            <span>Дата окончания срока</span>
          </div>
        </template>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.endDate) }}
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="expertCommitteeOpened" width="80%">
      <el-descriptions title="Протокол № ЭС № 29 от 20.04.2023" :column="1" border>
        <el-descriptions-item label="Препарат">РИСДИСПЛМАМ</el-descriptions-item>
        <el-descriptions-item label="МНН">РИСДИСПЛМАМ</el-descriptions-item>
        <el-descriptions-item label="ЛФ">ПОРОШОК ДЛЯ ПРИГОТОВЛЕНИЯ РАСТВОРА ДЛЯ ПРИЕМА ВНУТРЬ</el-descriptions-item>
        <el-descriptions-item label="Дозировка">0,75 мг/мл, 2г</el-descriptions-item>
        <el-descriptions-item label="Схема расчета потребности">
          5 мг/сутки (вес-40 кг). = 44 гр 22 фл. Остаток 20 гр ( по перераспределению), 10 фл (по перераспределению). Итого на период 24 гр
          12 фл
        </el-descriptions-item>
        <el-descriptions-item label="Схема лечения">5 мг/сутки</el-descriptions-item>
        <el-descriptions-item label="Потребность на период в ЕИ">24</el-descriptions-item>
        <el-descriptions-item label="Количество, уп.">12</el-descriptions-item>
        <el-descriptions-item label="Период заявки">с 21 апреля 2023 - 31 декабря 2023</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-dialog v-model="drugContractOpened" width="80%">
      <h3>План распределения</h3>
      <el-table :data="plan">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="Получатель" prop="patient" />
        <el-table-column label="Дата рождения" prop="date" />
        <el-table-column label="Количество" prop="quantity" />
      </el-table>
      <h3>Календарный план</h3>
      <el-table :data="calendar">
        <el-table-column label="Этап поставки товара" prop="stage" />
        <el-table-column label="Срок поставки товара" prop="date" />
        <el-table-column label="Количество товара" prop="quantity" />
        <el-table-column label="Результат" prop="result" />
      </el-table>
    </el-dialog>
  </AdminListWrapper>
</template>

<script lang="ts">
import { Document, QuestionFilled } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref, ref } from 'vue';

import Commission from '@/classes/Commission';
import Register from '@/classes/Register';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import Pagination from '@/components/Pagination.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import FilterResetButton from '@/components/TableFilters/FilterResetButton.vue';
import FiltersList from '@/components/TableFilters/FiltersList.vue';
import SortButton from '@/components/TableFilters/SortButton.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/shared/IOption';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminCommissionsList',
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
    const plan = [
      {
        id: 'ID 77-000023-03-22',
        patient: 'З.В.Е',
        date: '18.04.2016.',
        quantity: '13 упаковок (26 флаконов по 150мг/5мл Бринейры 13 флаконов с 5мл промывочного раствора',
      },
      {
        id: 'ID 77-000023-04-22',
        patient: 'Ш.В.В',
        date: '24.01.2018',
        quantity: '12 упаковок (26 флаконов по 150мг/5мл Бринейры 13 флаконов с 5мл промывочного раствора',
      },
      {
        id: 'ID 77-000023-02-22',
        patient: 'Г.А.А',
        date: '13.04.2014',
        quantity: '12 упаковок (26 флаконов по 150мг/5мл Бринейры 13 флаконов с 5мл промывочного раствора',
      },
      {
        id: 'ID 77-000023-05-22',
        patient: 'Ш.Д.В',
        date: '15.03.2011',
        quantity: '9 упаковок (26 флаконов по 150мг/5мл Бринейры 13 флаконов с 5мл промывочного раствора',
      },
    ];
    const calendar = [
      {
        stage: '1 этап',
        date: 'в течение 15 дней с даты заключения',
        quantity: '22 упаковки (44 флакона по 150мг/5мл Бринейры, 22 флакона с 5мл промывочного раствора )',
        result: 'Завершён',
      },
      {
        stage: '2 этап',
        date: 'до 01.12.2022',
        quantity: '24 упаковки (48 флаконов по 150мг/5мл Бринейры, 24 флакона с 5мл промывочного раствора )',
        result: 'Задержка',
      },
      {
        stage: '3 этап',
        date: 'до 01.02.2023',
        quantity: '21 упаковка (48 флаконов по 150мг/5мл Бринейры, 24 флакона с 5мл промывочного раствора )',
        result: 'В процессе',
      },
    ];

    const drugContractOpened: Ref<boolean> = ref(false);
    const expertCommitteeOpened: Ref<boolean> = ref(false);
    const commissions: Ref<Commission[]> = computed(() => Provider.store.getters['commissions/items']);
    const count: Ref<number> = computed(() => Provider.store.getters['commissions/count']);
    const registers: Ref<Register[]> = computed(() => Provider.store.getters['registers/items']);
    const filterByRegister: Ref<FilterModel> = ref(new FilterModel());
    // const filteredcommissions: Ref<Patient[]> = computed(() => Provider.store.getters['commissions/filteredcommissions']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);

    const loadCommissions = async () => {
      await Provider.loadItems();
    };

    const load = async () => {
      await Provider.store.dispatch('registers/getAll');
      await loadCommissions();

      await Provider.store.dispatch('meta/getOptions', registers);
      // filterByRegister.value = commissionsFiltersLib.byRegisters([]);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Врачебные комиссии',
        buttons: [{ text: 'Создать комиссию', type: 'primary', action: Provider.createAdmin }],
      },
      // sortsLib: commissionsSortsLib,
      getAction: 'getAllWithCount',
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/commissions/${event.value}`);
    };

    const createRegistersOptions = (): IOption[] => {
      const ids: IOption[] = [];
      registers.value.forEach((r: Register) => ids.push({ value: r.id as string, label: r.name }));
      return ids;
    };

    const openDrugContract = (): void => {
      drugContractOpened.value = !drugContractOpened.value;
    };

    const openExpertCommittee = (): void => {
      expertCommitteeOpened.value = !expertCommitteeOpened.value;
    };

    return {
      calendar,
      plan,
      count,
      filterByStatus,
      createRegistersOptions,
      authModalVisible,
      selectSearch,
      filterByRegister,
      loadCommissions,
      commissions,
      // createSexFilters,
      ...Provider.getAdminLib(),
      openDrugContract,
      openExpertCommittee,
      drugContractOpened,
      expertCommitteeOpened,
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
