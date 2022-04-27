<template>
  <div v-if="mount" style="height: 100%; display: flex; flex-direction: column">
    <div class="table-background main-info-container">
      <div class="main-info-container-item">
        <span class="light-title upper">Название регистра:</span>
        <span>{{ register.name }}</span>
      </div>
      <div class="main-info-container-item">
        <span class="light-title upper"><i class="el-icon-user"></i>:</span>
        <span>{{ register.registerToPatient.length }}</span>
      </div>
      <div>
        <div v-for="registerQuery in registerQueries" :key="registerQuery.id">
          <el-button type="primary" size="small" @click="executeQuery(registerQuery.id)">{{ registerQuery.name }} </el-button>
        </div>
      </div>
    </div>
    <div class="table-background" style="flex-shrink: 1; overflow: hidden; margin-bottom: 0">
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="register.registerToPatient"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="table-row"
        cell-class-name="table-row"
        style="width: 100%; margin-bottom: 20px; overflow: auto"
        height="calc(100vh - 270px)"
      >
        <el-table-column type="index" width="70" align="center">
          <template #header>
            <el-popover
              placement="right-start"
              popper-class="table-popover"
              :width="600"
              trigger="click"
              style="max-height: 600px !important; overflow: auto"
            >
              <template #reference>
                <el-button class="table-button" icon="el-icon-more"></el-button>
              </template>
              <el-space direction="vertical" alignment="start" style="width: 100%; max-height: 600px; overflow: auto">
                <h3 style="margin-left: 20px">Скрыть столбцы</h3>
                <div v-if="register.registerGroups.length">
                  <el-row v-for="registerGroup in register.registerGroups" :key="registerGroup.id">
                    <el-col v-for="(registerProperty, i) in registerGroup.registerProperties" :key="registerProperty.id">
                      <el-checkbox
                        :model-value="!!user.registerPropertyToUser.find((prop) => prop.registerPropertyId === registerProperty.id)"
                        :label="
                          registerGroup.registerProperties[i].shortName
                            ? registerGroup.registerProperties[i].shortName
                            : registerGroup.registerProperties[i].name
                        "
                        :value="registerProperty.id"
                        @change="setCols($event, registerProperty.id)"
                      >
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </div>
                <div v-else style="margin-left: 20px">Нет данных</div>
              </el-space>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable prop="patient.human.surname" align="left" resizable width="300px">
          <template #default="scope">
            <span class="patient-name-link" @click="edit(scope.row.patient.id)">{{ scope.row.patient.human.getFullName() }}</span>
          </template>
        </el-table-column>
        <template v-for="(registerProperty, i) in cols" :key="i">
          <el-table-column :label="registerProperty.shortName" :prop="registerProperty.name" :width="registerProperty.colWidth">
            <template #default="scope">
              <div style="max-height: 250px">
                {{ getField(registerProperty, scope.row) }}
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div style="text-align: center; width: 100%">
      <el-pagination
        style="margin: 20px 0"
        :current-page="curPage"
        layout="prev, pager, next"
        :page-count="Math.round(register.registerToPatientCount / 25)"
        @current-change="setPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import RegisterPropertyToUser from '@/classes/registers/RegisterPropertyToUser';
import MainHeader from '@/classes/shared/MainHeader';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterQuery from '@/interfaces/registers/IRegisterQuery';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'RegisterPatientsPage',

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const register: Ref<IRegister> = computed(() => store.getters['registers/item']);
    const registerQueries: Ref<IRegisterQuery[]> = computed(() => store.getters['registerQueries/registerQueries']);
    const user: Ref<IUserAuthorized> = computed(() => store.getters['auth/user']);
    const cols: Ref<IRegisterProperty[]> = ref([]);
    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { formatDate } = useDateFormat();
    const curPage: Ref<number> = computed(() => store.getters['pagination/curPage']);
    const loading = ref(false);

    const edit = async (patientId: string): Promise<void> => {
      await router.push(`/registers/patients/${route.params.registerId}/${patientId}`);
    };

    onBeforeMount(async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      const query = store.getters['filter/filterQuery'];
      query.id = route.params.registerId;
      await store.dispatch('registers/get', query);
      await store.dispatch('registerQueries/getAll');
      await store.dispatch('auth/getMe');
      pushToLinks(['/register-link-list/'], ['Регистры пациентов']);
      store.commit('main/setMainHeader', new MainHeader({ title: register.value.name, links }));
      await setCols();
      loading.close();
      mount.value = true;
    });

    const setPage = async (pageNum: number): Promise<void> => {
      loading.value = true;
      store.commit('pagination/setCurPage', pageNum);
      store.commit('filter/setOffset', pageNum - 1);
      const query = store.getters['filter/filterQuery'];
      query.id = register.value.id;
      await store.dispatch('registers/get', query);
      loading.value = false;
    };

    const setCols = async (value?: boolean, propertyId?: string): Promise<void> => {
      if (value !== undefined && propertyId) {
        if (value) {
          const prop = new RegisterPropertyToUser();
          prop.registerPropertyId = propertyId;
          prop.userId = user.value.id;
          user.value.registerPropertyToUser.push(prop);
          await store.dispatch('registerPropertiesToUser/create', prop);
        } else {
          await store.dispatch('registerPropertiesToUser/delete', propertyId);
          const index = user.value.registerPropertyToUser.findIndex((prop) => prop.registerPropertyId === propertyId);
          if (index > -1) {
            user.value.registerPropertyToUser.splice(index, 1);
          }
        }
      }
      cols.value = user.value.filterActualProperties(register.value.getProps());
    };

    const getField = (prop: IRegisterProperty, regToPatient: IRegisterToPatient) => {
      const p = regToPatient.patient!.getRegisterPropertyValue(prop, true);
      if (!p) {
        return '';
      }
      if (prop.valueType?.isDate()) {
        return formatDate(p as Date);
      }
      return p;
    };

    const executeQuery = async (queryId: string): Promise<void> => {
      await store.dispatch('registerQueries/execute', queryId);
    };

    return {
      executeQuery,
      registerQueries,
      getField,
      setPage,
      curPage,
      formatDate,
      setCols,
      links,
      cols,
      register,
      user,
      mount,
      edit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/elements/pageInfo.scss';

:deep(.el-table--scrollable-x .el-table__body-wrapper) {
  // height: calc(100vh - 270px) !important;
}
.el-table .cell {
  word-break: break-word;
}
h3 {
  margin: 0;
}
.patient-name-link {
  cursor: pointer;
  color: #2754eb;
  text-decoration: underline;
}
:deep(.table-popover) {
  max-height: 600px !important;
  overflow: auto;
}
.main-info-container {
  margin-bottom: 20px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  &-item {
    display: flex;
    align-items: center;
    .light-title {
      margin-right: 10px;
    }
  }
}

table {
  height: 100%;
  overflow: scroll;
  td {
    padding: 30px 0;
  }
}
</style>
