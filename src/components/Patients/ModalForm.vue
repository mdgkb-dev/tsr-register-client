<template>
  <el-form ref="form" :model="editPatient" label-width="10vw" label-position="right">
    <h3>Личная информация</h3>
    <el-form-item label="Фамилия" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.surname.$model"
        :class="{ 'wrong-input': v$.editPatient.human.surname.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, surnameIndex) of v$.editPatient.human.surname.$errors"
        :key="surnameIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Имя" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.name.$model"
        :class="{ 'wrong-input': v$.editPatient.human.name.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, nameIndex) of v$.editPatient.human.name.$errors"
        :key="nameIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Отчество" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.patronymic.$model"
        :class="{ 'wrong-input': v$.editPatient.human.patronymic.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, patronymicIndex) of v$.editPatient.human.patronymic.$errors"
        :key="patronymicIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Пол" label-width="20vw">
      <el-select v-model="editPatient.human.gender" placeholder="Выберите пол">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата рождения" label-width="20vw">
      <el-date-picker
        type="date"
        placeholder="Pick a date"
        v-model="v$.editPatient.human.dateBirth.$model"
      ></el-date-picker>
      <div
        :class="['error-message']"
        v-for="(error, dateBirthIndex) of v$.editPatient.human.dateBirth.$errors"
        :key="dateBirthIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Адрес регистрации" label-width="20vw">
      <el-input v-model="editPatient.human.addressRegistration"></el-input>
    </el-form-item>
    <el-form-item label="Адрес проживания" label-width="20vw">
      <el-input v-model="editPatient.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Телефон" label-width="20vw">
      <el-input v-model="editPatient.human.contact.phone"></el-input>
    </el-form-item>
    <el-form-item label="Email" label-width="20vw">
      <el-input v-model="editPatient.human.contact.email"></el-input>
    </el-form-item>

    <div v-if="mount">
      <h3>Антропометрия</h3>
      <el-form-item v-for="param in anthropometry" :key="param">
        <el-form-item :label="param.name">
          <el-button @click="add(param.id)">Добавить изменение</el-button>
        </el-form-item>
        <template v-for="(item, i) in patient.anthropometryData">
          <div v-if="item.anthropometryId === param.id">
            <el-form-item label="Дата" label-width="12vw">
              <el-date-picker
                type="date"
                placeholder="Дата изменения"
                v-model="patient.anthropometryData[i].date"
                style="width: 10vw"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="Значение" label-width="12vw">
              <el-input-number v-model="patient.anthropometryData[i].value"></el-input-number>
            </el-form-item>
            <el-form-item label-width="12vw">
              <el-button @click.prevent="remove(item)">Удалить изменение</el-button>
            </el-form-item>
          </div>
        </template>
      </el-form-item>
      <h3>Страховки</h3>

      <el-form-item label-width="20vw">
        <el-button @click="addInsurance">Добавить страховку</el-button>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in editPatient.human.insuranceCompanyToHuman"
        :key="index"
        v-model="editPatient.human.insuranceCompanyToHuman"
      >
        <el-form-item label="Компания" label-width="12vw">
          <el-select
            placeholder="Выберите компанию"
            v-model="editPatient.human.insuranceCompanyToHuman[index].insuranceCompanyId"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="Number(item.value)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Номер" label-width="12vw">
          <el-input
            label="Введите номер страховки"
            v-model="editPatient.human.insuranceCompanyToHuman[index].number"
          ></el-input>
        </el-form-item>

        <el-form-item label-width="12vw">
          <el-button @click.prevent="removeInsurance(item)">Удалить страховку</el-button>
        </el-form-item>
      </el-form-item>
    </div>
    <div class="center-allign">
      <el-button type="primary" @click="onSubmit">Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import IPatient from '@/interfaces/patients/IPatient';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

const russianLettersValidator = (value: unknown) => /^[А-Яа-яЁё \-]+$/.test(String(value));

@Options({
  props: ['patient', 'is-create-form', 'modalTitle'],
  computed: {
    ...mapGetters('anthropometry', ['anthropometry']),
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
  },
  methods: {
    ...mapActions({
      anthropometryGetAll: 'anthropometry/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
    }),
  },
  validations: {
    editPatient: {
      human: {
        surname: {
          required: helpers.withMessage('Пожалуйста, введите фамилию.', required),
          russianLettersValidator: helpers.withMessage(
            'Фамилия может содержать только русские буквы.',
            russianLettersValidator
          ),
        },
        name: {
          required: helpers.withMessage('Пожалуйста, введите имя.', required),
          russianLettersValidator: helpers.withMessage(
            'Имя может содержать только русские буквы.',
            russianLettersValidator
          ),
        },
        patronymic: {
          required: helpers.withMessage('Пожалуйста, введите отчество.', required),
          russianLettersValidator: helpers.withMessage(
            'Отчество может содержать только русские буквы.',
            russianLettersValidator
          ),
        },
        dateBirth: {
          required: helpers.withMessage('Пожалуйста, выберите дату рождения.', required),
        },
      },
    },
  },
})
export default class ModalForm extends Vue {
  patient!: IPatient;

  isCreateForm!: boolean;

  editPatient = this.patient;

  anthropometryGetAll!: () => Promise<void>;

  insuranceCompaniesGetAll!: () => Promise<void>;

  anthropometry!: IAnthropometry[];

  insuranceCompanies!: IInsuranceCompany[];

  mount = false;

  options = [{}];

  v$ = useVuelidate();

  onSubmit(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('patients/create', this.editPatient);
    } else {
      this.$store.dispatch('patients/edit', this.editPatient);
    }
    this.$emit('close');
  }

  async mounted(): Promise<void> {
    await this.anthropometryGetAll();
    await this.insuranceCompaniesGetAll();

    this.options.splice(0, 1);
    for (const item of this.insuranceCompanies) {
      this.options.push({
        label: `${item.name}`,
        value: item.id,
      });
    }
    this.mount = true;
  }

  add(paramId: number): void {
    this.patient.anthropometryData.push({
      anthropometryId: paramId,
      date: '',
    });
  }

  remove(item: any): void {
    const index = this.patient.anthropometryData.indexOf(item);
    if (index !== -1) {
      this.patient.anthropometryData.splice(index, 1);
    }
  }

  addInsurance(humanId: number, insuranceCompanyId: number): void {
    this.patient.human.insuranceCompanyToHuman.push({
      number: '',
      insuranceCompanyId: undefined,
      humanId: undefined,
    });
  }

  removeInsurance(item: any): void {
    const index = this.patient.human.insuranceCompanyToHuman.indexOf(item);
    if (index !== -1) {
      this.patient.human.insuranceCompanyToHuman.splice(index, 1);
    }
  }

  close(): void {
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editPatient = this.patient;
  }
}
</script>

<style scoped>
.center-allign {
  text-align: center;
  margin-left: 0vw !important;
}

.error-message {
  text-align: left;
  padding-left: 5px;
}

.wrong-input {
  border-style: solid;
  border-width: 2px;
  border-color: rgb(252, 191, 102);
  border-radius: 6px;
  height: 40px;
}
</style>
