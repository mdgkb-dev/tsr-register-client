<template>
  <el-form ref="form" :model="edit" label-width="120px">
    <el-form-item label="Название документа">
      <el-input v-model="edit.name"></el-input>
    </el-form-item>

    <el-form-item
      v-for="field in edit.documentFields"
      :key="field.name"
      v-model="edit.documentFields"
    >
      <el-form-item label="Название поля">
        <el-input v-model="field.name"></el-input>
      </el-form-item>
      <el-cascader
        placeholder="Выберите тип поля"
        :options="options"
        v-model="field.type"
      ></el-cascader>
      ><el-button @click.prevent="remove(edit)">Delete</el-button>
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
import { Vue, Options } from 'vue-class-component';

import IHuman from '../../interfaces/humans/IHuman';

@Options({
  props: ['item'],
})
export default class EditForm extends Vue {
  item!: IHuman;

  edit: IHuman = this.item;

  options = [
    { label: 'Строка', value: 'string' },
    { label: 'Число', value: 'number' },
    { label: 'Дата', value: 'date' },
  ];

  onSubmit(): void {
    this.$store.dispatch('humans/edit', this.edit);
  }

  close(): void {
    this.$emit('close');
  }

  remove(item: any): void {
    const index = this.edit.documentFields.indexOf(item);
    if (index !== -1) {
      this.edit.documentFields.splice(index, 1);
    }
  }

  add(): void {
    this.edit.documentFields.push({
      name: '',
      type: '',
    });
  }
}
</script>
