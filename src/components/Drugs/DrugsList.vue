<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="drugs"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" sortable="" />
        <el-table-column prop="name" label="Наименование ТМ" min-width="150" sortable />
        <el-table-column prop="nameMNN" label="Наименование МНН" min-width="150" sortable />
        <el-table-column prop="form" label="Форма выпуска" min-width="150" sortablesortable />
        <el-table-column prop="doze" label="Дозировка" min-width="150" sortable />
        <el-table-column prop="registered" label="Наименование МНН" min-width="150" sortable>
          <template #default="scope">
            {{ scope.row.registered ? 'Да' : 'Нет' }}
          </template>
        </el-table-column>
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

        <!--        <el-table-column prop="dateRegistration" label="Дата регистрации препарата" min-width="150" sortable>-->
        <!--          <template #default="scope">-->
        <!--            {{ formatDate(scope.row.dateRegistration) }}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDrug from '@/interfaces/drugs/IDrug';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'DrugsList',
  components: {
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const { formatDate } = useDateFormat();
    const drugs: Ref<IDrug[]> = computed(() => store.getters['drugs/drugs']);

    const edit = async (id: string): Promise<void> => {
      await router.push(`/drugs/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/drugs/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('drugs/delete', id);
    };

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Список лекарств', create }));
      await store.dispatch('drugs/getAll');
      mount.value = true;
    });

    return {
      formatDate,
      drugs,
      mount,
      create,
      edit,
      remove,
    };
  },
});
</script>
