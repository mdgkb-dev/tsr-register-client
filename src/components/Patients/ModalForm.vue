<template>
  <h1>{{ modalTitle }}</h1>
  <el-form ref="form" :model="editPatient" label-width="150px">
    {{ editPatient }}
    <el-row>
      <el-col>
        <h3>Личная информация</h3>
      </el-col>
      <el-row>
        <el-col :span="8">
          <el-form-item label="Имя">
            <el-input v-model="editPatient.human.name"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="Фамилия">
          <el-col :span="8">
            <el-input v-model="editPatient.human.surname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Отчество">
          <el-col :span="8">
            <el-input v-model="editPatient.human.patronymic"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Пол">
            <el-select v-model="editPatient.human.gender" placeholder="Выберите пол">
              <el-option label="Мужчина" value="male"></el-option>
              <el-option label="Женщина" value="female"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Дата рождения">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="editPatient.human.dateBirth"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Адрес регистрации">
            <el-input v-model="editPatient.human.addressRegistration"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Адрес проживания">
            <el-input v-model="editPatient.human.addressResidential"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="Телефон">
          <el-input v-model="editPatient.human.contact.phone"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="editPatient.human.contact.email"></el-input>
        </el-form-item>
      </el-row>
      <div v-if="mount">
        <h2>Антропометрия</h2>
        <el-form-item v-for="param in anthropometry" :key="param">
          <h3>{{ param.name }}</h3>
          <el-form-item>
            <el-button @click="add(param.id)">Добавить изменение</el-button>
          </el-form-item>
          <template v-for="(item, i) in editPatient.anthropometryData">
            {{ editPatient.anthropometryData[i] }}
            <div v-if="item.anthropometryId === param.id">
              <el-form-item label="Дата">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="Дата изменения"
                    v-model="editPatient.anthropometryData[i].date"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
                <el-button @click.prevent="remove(item)">Удалить изменение</el-button>
              </el-form-item>
              <el-form-item label="Значение">
                <el-input-number v-model="editPatient.anthropometryData[i].value"></el-input-number>
              </el-form-item>
            </div>
          </template>
        </el-form-item>
        <h2>Страховки</h2>
        <el-form-item>
          <el-form-item
            v-for="(item, index) in editPatient.human.insuranceCompanyToHuman"
            :key="index"
            v-model="editPatient.human.insuranceCompanyToHuman"
          >
            <el-select
              placeholder="Выберите компанию"
              v-model="editPatient.human.insuranceCompanyToHuman[index].insuranceCompanyId"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              label="Введите номер страховки"
              v-model="editPatient.human.insuranceCompanyToHuman[index].number"
            ></el-input>
            <el-button @click.prevent="removeInsurance(item)">Удалить страховку</el-button>
          </el-form-item>

          <el-form-item>
            <el-button @click="addInsurance">Добавить страховку</el-button>
          </el-form-item>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Сохранить</el-button>
        <el-button @click="close">Отмена</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import IPatient from '@/interfaces/patients/IPatient';
import { mapActions, mapGetters } from 'vuex';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IInsuranceCompanyOption from '@/interfaces/insuranceCompanies/IInsuranceCompanyOption';

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

  options!: IInsuranceCompanyOption[];

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
    this.options = [];
    for (const item of this.insuranceCompanies) {
      this.options.push({
        label: `${item.name}`,
        value: `${item.id}`,
      });
    }
    console.log(this.options);
    this.mount = true;
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

  close(): void {
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editPatient = this.patient;
  }
}
</script>
