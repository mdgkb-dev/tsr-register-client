<template>
  <div class="mainblock">
    <div v-if="collapsed1 | collapsed2" class="blur"
      @click="handClick()"
    ></div>
    <div class="body">

      <div class="visability-block"
        :style="{
          maxWidth: mobileWindow ? '100%' : '300px',
        }"
      >
        <slot name="visability" />
      </div>
      <div class="filter-block"
        :style="{
          position: mobileWindow ? 'absolute' : '',
          top: mobileWindow ? '10px' : '',
          right: mobileWindow ? '0px' : '',
          width: mobileWindow ? '220px' : '100%',
          zIndex: mobileWindow ? '4' : '',
          padding: mobileWindow ? '10px 20px 26px 0px' : '0',
          marginRight: mobileWindow ? (collapsed1 ? '0' : '-250px') : '0',
          transition: mobileWindow ? '0.3s': '',
          background: mobileWindow ? '#F5f5f5': '',
          borderTopLeftRadius: mobileWindow ? '5px': '',
          borderBottomLeftRadius: mobileWindow ? '5px': '',
          boxShadow: mobileWindow ? 'rgba(0, 0, 0, 0.35) 0px 5px 5px': '',
        }"
      >
        <div v-if="mobileWindow" class="title">
          <svg class="icon-filter"
            :style="{
              stroke: '#B0A4C0',
              paddingLeft: '10px'
            }"
          >
            <use xlink:href="#filter"></use>
          </svg>
          <svg @click="handClick1()" class="icon-close"
            :style="{
              marginRight: '-10px',
            }"
          >
            <use xlink:href="#close"></use>
          </svg>
        </div>
        <slot name="filter" />
      </div>
      <div v-if="!mobileWindow" class="help-block"></div>
      <div class="download-block"
        :style="{
          position: mobileWindow ? 'absolute' : '',
          top: mobileWindow ? '60px' : '',
          right: mobileWindow ? '0px' : '',
          width: mobileWindow ? '77px' : '',
          zIndex: mobileWindow ? '4' : '',
          padding: mobileWindow ? '10px 10px 26px 0px' : '0 0 0 10px',
          marginRight: mobileWindow ? (collapsed2 ? '-2px' : '-130px') : '0',
          transition: mobileWindow ? '0.3s': '',
          background: mobileWindow ? '#F5f5f5': '',
          borderTopLeftRadius: mobileWindow ? '5px': '',
          borderBottomLeftRadius: mobileWindow ? '5px': '',
          boxShadow: mobileWindow ? 'rgba(0, 0, 0, 0.35) 0px 5px 5px': '',
        }"
      >
        <div v-if="mobileWindow" class="title">
          <svg class="icon-download"
            :style="{
              stroke: '#B0A4C0',
              paddingLeft: '10px'
            }"
          >
            <use xlink:href="#download"></use>
          </svg>
          <svg @click="handClick2()" class="icon-close">
            <use xlink:href="#close"></use>
          </svg>
        </div>
        <slot name="download" />
      </div>

      <div v-if="mobileWindow" class="icons">
        <Button 
          :withIcon="true"
          width="42px" 
          height="42px" 
          color="#006BB4" 
          background="#ffffff"
          backgroundHover="#DFF2F8"
          margin="0 0 0 10px"
          @click="handClick1()"
        >
          <template #icon>
            <svg class="icon-filter">
              <use xlink:href="#filter"></use>
            </svg>
          </template>
        </Button>

        <Button 
          :withIcon="true"
          width="42px" 
          height="42px" 
          color="#006BB4" 
          background="#ffffff"
          backgroundHover="#DFF2F8"
          margin="8px 0 0 10px"
          @click="handClick2()"
        >
          <template #icon>
            <svg class="icon-download">
              <use xlink:href="#download"></use>
            </svg>
          </template>
        </Button>
      </div>

    </div>

  </div>
  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="filter">
      <path d="M26.6641 9.33398L13.4961 9.33398M18.6641 22.6673H6.66406" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M22.6641 26.668C24.8732 26.668 26.6641 24.8771 26.6641 22.668C26.6641 20.4588 24.8732 18.668 22.6641 18.668C20.4549 18.668 18.6641 20.4588 18.6641 22.668C18.6641 24.8771 20.4549 26.668 22.6641 26.668Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M9.33203 13.334C11.5412 13.334 13.332 11.5431 13.332 9.33398C13.332 7.12485 11.5412 5.33398 9.33203 5.33398C7.12289 5.33398 5.33203 7.12485 5.33203 9.33398C5.33203 11.5431 7.12289 13.334 9.33203 13.334Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </symbol>

    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="download">
      <path d="M5.33203 21.334V22.6673C5.33203 23.7282 5.75346 24.7456 6.5036 25.4957C7.25375 26.2459 8.27117 26.6673 9.33203 26.6673H22.6654C23.7262 26.6673 24.7436 26.2459 25.4938 25.4957C26.2439 24.7456 26.6654 23.7282 26.6654 22.6673V21.334M21.332 16.0007L15.9987 21.334M15.9987 21.334L10.6654 16.0007M15.9987 21.334V5.33398" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </symbol>

    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close">
      <path d="M12 10.5857L16.95 5.63574L18.364 7.04974L13.414 11.9997L18.364 16.9497L16.95 18.3637L12 13.4137L7.04999 18.3637L5.63599 16.9497L10.586 11.9997L5.63599 7.04974L7.04999 5.63574L12 10.5857Z" ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import Button from '@/components/Base/Button.vue';


