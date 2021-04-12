<template>
  <el-form ref="form" :model="editDocument" @submit.prevent="submitForm" label-width="10vw">
    <el-form-item label="Название документа" label-width="20vw">
      <el-input
        v-model="v$.editDocument.name.$model"
        :class="{ 'wrong-input': v$.editDocument.name.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, documentIndex) of v$.editDocument.name.$errors"
        :key="documentIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label-width="20vw" class="remove-margin-bottom">
      <el-button @click="add">Добавить поле</el-button>
    </el-form-item>

    <el-form-item
      v-for="(field, i) in editDocument.documentFields"
      :key="i"
      v-model="editDocument.documentFields"
    >
      <el-form-item label="Название поля" label-width="12vw">
        <el-input v-model="editDocument.documentFields[i].name"></el-input>
      </el-form-item>

      <el-form-item label="Тип поля" label-width="12vw">
        <el-select placeholder="Выберите тип поля" v-model="editDocument.documentFields[i].type">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="12vw">
        <el-button @click.prevent="remove(field)">Удалить поле</el-button>
      </el-form-item>
    </el-form-item>

    <div class="center-align add-margin-top">
      <el-button
        type="primary"
        native-type="submit"
        :disabled="
          (isCreateForm && (!v$.$dirty || (v$.$dirty && v$.$errors.length > 0))) ||
          (!isCreateForm && v$.$errors.length > 0)
        "
        >Сохранить</el-button
      >
      <el-button @click="close">Отмена</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import IDocument from '@/interfaces/documents/IDocument';

@Options({
  props: ['document', 'is-create-form', 'modal-title'],
  validations: {
    editDocument: {
      name: {
        required: helpers.withMessage('Пожалуйста, введите название документа.', required),
      },
    },
  },
})
export default class ModalForm extends Vue {
  document!: IDocument;

  isCreateForm!: boolean;

  editDocument = this.document;

  options = [
    { label: 'Строка', value: 'string' },
    { label: 'Число', value: 'number' },
    { label: 'Дата', value: 'date' },
  ];

  v$ = useVuelidate();

  submitForm(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('documents/create', this.editDocument);
    } else {
      this.$store.dispatch('documents/edit', this.editDocument);
    }
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }

  remove(item: any): void {
    const index = this.editDocument.documentFields!.indexOf(item);
    if (index !== -1) {
      this.editDocument.documentFields!.splice(index, 1);
    }
  }

  add(): void {
    this.editDocument.documentFields.push({
      name: '',
      type: '',
    });

    console.log(this.editDocument.documentFields);
    console.log('>>>>>>>>>>>>>>');
    console.log(this.v$);
    console.log('>>>>>>>>>>>>>>');
  }

  beforeUpdate(): void {
    this.editDocument = this.document;
  }
}
</script>
