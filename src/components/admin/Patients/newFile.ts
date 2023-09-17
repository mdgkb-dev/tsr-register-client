import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import ExportOptions from '@/classes/exportOptions/ExportOptions';
import PatientsExportOptionLib from '@/classes/exportOptions/libs/PatientsExportOptionLib';
import ResearchesExportOptionLib from '@/classes/exportOptions/libs/ResearchesExportOptionLib';
import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientResearchesResultsList',
  components: {
    CollapseContainer,
    SmallDatePicker,
    Button,
    RightSliderContainer,
    CollapseItem,
    InfoItem,
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
  emits: ['select', 'update', 'showChart'],
  setup(props, { emit }) {
    const toggle = ref(props.research.withDates);
    const selectedId: Ref<string> = ref('');
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);

    const exports: ExportOptions[] = [
      ExportOptions.XLSX(
        PatientsExportOptionLib.onePatient(patient.value.id),
        ResearchesExportOptionLib.manyResearches([props.research?.id, '4e216374-eaa8-4ac6-a9f3-6d6bcb862938'])
      ),
      // ExportOptions.XLSX(PatientsExportOptionLib.allPatients(), ResearchesExportOptionLib.oneResearch(props.research?.id)),
      ExportOptions.PDF(
        PatientsExportOptionLib.onePatient(patient.value.id),
        ResearchesExportOptionLib.manyResearches([props.research?.id, '4e216374-eaa8-4ac6-a9f3-6d6bcb862938'])
      ),
    ];
    const update = async (item: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/updateWithoutReset', item);
    };

    onBeforeMount(async () => {
      const lastResult = props.patientResearch.getLastResult();
      if (lastResult && lastResult.id) {
        await selectResult(lastResult.id);
      }
    });

    const addResult = async (): Promise<void> => {
      const item = props.patientResearch.addResult(props.research, props.patientResearch.id);
      await Provider.store.dispatch('researchesResults/createWithoutReset', item);
    };
    const selectResult = async (id: string): Promise<void> => {
      selectedId.value = id;
      emit('select', id);
    };

    const exportData = async (exportOptions: ExportOptions): Promise<void> => {
      await Provider.store.dispatch('dataExport/export', exportOptions);
    };

    const chartOpened: Ref<boolean> = ref(false);
    const toggleChart = () => {
      emit('showChart');
      // chartOpened.value = !chartOpened.value;
    };

    return {
      exportData,
      exports,
      chartOpened,
      toggleChart,
      selectedId,
      selectResult,
      toggle,
      addResult,
      update,
    };
  },
});
