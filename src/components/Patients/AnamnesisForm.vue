<template>
  <div class="card-wrapper">
    <el-card class="box-card" style="position: relative">
      <el-form-item
        v-if="anamnesis.isEditMode"
        label-width="0"
        :prop="propName + '.date'"
        :rules="[{ required: true, message: 'Пожалуйста, выберите дату', trigger: 'blur' }]"
        @change="updateAnamnesis"
      >
        <el-date-picker v-model="anamnesis.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату" @change="updateAnamnesis" />
      </el-form-item>
      <el-form-item
        v-if="anamnesis.isEditMode"
        :prop="propName + '.value'"
        label-width="0"
        :rules="[{ required: true, message: 'Это поле не может быть пустым', trigger: 'blur' }]"
      >
        <el-input
          v-model="anamnesis.value"
          type="textarea"
          class="textarea"
          :autosize="{ minRows: 3, maxRows: 7 }"
          @change="updateAnamnesis"
        />
      </el-form-item>
      <article v-else style="white-space: pre-line">{{ anamnesis.value }}</article>
      <div class="card-button-group">
        <el-button v-if="anamnesis.isEditMode" icon="el-icon-folder-checked" @click="edit" />
        <el-button v-else icon="el-icon-edit" @click="edit" />
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
            <el-button icon="el-icon-delete" />
          </template>
        </el-popconfirm>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep';
import { computed, ComputedRef, defineComponent, PropType, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

export default defineComponent({
  name: 'AnamnesisForm',
  props: {
    /*anamnesis: {
      type: Object as PropType<IPatientDiagnosisAnamnesis>,
      required: true,
    },*/
    storeName: {
      type: String as PropType<string>,
      required: true,
    },
    diagnosisIndex: {
      type: Number as PropType<number>,
      required: true,
    },
    index: {
      type: Number as PropType<number>,
      required: true,
    },
    diagnosis: {
      type: Object as PropType<IPatientDiagnosis>,
      required: true,
    },
    propName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const { diagnosis, diagnosisIndex, index } = toRefs(props);
    const anamnesisComputed: ComputedRef<IPatientDiagnosisAnamnesis> = computed<IPatientDiagnosisAnamnesis>(() =>
      store.getters[`${props.storeName}/getAnamnesis`]({ diagnosisIndex, anamnesisIndex: index })
    );
    const anamnesis: IPatientDiagnosisAnamnesis = reactive<IPatientDiagnosisAnamnesis>(cloneDeep(anamnesisComputed.value));

    const edit = () => {
      anamnesis.isEditMode = !anamnesis.isEditMode;
    };

    const remove = () => {
      const idForDelete = diagnosis.value.patientDiagnosisAnamnesis[index.value].id;

      if (idForDelete) {
        diagnosis.value.patientDiagnosisAnamnesisForDelete.push(idForDelete);
      }

      diagnosis.value.patientDiagnosisAnamnesis.splice(index.value, 1);
    };

    const updateAnamnesis = () => {
      store.commit(`${props.storeName}/setAnamnesis`, { anamnesis, diagnosisIndex, anamnesisIndex: index });
    };

    return {
      anamnesis,
      edit,
      remove,
      updateAnamnesis,
    };
  },
});
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
