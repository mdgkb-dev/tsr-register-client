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
      <div class="card-button-group">
        <el-button icon="el-icon-folder-checked" v-if="anamnesis.isEditMode" @click="edit"></el-button>
        <el-button icon="el-icon-edit" v-else @click="edit"></el-button>
        <el-button icon="el-icon-delete" @click="remove"></el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

@Options({
  name: 'AnamnesisForm',
  props: ['anamnesis', 'index', 'diagnosis', 'propName'],
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

<style scoped>
article {
  width: calc(100% - 75px);
}

:deep(.el-card__body) {
  min-height: 100px;
}

.card-button-group {
  position: absolute;
  top: 10px;
  right: 10px;
}

:deep(.el-input__inner), :deep(.el-textarea__inner) {
  border-radius: 15px;
}

.el-timeline {
  padding: 0;
}
</style>
