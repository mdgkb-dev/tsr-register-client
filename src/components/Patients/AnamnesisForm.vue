<template>
  <div class="card-wrapper">
    <el-card class="box-card" style="position: relative">
      <el-form-item
        v-if="anamnesis.isEditMode"
        label-width="0"
        :prop="propName + '.date'"
        :rules="[{ required: true, message: 'Пожалуйста, выберите дату', trigger: 'blur' }]"
      >
        <el-date-picker type="date" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="anamnesis.date"></el-date-picker>
      </el-form-item>
      <el-form-item
        v-if="anamnesis.isEditMode"
        :prop="propName + '.value'"
        label-width="0"
        :rules="[{ required: true, message: 'Это поле не может быть пустым', trigger: 'blur' }]"
      >
        <el-input type="textarea" class="textarea" :autosize="{ minRows: 3, maxRows: 7 }" v-model="anamnesis.value"> </el-input>
      </el-form-item>
      <article v-else style="white-space: pre-line">{{ anamnesis.value }}</article>
      <div class="icons">
        <i class="el-icon-folder-checked icon" v-if="anamnesis.isEditMode" @click="edit"></i>
        <i class="el-icon-edit icon" v-else @click="edit"></i>
        <i class="el-icon-delete icon" @click="remove"></i>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

@Options({
  props: ['anamnesis', 'index', 'diagnosis', 'prop-name'],
})
export default class AnamnesisForm extends Vue {
  // Types.

  anamnesis!: IPatientDiagnosisAnamnesis;
  index!: number;
  diagnosis!: IPatientDiagnosis;
  propName!: string;

  remove = () => {
    this.diagnosis.patientDiagnosisAnamnesis.splice(this.index, 1);
  };

  edit = () => {
    this.anamnesis.isEditMode = !this.anamnesis.isEditMode;
  };
}
</script>

<style lang="scss" scoped>
.card-wrapper:deep {
  article {
    width: calc(100% - 75px);
  }

  .el-card__body {
    min-height: 100px;
  }

  .icons {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .icon {
    font-size: 20px;
    margin: 10px;
    cursor: pointer;
  }

  .icon:hover {
    color: #5cb6ff;
  }

  .el-input__inner,
  .el-textarea__inner {
    border-radius: 15px;
  }

  .el-timeline {
    padding: 0;
  }
}
</style>
