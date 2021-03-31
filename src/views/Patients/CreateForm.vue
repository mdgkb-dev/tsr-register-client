<template>
  <el-form ref="form" :model="patient" label-width="120px">
    <el-form-item label="Имя">
      <el-input label="Имя" v-model="patient.human.name"></el-input>
      <el-input label="Фамилия" v-model="patient.human.surname"></el-input>
      <el-input label="Отчество" v-model="patient.human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Пол">
      <el-select v-model="patient.human.gender" placeholder="Выберите пол">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата рождения">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Выберите дату"
          v-model="patient.human.dateBirth"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="patient.human.addressRegistration"></el-input>
      <el-input v-model="patient.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="patient.human.contact.email"></el-input>
      <el-input v-model="patient.human.contact.phone"></el-input>
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
      patient: {
        human: {
          surname: "",
          patronymic: "",
          gender: "",
          dateBirth: "",
          addressRegistration: "",
          addressResidential: "",
          contact: {
            email: "",
            phone: ""
          }
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("patients/create", this.patient);
      this.patient = {
        human: {
          surname: "",
          patronymic: "",
          gender: "",
          dateBirth: "",
          addressRegistration: "",
          addressResidential: "",
          contact: {
            email: "",
            phone: ""
          }
        }
      };
      this.$emit("close");
    },
    close() {
      this.patient = {
        human: {
          surname: "",
          patronymic: "",
          gender: "",
          dateBirth: "",
          addressRegistration: "",
          addressResidential: "",
          contact: {
            email: "",
            phone: ""
          }
        }
      };
      this.$emit("close");
    }
  }
});
</script>
