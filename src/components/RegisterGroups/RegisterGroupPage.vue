<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form :status-icon="true" :inline-message="true" ref="form" :model="registerGroup" label-width="20%" label-position="left" :rules="rules">
          <el-form-item label="Название группы" prop="name">
            <el-input v-model="registerGroup.name"></el-input>
          </el-form-item>
          <RegisterPropertyForm :inRegisterPropertyToRegisterGroup="registerGroup.registerPropertyToRegisterGroup" :inRegisterPropertyOptions="registerProperties" />
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mapActions, mapGetters } from 'vuex';

import RegisterGroup from '@/classes/registers/RegisterGroup';
import PageHead from '@/components/PageHead.vue';
import RegisterPropertyForm from '@/components/RegisterGroups/RegisterPropertyForm.vue';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

@Options({
  name: 'RegisterGroupPage',
  components: {
    PageHead,
    RegisterPropertyForm,
  },
  computed: {
    ...mapGetters('registerGroups', ['registerGroup']),
    ...mapGetters('registerProperties', ['registerProperties']),
  },
  methods: {
    ...mapActions({
      registerGroupGet: 'registerGroups/get',
      registerPropertiesGetAll: 'registerProperties/getAll',
    }),
  },
})
export default class RegisterGroupPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  // Types.
  registerProperties!: IRegisterProperty[];

  registerGroupGet!: (registerGroupId: string) => Promise<void>;
  registerPropertiesGetAll!: () => Promise<void>;

  // Local state.
  registerGroup: IRegisterGroup = new RegisterGroup();
  title = '';
  mount = false;

  rules = {
    name: [{ required: true, message: 'Необходимо указать название группы', trigger: 'blur' }],
  };

  // Lifecycle methods.
  async created(): Promise<void> {
    if (!this.$route.params.registerGroupId) {
      this.isEditMode = false;
      this.title = 'Создать группу';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать группу';
      await this.registerGroupGet(`${this.$route.params.registerGroupId}`);
      this.registerGroup = this.$store.getters['registerGroups/registerGroup'];
    }

    await this.registerPropertiesGetAll();
    this.registerProperties = this.$store.getters['registerProperties/registerProperties'];

    this.pushToLinks(['/register-groups'], ['Группы для регистров']);
    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('registerGroup', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  async submitForm(next?: NavigationGuardNext): Promise<void> {
    this.saveButtonClick = true;
    if (!this.validate(this.$refs.form)) return;

    await this.submitHandling('registerGroups', this.registerGroup, next, 'register-groups');
  }
}
</script>
