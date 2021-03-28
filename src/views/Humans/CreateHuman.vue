<template>
  <el-dialog
    title="CreateHuman"
    v-model="show"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="human" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="name"></el-input>
        <el-input v-model="surname"></el-input>
        <el-input v-model="patronymic"></el-input>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="gender" placeholder="please select your zone">
          <el-option label="Мужчина" value="male"></el-option>
          <el-option label="Женщина" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="dateBirth"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Адреса">
        <el-input v-model="addressRegistration"></el-input>
        <el-input v-model="addressResidential"></el-input>
      </el-form-item>
      <el-form-item label="Контакты">
        <el-input v-model="contactEmail"></el-input>
        <el-input v-model="contactPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreateHuman",

  data() {
    return {
      surname: "",
      patronymic: "",
      gender: "",
      dateBirth: "",
      addressRegistration: "",
      addressResidential: "",
      contactPhone: "",
      contactEmail: ""
    };
  },
  props: ["value", "name"],
  computed: {
    show: {
      get(): any {
        return this.value;
      },
      set(value: any): any {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("humans/createHuman");
    }
  }
});
</script>
