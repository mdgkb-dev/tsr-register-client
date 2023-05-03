<template>
  <div class="card-wrapper">
    <el-card class="box-card" style="position: relative">
      <el-date-picker
        :model-value="anamnesis.date"
        type="date"
        format="DD.MM.YYYY"
        placeholder="Выберите дату"
        @change="(e) => anamnesis.setDate(e)"
        @keydown="dateFormat"
      />
      <el-input :model-value="anamnesis.doctorName" @input="(e) => anamnesis.setDoctorName(e)" @blur="update" />
      <el-input
        type="textarea"
        class="textarea"
        :autosize="{ minRows: 3, maxRows: 7 }"
        :model-value="anamnesis.value"
        @input="(e) => anamnesis.setValue(e)"
        @blur="update"
      >
      </el-input>
      <el-button @click="remove">Удалить</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Delete, Edit, FolderChecked } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent, PropType } from 'vue';

import Anamnesis from '@/classes/Anamnesis';
import dateFormat from '@/services/DateMask';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'AnamnesisForm',
  props: {
    anamnesis: {
      type: Object as PropType<Anamnesis>,
      required: true,
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    // const { anamnesisId } = toRefs(props);
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => Provider.store.getters['patients/isEditMode']);
    // const anamnesis: ComputedRef<IPatientDiagnosisAnamnesis> = computed(() =>
    //   store.getters['patients/patient'].getAnamnesis(anamnesisId.value)
    // );
    // const anamnesis: Ref<PatientDiagnosisAnamnesis> = ref(new PatientDiagnosisAnamnesis());
    const remove = () => emit('remove');
    const update = async (): Promise<void> => {
      await Provider.store.dispatch('anamneses/update', props.anamnesis);
    };
    return {
      dateFormat,
      remove,
      isEditMode,
      Edit,
      FolderChecked,
      Delete,
      update,
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
