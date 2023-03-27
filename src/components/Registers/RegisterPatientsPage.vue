<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <template #header>
      <div class="table-background main-info-container" style="width: 100%">
        <div class="main-info-container-item">
          <span class="light-title upper">Название регистра:</span>
          <span>{{ register.name }}</span>
        </div>
        <div class="main-info-container-item">
          <span class="light-title upper">
            <el-icon><User /> </el-icon>:
          </span>
          <span>{{ register.registerToPatient.length }}</span>
        </div>
        <div>
          <div v-for="registerQuery in registerQueries" :key="registerQuery.id">
            <el-button type="primary" size="small" @click="executeQuery(registerQuery.id)">{{ registerQuery.name }} </el-button>
          </div>
        </div>
      </div>
    </template>
    <el-table
      ref="table"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="register.registerToPatient"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="table-row"
      cell-class-name="table-row"
      style="width: 100%; margin-bottom: 20px; overflow: auto; height: 100%"
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
              <el-button class="table-button" :icon="More"></el-button>
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
          <span style="position: sticky !important" class="patient-name-link" @click="edit(scope.row.patient.id)">{{
            scope.row.patient?.human?.getFullName()
          }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" width="50">
        <template #header>
          <el-button type="success" size="small" :icon="Plus" circle @click="patient.addChopScaleTest()" />
        </template>
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </component>
</template>

<script lang="ts">
import { More, User } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import RegisterPropertyToUser from '@/classes/RegisterPropertyToUser';
import MainHeader from '@/classes/shared/MainHeader';
import IRegister from '@/interfaces/IRegister';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterQuery from '@/interfaces/IRegisterQuery';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';
import IUserAuthorized from '@/interfaces/IUserAuthorized';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useDateFormat from '@/mixins/useDateFormat';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import AdminListWrapper from '@/views/Main/AdminListWrapper.vue';

export default defineComponent({
  name: 'RegisterPatientsPage',
  components: { User, AdminListWrapper },
  setup() {
    const route = useRoute();

    const register: Ref<IRegister> = computed(() => Provider.store.getters['registers/item']);
    const registerQueries: Ref<IRegisterQuery[]> = computed(() => Provider.store.getters['registerQueries/registerQueries']);
    const user: Ref<IUserAuthorized> = computed(() => Provider.store.getters['auth/user']);
    const cols: Ref<IRegisterProperty[]> = ref([]);
    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { formatDate } = useDateFormat();
    const curPage: Ref<number> = computed(() => Provider.store.getters['pagination/curPage']);

    const edit = async (patientId: string): Promise<void> => {
      await Provider.router.push(`/registers/patients/${route.params.registerId}/${patientId}`);
    };

    const load = async () => {
      const query = Provider.store.getters['filter/filterQuery'];
      query.id = route.params.registerId;
      await Provider.store.dispatch('registers/get', Provider.filterQuery.value);
      await Provider.store.dispatch('registerQueries/getAll');
      await Provider.store.dispatch('auth/getMe');
      pushToLinks(['/register-link-list/'], ['Регистры пациентов']);
      Provider.store.commit('main/setMainHeader', new MainHeader({ title: register.value.name, links }));
      await setCols();
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'patients', action: 'getAll' },
      sortModels: [],
    });

    const setPage = async (pageNum: number): Promise<void> => {
      Provider.store.commit('pagination/setCurPage', pageNum);
      Provider.store.commit('filter/setOffset', pageNum - 1);
      const query = Provider.store.getters['filter/filterQuery'];
      query.id = register.value.id;
      await Provider.store.dispatch('registers/get', query);
    };

    const setCols = async (value?: boolean, propertyId?: string): Promise<void> => {
      if (value !== undefined && propertyId) {
        if (value) {
          const prop = new RegisterPropertyToUser();
          prop.registerPropertyId = propertyId;
          prop.userId = user.value.id;
          user.value.registerPropertyToUser.push(prop);
          await Provider.store.dispatch('registerPropertiesToUser/create', prop);
        } else {
          await Provider.store.dispatch('registerPropertiesToUser/delete', propertyId);
          const index = user.value.registerPropertyToUser.findIndex((prop) => prop.registerPropertyId === propertyId);
          if (index > -1) {
            user.value.registerPropertyToUser.splice(index, 1);
          }
        }
      }
      console.log(
        'user.value.filterActualProperties(register.value.getProps())',
        user.value.filterActualProperties(register.value.getProps())
      );
      console.log(user.value);
      cols.value = user.value.filterActualProperties(register.value.getProps());
    };

    const getField = (prop: IRegisterProperty, regToPatient: IRegisterToPatient) => {
      // const p = regToPatient.patient!.getRegisterPropertyValue(prop, true);
      // if (!p) {
      //   return '';
      // }
      // if (prop.valueType?.isDate()) {
      //   return formatDate(p as Date);
      // }
      return;
    };

    const executeQuery = async (queryId: string): Promise<void> => {
      await Provider.store.dispatch('registerQueries/execute', queryId);
    };

    return {
      // remove,
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
      edit,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
      More,
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
  position: sticky !important;
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
:deep(.el-table) {
  position: relative;
  display: flex;
  flex-direction: column;
}
:deep(.el-table__header-wrapper) {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
}
:deep(.el-table__body-wrapper) {
  height: 100% !important;
  overflow: auto;
}
:deep(.el-table__header) {
  th {
    padding-top: 0;
    // vertical-align: baseline !important;
  }
}
</style>
