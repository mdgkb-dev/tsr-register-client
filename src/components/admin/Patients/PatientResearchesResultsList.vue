<template>
  <RightSliderContainer :toggle="toggle">
    <template #header>
      <Button button-class="save-button" text="График" @click="toggleChart" />

      <Button v-for="exportObj in exports" :key="exportObj.exportType" button-class="save-button" :text="exportObj.exportType" @click="exportData(exportObj)" />
    </template>
    <CollapseContainer :init-active-idx="activeIdx">
      <template #default="scope">
        <div v-for="(result, i) in patientResearch.researchResults" :key="result.id" @click="selectResult(result.id, i)">
          <CollapseItem :is-collaps="false" padding="0 8px" :active-id="scope.activeIdx" :tab-id="i" :selectable="true">
            <template #inside-title>
              <div :id="result.getIdWithoutDashes()" @click.prevent="() => undefined">
                <InfoItem title="дата" margin="0" :with-open-window="false" width="140px">
                  <SmallDatePicker v-model:model-value="result.date" placeholder="Выбрать" width="120px" height="34px" @change="update(result)" @click.stop="() => undefined" />
                </InfoItem>
              </div>
            </template>
          </CollapseItem>
        </div>
      </template>
    </CollapseContainer>

    <template v-if="research.withDates" #button>
      <Button button-class="plus-button" text="Добавить" @click="addResult" />
    </template>
  </RightSliderContainer>

  <PatientResearchChart v-if="chartOpened" :research="research" :patient-research="patientResearch" @close="toggleChart" />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';

import ExportOptions from '@/classes/exportOptions/ExportOptions';
import PatientsExportOptionLib from '@/classes/exportOptions/libs/PatientsExportOptionLib';
import ResearchesExportOptionLib from '@/classes/exportOptions/libs/ResearchesExportOptionLib';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import PatientResearchChart from '@/components/admin/Patients/PatientResearchChart.vue';
// import MessageConfirmSave, { Cancel } from '@/services/classes/messages/MessageConfirmSave';
// import MessageSuccess from '@/services/classes/messages/MessageSuccess';
import Button from '@/services/components/Button.vue';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import RightSliderContainer from '@/services/components/RightSliderContainer.vue';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';
import WaitElement from '@/services/WaitElement';
export default defineComponent({
  name: 'PatientResearchesResultsList',
  components: {
    CollapseContainer,
    SmallDatePicker,
    Button,
    RightSliderContainer,
    CollapseItem,
    InfoItem,
    PatientResearchChart,
  },
  props: {
    patientResearch: {
      type: Object as PropType<PatientResearch>,
      required: true,
    },
    research: {
      type: Object as PropType<Research>,
      required: true,
    },
  },
  emits: ['select', 'update', 'addResult', 'save'],
  setup(props, { emit }) {
    const toggle = ref(props.research.withDates);
    const selectedId: Ref<string> = ref('');
    const activeIdx = ref(props.patientResearch.researchResults.length - 1);
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const exports: ExportOptions[] = [
      ExportOptions.XLSX(PatientsExportOptionLib.onePatient(props.patientResearch.patientId), ResearchesExportOptionLib.oneResearch(props.research.id)),
      ExportOptions.PDF(PatientsExportOptionLib.onePatient(props.patientResearch.patientId), ResearchesExportOptionLib.oneResearch(props.research.id)),
    ];

    const update = async (item: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/update', item);
      // ElMessage(new MessageSuccess());
    };

    onBeforeMount(async () => {
      const lastResult = props.patientResearch.getLastResult();
      if (lastResult && lastResult.id) {
        selectResult(lastResult.id, props.patientResearch.researchResults.length - 1);
      }
    });

    onMounted(() => {
      const lastResult = props.patientResearch.getLastResult();
      if (lastResult) {
        scroll('#' + lastResult.getIdWithoutDashes());
      }
    });

    const confirmChangeResult = async (): Promise<boolean> => {
      if (!researchResult.value.changed) {
        return true;
      }
      try {
        // await MessageConfirmSave();
        emit('save');
        return true;
      } catch (e) {
        return false;
        // return e === Cancel;
      }
    };

    const selectResult = async (id?: string, idx?: number): Promise<void> => {
      if (!id) {
        return;
      }
      const needContinue = await confirmChangeResult();
      if (!needContinue) {
        return;
      }
      activeIdx.value = idx as number;
      emit('select', id);
    };

    const exportData = async (exportOptions: ExportOptions): Promise<void> => {
      await Provider.store.dispatch('dataExport/export', exportOptions);
    };

    const chartOpened: Ref<boolean> = ref(false);
    const toggleChart = () => {
      chartOpened.value = !chartOpened.value;
    };

    const addResult = async () => {
      const needContinue = await confirmChangeResult();
      if (!needContinue) {
        return;
      }
      emit('addResult');
      activeIdx.value = props.patientResearch.researchResults.length - 1;
      const selector = '#' + props.patientResearch.getLastResult()?.getIdWithoutDashes();
      WaitElement(selector)
        .then(() => scroll(selector))
        .catch((e) => console.warn('result not found', e));
    };

    return {
      addResult,
      activeIdx,
      exportData,
      exports,
      chartOpened,
      toggleChart,
      selectedId,
      selectResult,
      toggle,
      update,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.plus-button {
  width: calc(100% - 25px);
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 42px;
  font-size: 14px;
  margin: 0 25px 0 0px;
}

.save-button {
  width: calc(100% - 25px);
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 25px 0 0px;
  font-size: 14px;
}
</style>
