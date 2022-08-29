<template>
  <el-form-item v-if="prop.valueType.isNumber()">
    <el-input-number
      :model-value="registerGroupToPatient.getRegisterPropertyValue(prop, false)"
      @change="registerGroupToPatient.setRegisterPropertyValue($event, prop)"
    />
  </el-form-item>
  <el-radio-group
    :model-value="registerGroupToPatient.getMeasureId(prop.id)"
    @change="(measureId) => registerGroupToPatient.setMeasureId(measureId, prop.id)"
  >
    <el-radio v-for="measure in prop.registerPropertyMeasures" :key="measure.id" :label="measure.id">
      {{ measure.name }}
    </el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default defineComponent({
  name: 'NumberProp',
  props: {
    registerGroupToPatient: {
      type: Object as PropType<IRegisterGroupToPatient>,
      required: true,
    },
    prop: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
    registerGroup: {
      type: Object as PropType<IRegisterGroup>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
.register-property-block {
  background-color: #eef1f6;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  h3 {
    margin-top: 0;
  }
}
.el-form-item {
  margin: 0;
}
.el-divider {
  margin: 10px 0;
}
</style>
