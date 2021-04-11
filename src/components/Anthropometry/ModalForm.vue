<template>
  <el-form ref="form" :model="editAnthropometry" @submit.prevent="submitForm" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Название параметра" label-width="20vw">
      <el-input
        v-model="v$.editAnthropometry.name.$model"
        :class="{ 'wrong-input': v$.editAnthropometry.name.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, parameterIndex) of v$.editAnthropometry.name.$errors"
        :key="parameterIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>

    <div class="center-align">
      <el-button
        type="primary"
        :disabled="
          (isCreateForm && (!v$.$dirty || (v$.$dirty && v$.$errors.length > 0))) ||
          (!isCreateForm && v$.$errors.length > 0)
        "
        >{{ isCreateForm ? 'Создать' : 'Применить' }}</el-button
      >
      <el-button @click="close">Отмена</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

@Options({
  props: ['anthropometry', 'is-create-form', 'modal-title'],
  validations: {
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

  v$ = useVuelidate();

  submitForm(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('anthropometry/create', this.editAnthropometry);
    } else {
      console.log(this.editAnthropometry);
      this.$store.dispatch('anthropometry/edit', this.editAnthropometry);
    }
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editAnthropometry = this.anthropometry;
  }
}
</script>
