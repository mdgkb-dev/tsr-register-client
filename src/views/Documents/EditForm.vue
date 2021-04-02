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
import { defineComponent } from "vue";
export default defineComponent({
  name: "EditForm",
  data() {
    return {
      edit: this.item,
      options: [
        { label: "Строка", value: "string" },
        { label: "Число", value: "number" },
        { label: "Дата", value: "date" }
      ]
    };
  },
  props: ["item"],
  methods: {
    onSubmit() {
      this.$store.dispatch("documents/edit", this.edit);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    remove(item: any) {
      const index = this.edit.documentFields.indexOf(item);
      if (index !== -1) {
        this.edit.documentFields.splice(index, 1);
      }
    },
    add() {
      this.edit.documentFields.push({
        name: "",
        type: ""
      });
    }
  }
});
</script>
