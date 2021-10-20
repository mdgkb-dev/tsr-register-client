<template>
  <div class="table-under-collapse">
    <el-button v-if="isEditMode" style="margin-bottom: 20px" @click="add">Добавить измерение</el-button>

    <!-- Рост/вес -->
    <el-table :data="heightWeight" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column prop="date" label="Дата измерения" width="250" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.date'"
            :rules="[{ required: true, message: 'Необходимо выбрать дату измерения', trigger: 'change' }]"
          >
            <el-date-picker v-model="scope.row.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
          </el-form-item>
          <span v-else>{{ formatDate(scope.row.date) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="height" label="Рост" width="200" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.height'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение роста', trigger: 'change' }]"
          >
            <el-input-number v-model="scope.row.height" size="medium" :min="0" style="width: 120px"></el-input-number>
          </el-form-item>
          <span v-else>{{ scope.row.height }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="weight" label="Вес" width="200" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.weight'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение веса', trigger: 'change' }]"
          >
            <el-input-number v-model="scope.row.weight" size="medium" :min="0" style="width: 120px"></el-input-number>
          </el-form-item>
          <span v-else>{{ scope.row.weight }}</span>
        </template>
      </el-table-column>

      <el-table-column label="ИМТ">
        <template #default="scope">
          {{
            scope.row.getBmiGroup(birthDate, isMale).color
              ? `${scope.row.getBmiGroup(birthDate, isMale).percentiles}, ${scope.row.getBmiGroup(birthDate, isMale).recomendation}`
              : scope.row.getBmiGroup(birthDate, isMale)
          }}
        </template>
      </el-table-column>

      <el-table-column v-if="isEditMode" width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- Окружность груди -->
    <el-button v-if="isEditMode" style="margin: 20px 0" @click="addChestCircumference">Добавить измерение</el-button>
    <el-table :data="chestCircumference" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column prop="date" label="Дата измерения" width="250" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="'chestCircumference.' + scope.$index + '.date'"
            :rules="[{ required: true, message: 'Необходимо выбрать дату измерения', trigger: 'change' }]"
          >
            <el-date-picker v-model="scope.row.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
          </el-form-item>
          <span v-else>{{ formatDate(scope.row.date) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="value" label="Окружность груди" width="250" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="'chestCircumference.' + scope.$index + '.value'"
            :rules="[{ required: true, message: 'Необходимо указать окружность груди', trigger: 'change' }]"
          >
            <el-input-number v-model="scope.row.value" size="medium" :min="0" style="width: 120px"></el-input-number>
          </el-form-item>
          <span v-else>{{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Группа">
        <template #default="scope">
          {{
            scope.row.getChestCircumferenceGroup(birthDate, isMale).color
              ? `${scope.row.getChestCircumferenceGroup(birthDate, isMale).percentiles}, ${
                  scope.row.getChestCircumferenceGroup(birthDate, isMale).recomendation
                }`
              : scope.row.getChestCircumferenceGroup(birthDate, isMale)
          }}
        </template>
      </el-table-column>

      <el-table-column v-if="isEditMode" width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="removeChestCircumference(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- Окружность головы -->
    <el-button v-if="isEditMode" style="margin: 20px 0" @click="addHeadCircumference">Добавить измерение</el-button>
    <el-table :data="headCircumference" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column prop="date" label="Дата измерения" width="250" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="'headCircumference.' + scope.$index + '.date'"
            :rules="[{ required: true, message: 'Необходимо выбрать дату измерения', trigger: 'change' }]"
          >
            <el-date-picker v-model="scope.row.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
          </el-form-item>
          <span v-else>{{ formatDate(scope.row.date) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="value" label="Окружность головы" width="250" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="'headCircumference.' + scope.$index + '.value'"
            :rules="[{ required: true, message: 'Необходимо указать окружность головы', trigger: 'change' }]"
          >
            <el-input-number v-model="scope.row.value" size="medium" :min="0" style="width: 120px"></el-input-number>
          </el-form-item>
          <span v-else>{{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Группа">
        <template #default="scope">
          {{
            scope.row.getHeadCircumferenceGroup(birthDate, isMale).color
              ? `${scope.row.getHeadCircumferenceGroup(birthDate, isMale).percentiles}, ${
                  scope.row.getHeadCircumferenceGroup(birthDate, isMale).recomendation
                }`
              : scope.row.getHeadCircumferenceGroup(birthDate, isMale)
          }}
        </template>
      </el-table-column>

      <el-table-column v-if="isEditMode" width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="removeHeadCircumference(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'AnthropometryForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();
    const { formatDate } = useDateFormat();

    const birthDate: ComputedRef<string> = computed(() => store.getters['patients/birthDate']);
    const isMale: ComputedRef<boolean> = computed(() => store.getters['patients/isMale']);
    const heightWeight: ComputedRef<IHeightWeight[]> = computed(() => store.getters['patients/heightWeight']);
    const chestCircumference: ComputedRef<ICircumference[]> = computed(() => store.getters['patients/patient'].chestCircumference);
    const headCircumference: ComputedRef<ICircumference[]> = computed(() => store.getters['patients/patient'].headCircumference);
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    const add = (): void => {
      store.commit('patients/addHeightWeight');
    };

    const remove = (item: IHeightWeight): void => {
      store.commit('patients/removeHeightWeight', item);
    };

    const addChestCircumference = (): void => {
      store.commit('patients/addChestCircumference');
    };

    const removeChestCircumference = (item: IHeightWeight): void => {
      store.commit('patients/removeChestCircumference', item);
    };

    const addHeadCircumference = (): void => {
      store.commit('patients/addHeadCircumference');
    };

    const removeHeadCircumference = (item: IHeightWeight): void => {
      store.commit('patients/removeHeadCircumference', item);
    };

    return {
      birthDate,
      isMale,
      heightWeight,
      remove,
      add,
      isEditMode,
      formatDate,
      chestCircumference,
      addChestCircumference,
      removeChestCircumference,
      headCircumference,
      addHeadCircumference,
      removeHeadCircumference,
    };
  },
});
</script>
