<template>
  <el-button v-if="isEditMode" style="margin-bottom: 20px" @click="handleOpenDialog">Выписать лекарство</el-button>
  <el-table
    :data="patientDrugRegimens"
    style="margin-bottom: 20px"
    row-key="id"
    border
    :default-expand-all="false"
    :tree-props="{ hasChildren: 'hasChildren', children: 'edvs' }"
    class="table-shadow"
    header-row-class-name="header-style"
    empty-text="Лекарства не выписаны"
  >
    <el-table-column label="Лекарство" align="start">
      <template #default="scope">
        {{ scope.row.drug?.name ? scope.row.drug?.name : getDrugById(scope.row.drugId).name }}
      </template>
    </el-table-column>

    <el-table-column label="Схема приема" align="start">
      <template #default="scope">
        {{ scope.row.drugRegimen?.name ? scope.row.drugRegimen?.name : getDrugRegimenByDrugId(scope.row.drugId, scope.row.drugRegimenId).name }}
      </template>
    </el-table-column>

    <el-table-column label="Описание схемы приема" align="start">
      <template #default="scope">
        {{ getDrugRegimenByDrugId(scope.row.drugId, scope.row.drugRegimenId)?.getShortInfo() }}
      </template>
    </el-table-column>

    <el-table-column prop="date" label="Дата начала приема" align="center">
      <template #default="scope">
        {{ $dateTimeFormatter.format(scope.row.date) }}
      </template>
    </el-table-column>

    <el-table-column v-if="isEditMode" width="50" align="center">
      <template #default="scope">
        <el-space direction="vertical" class="icons">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row.id)" />
        </el-space>
      </template>
    </el-table-column>
    <el-table-column type="expand">
      <template #default="scope">
        <!-- <el-table :data="scope.row.patientDrugRegimenItems">
          <el-table-column prop="date" label="Дата приема" align="center">
            <template #default="props">
              {{ $dateTimeFormatter.format(props.row.date) }}
            </template>
          </el-table-column>
        </el-table> -->
        <div style="display: flex; flex-wrap: wrap">
          <el-card v-for="(patientDrugRegimenItem, index) in scope.row.patientDrugRegimenItems" :key="index" style="margin: 5px">
            Дата приема: {{ $dateTimeFormatter.format(patientDrugRegimenItem.date) }}
          </el-card>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="Назначание лекарства" :before-close="handleCloseDialog" destroy-on-close width="450px">
    <el-form ref="form" label-width="180px" :model="newPatientDrugRegimen">
      <el-form-item label="Лекарство" prop="drugId" :rules="{ required: true, message: 'Пожалуйста выберите лекарство', trigger: 'change' }">
        <el-select v-model="newPatientDrugRegimen.drugId" filterable placeholder="Лекарство">
          <el-option v-for="item in drugs" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Схема приема" prop="drugRegimenId" :rules="{ required: true, message: 'Пожалуйста выберите схему приема', trigger: 'change' }">
        <el-select v-model="newPatientDrugRegimen.drugRegimenId" placeholder="Схема приема" :disabled="newPatientDrugRegimen.drugId ? false : true">
          <el-option v-for="item in getDrugRegimens(newPatientDrugRegimen.drugId)" :key="item.id" :label="item.name" :value="item.id" @click="chosenDrugRegimen = item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Дата начала приема" prop="date" :rules="{ required: true, message: 'Пожалуйста укажите дату начала приема', trigger: 'change' }">
        <el-date-picker
          v-model="newPatientDrugRegimen.date"
          format="DD.MM.YYYY"
          placeholder="Выберите дату"
          type="date"
          :disabled="newPatientDrugRegimen.drugId && newPatientDrugRegimen.drugRegimenId ? false : true"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div v-if="newPatientDrugRegimen.drugId && newPatientDrugRegimen.drugRegimenId">
      <div>Описание схемы приема:</div>
      <div>{{ getDrugRegimenByDrugId(newPatientDrugRegimen.drugId, newPatientDrugRegimen.drugRegimenId)?.getShortInfo() }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit">Сохранить</el-button>
        <el-button @click="dialogVisible = false">Отмена</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, UnwrapRef } from 'vue';
import { useStore } from 'vuex';

import Drug from '@/classes/Drug';
import DrugRegimen from '@/classes/DrugRegimen';
import DrugRegimenBlock from '@/classes/DrugRegimenBlock';
import DrugRegimenBlockItem from '@/classes/DrugRegimenBlockItem';
import PatientDrugRegimen from '@/classes/PatientDrugRegimen';
import PatientDrugRegimenItem from '@/classes/PatientDrugRegimenItem';
import TableButtonGroup from '@/components/TableButtonGroup.vue';

