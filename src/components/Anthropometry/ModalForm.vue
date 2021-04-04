<template>
  <el-form ref="form" :model="editAnthropometry" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Название документа">
      <el-input v-model="editAnthropometry.name"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Создать</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

@Options({
  props: ['anthropometry', 'is-create-form', 'modal-title'],
})
export default class ModalForm extends Vue {
  anthropometry!: IAnthropometry;

  isCreateForm!: boolean;

  editAnthropometry = this.anthropometry;

  onSubmit(): void {
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
