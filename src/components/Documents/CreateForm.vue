<template>
  <el-form ref="form" :model="item" label-width="120px">
    <el-form-item label="Название документа">
      <el-input v-model="item.name"></el-input>
    </el-form-item>

    <el-form-item
      v-for="field in item.documentFields"
      :key="field.name"
      v-model="item.documentFields"
    >
      <el-form-item label="Название поля">
        <el-input v-model="field.name"></el-input>
      </el-form-item>
      <el-cascader
        placeholder="Выберите тип поля"
        :options="options"
        v-model="field.type"
      ></el-cascader>
      ><el-button @click.prevent="remove(item)">Delete</el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">Добавить поля</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Создать</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

import IOption from '../../interfaces/documents/IOption';
import IItem from '../../interfaces/documents/IItem';
import IField from '../../interfaces/documents/IField';

export default class CreateForm extends Vue {
  options: IOption[] = [
    { label: 'Строка', value: 'string' },
    { label: 'Число', value: 'number' },
    { label: 'Дата', value: 'date' },
  ];

  item: IItem = {
    name: '',
    documentFields: [
      {
        name: '',
        type: '',
      },
    ],
  };

  onSubmit(): void {
    this.$store.dispatch('documents/create', this.item);
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }

  remove(item: IField): void {
    const index = this.item.documentFields.indexOf(item);
    if (index !== -1) {
      this.item.documentFields.splice(index, 1);
    }
  }

  add(): void {
    this.item.documentFields.push({
      name: '',
      type: '',
    });
  }
}
</script>
