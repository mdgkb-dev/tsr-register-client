<template>
  <AdminListWrapper v-if="mounted">
    <el-table
      :cell-style="{ height: '70px' }"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column type="index" width="60" align="center" />

      <el-table-column>
        <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable prop="human.surname" align="left" resizable min-width="170">
          <template #default="scope">
            {{ scope.row.human.getFullName() }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column>
        <el-table-column prop="human.dateBirth" label="Дата постановки" min-width="160" align="center" sortable>
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.getActuallyDisability().period.dateStart) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column>
        <el-table-column prop="human.dateBirth" label="Дата завершения" min-width="160" align="center" sortable>
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.getActuallyDisability().period.dateEnd) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column>
        <el-table-column label="Справка ЕДВ" min-width="160" align="center" sortable>
          <template #default="scope">
            <div v-if="scope.row.getActuallyDisability().getActuallyEdv()">
              {{ $dateTimeFormatter.format(scope.row.getActuallyDisability().getActuallyEdv().period.dateStart) }} -
              {{ $dateTimeFormatter.format(scope.row.getActuallyDisability().getActuallyEdv().period.dateEnd) }}
            </div>
            <div v-else>Нет справок ЕДВ</div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column>
        <el-table-column label="Инвалидность" min-width="180" align="center" sortable>
          <template #default="scope">
            <div v-if="scope.row.getActuallyDisability().getActuallyEdv()" class="disability-circles">
              <el-button
                size="mini"
                disabled
                :type="scope.row.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined"
                circle
                >A</el-button
              >
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
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column>
        <el-table-column label="ДОКУМЕНТЫ" width="130" align="center">
          <template #default="scope">
            <div v-for="document in scope.row.human.documents" :key="document">
              <el-tooltip class="item" effect="dark" :content="document.documentType.name" placement="top-end">
                <el-tag size="small" style="margin-right: 3px">
                  <el-icon style="margin-right: 3px"> <Document /> </el-icon>
                  <span>{{ document.documentType.getTagName() }}</span>
                </el-tag>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </AdminListWrapper>
</template>

<script lang="ts">
import { Document } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent } from 'vue';

import Patient from '@/classes/Patient';
import MainHeader from '@/classes/shared/MainHeader';
import Pagination from '@/components/Pagination.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import router from '@/router';
import Hooks from '@/services/Hooks/Hooks';
// import PatientsFiltersLib from '@/services/Provider/libs/filters/PatientsFiltersLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'DisabilitiesList',
  components: {
    TableButtonGroup,
    Pagination,
    AdminListWrapper,
    Document,
  },
  setup() {
    const patients: ComputedRef<Patient[]> = computed(() => Provider.store.getters['patients/patients']);
    // const { formatDate } = useDateFormat();

    const load = async () => {
      Provider.store.commit('main/setMainHeader', new MainHeader({ title: 'Инвалидность' }));
      try {
        // Provider.setFilterModels(PatientsFiltersLib.withDisabilities());
        await Provider.store.dispatch('patients/getAll', Provider.filterQuery.value);
      } catch (e) {
        if (!ElMessage.error) {
          return;
        }
        ElMessage.error(String(e));
        return;
      }
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'patients', action: 'getAll' },
      // sortModels: [],
    });

    const edit = async (id: string): Promise<void> => {
      await router.push(`/patients/${id}`);
    };

    const remove = async (id: number): Promise<void> => {
      await Provider.store.dispatch('patients/delete', id);
    };

    return {
      remove,
      edit,
      patients,
      // formatDate,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-table td.el-table__cell) {
  border-right: none;
  border-left: none;
}
</style>
