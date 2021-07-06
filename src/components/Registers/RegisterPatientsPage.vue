<template>
  <div class="wrapper" v-if="mount" style="height:100%; overflow: hidden">
    <PageHead :title="title" :links="links" />
    <div class="table-background">
      <el-collapse>
        <el-collapse-item title="Скрыть столбцы" name="1" style="margin-left: 75%;width: 25%;">
          <div v-for="registerGroupToRegister in register.registerGroupToRegister" :key="registerGroupToRegister.id">
            <div
              v-for="(registerPropertyToRegisterGroup, i) in registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup"
              :key="registerPropertyToRegisterGroup.id"
            >
              <el-checkbox
                class="text item"
                :model-value="!!user.registerPropertyToUser.find(prop => prop.registerPropertyId === registerPropertyToRegisterGroup.registerPropertyId)"
                @change="setCols($event, registerPropertyToRegisterGroup.registerProperty.id)"
                :label="registerGroupToRegister.registerGroup.registerPropertyToRegisterGroup[i].registerProperty.name"
                :value="registerPropertyToRegisterGroup.registerProperty.id"
                >{{ registerPropertyToRegisterGroup.registerProperty.name }}
              </el-checkbox>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="register.registerToPatient"
        class="table-shadow"
        header-row-class-name="header-style"
        border
        height="auto"
        max-height="75%"
      >
        <el-table-column type="index" label="№" width="50" />
        <el-table-column label="ФИО" sortable prop="patient.human.surname" align="left" resizable>
          <template #default="scope">
            {{ scope.row.patient.human.getFullName() }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="" width="140">
          <template #default="scope">
            <el-button @click="edit(scope.row.patient.id)" type="text" size="small">Редактировать</el-button>
          </template>
        </el-table-column>
        <template v-for="(registerProperty, i) in cols" :key="i">
          <el-table-column :label="registerProperty.name" :show-overflow-tooltip="true" :prop="registerProperty.name"
            ><template #default="scope">
              <div v-if="registerProperty.valueType.isDate()">
                {{ $dateFormatRu(scope.row.patient.getRegisterPropertyValue(registerProperty)) }}
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
                  :model-value="scope.row.patient.getRegisterPropertyValue(registerProperty)"
                  :label="registerPropertyRadio.id"
                  :key="registerPropertyRadio.id"
                  >{{ registerPropertyRadio.name }}</el-radio
                >
                {{ registerProperty.registerPropertySet }}
              </div>
              <div v-if="registerProperty.valueType.isSet()">
                <el-checkbox
                  v-for="registerPropertySet in registerProperty.registerPropertySet"
                  :label="registerPropertySet.name"
                  :key="registerPropertySet.id"
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
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import Register from '@/classes/registers/Register';
import RegisterPropertyToUser from '@/classes/registers/RegisterPropertyToUser';
import UserAuthorized from '@/classes/user/UserAuthorized';
import PageHead from '@/components/PageHead.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';

@Options({
  name: 'RegisterPatientsPage',
  components: {
    PageHead,
  },
  computed: {
    ...mapGetters('registers', ['register']),
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions({
      registerGet: 'registers/get',
      updateUser: 'auth/editAuthUser',
    }),
  },
})
export default class RegisterPatientsPage extends mixins(BreadCrumbsLinks) {
  title = '';
  mount = false;
  cols: IRegisterProperty[] = [];
  registerGet!: (registerId: string) => Promise<void>;
  updateUser!: (user: IUserAuthorized) => Promise<void>;
  register: IRegister = new Register();
  user: IUserAuthorized = new UserAuthorized();

  async mounted(): Promise<void> {
    await this.registerGet(`${this.$route.params.registerId}`);
    this.register = this.$store.getters['registers/register'];
    if (this.register.name) {
      this.pushToLinks(['/register-link-list/'], ['Регистры пациентов']);
    }
    if (this.register.name) this.title = this.register.name;
    this.user = this.$store.getters['auth/user'];
    await this.setCols();
    this.mount = true;
  }

  async setCols(value?: boolean, propertyId?: string): Promise<void> {
    if (value !== undefined && propertyId) {
      if (value) {
        const prop = new RegisterPropertyToUser();
        prop.registerPropertyId = propertyId;
        prop.userId = this.user.id;
        this.user.registerPropertyToUser.push(prop);
      } else {
        const index = this.user.registerPropertyToUser.findIndex((prop) => prop.registerPropertyId === propertyId);
        if (index > -1) {
          this.user.registerPropertyToUser.splice(index, 1);
        }
      }
      await this.updateUser(this.user);
    }
    this.cols = this.user.filterActualProperties(this.register.getProps());
  }

  edit(patientId: string): void {
    this.$router.push(`/registers/patients/${this.$route.params.registerId}/${patientId}`);
  }
}
</script>
