<template>
  <el-form-item v-if="prop.valueType.isRadio()">
    <el-radio
      v-for="registerPropertyRadio in prop.registerPropertyRadios"
      :key="registerPropertyRadio.id"
      :label="registerPropertyRadio.id"
      :model-value="registerGroupToPatient.getRegisterPropertyValue(prop, false)"
      @change="registerGroupToPatient.setRegisterPropertyValue(registerPropertyRadio.id, prop)"
    >
      {{ registerPropertyRadio.name }}
    </el-radio>
    <div v-if="prop.getOthers(registerGroupToPatient.getRegisterPropertyValue(prop))">
      <el-form-item
        v-for="registerPropertyOther in prop.getOthers(registerGroupToPatient.getRegisterPropertyValue(prop, false))"
        :key="registerPropertyOther.id"
        :label="registerPropertyOther.name"
      >
        <el-input
          :model-value="registerGroupToPatient.getRegisterPropertyOthers(registerPropertyOther.id)"
          @input="registerGroupToPatient.setRegisterPropertyOthers($event, registerPropertyOther.id)"
        />
      </el-form-item>
    </div>
    <el-input
      v-if="prop.withOther"
      style="margin-top: 10px"
      placeholder="Другое, указать"
      type="textarea"
      :rows="3"
      :model-value="registerGroupToPatient.getOtherPropertyValue(prop)"
      @input="registerGroupToPatient.setRegisterPropertyValueOther($event, prop)"
    />
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default defineComponent({
  name: 'RadioProp',
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
