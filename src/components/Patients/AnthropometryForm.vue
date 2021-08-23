<template>
  <div class="table-under-collapse">
    <el-button style="margin-bottom: 20px" @click="add">Добавить измерение</el-button>

    <el-table :data="heightWeight" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column prop="human.dateBirth" label="Дата измерения" width="250" align="center">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.date'"
            :rules="[{ required: true, message: 'Необходимо выбрать дату измерения', trigger: 'blur' }]"
          >
            <el-date-picker v-model="scope.row.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="height" label="Рост" width="200" align="center">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.height'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение роста', trigger: 'blur' }]"
          >
            <el-input-number v-model="scope.row.height" size="medium" min="0" style="width: 120px"></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="weight" label="Вес" width="200" align="center">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.weight'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение веса', trigger: 'blur' }]"
          >
            <el-input-number v-model="scope.row.weight" size="medium" min="0" style="width: 120px"></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="ИМТ">
        <template #default="scope">
          {{ scope.row.getBmiGroup(birthDate, isMale) }}
        </template>
      </el-table-column>

      <el-table-column width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';

export default defineComponent({
  name: 'AnthropometryForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();

    const birthDate: Ref<string> = computed(() => store.getters['patients/birthDate']);
    const isMale: Ref<boolean> = computed(() => store.getters['patients/isMale']);
    const heightWeight: Ref<IHeightWeight[]> = computed(() => store.getters['patients/heightWeight']);

    const add = (): void => {
      store.commit('patients/addHeightWeight');
    };

    const remove = (item: IHeightWeight): void => {
      store.commit('patients/removeHeightWeight', item);
    };

    return {
      birthDate,
      isMale,
      heightWeight,
      remove,
      add,
    };
  },
});
</script>
