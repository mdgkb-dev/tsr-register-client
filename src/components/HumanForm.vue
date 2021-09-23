<template>
  <div class="form-under-collapse">
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
        <el-option label="Мужчина" :value="true" />
        <el-option label="Женщина" :value="false" />
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
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep';
import { computed, ComputedRef, defineComponent, PropType, reactive, UnwrapRef } from 'vue';
import { useStore } from 'vuex';

import Human from '@/classes/humans/Human';
import IHuman from '@/interfaces/humans/IHuman';

export default defineComponent({
  name: 'HumanForm',
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    storeName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const humanComputed: ComputedRef<IHuman> = computed<IHuman>(() => store.getters[`${props.storeName}/getHuman`]);
    const human: UnwrapRef<IHuman> = reactive<IHuman>(cloneDeep(humanComputed.value));

    const updateHuman = () => {
      store.commit(`${props.storeName}/setHuman`, human);
    };

    return {
      human,
      updateHuman,
    };
  },
});
</script>
