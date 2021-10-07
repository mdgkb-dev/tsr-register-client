<template>
  <div class="form-under-collapse">
    <div v-if="isEditMode">
      <el-form-item label="Фамилия" prop="human.surname">
        <el-input v-model="human.surname" :readonly="readonly" @change="updateHuman" />
      </el-form-item>
      <el-form-item label="Имя" prop="human.name">
        <el-input v-model="human.name" :readonly="readonly" @change="updateHuman" />
      </el-form-item>
      <el-form-item label="Отчество" prop="human.patronymic">
        <el-input v-model="human.patronymic" :readonly="readonly" @change="updateHuman" />
      </el-form-item>
      <el-form-item label="Пол" prop="human.isMale">
        <el-select v-model="human.isMale" :disabled="readonly" placeholder="Выберите пол" @change="updateHuman">
          <el-option label="Мужской" :value="true" />
          <el-option label="Женский" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="Дата рождения" prop="human.dateBirth">
        <el-date-picker
          v-model="human.dateBirth"
          :readonly="readonly"
          type="date"
          format="DD.MM.YYYY"
          placeholder="Выберите дату"
          @change="updateHuman"
          @focus="updateHuman"
        />
      </el-form-item>
      <el-form-item label="Адрес регистрации" prop="human.addressRegistration">
        <el-input v-model="human.addressRegistration" :readonly="readonly" @change="updateHuman" />
      </el-form-item>
      <el-form-item label="Адрес проживания" prop="human.addressResidential">
        <el-input v-model="human.addressResidential" :readonly="readonly" @change="updateHuman" />
      </el-form-item>
      <el-form-item label="Телефон" prop="human.contact.phone">
        <el-input v-model="human.contact.phone" :readonly="readonly" @input="human.contact.formatPhoneNumber()" @change="updateHuman" />
      </el-form-item>
      <el-form-item label="Email" prop="human.contact.email">
        <el-input v-model="human.contact.email" :readonly="readonly" @change="updateHuman" />
      </el-form-item>
    </div>
    <div v-else class="human-view">
      <el-space direction="vertical" alignment="start">
        <div><b>Фамилия:</b> {{ human.surname }}</div>
        <div><b>Имя:</b> {{ human.name }}</div>
        <div><b>Отчество:</b> {{ human.patronymic }}</div>
        <div><b>Пол:</b> {{ human.isMale ? 'Мужской' : 'Женский' }}</div>
        <div><b>Дата рождения:</b> {{ formatDate(human.dateBirth) }}</div>
        <div><b>Адрес регистрации:</b> {{ human.addressRegistration ? human.addressRegistration : 'Не указан' }}</div>
        <div><b>Адрес проживания:</b> {{ human.addressResidential ? human.addressResidential : 'Не указан' }}</div>
        <div><b>Телефон:</b> {{ human.contact.phone ? human.contact.phone : 'Не указан' }}</div>
        <div><b>Email:</b> {{ human.contact.email ? human.contact.email : 'Не указан' }}</div>
      </el-space>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, reactive } from 'vue';
import { useStore } from 'vuex';

import Human from '@/classes/humans/Human';
import IHuman from '@/interfaces/humans/IHuman';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'HumanForm',
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    storeName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { formatDate } = useDateFormat();

    const humanComputed: ComputedRef<IHuman> = computed<IHuman>(() => store.getters[`${props.storeName}/getHuman`]);
    const human: IHuman = reactive<IHuman>(new Human(humanComputed.value));
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters[`${props.storeName}/isEditMode`]);

    const updateHuman = async () => {
      await store.commit(`${props.storeName}/setHuman`, human);
    };

    return {
      humanComputed,
      human,
      updateHuman,
      isEditMode,
      formatDate,
    };
  },
});
</script>
