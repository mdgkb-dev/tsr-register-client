<template>
  <div class="card-wrapper">
    <el-card class="box-card" style="position: relative">
      <el-form-item
        v-if="anamnesis.isEditMode"
        label-width="0"
        :prop="propName + '.date'"
        :rules="[{ required: true, message: 'Пожалуйста, выберите дату', trigger: 'blur' }]"
      >
        <el-date-picker v-model="anamnesis.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату" @keydown="dateFormat" />
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
      <div v-if="isEditMode" class="card-button-group">
        <el-button v-if="anamnesis.isEditMode" :icon="FolderChecked" @click="edit"></el-button>
        <el-button v-else :icon="Edit" @click="edit"></el-button>
        <el-popconfirm
          confirm-button-text="Да"
          cancel-button-text="Отмена"
          icon="Info"
          icon-color="red"
          title="Вы уверен, что хотите удалить это?"
          @confirm="remove"
          @cancel="
            () => {
              return null;
            }
          "
        >
          <template #reference>
            <el-button :icon="Delete"></el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Delete, Edit, FolderChecked } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import dateFormat from '@/services/DateMask';

export default defineComponent({
  name: 'AnamnesisForm',
  props: {
    anamnesisProp: {
      type: Object as PropType<IPatientDiagnosisAnamnesis>,
      required: true,
    },
    propName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const store = useStore();
    // const { anamnesisId } = toRefs(props);
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    // const anamnesis: ComputedRef<IPatientDiagnosisAnamnesis> = computed(() =>
    //   store.getters['patients/patient'].getAnamnesis(anamnesisId.value)
    // );
    const anamnesis: Ref<IPatientDiagnosisAnamnesis> = ref(new PatientDiagnosisAnamnesis());

    const edit = () => (anamnesis.value.isEditMode = !anamnesis.value.isEditMode);
    const remove = () => emit('remove');
    onBeforeMount(() => {
      anamnesis.value = props.anamnesisProp;
    });

    return {
      dateFormat,
      anamnesis,
      edit,
      remove,
      isEditMode,
      Edit,
      FolderChecked,
      Delete,
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
