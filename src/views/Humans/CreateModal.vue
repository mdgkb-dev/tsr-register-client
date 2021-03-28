<template>
  <el-form ref="form" :model="human" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="human.name"></el-input>
      <el-input v-model="human.surname"></el-input>
      <el-input v-model="human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="human.gender" placeholder="please select your zone">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="human.dateBirth"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="human.addressRegistration"></el-input>
      <el-input v-model="human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="human.contactEmail"></el-input>
      <el-input v-model="human.contactPhone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="close">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreateModal",

  data() {
    return {
      human: {
        surname: "",
        patronymic: "",
        gender: "",
        dateBirth: "",
        addressRegistration: "",
        addressResidential: "",
        contactPhone: "",
        contactEmail: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("humans/createHuman", this.human);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  }
});
</script>
