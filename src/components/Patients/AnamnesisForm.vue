<template>
  <div class="card-wrapper">
    <el-card class="box-card" style="position: relative">
      <el-form-item
        v-if="anamnesis.isEditMode"
        label-width="0"
        :prop="propName + '.date'"
        :rules="[{ required: true, message: 'Пожалуйста, выберите дату', trigger: 'blur' }]"
      >
        <el-date-picker v-model="anamnesis.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
      </el-form-item>
      <el-form-item
        v-if="anamnesis.isEditMode"
        :prop="propName + '.value'"
        label-width="0"
        :rules="[{ required: true, message: 'Это поле не может быть пустым', trigger: 'blur' }]"
      >
        <el-input v-model="anamnesis.value" type="textarea" class="textarea" :autosize="{ minRows: 3, maxRows: 7 }"> </el-input>
      </el-form-item>
      <article v-else style="white-space: pre-line">{{ anamnesis.value }}</article>
      <div class="card-button-group">
        <el-button v-if="anamnesis.isEditMode" icon="el-icon-folder-checked" @click="edit"></el-button>
        <el-button v-else icon="el-icon-edit" @click="edit"></el-button>
        <el-popconfirm
          confirm-button-text="Да"
          cancel-button-text="Отмена"
          icon="el-icon-info"
          icon-color="red"
          title="Вы уверен, что хотите удалить это?"
          @confirm="remove"
          @cancel="() => {}"
        >
          <template #reference>
            <el-button icon="el-icon-delete"></el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import { useStore } from 'vuex';
import RepresentativeToPatientRules from '@/classes/representatives/RepresentativeToPatientRules';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IOption from '@/interfaces/patients/IOption';

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

:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  border-radius: 15px;
}

.el-timeline {
  padding: 0;
}
</style>
