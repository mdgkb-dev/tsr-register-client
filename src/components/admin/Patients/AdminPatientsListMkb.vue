<template>
  <InfoItem title="диагнозы" margin="0 0 0 0px" :with-hover="editMode" close-window-overflow="hidden" :with-open-window="editMode">
    <div v-for="(diagnosis, i) in patient.patientDiagnosis" :key="diagnosis.id">
      <StringItem :string="diagnosis.mkbItem.getCode() + (i === patient.patientDiagnosis.length - 1 ? '' : ',&nbsp')" font-size="14px" />
    </div>

    <template #open-inside-content>
      <GridContainer max-width="100%" grid-gap="7px" margin="0 0 10px 0" grid-template-columns="repeat(auto-fit, minmax(180px, 1fr))">
        <div v-for="diagnosis in patient.patientDiagnosis" :key="diagnosis.id">
          <InfoItem icon="edit-title" margin="0" :with-open-window="false" height="32px" @click="selectPatientDiagnosis(diagnosis.id)">
            <StringItem :string="diagnosis.mkbItem.getCode()" font-size="11px" />
          </InfoItem>
          <!--          -->
          <!--          <InfoItem-->
          <!--            margin="0"-->
          <!--            :with-open-window="false"-->
          <!--            height="32px"-->
          <!--            icon="del"-->
          <!--            color-selected="#E46862"-->
          <!--            @click="removeMkbItem(diagnosis.id, patient)"-->
          <!--          >-->
          <!--            <StringItem :string="diagnosis.mkbItem.getCode() + ',&nbsp'" font-size="11px" />-->
          <!--          </InfoItem>-->
        </div>
      </GridContainer>

      <RemoteSearch
        key-value="mkbItem"
        placeholder="Начните вводить диагноз"
        @click.stop="() => undefined"
        @select="(e) => addMkbItem(e, patient)"
      />
    </template>
  </InfoItem>
  <ModalWindow :show="showModal" title="Диагноз" @close="showModal = false">
    123
    <PatientDiagnosisForm />
  </ModalWindow>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientDiagnosisForm from '@/components/admin/Patients/PatientDiagnosis/PatientDiagnosisForm.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminPatientsListMkb',
  components: {
    RemoteSearch,
    StringItem,
    InfoItem,
    GridContainer,
    PatientDiagnosisForm,
    ModalWindow,
  },
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
    editMode: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props) {
    const mkbItem: ComputedRef<MkbItem> = computed<MkbItem>(() => Provider.store.getters['mkbItems/item']);
    const showModal: Ref<boolean> = ref(false);
    const addMkbItem = async (event: ISearchObject, patient: Patient): Promise<void> => {
      const patientDiagnosis = patient.getMkbItems().find((pd: PatientDiagnosis) => pd.mkbItemId === event.value);
      if (patientDiagnosis) {
        ElMessage.warning('Выбранный диагноз уже добавлен');
        return;
      }
      await Provider.store.dispatch('mkbItems/get', event.value);
      patient.addMkbItem(mkbItem.value);
      const diagnosisLinks = patient.getMkbItems();
      await Provider.store.dispatch('patientsDiagnosis/create', diagnosisLinks[diagnosisLinks.length - 1]);
    };

    // const removeMkbItem = async (id: string, patient: Patient): Promise<void> => {
    //   ClassHelper.RemoveFromClassById(id, patient.patientDiagnosis, []);
    //   return await Provider.store.dispatch('patientsDiagnosis/remove', id);
    // };

    const selectPatientDiagnosis = async (patientDiagnosisId: string): Promise<void> => {
      const findDiagnosis = props.patient.patientDiagnosis.find((p: PatientDiagnosis) => p.id === patientDiagnosisId);
      Provider.store.commit('patientsDiagnosis/set', findDiagnosis);
      await Provider.store.dispatch('patients/get', props.patient.id);
      showModal.value = !showModal.value;
    };

    return {
      showModal,
      selectPatientDiagnosis,
      addMkbItem,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  font-size: 12px;

  &-filter {
    background: #ffffff;
  }

  &-download {
    background: #dff2f8;
  }
}

:deep(.button-register) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

:deep(.name-item) {
  margin: 0;
  width: auto;
  border-color: #ffffff;
  padding: 0;
}

.grid {
  max-width: auto;
  grid-gap: 10px;
  margin: 0;
  grid-template-columns: repeat(auto-fit, minmax(99px, 1fr));
}

.plus-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
}

.save-picker-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

.gender-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 18px;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

:deep(.edit-button) {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

:deep(.files-buttons) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;

  &:hover {
    background: #dff2f8;
  }
}

.edv {
  font-size: 14px;
  padding: 0;
  margin: 0 5px 0 0;

  &-active {
    color: #b0a4c0;
  }
}

.patient-name {
  color: #006bb4;
  font-size: 17px;
  min-width: 150px;
  width: 100%;
  padding: 0;
}

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}

.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-filter {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }

  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}
</style>
