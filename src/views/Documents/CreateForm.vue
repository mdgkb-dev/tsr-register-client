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
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreateForm",

  data() {
    return {
      options: [
        { label: "Строка", value: "string" },
        { label: "Число", value: "number" },
        { label: "Дата", value: "date" }
      ],
      item: {
        name: "",
        documentFields: [
          {
            name: "",
            type: ""
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("documents/create", this.item);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    remove(item: any) {
      const index = this.item.documentFields.indexOf(item);
      if (index !== -1) {
        this.item.documentFields.splice(index, 1);
      }
    },
    add() {
      this.item.documentFields.push({
        name: "",
        type: ""
      });
    }
  }
});
</script>
