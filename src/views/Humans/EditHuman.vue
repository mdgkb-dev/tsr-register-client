<template>
  <el-form ref="form" :model="editHuman" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="editHuman.name"></el-input>
      <el-input v-model="editHuman"></el-input>
      <el-input v-model="editHuman"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select
        v-model="editHuman.gender"
        placeholder="please select your zone"
      >
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="editHuman.dateBirth"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="editHuman.addressRegistration"></el-input>
      <el-input v-model="editHuman.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="editHuman.contactEmail"></el-input>
      <el-input v-model="editHuman.contactPhone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Edit</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "EditHuman",

  data() {
    return {
      editHuman: JSON.parse(this.human)
    };
  },
  props: ["human"],
  methods: {
    onSubmit() {
      this.$store.dispatch("humans/editHuman");
    }
  }
});
</script>
