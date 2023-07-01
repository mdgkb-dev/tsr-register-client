<template>
  <div class="container">
    <div v-if="showAddDoctor" class="blur" @click="showAddDoctor = false" ></div>
    <div v-if="showAddDoctor" class="add-doctor">
      <div class="scroll-block">
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
        <PersonalityItem :withIcon="false" />
      </div>
    </div>
    <Button button-class="plus-button" icon="plus" icon-class="icon-plus" @click="openAddDoctor()" />
    <div class="scroll-block">
      <PersonalityItem />
      <PersonalityItem />
      <PersonalityItem />
      <PersonalityItem />
      <PersonalityItem />
      <PersonalityItem />
      <PersonalityItem />
      <PersonalityItem />
      <PersonalityItem />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import PersonalityItem from '@/components/admin/Patients/PersonalityItem.vue';
import Button from '@/components/Base/Button.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';

export default defineComponent({
  name: 'PersonalityList',
    components: {
      PersonalityItem,
      Button,
      StringItem,
  },
  setup(props) {
    const showAddDoctor: Ref<boolean> = ref(false);
    const openAddDoctor = (index?: number) => {
      showAddDoctor.value = true;
      // store.commit('representatives/resetRepresentative');
    };
    return { openAddDoctor, showAddDoctor };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

  .container {
    width: 100%;
  }
  
  .scroll-block {
    height: 60vh;
    overflow: hidden;
    overflow-y: auto;
  }

  .plus-button {
    width: 100%;
    border-radius: 5px;
    color: #00bea5;
    background: #c1efeb;
    height: 60px;
    margin: 10px 0;
    box-sizing: border-box;
  }

  :deep(.icon-plus) {
    fill: #00b5a4;
    // width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .add-doctor {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    min-width: 300px;
    background: #ffffff;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  }

  .blur {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

</style>
