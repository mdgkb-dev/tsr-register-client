<template>
  <AdminListWrapper v-if="mounted" class="wrapper" style="height: 100%; overflow: hidden">
    <template #header>
      <RemoteSearch :key-value="schema.drug.key" @select="selectDrug($event)" />
    </template>
    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="drugs"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
      style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
    >
      <el-table-column type="index" width="60" align="center" />
      <el-table-column prop="name" label="Наименование" min-width="150" />
      <el-table-column prop="nameMNN" label="Форма выпуска" min-width="150" />
      <el-table-column prop="doze" label="Дозировка" min-width="150" />
      <el-table-column prop="registered" label="Зарегистрирован" min-width="150" />
      <el-table-column prop="dateRegistration" label="Дата регистрации" min-width="150" />
      <el-table-column width="120" label="ДИАГНОЗЫ" align="center">
        <template #default="scope">
          <div v-for="diagnosis in scope.row.drugsDiagnosis" :key="diagnosis">
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
                <el-icon :size="17" style="margin-left: 5px"> <QuestionFilled /></el-icon>
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
                <el-icon :size="17" style="margin-left: 5px"> <QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <el-space direction="vertical" class="icons">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.id)"
              @remove="remove(scope.row.id)"
            />
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref } from 'vue';

import Drug from '@/classes/Drug';
import MainHeader from '@/classes/shared/MainHeader';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'DrugsList',
  components: {
    RemoteSearch,
    TableButtonGroup,
    AdminListWrapper,
    QuestionFilled,
  },
  setup() {
    const drugs: Ref<Drug[]> = computed(() => Provider.store.getters['drugs/drugs']);

    const edit = async (id: string): Promise<void> => {
      await Provider.router.push(`/drugs/${id}`);
    };

    const create = async (): Promise<void> => {
      await Provider.router.push('/drugs/new');
    };

    const remove = async (id: number): Promise<void> => {
      await Provider.store.dispatch('drugs/delete', id);
    };

    const load = async () => {
      Provider.store.commit('main/setMainHeader', new MainHeader({ title: 'Список лекарств', create }));
      await Provider.store.dispatch('drugs/getAll');
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'drugs', action: 'getAll' },
      sortModels: [],
    });

    const selectDrug = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/drugs/${event.id}`);
    };

    return {
      selectDrug,
      drugs,
      create,
      edit,
      remove,
      mounted: Provider.mounted,
      schema: Provider.schema,
    };
  },
});
</script>
