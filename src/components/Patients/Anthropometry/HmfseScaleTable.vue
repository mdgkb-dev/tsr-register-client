<template>
  <h3>Шкала HMFSE</h3>
  <el-table :data="patient.hmfseScaleTests" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="60" align="center" />
    <el-table-column prop="date" label="Дата теста" width="250" align="center">
      <template #default="scope">
        <el-form-item label-width="0" style="margin-bottom: 0">
          <el-date-picker v-model="scope.row.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="Кол-во баллов" width="250" align="center">
      <template #default="scope">
        {{ scope.row.getScoresSum() }}
      </template>
    </el-table-column>
    <el-table-column prop="date" label="Процент заполнения" align="center">
      <template #default="scope"> {{ scope.row.getFillingPercentage() }}% </template>
    </el-table-column>
    <el-table-column fixed="right" align="center" width="50">
      <template #header>
        <el-button type="success" size="small" :icon="Plus" circle @click="patient.addHmfseScaleTest()" />
      </template>
      <template #default="scope">
        <TableButtonGroup
          :show-remove-button="true"
          :show-edit-button="true"
          @remove="RemoveFromClass(scope.$index, patient.hmfseScaleTests, patient.hmfseScaleTestsForDelete)"
          @edit="openTest(scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogIsOpen" width="800">
    <HmfseScaleForm :hmfse-scale-test="chosenHmfseScaleTest" @close="dialogIsOpen = false" />
  </el-dialog>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import HmfseScaleTest from '@/classes/HmfseScaleTest';
import Patient from '@/classes/patients/Patient';
import HmfseScaleForm from '@/components/Patients/Anthropometry/HmfseScaleForm.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import useDateFormat from '@/mixins/useDateFormat';
import Provider from '@/services/Provider';
import RemoveFromClass from '@/services/RemoveFromClass';

export default defineComponent({
  name: 'HmfseScaleTable',
  components: {
    TableButtonGroup,
    HmfseScaleForm,
  },
  setup() {
    const dialogIsOpen: Ref<boolean> = ref(false);
    const { formatDate } = useDateFormat();
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/patient']);
    const chosenHmfseScaleTest: Ref<HmfseScaleTest> = ref(new HmfseScaleTest());

    const openTest = (hmfseScaleTest: HmfseScaleTest): void => {
      chosenHmfseScaleTest.value = hmfseScaleTest;
      dialogIsOpen.value = !dialogIsOpen.value;
    };

    return {
      chosenHmfseScaleTest,
      openTest,
      RemoveFromClass,
      formatDate,
      patient,
      dialogIsOpen,
      Plus,
    };
  },
});
</script>