export default defineComponent({
  name: 'DrugForm',
  components: {
    TableButtonGroup,
  },

  setup() {
    const store = useStore();
    // const { formatDate } = useDateFormat();

    const patientDrugRegimens: ComputedRef<PatientDrugRegimen[]> = computed(() => store.getters['patients/patientDrugRegimens']);
    const drugs: Ref<Drug[]> = computed(() => store.getters['drugs/drugs']);
    const newPatientDrugRegimen: Ref<UnwrapRef<PatientDrugRegimen>> = ref(new PatientDrugRegimen());
    const chosenDrugRegimen = ref(new DrugRegimen());
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    // const { validateWithoutMessageBox } = useValidate();
    const form = ref();
    const dialogVisible: Ref<boolean> = ref(false);
    const handleCloseDialog = (done: CallableFunction) => {
      ElMessageBox.confirm('Вы уверены, что хотите закрыть окно?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
      }).then(() => {
        done();
      });
    };
    // const handleOpenDialog = async (): Promise<void> => {
    //   const diagnosisIds = patientDiagnosis.value.map((d: PatientDiagnosis) => d.mkbDiagnosisId);
    //   const canAddDrug = diagnosisIds.length > 0 && diagnosisIds.every((d: string | undefined) => d && d != '');
    //   if (!canAddDrug) {
    //     ElMessage({
    //       type: 'warning',
    //       message: 'У пациента нет диагнозов для добавления лекарств',
    //     });
    //     return;
    //   }
    //   await loadDrugs();
    //   if (drugs.value.length === 0) {
    //     ElMessage({
    //       type: 'warning',
    //       message: 'Нет доступных лекарств для выбора',
    //     });
    //     return;
    //   }
    //   newPatientDrugRegimen.value = new PatientDrugRegimen();
    //   dialogVisible.value = true;
    // };

    const calculate = (): void => {
      let daysSum = 0;
      const addPatientDrugRegimenItem = (): void => {
        let date = new Date(newPatientDrugRegimen.value.date);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysSum);
        newPatientDrugRegimen.value.patientDrugRegimenItems.push(new PatientDrugRegimenItem({ date }));
      };
      const addPatientDrugRegimenItems = (drugRegimenBlock: DrugRegimenBlock): void => {
        drugRegimenBlock.drugRegimenBlockItems.forEach((drugRegimenBlockItem: DrugRegimenBlockItem) => {
          if (!drugRegimenBlockItem.timesPerDay) {
            daysSum += drugRegimenBlockItem.daysCount;
            addPatientDrugRegimenItem();
          } else {
            for (let i = 1; i <= drugRegimenBlockItem.daysCount; i += 1) {
              daysSum += 1;
              addPatientDrugRegimenItem();
            }
          }
        });
        const d = new Date(newPatientDrugRegimen.value.date);
        if (drugRegimenBlock.infinitely && new Date(d.getFullYear(), d.getMonth(), d.getDate() + daysSum) < new Date(d.getFullYear() + 1, d.getMonth(), d.getDate())) {
          addPatientDrugRegimenItems(drugRegimenBlock);
        }
      };
      chosenDrugRegimen.value.drugRegimenBlocks.forEach((drugRegimenBlock: DrugRegimenBlock) => {
        addPatientDrugRegimenItems(drugRegimenBlock);
      });
    };

    const remove = (id: string): void => {
      store.commit('patients/removePatientDrugRegimen', id);
    };
    const getDrugRegimens = (id: string): DrugRegimen[] | undefined => {
      if (id) {
        return store.getters['drugs/getDrugRegimensByDrugId'](id);
      }
    };
    const getDrugById = (id: string): Drug | undefined => {
      if (id) {
        return store.getters['drugs/getDrugById'](id);
      }
    };
    const getDrugRegimenByDrugId = (drugId: string, drugRegimenId: string): DrugRegimen | undefined => {
      if (drugId && drugRegimenId) {
        return store.getters['drugs/getDrugRegimenByDrugId'](drugId, drugRegimenId);
      }
    };

    onBeforeMount(async () => {
      // await loadDrugs();
    });
    // const loadDrugs = async () => {
    //   const diagnosisIds = patientDiagnosis.value.map((d: PatientDiagnosis) => d.mkbDiagnosisId);
    //   await store.dispatch('drugs/getAll', diagnosisIds);
    // };
    const submit = (): void => {
      // if (!validateWithoutMessageBox(form.value)) {
      //   return;
      // }
      calculate();
      store.commit('patients/addPatientDrugRegimen', newPatientDrugRegimen.value);
      dialogVisible.value = false;
    };

    return {
      patientDrugRegimens,
      submit,
      remove,
      drugs,
      getDrugRegimens,
      dialogVisible,
      handleCloseDialog,
      // handleOpenDialog,
      newPatientDrugRegimen,
      // formatDate,
      getDrugById,
      getDrugRegimenByDrugId,
      chosenDrugRegimen,
      form,
      isEditMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.regimen-description {
  :deep(.el-form-item__content) {
    margin: auto;
  }
}
</style>
