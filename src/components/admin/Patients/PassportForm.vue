<template>
  <div
    class="human-form-container"
    :style="{
      maxWidth: maxWidth,
    }"
  >
    <el-form ref="surnameForm" :model="human">
      <el-form-item label="Фамилия" prop="surname" :rules="human.getValidationRules().surname">
        <el-input
          v-model="human.surname"
          placeholder="Введите фамилию"
          formatter="firstLetterUpper"
          @blur="updateHuman('surname')"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ><el-form-item label="Имя">
        <el-input v-model="human.name" placeholder="Введите имя" @blur="updateHuman()"></el-input>
      </el-form-item>
      <el-form-item label="Отчество">
        <el-input v-model="human.patronymic" placeholder="Введите отчество" @blur="updateHuman()"></el-input>
      </el-form-item>

      <div class="line-item">
        <div class="item-left">
          <el-form-item label="Пол">
            <el-select v-model="human.isMale" placeholder="Выберите пол" @change="updateHuman()">
              <el-option label="Мужчина" :value="true"></el-option>
              <el-option label="Женщина" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item-right">
          <el-form-item label="Дата рождения" @change="updateHuman()">
            <DatePicker v-model="human.dateBirth" />
          </el-form-item>
        </div>
      </div>
      <el-form-item label="Адрес регистрации">
        <el-input v-model="human.addressRegistration" placeholder="Введите адрес" @blur="updateHuman()"></el-input>
      </el-form-item>
    </el-form>

    <div class="tab-tools">
      <svg v-if="human.addressesEqual()" class="activated-icon active" @click="toggleAddress(false)">
        <use xlink:href="#active" />
      </svg>
      <svg v-else class="activated-icon non-active" @click="toggleAddress(true)">
        <use xlink:href="#non-active" />
      </svg>
      Адрес регистрации и адрес проживания совпадают
    </div>

    <el-form-item label="Адрес проживания">
      <el-input v-model="human.addressResidential" placeholder="Введите адрес" @blur="updateHuman"></el-input>
    </el-form-item>
  </div>

  <svg width="0" height="0" class="hidden">
    <symbol id="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M17 6H7C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18H17C20.31 18 23 15.31 23 12C23 8.69 20.31 6 17 6ZM17 16H7C4.79 16 3 14.21 3 12C3 9.79 4.79 8 7 8H17C19.21 8 21 9.79 21 12C21 14.21 19.21 16 17 16ZM17 9C15.34 9 14 10.34 14 12C14 13.66 15.34 15 17 15C18.66 15 20 13.66 20 12C20 10.34 18.66 9 17 9Z"
      ></path>
    </symbol>
  </svg>
  <svg width="0" height="0" class="hidden">
    <symbol id="non-active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M17 6H7C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18H17C20.31 18 23 15.31 23 12C23 8.69 20.31 6 17 6ZM17 16H7C4.79 16 3 14.21 3 12C3 9.79 4.79 8 7 8H17C19.21 8 21 9.79 21 12C21 14.21 19.21 16 17 16ZM7 9C5.34 9 4 10.34 4 12C4 13.66 5.34 15 7 15C8.66 15 10 13.66 10 12C10 10.34 8.66 9 7 9Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Human from '@/classes/Human';
import DatePicker from '@/services/components/DatePicker.vue';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'PassportForm',
  components: { DatePicker },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },

    maxWidth: {
      type: String as PropType<string>,
      default: 'calc(100% - 10px)',
    },
    editMode: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { emit }) {
    const surnameForm = ref();
    const form = ref();
    const human: Ref<Human> = computed(() => Provider.store.getters[`${props.storeModule}/item`].getHuman());
    const toggleAddress = async (addressesEqual: boolean): Promise<void> => {
      human.value.setResidentialAddress(addressesEqual);
      await updateHuman();
    };
    const getForm = (value: string) => {
      switch (value) {
        case 'surname':
          return surnameForm;
        default:
          return form;
      }
    };

    const updateHuman = async (form?: string): Promise<void> => {
      if (form) {
        if (!validate(getForm(form))) {
          return;
        }
      }
      await Provider.withHeadLoader(async () => {
        if (props.editMode) {
          await Provider.store.dispatch('humans/update', human.value);
        }
      });
    };

    // const checkCompleteName = (n: string): void => {
    //   if (!!human.value.name && !!human.value.surname && !!human.value.patronymic) {
    //     emit('inputNameComplete', human.value);
    //   }
    // };
    // const sanitizeName = () => human.value.sanitizeName();

    // watch(human, sanitizeName, { deep: true });

    return {
      human,
      updateHuman,
      // checkCompleteName,
      // human,
      toggleAddress,
      form,
      surnameForm,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.human-form-container {
  width: calc(100% - 10px);
  margin-left: 10px;

  .item-left {
    width: 50%;
    color: #343e5c;
    margin-right: 10px;
  }

  .item-right {
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

  // :deep(.el-form-item) {
  //   display: block;
  //   width: 100%;
  //   margin-bottom: 16px;
  // }

  // :deep(.el-form-item__content) {
  //   width: 100%;
  // }

  // :deep(.el-input__inner) {
  //   border-radius: 40px;
  //   padding-left: 25px;
  //   height: 32px;
  //   width: 100%;
  //   display: flex;
  //   font-family: Comfortaa, Arial, Helvetica, sans-serif;
  //   font-size: 15px;
  //   color: $site_dark_gray;
  // }

  // :deep(.el-input__inner::placeholder) {
  //   color: $site_light_pink;
  // }

  // :deep(.el-select .el-input .el-select__caret) {
  //   color: #343e5c;
  //   font-size: 15px;
  //   font-weight: bold;
  //   margin-right: 5px;
  // }
  // :deep(.el-input__prefix) {
  //   left: 230px;
  //   top: -3px;
  // }
  // :deep(.el-input__icon) {
  //   color: #343e5c;
  // }

  // :deep(.el-input__suffix) {
  //   top: -3px;
  // }

  // :deep(.el-form-item__label) {
  //   color: $site_light_pink;
  //   padding: 0 !important;
  //   text-transform: uppercase;
  //   margin-left: 5px;
  //   font-size: 14px;
  //   margin-bottom: 6px;
  // }

  // :deep(.el-input__prefix) {
  //   left: auto;
  //   right: 10px;
  // }
  .el-select {
    width: 100%;
  }
  :deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
    width: 100%;
  }

  :deep(.el-form-item) {
    display: block;
    margin-bottom: 16px;
  }

  :deep(.el-input__inner) {
    height: 40px;
    width: 100%;
    display: flex;
    font-family: Comfortaa, Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: $site_dark_gray;
  }

  :deep(.el-input__inner::placeholder) {
    color: $site_light_pink;
  }

  :deep(.el-input__icon) {
    color: $site_dark_gray;
  }

  :deep(.el-form-item__label) {
    color: $site_light_pink;
    padding: 0 !important;
    text-transform: uppercase;
    margin-left: 5px;
    font-size: 14px;
    margin-bottom: 6px;
  }

  :deep(.el-input-number__increase) {
    border-radius: 0px;
  }

  :deep(.el-input-number__decrease) {
    border-radius: 0px;
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

    .item-left {
      width: 100%;
      margin-right: 0px;
    }

    .item-right {
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
