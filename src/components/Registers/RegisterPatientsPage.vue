<template>
  <div v-if="mount" class="wrapper" style="height: 100%">
    <div class="table-background" style="height: 170px; margin-bottom: 20px">
      <el-row>
        <el-col :span="15">
          <h2 style="margin: 0 0 40px 0">Общая информация</h2>
          <el-row>
            <el-col :span="12" class="light-title upper">Название регистра</el-col>
            <el-col :span="12"> {{ register.name }}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="12" class="light-title upper"><i class="el-icon-user"></i> Количество пациентов</el-col>
            <el-col :span="12"> {{ register.registerToPatient.length }}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="table-background" style="height: auto">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="register.registerToPatient"
        class="table-shadow"
        header-row-class-name="header-style"
        border
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="70" align="center">
          <template #header>
            <el-popover placement="right-start" :width="600" trigger="click">
              <template #reference>
                <el-button class="table-button" icon="el-icon-more"></el-button>
              </template>

              <el-space direction="vertical" alignment="start" style="width: 100%; overflow: auto">
                <h3 style="margin-left: 20px">Скрыть столбцы</h3>
                <div v-if="register.registerGroupToRegister.length">
                  <el-row v-for="registerGroupToRegister in register.registerGroupToRegister" :key="registerGroupToRegister.id">
                    <el-col
                      v-for="(registerPropertyToRegisterGroup, i) in registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup"
                      :key="registerPropertyToRegisterGroup.id"
                    >
                      <el-checkbox
                        :model-value="
                          !!user.registerPropertyToUser.find(
                            (prop) => prop.registerPropertyId === registerPropertyToRegisterGroup.registerPropertyId
                          )
                        "
                        :label="
                          registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[i].registerProperty.shortName
                            ? registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[i].registerProperty.shortName
                            : registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[i].registerProperty.name
                        "
                        :value="registerPropertyToRegisterGroup.registerProperty.id"
                        @change="setCols($event, registerPropertyToRegisterGroup.registerProperty.id)"
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
            {{ scope.row.patient.human.getFullName() }}
          </template>
        </el-table-column>
        <template v-for="(registerProperty, i) in cols" :key="i">
          <el-table-column :label="registerProperty.shortName" :prop="registerProperty.name" :width="registerProperty.colWidth">
            <template #default="scope">
              {{ getField(registerProperty, scope.row) }}
            </template>
          </el-table-column>
        </template>

        <el-table-column width="40" align="center">
          <template #default="scope">
            <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.patient.id)" />
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center; width: 100%">
        <el-pagination
          style="margin-top: 20px; margin-bottom: 20px"
          :current-page="curPage"
          layout="prev, pager, next"
          :page-count="Math.round(register.registerToPatientCount / 25)"
          @current-change="setPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Register from '@/classes/registers/Register';
import RegisterPropertyToUser from '@/classes/registers/RegisterPropertyToUser';
import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'RegisterPatientsPage',
  components: {
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const register: Ref<IRegister> = computed(() => store.getters['registers/register']);
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

    return {
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

.el-table .cell {
  word-break: break-word;
}
h3 {
  margin: 0;
}
</style>
