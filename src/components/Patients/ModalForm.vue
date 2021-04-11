<template>
  <el-form
    ref="form"
    :model="editPatient"
    @submit.prevent="submitForm"
    label-width="10vw"
    label-position="right"
  >
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
      <el-input
        v-model="v$.editPatient.human.contact.phone.$model"
        :class="{ 'wrong-input': v$.editPatient.human.contact.phone.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, phoneIndex) of v$.editPatient.human.contact.phone.$errors"
        :key="phoneIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Email" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.contact.email.$model"
        :class="{ 'wrong-input': v$.editPatient.human.contact.email.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, emailIndex) of v$.editPatient.human.contact.email.$errors"
        :key="emailIndex"
      >
        {{ error.$message }}
      </div>
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
    <div class="center-align">
      <el-button
        type="primary"
        native-type="submit"
        :disabled="
          !v$.editPatient.human.surname.$dirty ||
          (v$.editPatient.human.surname.$dirty &&
            v$.editPatient.human.surname.$errors.length > 0) ||
          !v$.editPatient.human.name.$dirty ||
          (v$.editPatient.human.name.$dirty && v$.editPatient.human.name.$errors.length > 0) ||
          !v$.editPatient.human.patronymic.$dirty ||
          (v$.editPatient.human.patronymic.$dirty &&
            v$.editPatient.human.patronymic.$errors.length > 0) ||
          !v$.editPatient.human.dateBirth.$dirty ||
          (v$.editPatient.human.dateBirth.$dirty &&
            v$.editPatient.human.dateBirth.$errors.length > 0) ||
          (v$.editPatient.human.contact.phone.$dirty &&
            v$.editPatient.human.contact.phone.$errors.length > 0) ||
          (v$.editPatient.human.contact.email.$dirty &&
            v$.editPatient.human.contact.email.$errors.length > 0)
        "
        >Сохранить</el-button
      >
      <el-button @click="close">Отмена</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

import IPatient from '@/interfaces/patients/IPatient';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IMkb from '@/interfaces/mkb/IMkb';
import IOption from '@/interfaces/shared/IOption';

const russianLettersValidator = (value: unknown) => /^[А-Яа-яЁё \-]+$/.test(String(value));
const phoneValidator = (value: unknown) => /^(7[0-9]+)*$/.test(String(value));

@Options({
  props: ['patient', 'is-create-form', 'modalTitle'],
  computed: {
    ...mapGetters('anthropometry', ['anthropometry']),
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
    ...mapGetters('mkb', ['mkb']),
  },
  methods: {
    ...mapActions({
      anthropometryGetAll: 'anthropometry/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      mkbGetAll: 'mkb/getAll',
    }),
  },
  validations: {
    editPatient: {
      human: {
        surname: {
          required: helpers.withMessage('Пожалуйста, введите фамилию.', required),
          russianLettersValidator: helpers.withMessage(
            'Фамилия может содержать только русские буквы.',
            russianLettersValidator,
          ),
        },
        name: {
          required: helpers.withMessage('Пожалуйста, введите имя.', required),
          russianLettersValidator: helpers.withMessage(
            'Имя может содержать только русские буквы.',
            russianLettersValidator,
          ),
        },
        patronymic: {
          required: helpers.withMessage('Пожалуйста, введите отчество.', required),
          russianLettersValidator: helpers.withMessage(
            'Отчество может содержать только русские буквы.',
            russianLettersValidator,
          ),
        },
        dateBirth: {
          required: helpers.withMessage('Пожалуйста, выберите дату рождения.', required),
        },
        contact: {
          phone: {
            phoneValidator: helpers.withMessage(
              'Пожалуйста, используйте только цифры формата: 79151234567',
              phoneValidator,
            ),
          },
          email: {
            email: helpers.withMessage(
              'Пожалуста, введите корректный email формата: name@host.domain',
              email,
            ),
          },
        },
      },
    },
  },
})
export default class ModalForm extends Vue {
  // Types.
  anthropometry!: IAnthropometry[];

  mkb!: IMkb[];

  mkbOptions!: IOption[];

  isCreateForm!: boolean;

  insuranceCompanies!: IInsuranceCompany[];

  options!: IOption[];

  patient!: IPatient;

  anthropometryGetAll!: () => Promise<void>;

  insuranceCompaniesGetAll!: () => Promise<void>;

  mkbGetAll!: () => Promise<void>;

  // Local state.
  editPatient = this.patient;

  mount = false;

  diagnosisMount = false;

  v$ = useVuelidate();

  // Lifecycle methods.
  async mounted(): Promise<void> {
    await this.anthropometryGetAll();
    await this.insuranceCompaniesGetAll();
    await this.mkbGetAll();

    this.options = [];
    for (const item of this.insuranceCompanies) {
      this.options.push({
        label: `${item.name}`,
        value: `${item.id}`,
      });
    }
    console.log(this.mkb);
    this.mkb = this.mkb.slice(1, 100);

    this.mkbOptions = [];
    for (const item of this.mkb) {
      this.mkbOptions.push({
        label: `${item.class} ${item.groupName} ${item.subGroupName} ${item.diagnosisName} ${item.subDiagnosisName}`,
        value: `${item.id}`,
      });
    }
    this.mount = true;
    this.diagnosisMount = true;
  }

  beforeUpdate(): void {
    this.editPatient = this.patient;
  }

  // Methods.
  submitForm(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('patients/create', this.editPatient);
    } else {
      this.$store.dispatch('patients/edit', this.editPatient);
    }
    this.$emit('close');
  }

  add(paramId: string): void {
    this.patient.anthropometryData.push({
      anthropometryId: paramId,
      date: '',
      value: 0,
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

  addDiagnosis(): void {
    this.patient.mkbToPatient.push({
      primary: false,
      mkbId: '',
      patientId: '',
    });
  }

  removeDiagnosis(item: any): void {
    const index = this.patient.mkbToPatient.indexOf(item);
    if (index !== -1) {
      this.patient.mkbToPatient.splice(index, 1);
    }
  }

  close(): void {
    this.$emit('close');
  }
}
</script>
