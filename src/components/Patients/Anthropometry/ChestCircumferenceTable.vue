<template>
  <h3>Окружность груди</h3>
  <el-table :data="patient.chestCircumference" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
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
          :rules="[{ required: true, message: 'Необходимо указать окружность ууди', trigger: 'change' }]"
        >
          <el-input-number v-model="scope.row.value" size="medium" :min="0" style="width: 120px"></el-input-number>
        </el-form-item>
        <span v-else>{{ scope.row.value }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Группа">
      <template #default="scope">
        {{
          scope.row.getChestCircumferenceGroup(patient.birthDate, patient.isMale).color
            ? `${scope.row.getChestCircumferenceGroup(patient.birthDate, patient.isMale).percentiles}, ${
                scope.row.getChestCircumferenceGroup(patient.birthDate, patient.isMale).recomendation
              }`
            : scope.row.getChestCircumferenceGroup(patient.birthDate, patient.isMale)
        }}
      </template>
    </el-table-column>

    <el-table-column v-if="isEditMode" width="50" fixed="right" align="center">
      <template #header>
        <el-button type="success" size="small" :icon="Plus" circle @click="patient.addChestCircumference()" />
      </template>
      <template #default="scope">
        <TableButtonGroup
          :show-remove-button="true"
          @remove="RemoveFromClass(scope.$index, scope.row.chestCircumference, scope.row.chestCircumferenceForDelete)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import Patient from '@/classes/patients/Patient';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import useDateFormat from '@/mixins/useDateFormat';
import RemoveFromClass from '@/services/RemoveFromClass';
export default defineComponent({
  name: 'ChestCircumferenceTable',
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
    };
  },
});
</script>
