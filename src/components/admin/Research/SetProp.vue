<template>
  <el-form-item v-if="prop.valueType.isSet()">
    <el-input v-model="filter" @input="input" />
    <el-checkbox
      v-for="registerPropertySet in prop.getRegisterPropertySets()"
      :key="registerPropertySet.id"
      :label="registerPropertySet.name"
      :model-value="registerGroupToPatient.getRegisterPropertyValueSet(registerPropertySet.id)"
      @change="registerGroupToPatient.setRegisterPropertyValueSet($event, registerPropertySet.id)"
    >
      <div>
        {{ registerPropertySet.name }}
      </div>
    </el-checkbox>
    <div v-for="registerPropertySet in prop.registerPropertySets" :key="registerPropertySet.id">
      <template v-if="registerGroupToPatient.getRegisterPropertyValueSet(registerPropertySet.id)">
        <el-form-item
          v-for="registerPropertyOther in registerPropertySet.registerPropertyOthers"
          :key="registerPropertyOther.id"
          :label="registerPropertyOther.name"
        >
          <el-input
            :model-value="registerGroupToPatient.getRegisterPropertyOthers(registerPropertyOther.id)"
            @input="registerGroupToPatient.setRegisterPropertyOthers($event, registerPropertyOther.id)"
          />
        </el-form-item>
      </template>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import IRegisterGroup from '@/interfaces/IRegisterGroup';
import IRegisterGroupToPatient from '@/interfaces/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/IRegisterProperty';

export default defineComponent({
  name: 'SetProp',
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
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const filter: Ref<string> = ref('');
    onBeforeMount(() => {
      filter.value = props.modelValue;
    });
    const input = (v: any) => {
      console.log(v);
      emit('update:modelValue', v);
    };
    return { filter, input };
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
