<template>
  <div class="text-field">
    <label class="text-field__label" for="login">Логин</label>
    <input class="text-field__input" type="text" name="login" id="login" placeholder="Login" value="itchief">
  </div>

  <!-- <div class="text-field">
    <label for="firstname">Имя пользователя (disabled)</label>
    <input type="text" name="firstname" id="firstname" placeholder="Alaxander" disabled>
  </div> -->
  <!-- readonly -->
  <!-- <div class="text-field">
    <label for="city">Город (readonly)</label>
    <input class="text-field__input" type="text" name="city" id="city" placeholder="Moscow" value="Moscow" readonly>
  </div> -->
</template>

<script setup lang="ts">
import { defineComponent, PropType } from 'vue';
// import Aright from '@/assets/svg/Aright.svg';
// import Back from '@/assets/svg/Back.svg';
// import Close from '@/assets/svg/Close.svg';
// import Commission from '@/assets/svg/Commission.svg';
// import Del from '@/assets/svg/Del.svg';
// import Download from '@/assets/svg/Download.svg';
// import EditTitle from '@/assets/svg/EditTitle.svg';
// import Edit from '@/assets/svg/Edit.svg';
// import Filter from '@/assets/svg/Filter.svg';
// import Outlined from '@/assets/svg/Outlined.svg';
// import Plus from '@/assets/svg/Plus.svg';
// import Save from '@/assets/svg/Save.svg';
// import Settings from '@/assets/svg/Settings.svg';

// defineOptions({ inheritAttrs: false });

const props = defineProps({
  text: { type: String as PropType<string>, default: '', required: false },
  // color: { type: String as PropType<string>, default: '', required: false },
  // colorSwap: { type: Boolean as PropType<boolean>, default: false, required: false },
  // background: { type: String as PropType<string>, default: '', required: false },
  // backgroundHover: { type: String as PropType<string>, default: '', required: false },
  // margin: { type: String as PropType<string>, required: false, default: '' },
  // width: { type: String as PropType<string>, required: false, default: '' },
  // height: { type: String as PropType<string>, required: false, default: '' },
  // borderRadius: { type: String as PropType<string>, required: false, default: '' },
  // border: { type: Boolean as PropType<boolean>, required: false, default: true },
  // withIcon: { type: Boolean as PropType<boolean>, required: false, default: false },
  // fontSize: { type: String as PropType<string>, required: false, default: '' },
  // toggleMode: { type: Boolean as PropType<boolean>, required: false, default: false },
  // buttonClass: { type: String as PropType<string>, required: false, default: '' },
  // iconClass: { type: String as PropType<string>, required: false, default: '' },
  // icon: { type: String as PropType<string>, required: false, default: '' },
  // isToggle: { type: Boolean as PropType<boolean>, required: false, default: false },
  // inverse: { type: Boolean as PropType<boolean>, required: false, default: false },
  // disabled: { type: Boolean as PropType<boolean>, required: false, default: false },
});

// const iconComponent = {
//   edit: Edit,
//   'edit-title': EditTitle,
//   aright: Aright,
//   close: Close,
//   back: Back,
//   commission: Commission,
//   del: Del,
//   download: Download,
//   filter: Filter,
//   outlined: Outlined,
//   plus: Plus,
//   save: Save,
//   settings: Settings,
// };
// const dynSvg = computed(() => import(`@/assets/svg/${props.}`))
// const emit = defineEmits(['click']);
// const hovering = ref(false);
// const changeState = () => {
//   emit('click');
// };

// const buttonIsActive = computed(() => props.isToggle || hovering.value);
// const getActiveColor = (active: string, inactive: string): string => {
//   return buttonIsActive.value ? active : inactive;
// };

// const getInvertedColor = (): string => {
//   return props.colorSwap ? getActiveColor(props.background, props.color) : props.color;
// };

// const buttonStyle = computed(() => {
//   return {
//     color: props.toggleMode ? getActiveColor(props.color, '#B0A4C0') : getInvertedColor(),
//     background: props.colorSwap ? getActiveColor(props.color, props.background) : getActiveColor(props.backgroundHover, props.background),
//     margin: props.margin,
//     minWidth: props.width,
//     maxWidth: props.width,
//     border: props.border ? '' : 'none',
//     borderColor: props.toggleMode ? getActiveColor(props.color, '#B0A4C0') : props.color,
//     height: props.height,
//     borderRadius: props.borderRadius,
//     fontSize: props.fontSize,
//   };
// });

// const getAnimation = (): string => {
//   return props.colorSwap || props.toggleMode
//     ? getActiveColor(props.backgroundHover, props.background)
//     : getActiveColor('scale(1.1, 1.1)', '');
// };

// const buttonIconStyle = computed(() => {
//   return {
//     fill: props.color,
//     marginRight: props.text ? '10px' : '',
//     transform: getAnimation(),

//     transition: props.colorSwap || props.toggleMode ? '' : '0s',
//   };
// });

// const textStyle = computed(() => {
//   return {
//     transform: getAnimation(),
//     transition: props.colorSwap || props.toggleMode ? '' : '0s',
//   };
// });
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

*, *::before, *::after {
  box-sizing: border-box;
}

input[type="text"] {
  font-family: inherit; /* 1 */
  font-size: inherit; /* 1 */
  line-height: inherit; /* 1 */
  margin: 0; /* 2 */
}

/* установим отступ 1rem от нижнего края элемента */
.text-field {
  margin-bottom: 1rem;
}
/* стили для label */
.text-field__label {
  display: block;
  margin-bottom: 0.25rem;
}
/* стили для input */
.text-field__input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.text-field__input::placeholder {
  color: #212529;
  opacity: 0.4;
}

.text-field__input:focus {
  color: #212529;
  background-color: #fff;
  border-color: #bdbdbd;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
}


.text-field__input:disabled,
.text-field__input[readonly] {
  background-color: #f5f5f5;
  opacity: 1;
}

/*.button { 
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  transition: 0.15s;
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
  overflow: hidden;
}

.button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.text {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
  height: auto;
  max-height: 36px;
} */
</style>
