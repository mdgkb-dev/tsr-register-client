<template>
  <div class="wrapper">
    <PageHead :titleParent="'Регистры пациентов'" :title="title" :link="'/registers'" @submitForm="submitForm" />
    <el-row>
      <el-form v-if="mount" ref="form" label-width="20%" label-position="left" style="width: 100%">
        <div class="table-background" style="margin-bottom: 20px; height: unset">
          <el-form-item label="Название регистра">
            <el-input v-model="register.name"></el-input>
          </el-form-item>
        </div>
        <el-collapse>
          <el-collapse-item>
            <template #title><h2 class="collapseHeader">Группы</h2></template>
            <RegisterGroupForm :inRegisterGroupToRegister="register.registerGroupToRegister" :inRegisterGroupOptions="registerGroups" />
          </el-collapse-item>
          <el-collapse-item>
            <template #title><h2 class="collapseHeader">Диагнозы</h2></template>
            <MkbForm v-model:diagnosisData="register.registerDiagnosis" />
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import Register from '@/classes/registers/Register';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import PageHead from '@/components/PageHead.vue';
import RegisterGroupForm from '@/components/Registers/RegisterGroupForm.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

@Options({
  name: 'RegisterPage',
  components: {
    PageHead,
    RegisterGroupForm,
    MkbForm,
  },
  computed: {
    ...mapGetters('registers', ['register']),
    ...mapGetters('registerGroups', ['registerGroup']),
  },
  methods: {
    ...mapActions({
      registerGet: 'registers/get',
      registerGroupsGetAll: 'registerGroups/getAll',
    }),
  },
})
export default class RegisterPage extends Vue {
  // Types.
  isEditMode!: boolean;
  $message!: any;
  registerGroups!: IRegisterGroup[];

  registerGet!: (registerId: string) => Promise<void>;
  registerGroupsGetAll!: () => Promise<void>;

  // Local state.
  register: IRegister = new Register();
  title = '';
  mount = false;

  async mounted(): Promise<void> {
    if (!this.$route.params.registerId) {
      this.isEditMode = false;
      this.title = 'Создать регистр';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать регистр';
      await this.registerGet(`${this.$route.params.registerId}`);
      this.register = this.$store.getters['registers/register'];
    }

    await this.registerGroupsGetAll();
    this.registerGroups = this.$store.getters['registerGroups/registerGroups'];

    this.mount = true;
  }

  async submitForm(): Promise<void> {
    try {
      if (this.isEditMode) {
        this.$store.dispatch('registers/edit', this.register);
      } else {
        this.$store.dispatch('registers/create', this.register);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }
    await this.$router.push('/registers');
  }
}
</script>

<style lang="scss" scoped>
.wrapper:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>
