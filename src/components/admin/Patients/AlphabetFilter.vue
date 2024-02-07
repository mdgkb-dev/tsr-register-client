<template>
  <Button :border="false" text="А-В" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="Г-Ё" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="Ж-К" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="Л-Н" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="О-Р" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="С-У" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="Ф-Ч" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="Ш-Щ" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
  <Button :border="false" text="Э-Я" :color-swap="true" width="60px" height="40px" font-size="16px" color="#343E5C" background="#DFF2F8" :with-icon="false"></Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from '@/services/components/Button.vue';

export default defineComponent({
  name: 'AlphabetFilter',
  components: {
    Button,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
