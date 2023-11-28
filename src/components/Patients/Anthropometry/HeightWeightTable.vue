<template>
  <h3>Рост/вес</h3>
  <el-table :data="patient.heightWeight" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
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
          scope.row.getBmiGroup(patient.human.dateBirth, patient.human.isMale).color
            ? `${scope.row.getBmiGroup(patient.human.dateBirth, patient.human.isMale).percentiles}, ${
                scope.row.getBmiGroup(patient.human.dateBirth, patient.human.isMale).recomendation
              }`
            : scope.row.getBmiGroup(patient.human.dateBirth, patient.human.isMale)
        }}
      </template>
    </el-table-column>

    <el-table-column label="Площадь тела">
      <template #default="scope">
        <div>Монтеллер: {{ BodyArea.Mosteller(scope.row.weight, scope.row.height).toFixed(2) }}</div>
        <div>Хэйкок: {{ BodyArea.DuBois(scope.row.weight, scope.row.height).toFixed(2) }}</div>
        <div>Дю Буа и Дю Буа: {{ BodyArea.Haycock(scope.row.weight, scope.row.height).toFixed(2) }}</div>
        <div>
          Норма:
          {{ BodyArea.GetNormForAge(DateHelper.GetMonthsDiff(new Date(scope.row.date), patient.human.dateBirth), patient.human.isMale) }}
        </div>
      </template>
    </el-table-column>

    <el-table-column v-if="isEditMode" width="50" fixed="right" align="center">
      <template #header>
        <el-button type="success" size="small" :icon="Plus" circle @click="patient.addHeightWeight()" />
      </template>
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="RemoveFromClass(scope.$index, patient.heightWeight, patient.heightWeightForDelete)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import BodyArea from '@/classes/BodyArea';
import Patient from '@/classes/patients/Patient';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import useDateFormat from '@/mixins/useDateFormat';
import DateHelper from '@/services/DateHelper';
import RemoveFromClass from '@/services/RemoveFromClass';
export default defineComponent({
  name: 'HeightWeightTable',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();
    const { formatDate } = useDateFormat();

    const patient: ComputedRef<Patient> = computed(() => store.getters['patients/patient']);
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    return {
      RemoveFromClass,
      patient,
      Plus,
      isEditMode,
      formatDate,
      BodyArea,
      DateHelper,
    };
  },
});
</script>
