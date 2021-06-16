<template>
  <PageHead :titleParent="'Антропометрия'" :title="title" @submitForm="submitForm" />
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
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import PageHead from '@/components/PageHead.vue';

import Anthropometry from '@/classes/anthropometry/Anthropometry';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import ValidateMixin from '@/mixins/ValidateMixin.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';

@Options({
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
export default class AnthropometryPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin) {
  anthropometryGet!: (anthropometryId: string) => Promise<void>;

  anthropometry: IAnthropometry = new Anthropometry();
  title = '';

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

  async created(): Promise<void> {
    if (!this.$route.params.anthropometryId) {
      this.isEditMode = false;
      this.title = 'Создать параметр';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать параметр';
      await this.anthropometryGet(`${this.$route.params.anthropometryId}`);
      this.anthropometry = this.$store.getters['anthropometry/anthropometry'];
    }
  }

  submitForm(): void {
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
