<template>
  <el-timeline>
    <el-timeline-item v-for="history in patient.patientHistories" :key="history.id" :timestamp="$dateTimeFormatter.format(history.createdAt)">
      {{ history.getInfo() }}
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import Patient from '@/classes/Patient';
// import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientHistories',
  components: {},
  setup() {
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    return {
      patient,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-timeline) {
  margin-right: 20px;
}

.selects {
  display: flex;
  flex-direction: column;
  width: 100%;

  &-item {
    width: 100%;
    margin: 10px 10px 0 10px;
    padding-right: 10px;

    :deep(.el-input__wrapper) {
      border-radius: 20px;
    }

    :deep(.el-select) {
      width: 100%;
    }
  }

  &-item:empty {
    display: none;
  }
}

:deep(.row-expand-cover .el-table__expand-icon) {
  visibility: hidden;
}
</style>
