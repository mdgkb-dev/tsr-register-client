<template>
  <div class="switch-container">
    <div class="line">
      <StringItem string="М" font-size="12px" padding="0" :style="{color: knob1 ? '#006bb4' : '#B0A4C0'}" />
      <StringItem string="Все" font-size="12px" padding="0" :style="{color: knob2 ? '#006bb4' : '#B0A4C0'}"  />
      <StringItem string="Ж" font-size="12px" padding="0" :style="{color: knob3 ? '#006bb4' : '#B0A4C0'}" />
    </div>
    <div class="line">
      <div class="switch-knob1" @click="switchToPos1()"
        :style="{
          background: knob1 ? '' : 'inherit',
          border: knob1 ? '' : 'none',
        }">
      </div>
      <div class="switch-knob2" @click="switchToPos2()"
        :style="{
          background: knob2 ? '' : 'inherit',
          border: knob2 ? '' : 'none',
        }">
      </div>
      <div class="switch-knob3" @click="switchToPos3()"
        :style="{
          background: knob3 ? '' : 'inherit',
          border: knob3 ? '' : 'none',
        }">
      </div>
      <div class="switch-axis"></div>
      <div class="switch-axis-dash1"></div>
      <div class="switch-axis-dash2"></div>
      <div class="switch-axis-dash3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref} from 'vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';

export default defineComponent({
  name: 'Switch3Pos',
  components: {
    StringItem,
  },
  setup() {
    const knob1 = ref(false);
    const knob2 = ref(true);
    const knob3 = ref(false);


    const switchToPos1 = () => {
      knob1.value = true;
      knob2.value = false;
      knob3.value = false;
    };

    const switchToPos2 = () => {
      knob1.value = false;
      knob2.value = true;
      knob3.value = false;
    };

    const switchToPos3 = () => {
      knob1.value = false;
      knob2.value = false;
      knob3.value = true;
    };
  
    return {
      knob1,
      knob2,
      knob3,
      switchToPos1,
      switchToPos2,
      switchToPos3,
    };

  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

  .switch-container {
    width: calc(100% - 2px);
    height: 74px;
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    background: $base-background;
  }

  .line {
    position: relative;
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .line:last-child {
    margin-top: 5px;
  }

  .switch-axis {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    width: calc(100% - 30px);
    height: 1px;
    background: #B0A4C0;
  }

  .switch-axis-dash1 {
    position: absolute;
    top: 6px;
    left: 14px;
    width: 1px;
    height: 9px;
    background: #B0A4C0;
  }

  .switch-axis-dash2 {
    position: absolute;
    top: 6px;
    left: 50%;
    width: 0.5px;
    height: 9px;
    background: #B0A4C0;
  }

  .switch-axis-dash3 {
    position: absolute;
    top: 6px;
    right: 14px;
    width: 1px;
    height: 9px;
    background: #B0A4C0;
  }

  .switch-knob1 {
    position: absolute;
    left: 6px;
    width: 16px;
    height: 32px;
    background: #DFF2F8;
    border-radius: 2px;
    border: 1px solid #006bb4;
    z-index: 1;
    transition: 0.1s;
  }

  .switch-knob2 {
    position: absolute;
    left: calc(50% - 9px);
    width: 16px;
    height: 32px;
    background: #DFF2F8;
    border-radius: 2px;
    border: 1px solid #006bb4;
    z-index: 1;
    transition: 0.1s;
  }

  .switch-knob3 {
    position: absolute;
    right: 6px;
    width: 16px;
    height: 32px;
    background: #DFF2F8;
    border-radius: 2px;
    border: 1px solid #006bb4;
    z-index: 1;
    transition: 0.1s;
  }
</style>
