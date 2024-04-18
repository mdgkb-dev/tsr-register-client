<template>
  <div
    class="human-form-container"
    :style="{
      maxWidth: maxWidth,
    }"
  >
    <el-form ref="form" :model="human" :rules="human.validationRules">
      <el-form-item label="Фамилия" prop="surname">
        <el-input v-model="human.surname" placeholder="Введите фамилию" @blur="updateHuman('surname')" />
      </el-form-item>
      <el-form-item label="Имя" prop="name">
        <el-input v-model="human.name" placeholder="Введите имя" @blur="updateHuman('name')" />
      </el-form-item>
      <el-form-item label="Отчество" prop="patronymic">
        <el-input v-model="human.patronymic" placeholder="Введите отчество" @blur="updateHuman('patronymic')" />
      </el-form-item>

      <div class="line-item">
        <div class="item-left">
          <el-form-item label="Пол">
            <el-select v-model="human.isMale" placeholder="Выберите пол" @change="updateHuman()">
              <el-option label="Мужчина" :value="true" />
              <el-option label="Женщина" :value="false" />
            </el-select>
          </el-form-item>
        </div>
        <div class="item-right">
          <el-form-item label="Дата рождения">
            <DatePicker v-model="human.dateBirth" @change="updateHuman()" />
          </el-form-item>
        </div>
      </div>
      <el-form-item label="Адрес регистрации" prop="addressRegistration">
        <el-input v-model="human.addressRegistration" placeholder="Введите адрес" @blur="updateHuman('addressRegistration')" />
      </el-form-item>

      <div class="tab-tools">
        <div v-if="human.addressesEqual()" style="display: flex; align-items: center">
          <svg class="activated-icon active" @click="toggleAddress(false)">
            <use xlink:href="#active" />
          </svg>
        </div>
        <el-popconfirm
          v-else
          confirm-button-text="Продолжить"
          cancel-button-text="Отмена"
          title="Текущий адрес проживания будет заменен"
          @confirm="toggleAddress(true)"
          @cancel="() => {}"
          width='240px'
        >
          <template #reference>
            <div style="display: flex; align-items: center">
              <svg class="activated-icon non-active">
                <use xlink:href="#non-active" />
              </svg>
            </div>
          </template>
        </el-popconfirm>
        Адрес регистрации и адрес проживания совпадают
      </div>

      <!-- <div class="tab-tools">
        <svg v-if="human.addressesEqual()" class="activated-icon active" @click="toggleAddress(false)">
          <use xlink:href="#active" />
        </svg>
        <svg v-else class="activated-icon non-active" @click="toggleAddress(true)">
          <use xlink:href="#non-active" />
        </svg>
        Адрес регистрации и адрес проживания совпадают
      </div> -->

      <el-form-item label="Адрес проживания" prop="addressResidential">
        <el-input v-model="human.addressResidential" placeholder="Введите адрес" @blur="updateHuman('addressResidential')" />
      </el-form-item>
    </el-form>
  </div>
  <Toggle />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Toggle from '@/assets/svg/Toggle.svg';
import Human from '@/classes/Human';
import DatePicker from '@/services/components/DatePicker.vue';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'PassportForm',
  components: { DatePicker, Toggle },
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
  setup(props) {
    const surnameForm = ref();
    const form = ref();
    const human: Ref<Human> = computed(() => Provider.store.getters[`${props.storeModule}/item`].getHuman());
    const toggleAddress = async (addressesEqual: boolean): Promise<void> => {
      human.value.setResidentialAddress(addressesEqual);
      await updateHuman();
    };

    const updateHuman = async (field?: string): Promise<void> => {
      console.log(field);
      if (field) {
        console.log('1 ====>', human.value.getValidationRules());
        human.value.resetValidationRules();
        console.log('2 ====>', human.value.getValidationRules());
        human.value.updateValidationRule(field);
        if (!validate(form)) {
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
    justify-content: left;
  }

  :deep(.el-input-number__increase) {
    border-radius: 0;
  }

  :deep(.el-input-number__decrease) {
    border-radius: 0;
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
      margin-right: 0;
    }

    .item-right {
      width: 100%;
      margin-left: 0;
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
