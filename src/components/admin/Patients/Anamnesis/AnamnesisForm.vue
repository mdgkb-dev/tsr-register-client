<template>
  <div class="card-wrapper">
    <el-form>
      <el-form-item label="Дата записи">
        <SmallDatePicker v-model:model-value="anamnesisDate" placeholder="Выбрать" @change="anamnesis.setDate(anamnesisDate)" />
      </el-form-item>
      <el-form-item label="ФИО врача">
        <el-input placeholder="ФИО врача" :model-value="anamnesis.doctorName" @input="(e) => anamnesis.setDoctorName(e)" @blur="update" />
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" class="textarea" :autosize="{ minRows: 3, maxRows: 7 }" :model-value="anamnesis.value" @input="(e) => anamnesis.setValue(e)" @blur="update">
        </el-input>
      </el-form-item>
      <Button
        text="Удалить"
        background="#ffffff"
        margin="0 10px 0 0"
        height="42px"
        font-size="16px"
        border-radius="5px"
        color="#343e5c"
        :color-swap="true"
        :with-icon="false"
        @click="remove"
      >
      </Button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import Anamnesis from '@/classes/Anamnesis';
import Button from '@/services/components/Button.vue';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import dateFormat from '@/services/DateMask';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AnamnesisForm',
  components: {
    Button,
    SmallDatePicker,
  },
  props: {
    anamnesis: {
      type: Object as PropType<Anamnesis>,
      required: true,
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const anamnesisDate: Ref<Date> = ref(new Date());
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
      anamnesisDate,
      dateFormat,
      remove,
      isEditMode,
      update,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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

// .el-timeline {
//   padding: 0;
// }

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

:deep(.el-form-item) {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}
</style>
