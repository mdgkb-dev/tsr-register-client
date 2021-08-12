<template>
  <div v-if="mount" class="wrapper" style="height: 100%">
    <PageHead :title="title" :links="links" />
    <div class="table-background" style="height: auto; margin-bottom: 20px">
      <el-row>
        <el-col :span="15">
          <h2 style="margin: 0 0 40px 0">Общая информация</h2>
          <el-row>
            <el-col :span="12" class="light-title upper">Название регистра</el-col>
            <el-col :span="12"> {{ register.name }}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="12" class="light-title upper"><i class="el-icon-user"></i> Количество пользователей</el-col>
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
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 250px); overflow: auto"
      >
        <el-table-column type="index" width="70" align="center" />

        <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable prop="patient.human.surname" align="left" resizable>
          <template #default="scope">
            {{ scope.row.patient.human.getFullName() }}
          </template>
        </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
          <template #header>
            <el-popover placement="left-start" :width="600" trigger="click">
              <template #reference>
                <el-button class="table-button" icon="el-icon-more"></el-button>
              </template>

              <el-space direction="vertical" alignment="start" style="width: 100%; overflow: auto">
                <h2 style="margin-left: 20px">Скрыть столбцы</h2>
                <div v-if="register.registerGroupToRegister.lenght">
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
                        :label="registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[i].registerProperty.name"
                        :value="registerPropertyToRegisterGroup.registerProperty.id"
                        @change="setCols($event, registerPropertyToRegisterGroup.registerProperty.id)"
                        >{{ registerPropertyToRegisterGroup.registerProperty.name }}
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </div>
                <div v-else style="margin-left: 20px">Нет данных</div>
              </el-space>
            </el-popover>
          </template>
          <template #default="scope">
            <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.patient.id)" />
          </template>
        </el-table-column>
        <template v-for="(registerProperty, i) in cols" :key="i">
          <el-table-column :label="registerProperty.name" :show-overflow-tooltip="true" :prop="registerProperty.name" :width="100">
            <template #default="scope">
              <div v-if="registerProperty.valueType.isDate()">
                {{ formatDate(scope.row.patient.getRegisterPropertyValue(registerProperty)) }}
              </div>
              <div v-if="registerProperty.valueType.isString()">
                {{ scope.row.patient.getRegisterPropertyValue(registerProperty) }}
              </div>
              <div v-if="registerProperty.valueType.isNumber()">
                {{ scope.row.patient.getRegisterPropertyValue(registerProperty) }}
              </div>
              <div v-if="registerProperty.valueType.isRadio()">
                <el-radio
                  v-for="registerPropertyRadio in registerProperty.registerPropertyRadio"
                  :key="registerPropertyRadio.id"
                  :model-value="scope.row.patient.getRegisterPropertyValue(registerProperty)"
                  :label="registerPropertyRadio.id"
                  >{{ registerPropertyRadio.name }}</el-radio
                >
                {{ registerProperty.registerPropertySet }}
              </div>
              <div v-if="registerProperty.valueType.isSet()">
                <el-checkbox
                  v-for="registerPropertySet in registerProperty.registerPropertySet"
                  :key="registerPropertySet.id"
                  :label="registerPropertySet.name"
                  :model-value="scope.row.patient.getRegisterPropertyValueSet(registerPropertySet.id)"
                >
                  {{ registerPropertySet.name }}</el-checkbox
                >
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import RegisterPropertyToUser from '@/classes/registers/RegisterPropertyToUser';
import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import { computed, defineComponent, onBeforeMount, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import { useStore } from 'vuex';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'RegisterList',
  components: {
    PageHead,
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const title: Ref<string> = ref('');
    const register: Ref<IRegister> = computed(() => store.getters['registers/register']);
    const user: Ref<IUserAuthorized> = computed(() => store.getters['auth/user']);
    const cols: Ref<IRegisterProperty[]> = ref([]);
    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { formatDate } = useDateFormat();
    const edit = async (patientId: string): Promise<void> => {
      await router.push(`/registers/patients/${route.params.registerId}/${patientId}`);
    };

    onBeforeMount(async () => {
      await store.dispatch('registers/get', route.params.registerId);
      pushToLinks(['/register-link-list/'], ['Регистры пациентов']);
      title.value = register.value.name;
      mount.value = true;
      await setCols();
    });

    const setCols = async (value?: boolean, propertyId?: string): Promise<void> => {
      if (value !== undefined && propertyId) {
        if (value) {
          const prop = new RegisterPropertyToUser();
          prop.registerPropertyId = propertyId;
          prop.userId = user.value.id;
          user.value.registerPropertyToUser.push(prop);
        } else {
          const index = user.value.registerPropertyToUser.findIndex((prop) => prop.registerPropertyId === propertyId);
          if (index > -1) {
            user.value.registerPropertyToUser.splice(index, 1);
          }
        }
        await store.dispatch('auth/editAuthUser', user.value);
      }
      cols.value = user.value.filterActualProperties(register.value.getProps());
    };

    return {
      formatDate,
      setCols,
      links,
      cols,
      register,
      user,
      mount,
      title,
      edit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/elements/pageInfo.scss';
</style>
