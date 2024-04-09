<template>
  <div class="tools-panel">
    <Button
      v-if="!selectResearchesMod"
      :with-icon="true"
      icon="download"
      icon-class="icon-download"
      button-class="download-button"
      @click="toggleSelectMod"
    />
    <Button
      v-if="selectResearchesMod"
      :with-icon="true"
      icon="aright"
      icon-class="icon-aright"
      button-class="download-button"
      @click="toggleSelectMod"
    />
    <div v-if="selectResearchesMod" class="button-download-field">
      <div v-if="someResearchSelected" class="field">
        <Button
          v-for="exportObj in exports"
          :key="exportObj.exportType"
          button-class="save-button"
          :text="'Выгрузить ' + exportObj.exportType"
          @click="exportData(exportObj)"
        />
      </div>
      <StringItem v-else string="Нажмите на исследования для выбора..." font-size="14px" padding="0" color="#006bb4" margin="0 10px " />
    </div>
  </div>

  <GridContainer grid-gap="5px" margin="10px" width="calc(100% - 20px)" grid-template-columns="repeat(auto-fit, minmax(280px, 1fr))">
    <GeneralItem
      v-for="(research, i) in researches"
      :key="research.id"
      :ready="Strings.FormatToPercentage(patient.getResearchFillingPercentage(research.id))"
      height="60px"
      @click="selectResearch(research)"
    >
      <template #general-item>
        {{ i + 1 }}. {{ research.name }}

        <div v-if="selectResearchesMod && !research.selectedForExport" class="select-field" />
        <div v-if="selectResearchesMod && research.selectedForExport" class="selected-field">
          <svg class="check-icon">
            <use xlink:href="#check" />
          </svg>
        </div>
      </template>
    </GeneralItem>
  </GridContainer>
  <Check />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Check from '@/assets/svg/Check.svg';
import ExportOptions from '@/classes/exportOptions/ExportOptions';
import PatientsExportOptionLib from '@/classes/exportOptions/libs/PatientsExportOptionLib';
import ResearchesExportOptionLib from '@/classes/exportOptions/libs/ResearchesExportOptionLib';
import Patient from '@/classes/Patient';
import Research from '@/classes/Research';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';
import ResearchesSortsLib from '@/libs/sorts/ResearchesSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Button from '@/services/components/Button.vue';
import GeneralItem from '@/services/components/GeneralItem.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'PatientResearchesList',
  components: {
    GridContainer,
    GeneralItem,
    Button,
    StringItem,
    Check,
  },
  props: {
    filterModel: {
      type: Object as PropType<FilterModel>,
      required: true,
    },
    type: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const researches: Ref<Research[]> = computed(() => Provider.store.getters['researches/items']);
    const selectResearchesMod = ref(false);
    const selectedResearchesIds: Ref<Set<string>> = ref(new Set());

    const someResearchSelected = computed(() => researches.value.some((r: Research) => r.selectedForExport));

    const exports: Ref<ExportOptions[]> = ref([
      ExportOptions.XLSX(
        PatientsExportOptionLib.onePatient(patient.value.id),
        ResearchesExportOptionLib.manyResearches(selectedResearchesIds.value)
      ),
    ]);

    onBeforeMount(async () => {
      const fq = new FTSP();
      if (props.type === 'anamnesis') {
        fq.f.push(ResearchesFiltersLib.onlyAnamneses());
      }
      if (props.type === 'researches') {
        fq.f.push(ResearchesFiltersLib.onlyLaboratory());
      }
      if (props.type === 'diagnosis') {
        fq.f.push(ResearchesFiltersLib.onlyMkb());
      }
      fq.setSortModel(ResearchesSortsLib.byOrder());
      await Provider.store.dispatch('researches/ftsp', { ftsp: fq });
    });

    const selectResearch = async (research: Research) => {
      if (!research.id) {
        return;
      }
      if (!selectResearchesMod.value) {
        emit('select', research);
        return;
      }
      const findedResearch = researches.value.find((r: Research) => r.id === research.id);
      if (findedResearch && findedResearch.id) {
        findedResearch.selectedForExport = !findedResearch.selectedForExport;
        if (selectedResearchesIds.value.has(findedResearch.id)) {
          selectedResearchesIds.value.delete(findedResearch.id);
        } else {
          selectedResearchesIds.value.add(findedResearch.id);
        }
        exports.value = [
          ExportOptions.XLSX(
            PatientsExportOptionLib.onePatient(patient.value.id),
            ResearchesExportOptionLib.manyResearches(selectedResearchesIds.value)
          ),
        ];
      }
    };

    const resetSelect = () => {
      researches.value.forEach((r: Research) => (r.selectedForExport = false));
      selectedResearchesIds.value.clear();
    };

    const toggleSelectMod = () => {
      selectResearchesMod.value = !selectResearchesMod.value;
    };

    const exportData = async (exportOptions: ExportOptions): Promise<void> => {
      await Provider.store.dispatch('dataExport/export', exportOptions);
      resetSelect();
    };

    return {
      someResearchSelected,
      selectedResearchesIds,
      exportData,
      selectResearchesMod,
      exports,
      toggleSelectMod,
      selectResearch,
      patient,
      researches,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.tools-panel {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 13px 0 0 0;
}

:deep(.icon-download) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

:deep(.icon-aright) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #006bb4;
}

.download-button {
  width: 52px;
  height: 52px;
  color: #006bb4;
  background: #ffffff;
  margin: 0px;
}

.download-button:hover {
  background: #dff2f8;
}

.button-download-field {
  width: 250px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #006bb4;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.field {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 5px;
  font-size: 14px;
}

.select-field {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c4c4c4;
  opacity: 0.2;
  width: 100%;
  height: 100%;
}

.selected-field {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.check-icon {
  width: 40px;
  height: 40px;
  fill: #00b5a4;
  fill-opacity: 0.6;
}
</style>
