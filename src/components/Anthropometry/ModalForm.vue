<template>
  <el-form ref="form" :model="editAnthropometry" @submit.prevent="submitForm" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Название параметра" label-width="20vw" prop="name">
      <el-input v-model="editAnthropometry.name"></el-input>
    </el-form-item>

    <el-form-item label="Единицы измерения" label-width="20vw" prop="measure">
      <el-input v-model="editAnthropometry.measure"></el-input>
    </el-form-item>

    <div class="center-align">
      <el-button type="primary">{{ isCreateForm ? 'Создать' : 'Применить' }}</el-button>
      <el-button @click="close">Отмена</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { required, helpers } from '@vuelidate/validators';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

@Options({
  props: ['anthropometry', 'is-create-form', 'modal-title'],
  rules: {
    editAnthropometry: {
      name: {
        required: helpers.withMessage('Пожалуйста, введите параметр.', required),
      },
    },
  },
})
export default class ModalForm extends Vue {
  anthropometry!: IAnthropometry;

  isCreateForm!: boolean;

  editAnthropometry = this.anthropometry;

  submitForm(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('anthropometry/create', this.editAnthropometry);
    } else {
      this.$store.dispatch('anthropometry/edit', this.editAnthropometry);
    }
    this.$emit('close');
  }
}
</script>
