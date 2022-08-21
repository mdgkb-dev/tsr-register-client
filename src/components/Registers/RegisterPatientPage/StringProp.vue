<template>
  <el-form-item v-if="prop.valueType.isString()">
    <el-input
      :model-value="registerGroupToPatient.getRegisterPropertyValue(prop, false)"
      @input="registerGroupToPatient.setRegisterPropertyValue($event, prop)"
    />
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default defineComponent({
  name: 'StringProp',
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
