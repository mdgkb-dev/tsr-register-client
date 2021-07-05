<template>
  <div class="wrapper" v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <el-form :status-icon="true" :inline-message="true" :rules="rules" :model="register" ref="form" label-width="20%" label-position="left" style="width: 100%">
        <div class="table-background" style="margin-bottom: 20px; height: unset">
          <el-form-item label="Название регистра" prop="name">
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
import { mixins, Options } from 'vue-class-component';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mapActions, mapGetters } from 'vuex';

import Register from '@/classes/registers/Register';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import PageHead from '@/components/PageHead.vue';
import RegisterGroupForm from '@/components/Registers/RegisterGroupForm.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

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
export default class RegisterPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  // Types.
  registerGroups!: IRegisterGroup[];

  registerGet!: (registerId: string) => Promise<void>;
  registerGroupsGetAll!: () => Promise<void>;

  // Local state.
  register: IRegister = new Register();
  title = '';
  mount = false;

  rules = {
    name: [{ required: true, message: 'Необходимо заполнить название регистра', trigger: 'blur' }],
  };

  // Lifecycle methods.
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

    this.pushToLinks(['/registers'], ['Регистры пациентов']);
    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('register', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  async submitForm(next?: NavigationGuardNext): Promise<void> {
    this.saveButtonClick = true;
    if (!this.validate(this.$refs.form)) return;

    await this.submitHandling('registers', this.register, next);
  }
}
</script>

<style lang="scss" scoped>
.wrapper:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>
