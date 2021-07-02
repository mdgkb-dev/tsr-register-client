<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form ref="form" :model="anthropometry" label-width="180px" label-position="left" :rules="rules" style="max-width: 800px">
          <el-form-item label="Название параметра" prop="name">
            <el-input v-model="anthropometry.name"></el-input>
          </el-form-item>
          <el-form-item label="Единицы измерения" prop="measure">
            <el-input v-model="anthropometry.measure"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import Anthropometry from '@/classes/anthropometry/Anthropometry';
import PageHead from '@/components/PageHead.vue';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

@Options({
  name: 'AnthropometryPage',
  components: {
    PageHead,
  },
  computed: {
    ...mapGetters('anthropometry', ['anthropometry']),
  },
  methods: {
    ...mapActions({
      anthropometryGet: 'anthropometry/get',
    }),
  },
})
export default class AnthropometryPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  // Types.
  anthropometryGet!: (anthropometryId: string) => Promise<void>;

  // Local state.
  anthropometry: IAnthropometry = new Anthropometry();
  title = '';
  mount = false;

  rules = {
    name: [
      {
        required: true,
        message: 'Пожалуйста, введите название параметра',
        trigger: 'blur',
      },
    ],
    measure: [
      {
        required: true,
        message: 'Пожалуйста, введите единицы измерения',
        trigger: 'blur',
      },
    ],
  };

  // Lifecycle methods.
  async mounted(): Promise<void> {
    if (!this.$route.params.anthropometryId) {
      this.isEditMode = false;
      this.title = 'Создать параметр';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать параметр';
      await this.anthropometryGet(`${this.$route.params.anthropometryId}`);
      this.anthropometry = this.$store.getters['anthropometry/anthropometry'];
    }
    this.pushToLinks(['/anthropometry'], ['Антропометрия']);
    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('anthropometry', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  submitForm(): void {
    this.saveButtonClick = true;
    if (!this.validate(this.$refs.form)) return;

    if (this.isEditMode) {
      this.$store.dispatch('anthropometry/edit', this.anthropometry);
    } else {
      this.$store.dispatch('anthropometry/create', this.anthropometry);
    }

    this.$router.push('/anthropometry');
  }
}
</script>
