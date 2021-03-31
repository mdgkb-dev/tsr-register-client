<template>
  <el-form ref="representative" :model="representative" label-width="120px">
    <el-form-item label="Имя">
      <el-input label="Имя" v-model="representative.human.name"></el-input>
      <el-input
        label="Фамилия"
        v-model="representative.human.surname"
      ></el-input>
      <el-input
        label="Отчество"
        v-model="representative.human.patronymic"
      ></el-input>
    </el-form-item>
    <el-form-item label="Пол">
      <el-select
        v-model="representative.human.gender"
        placeholder="Выберите пол"
      >
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата рождения">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Выберите дату"
          v-model="representative.human.dateBirth"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="representative.human.addressRegistration"></el-input>
      <el-input v-model="representative.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="representative.contact.email"></el-input>
      <el-input v-model="representative.contact.phone"></el-input>
    </el-form-item>

    <el-form-item
      v-for="item in representative.representativeToPatient"
      :key="item"
      v-model="representative.representativeToPatient"
    >
      <el-cascader
        placeholder="Выберите пациента"
        :options="options"
        filterable
        v-model="representative.representativeToPatient.patientId"
      ></el-cascader>
      <el-cascader
        placeholder="Выберите роль представителя"
        :options="types"
        v-model="representative.representativeToPatient.type"
      ></el-cascader>
      ><el-button @click.prevent="remove(item)">Delete</el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">Добавить пациента</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Создать</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  name: "CreateForm",

  data() {
    return {
      documentsOptions: [{}],
      options: [{}],
      types: [
        { label: "Отец", value: "father" },
        { label: "Мать", value: "mother" }
      ],
      representative: {
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
        },
        contact: {
          email: "",
          phone: ""
        },
        representativeToPatient: [
          {
            patientId: null,
            type: ""
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("patients", ["patients"]),
    ...mapGetters("documents", ["documents"])
  },
  methods: {
    ...mapActions({
      patientsGetAll: "patients/getAll",
      patientsCreate: "patients/create",
      documentsGetAll: "documents/getAll",
      documentsCreate: "documents/create"
    }),
    onSubmit() {
      this.$store.dispatch("representatives/create", this.representative);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  },
  async mounted() {
    await this.patientsGetAll();
    for (const item of this.patients) {
      this.options.push({
        label: `${item.surname} ${item.name} ${item.patronymic}`,
        value: item.id
      });
    }
    // await this.documentsGetAll();
    // for (const item of this.documents) {
    //   this.documentsOptions.push({
    //     label: item.name,
    //     value: item.id
    //   });
    // }
  }
});
</script>
