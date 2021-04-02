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
      :key="item.patientId"
      v-model="representative.representativeToPatient"
    >
      <el-cascader
        placeholder="Выберите пациента"
        :options="options"
        filterable
        v-model="item.patient.id"
      ></el-cascader>
      <el-cascader
        placeholder="Выберите роль представителя"
        :options="types"
        v-model="item.type"
      ></el-cascader>
      ><el-button @click.prevent="remove(item)">Удалить пациента</el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">Добавить пациента</el-button>
    </el-form-item>

    <!--    <el-form-item-->
    <!--      v-for="document in documents"-->
    <!--      :key="document"-->
    <!--      v-model="representative.representativeToPatient"-->
    <!--    >-->
    <!--      <h3>{{ document.name }}</h3>-->

    <!--      <el-form-item v-for="field in document.documentFields" :key="field">-->
    <!--        <span>{{ field.name }}</span>-->
    <!--        <div v-if="field.type === `string`">-->
    <!--          <el-input-->
    <!--            label="field.name"-->
    <!--            v-model="representative.human.documentFieldToHuman[0].valueString"-->
    <!--          ></el-input>-->
    <!--        </div>-->
    <!--        <div v-else-if="field.type === `number`">-->
    <!--          <el-input-number-->
    <!--            label="field.name"-->
    <!--            v-model="representative.human.documentFieldToHuman[0].valueNumber"-->
    <!--          ></el-input-number>-->
    <!--        </div>-->
    <!--      </el-form-item>-->
    <!--    </el-form-item>-->

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
      options: [{}],
      count: 0,
      types: [
        { label: "Отец", value: "мать" },
        { label: "Мать", value: "отец" }
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
          },
          documentFieldToHuman: [
            {
              valueString: "",
              valueNumber: ""
            }
          ]
        },
        contact: {
          email: "",
          phone: ""
        },
        representativeToPatient: [
          {
            patient: { id: null },
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
      documentsGetAll: "documents/getAll"
    }),
    onSubmit() {
      for (const item of this.representative.representativeToPatient) {
        item.patient.id = (item.patient.id as any)[0];
        item.type = (item.type as any)[0];
      }

      this.$store.dispatch("representatives/create", this.representative);
      this.representative = {
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
          },
          documentFieldToHuman: [
            {
              valueString: "",
              valueNumber: ""
            }
          ]
        },
        contact: {
          email: "",
          phone: ""
        },
        representativeToPatient: [
          {
            patient: { id: null },
            type: ""
          }
        ]
      };
      this.$emit("close");
    },
    close() {
      this.count = 0;
      this.$emit("close");
    },
    add() {
      this.representative.representativeToPatient.push({
        patient: { id: null },
        type: ""
      });
    },
    remove(item: any) {
      const index = this.representative.representativeToPatient.indexOf(item);
      if (index !== -1) {
        this.representative.representativeToPatient.splice(index, 1);
      }
    }
  },
  async mounted() {
    await this.patientsGetAll();
    this.options.splice(0, 1);
    for (const item of this.patients) {
      this.options.push({
        label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
        value: item.id
      });
    }
    await this.documentsGetAll();
    for (const item of this.documents) {
      for (const field of this.documents.documentFields) {
        this.representative.human.documentFieldToHuman.push({
          valueString: "",
          valueNumber: ""
        });
      }
    }
  }
});
</script>
