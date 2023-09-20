import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { computed, defineComponent, onBeforeUnmount, Ref, ref, WritableComputedRef } from 'vue';

import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';
import MessageSuccess from '@/services/classes/messages/MessageSuccess';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientResearches',
  components: {
    PatientResearchesResultsList,
    Xlsx,
    PatientResearchesQuestion,
    PatientResearchesList,
    PatientResearchChart,
    TopSliderContainer,
    Button,
    StringItem,
    ResearcheContainer,
  },
  setup() {
    const researchesPoolsIsToggle: Ref<boolean> = ref(false);
    const showOnlyNotFilled: Ref<boolean> = ref(false);
    const questionsFilterString: Ref<string> = ref('');
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: WritableComputedRef<PatientResearch | undefined> = computed(() =>
      patient.value.getPatientResearch(research.value.id)
    );
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const confirmLeave: Ref<boolean> = ref(false);

    const formUpdated = () => {
      confirmLeave.value = true;
    };

    const createPatientResearch = async (research: Research) => {
      if (!patient.value.getPatientResearch(research.id)) {
        console.log('NoPatientResearch2');
        const item = PatientResearch.Create(patient.value.id, research);
        patient.value.patientsResearches.push(item);
        await Provider.store.dispatch('patientsResearches/create', item);
      }
      await Provider.store.dispatch('researches/get', research.id);
    };

    const selectResearch = async (item: Research) => {
      await Provider.store.dispatch('researches/get', item.id);
      if (!patientResearch.value) {
        console.log('NoPatientResearch');
        return await createPatientResearch(item);
      }
      Provider.store.commit('researchesResults/set');
      if (patientResearch.value?.researchResults.length === 0) {
        return;
        // const item = patientResearch.value?.addResult(research.value, patientResearch.value?.id)
        // await Provider.store.dispatch('researchesResults/createWithoutReset', item);
      }
      await selectResult(patientResearch.value?.researchResults[patientResearch.value?.researchResults.length - 1].id as string);
    };

    const selectResult = async (id: string) => {
      await Provider.store.dispatch('researchesResults/get', id);
      confirmLeave.value = false;
    };

    const updateReserchResults = async () => {
      await Provider.store.dispatch('researchesResults/updateWithoutReset', researchResult.value);
    };

    const updatePatientsResearches = async () => {
      if (patientResearch.value) {
        patientResearch.value.recalculate(researchResult.value);
        await Provider.store.dispatch('patientsResearches/updateWithoutReset', patientResearch.value);
      }
      if (!research.value.withDates) {
        Provider.store.commit('researchesResults/set');
        Provider.store.commit('researches/set');
      }
    };

    const beforeLeave = async (id: string, back: boolean) => {
      if (confirmLeave.value) {
        await ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Сохранить',
          cancelButtonText: 'Не сохранять',
        })
          .then(() => {
            // Вызывается при сохранении
            Promise.resolve(saveResult()).then(() => {
              back ? cancelResearchResultsFilling(true) : selectResult(id);
            });
          })
          .catch((action: string) => {
            if (action === 'cancel') {
              ElMessage({
                type: 'warning',
                message: 'Изменения не были сохранены',
              });
              back ? cancelResearchResultsFilling(true) : selectResult(id);
            }
          });
      } else {
        back ? cancelResearchResultsFilling(true) : selectResult(id);
      }
    };

    const saveResult = async (): Promise<void> => {
      Promise.all([updateReserchResults(), updatePatientsResearches()]).then(() => {
        ElNotification.success(new MessageSuccess());
      });
    };

    const toggleResearchesPools = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('researchesPools/getAll');
      }
      researchesPoolsIsToggle.value = toggle;
    };

    const cancelResearchFilling = () => {
      Provider.store.commit('researches/set');
    };

    const cancelResearchResultsFilling = (s: boolean) => {
      chartOpened.value = false;
      Provider.store.commit('researchesResults/set');
      if (s || !research.value.withDates) {
        Provider.store.commit('researches/set');
      }
    };

    onBeforeUnmount(() => {
      Provider.store.commit('researches/set');
      Provider.store.commit('researchesResults/set');
    });

    const chartOpened: Ref<boolean> = ref(false);
    const toggleChart = () => {
      chartOpened.value = !chartOpened.value;
    };

    return {
      researchesFilter: ResearchesFiltersLib.onlyLaboratory(),
      questionsFilterString,
      showOnlyNotFilled,
      chartOpened,
      toggleChart,
      cancelResearchFilling,
      cancelResearchResultsFilling,
      toggleResearchesPools,
      researchesPoolsIsToggle,
      saveResult,
      researchResult,
      selectResult,
      patientResearch,
      selectResearch,
      research,
      createPatientResearch,
      patient,
      scroll,
      beforeLeave,
      confirmLeave,
      formUpdated,
    };
  },
});
