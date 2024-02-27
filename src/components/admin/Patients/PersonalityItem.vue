<template>
  <div class="container" @click="$emit('click')">
    <StringItem :string="title" color="#006BB4" font-size="20px" min-width="110px" margin="0" />
    <Button v-if="withIcon" button-class="del-button" icon="del" icon-class="edit-icon" @click="$emit('remove')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Button from '@/services/components/Button.vue';
import StringItem from '@/services/components/StringItem.vue';

export default defineComponent({
  name: 'PersonalityItem',
  components: {
    StringItem,
    Button,
  },
  props: {
    withIcon: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
    title: { type: String as PropType<string>, required: true, default: '' },
  },
  emits: ['remove', 'click'],
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  cursor: pointer;
  border: $normal-border;
  border-radius: $normal-border-radius;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 0 10px 0;
}

.container:hover {
  border-color: #006bb4;
}

:deep(.del-button) {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
  border: none;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  fill: #c4c4c4;
}

:deep(.edit-icon):hover {
  fill: red;
}
</style>
