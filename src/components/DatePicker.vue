<template>
  <el-date-picker
    class="selector"
    v-bind="$attrs"
    ref="pick"
    model-value="date"
    :readonly="readonly"
    type="date"
    format="DD.MM.YYYY"
    placeholder="Выберите дату"
  />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeMount, onMounted, PropType, reactive, ref, UnwrapRef, watch } from 'vue';
import { useStore } from 'vuex';

import IHuman from '@/interfaces/humans/IHuman';
import IOption from '@/interfaces/shared/IOption';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'DatePicker',
  props: {
    date: {
      type: String as PropType<string>,
      required: true,
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();

    const pick = ref();
    const listenKey = () => {
      // if (!pickerRef.value || pickerRef.value.$el) {
      //   return;
      // }

      console.log();
      const el = document.getElementsByClassName('.selector')[0];

      console.log(el);
      pick.value.onkeydown = (ev: KeyboardEvent) => {
        console.log(1);
        const event = ev || window.event;
        if (event.keyCode === 13) {
          // Enter key
          // this.$emit('change', this.handleDateFormat(pickerRef.$children[0].value));
        }
      };
      pick.value.input = (ev: KeyboardEvent) => {
        console.log(1);
        const event = ev || window.event;
        if (event.keyCode === 13) {
          // Enter key
          // this.$emit('change', this.handleDateFormat(pickerRef.$children[0].value));
        }
      };
    };

    onMounted(() => {
      listenKey();
    });

    const { formatDate } = useDateFormat();

    return {
      pick,
      formatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-autocomplete) {
  display: block;
}
.el-icon-copy-document {
  &:hover {
    cursor: pointer;
    color: darken(white, 10%);
  }
}
</style>
