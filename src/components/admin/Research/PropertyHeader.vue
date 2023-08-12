<template>
  <div>
    <h3>{{ index + 1 }}. {{ prop.name }}</h3>
  </div>
  <ul>
    <li v-for="example in prop.registerPropertyExamples" :key="example.id">
      {{ example.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IRegisterProperty from '@/interfaces/IRegisterProperty';

export default defineComponent({
  name: 'PropertyHeader',
  props: {
    prop: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
    index: {
      type: Number,
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
