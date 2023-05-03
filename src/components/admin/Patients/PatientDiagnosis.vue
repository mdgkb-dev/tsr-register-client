<template>
  <RemoteSearch :must-be-translated="true" key-value="mkbItem" placeholder="Начните вводить название диагноза" @select="addMkbItem" />
  <!--    <el-space v-if="isEditMode" style="margin-bottom: 10px">-->
  <!--      <el-button @click="addDiagnosis">Добавить диагноз</el-button>-->
  <!--      <MkbTreeDialog :store-module="storeModule" />-->
  <!--    </el-space>-->
  <CollapseContainer>
    <CollapseItem
      v-for="patientDiagnosis in patient.patientDiagnosis"
      :key="patientDiagnosis.id"
      background="#DFF2F8"
      margin-top="20px"
      :title="patientDiagnosis.mkbItem.getFullName()"
    >
      <template #tools>
        <!--         TODO: работает по щелчку на весь коллапс-->
        <!--        <el-button @click="removePatientDiagnosis(patientDiagnosis.id)">Удалить</el-button>-->
      </template>
      <template #inside-content>
        <div>
          <el-input v-model="patientDiagnosis.doctorName" @blur="updatePatientDiagnosis(patientDiagnosis)"></el-input>
        </div>

        <el-timeline style="margin-top: 20px">
          <el-button @click="addAnamnesis(patientDiagnosis)">Добавить анамнез</el-button>
          <el-timeline-item
            v-for="anamnesis in patientDiagnosis.anamneses"
            :key="anamnesis.id"
            :timestamp="$dateTimeFormatter.format(anamnesis.date)"
            placement="top"
          >
            <AnamnesisForm :anamnesis="anamnesis" @remove="removeAnamnesis(patientDiagnosis, anamnesis.id)" />
          </el-timeline-item>
        </el-timeline>
      </template>
    </CollapseItem>
  </CollapseContainer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Anamnesis from '@/classes/Anamnesis';
import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import AnamnesisForm from '@/components/admin/Patients/AnamnesisForm.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
// import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientDiagnosis',
  components: {
    CollapseItem,
    CollapseContainer,
    RemoteSearch,
    AnamnesisForm,
    // MkbTreeDialog,
    TableButtonGroup,
  },

  setup(props) {
    let expandRowKeys: Ref<(string | undefined)[]> = ref([]);
    const searchFormRef = ref();
    // const { formatDate } = useDateFormat();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => Provider.store.getters['patients/isEditMode']);
    const mkbItem: ComputedRef<MkbItem> = computed<MkbItem>(() => Provider.store.getters['mkbItems/item']);
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    const addMkbItem = async (event: ISearchObject): Promise<void> => {
      await Provider.store.dispatch('mkbItems/get', event.value);
      patient.value.addMkbItem(mkbItem.value);
      const diagnosisLinks = patient.value.getMkbItems();
      await Provider.store.dispatch('patientDiagnosis/create', diagnosisLinks[diagnosisLinks.length - 1]);
    };

    const addAnamnesis = async (patientDiagnosis: PatientDiagnosis): Promise<void> => {
      const anamnesis = patientDiagnosis.addAnamnesis();
      await Provider.store.dispatch('anamneses/create', new Anamnesis(anamnesis));
    };

    const removePatientDiagnosis = async (id: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, patient.value.patientDiagnosis, []);
      await Provider.store.dispatch('patientDiagnosis/remove', id);
    };

    // const changeEditMode = (patientDiagnosis: IPatientDiagnosis) => {
    //   patientDiagnosis.changeEditMode();
    //   searchFormRef.value.$refs.searchForm.focus();
    // };

    // const getRowClassName = ({ row }: any): string => {
    //   if (row.patientDiagnosisAnamnesis.length === 0) {
    //     return 'row-expand-cover';
    //   }
    //   return '';
    // };

    const removeAnamnesis = async (patientDiagnosis: PatientDiagnosis, id: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, patientDiagnosis.anamneses, []);
      await Provider.store.dispatch('anamneses/remove', id);
    };
    const updatePatientDiagnosis = async (patientDiagnosis: PatientDiagnosis) => {
      await Provider.store.dispatch('patientDiagnosis/update', patientDiagnosis);
    };

    return {
      updatePatientDiagnosis,
      addAnamnesis,
      removeAnamnesis,
      removePatientDiagnosis,
      // getRowClassName,
      searchFormRef,
      // changeEditMode,
      // filteredConcreteDiagnosis,
      // diagnosisData,
      // patientDiagnosis,
      // formatDate,
      expandRowKeys,
      // filteredDiagnosis,
      // addAnamnesis,
      // addDiagnosis,
      // handleExpandChange,
      // removeDiagnosis,
      // clearForm,
      isEditMode,
      // filteredSubDiagnosis,
      schema: Provider.schema,
      // selectedElement,
      // RemoveFromClass,
      addMkbItem,
      patient,
      //
      // selectedClass,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-timeline) {
  margin-right: 20px;
}
.selects {
  display: flex;
  flex-direction: column;
  width: 100%;
  &-item {
    width: 100%;
    margin: 10px 10px 0 10px;
    padding-right: 10px;
    :deep(.el-input__wrapper) {
      border-radius: 20px;
    }
    :deep(.el-select) {
      width: 100%;
    }
  }
  &-item:empty {
    display: none;
  }
}

:deep(.row-expand-cover .el-table__expand-icon) {
  visibility: hidden;
}
</style>