export default defineComponent({
  name: 'RightSliderContainer',
  components: {
    Button,
  },
  props: {
    menuWidth: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    mobileWidth: {
      type: String as PropType<string>,
      required: false,
      default: '1330px',
    },
  },
  setup(props) {
    const mounted = ref(false);
    const collapsed1: Ref<boolean> = ref(false);
    const collapsed2: Ref<boolean> = ref(false);
    const mobileWindow = ref(window.matchMedia('(max-width: 1330px)').matches);

    const handClick = () => {
      collapsed1.value = false;
      collapsed2.value = false;
    };

    const handClick1 = () => {
      collapsed1.value = !collapsed1.value;
    };
    const handClick2 = () => {
      collapsed2.value = !collapsed2.value;
    };

    onBeforeMount(async () => {
      window.addEventListener('resize', () => {
        switch (props.mobileWidth) {
          case '1330px':
            return (mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches);
          case '1215px':
            return (mobileWindow.value = window.matchMedia('(max-width: 1215px)').matches);            
          case '1024px':
            return (mobileWindow.value = window.matchMedia('(max-width: 1024px)').matches);
          case '768px':
            return (mobileWindow.value = window.matchMedia('(max-width: 768px)').matches);
        }
        return (mobileWindow.value = window.matchMedia('(max-width: 1330px)').matches);
      });
      mounted.value = true;
    });

    return {
      collapsed1,
      collapsed2,
      handClick,
      handClick1,
      handClick2,
      mobileWindow,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.mainblock {
  position: relative;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 20px);
  padding: 10px 10px 10px 10px;
  background: #F5F5F5;
  height: auto;
  border-bottom: 1px solid #c4c4c4;
}

.blur {
  position: fixed;
  height: 20000px;
  width: 20000px;
  background: #000000;
  opacity: 0.2;
  z-index: 4;
}

.body {
  display: flex;
  justify-content: space-between;
  min-height: 20px;
  height: auto;
  width: 100%;
}

.visability-block {
  width: 100%;
}

.icon-filter {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006BB4;
  fill: none;
}

.icon-download {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006BB4;
  fill: none;
}

.icon-close {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #343E5C;
}

.icon-close:hover {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #006BB4;
}

.help-block {
  height: 92px;
  width: 1px;
}

.title {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

</style>
