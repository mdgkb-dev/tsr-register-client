<template>
  <div class="human-form-container">
    <el-form-item label="Фамилия">
      <el-input
        v-model="patient.human.surname"
        placeholder="Введите фамилию"
        formatter="firstLetterUpper"
        @blur="checkCompleteName"
      ></el-input>
    </el-form-item>
    <el-form-item label="Имя">
      <el-input v-model="patient.human.name" placeholder="Введите имя" @blur="checkCompleteName"></el-input>
    </el-form-item>
    <el-form-item label="Отчество">
      <el-input v-model="patient.human.patronymic" placeholder="Введите отчество" @blur="checkCompleteName"></el-input>
    </el-form-item>

    <div class="line-item">
      <div class="item-left">
        <el-form-item label="Пол">
          <el-select v-model="patient.human.isMale" placeholder="Выберите пол">
            <el-option label="Мужчина" :value="true"></el-option>
            <el-option label="Женщина" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item-right">
        <el-form-item label="Дата рождения">
          <DatePicker v-model="patient.human.dateBirth" />
        </el-form-item>
      </div>
    </div>
    <el-form-item label="Адрес регистрации">
      <el-input v-model="patient.human.address" placeholder="Введите адрес"></el-input>
    </el-form-item>

    <div class="tab-tools">
      <svg v-if="isToggle" class="activated-icon active" @click="toggleAddress">
        <use xlink:href="#active" />
      </svg>
      <svg v-else class="activated-icon non-active" @click="toggleAddress">
        <use xlink:href="#non-active" />
      </svg>
      Адрес регистрации и адрес проживания совпадают
    </div>

    <el-form-item label="Адрес проживания">
      <el-input v-model="patient.human.address" placeholder="Введите адрес"></el-input>
    </el-form-item>
  </div>

  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="active">
      <path d="M17 6H7C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18H17C20.31 18 23 15.31 23 12C23 8.69 20.31 6 17 6ZM17 16H7C4.79 16 3 14.21 3 12C3 9.79 4.79 8 7 8H17C19.21 8 21 9.79 21 12C21 14.21 19.21 16 17 16ZM17 9C15.34 9 14 10.34 14 12C14 13.66 15.34 15 17 15C18.66 15 20 13.66 20 12C20 10.34 18.66 9 17 9Z"></path>
    </symbol>
  </svg>
  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="non-active">
      <path d="M17 6H7C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18H17C20.31 18 23 15.31 23 12C23 8.69 20.31 6 17 6ZM17 16H7C4.79 16 3 14.21 3 12C3 9.79 4.79 8 7 8H17C19.21 8 21 9.79 21 12C21 14.21 19.21 16 17 16ZM7 9C5.34 9 4 10.34 4 12C4 13.66 5.34 15 7 15C8.66 15 10 13.66 10 12C10 10.34 8.66 9 7 9Z"></path>
    </symbol>
  </svg>
  <!-- <Active />
  <NonActive /> -->
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DatePicker from '@/services/components/DatePicker.vue';
import Patient from '@/classes/Patient';
// import Active from '@/assets/svg/patient/Active.svg';
// import NonActive from '@/assets/svg/patient/NonActive.svg';

export default defineComponent({
  name: 'PassportForm',
  components: { DatePicker },
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const form = ref();
    const isToggle: Ref<boolean> = ref(false);

    const toggleAddress = () => {
      isToggle.value = !isToggle.value;
    };

    // const human: Ref<Human> = computed(() => store.getters[`${props.storeModule}/item`].getHuman());
    // const human = props.patient.human;

    // const checkCompleteName = (n: string): void => {
    //   if (!!human.value.name && !!human.value.surname && !!human.value.patronymic) {
    //     emit('inputNameComplete', human.value);
    //   }
    // };
    // const sanitizeName = () => human.value.sanitizeName();

    // watch(human, sanitizeName, { deep: true });

    return {
      // checkCompleteName,
      // human,
      toggleAddress,
      isToggle,
      form,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
.human-form-container {
  width: calc(100% - 10px);
  max-width: 768px;
  margin-left: 10px;

  .item-left{
    width: 50%;
    color: #343e5c;
    margin-right: 10px;
  }

  .item-right{
    width: 50%;
    color: #343e5c;
    margin-left: 10px;
  }

  .line-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .tab-tools {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: left;
    height: 25px;
    margin-bottom: 16px;
    color: $site_dark_gray;
  }

  .activated-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: 0.3s;
    margin-right: 10px;
  }

  .active {
    fill: #1979cf;
  }

  .non-active {
    fill: #c4c4c4;
  }

  :deep(.el-form-item) {
    display: block;
    width: 100%;
    margin-bottom: 16px;
  }

  :deep(.el-form-item__content) {
    width: 100%;
  }

  :deep(.el-input__inner) {
    border-radius: 40px;
    padding-left: 25px;
    height: 32px;
    width: 100%;
    display: flex;
    font-family: Comfortaa, Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: $site_dark_gray;
  }

  :deep(.el-input__inner::placeholder) {
    color: $site_light_pink;
  }

  :deep(.el-select .el-input .el-select__caret) {
    color: #343e5c;
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
  }

  .el-select {
    width: 100%;
  }

  :deep(.el-input__prefix) {
    left: 230px;
    top: -3px;
  }

  :deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
    width: 100%;
  }

  :deep(.el-input__icon) {
    color: #343e5c;
  }

  :deep(.el-input__suffix) {
    top: -3px;
  }

  :deep(.el-form-item__label) {
    color: $site_light_pink;
    padding: 0 !important;
    text-transform: uppercase;
    margin-left: 5px;
    font-size: 14px;
    margin-bottom: 6px;
  }

  :deep(.el-input__prefix) {
    left: auto;
    right: 10px;
  }


  @media screen and (max-width: 730px) {

    .line-item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      margin-right: 20px;
    }

    .line-item:last-child {
      margin-right: 0;
    }

    .item-left{
      width: 100%;
      margin-right: 0px;
    }

    .item-right{
      width: 100%;
      margin-left: 0px;
    }

    .activated-icon {
      min-width: 40px;
      min-height: 40px;
      cursor: pointer;
      transition: 0.3s;
      margin-right: 10px;
    }
  }
}
</style>
