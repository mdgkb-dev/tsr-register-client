<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-input v-model="search" prefix-icon="el-icon-search" style="border-radius: 90%" placeholder="Поиск" class="table-search" />
      <el-table
        :cell-style="{ height: '70px' }"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="filterTable(patients)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 250px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />

        <el-table-column>
          <template #header>
            <el-input v-model="searchFullName" size="mini" placeholder="Поиск по имени..." />
          </template>
          <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable prop="human.surname" align="left" resizable min-width="170">
            <template #default="scope">
              {{ scope.row.human.getFullName() }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.dateBirth" label="Дата постановки" min-width="160" align="center" sortable>
            <template #default="scope">
              {{ formatDate(scope.row.getActuallyDisability().period.dateStart) }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.dateBirth" label="Дата завершения" min-width="160" align="center" sortable>
            <template #default="scope">
              {{ formatDate(scope.row.getActuallyDisability().period.dateEnd) }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column label="Справка ЕДВ" min-width="160" align="center" sortable>
            <template #default="scope">
              <div v-if="scope.row.getActuallyDisability().getActuallyEdv()">
                {{ formatDate(scope.row.getActuallyDisability().getActuallyEdv().period.dateStart) }} -
                {{ formatDate(scope.row.getActuallyDisability().getActuallyEdv().period.dateEnd) }}
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
                  <el-tag size="small">
                    <i class="el-icon-document" style="margin-right: 3px"></i>
                    <span>{{ document.documentType.getTagName() }}</span>
                  </el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import IPatient from '@/interfaces/patients/IPatient';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'PatientsList',
  setup() {
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const search: Ref<string> = ref('');
    const searchFullName: Ref<string> = ref('');
    const patients: ComputedRef<IPatient[]> = computed(() => store.getters['patients/patients']);
    const { formatDate } = useDateFormat();

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Инвалидность' }));
      try {
        await store.dispatch('patients/getAllWithDisabilities');
      } catch (e) {
        ElMessage.error(e.toString());
        return;
      }

      mount.value = true;
    });

    const filterTable = (patients: IPatient[]): IPatient[] => {
      let filteredPatients = patients;

      const localSearch = search.value.toLowerCase();
      const localSearchFullName = searchFullName.value.toLowerCase();

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const name = patient.human.getFullName().toLowerCase();
        return !searchFullName.value || name.includes(localSearchFullName);
      });

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const name = patient.human.getFullName().toLowerCase();
        const date = patient.human.dateBirth;
        return !search.value || name.includes(localSearch) || date.includes(localSearch);
      });

      return filteredPatients;
    };

    return {
      mount,
      patients,
      search,
      searchFullName,
      filterTable,
      formatDate,
    };
  },
});
</script>

<style></style>
