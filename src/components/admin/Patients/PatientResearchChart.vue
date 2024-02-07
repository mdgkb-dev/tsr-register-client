<template>
  <div class="research-info">
    <!-- <Line v-if="mounted && data" :data="data" :options="options" /> -->
  </div>
</template>

<script lang="ts">
// import { CategoryScale, Chart as ChartJS, ChartTypeRegistry, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TooltipItem } from 'chart.js';
// import annotationPlugin from 'chartjs-plugin-annotation';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

// import { Line } from 'vue-chartjs';
import ChartData from '@/classes/chartData/ChartData';
import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import ResearchesResultsFiltersLib from '@/libs/filters/ResearchesResultsFiltersLib';
import ResearchesResultsSortsLib from '@/libs/sorts/ResearchesResultsSortsLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Provider from '@/services/Provider/Provider';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

export default defineComponent({
  name: 'PatientResearchChart',
  // components: { Line },
  props: {
    research: {
      type: Object as PropType<Research>,
      required: true,
    },
    patientResearch: {
      type: Object as PropType<PatientResearch>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props) {
    const researchResults: Ref<ResearchResult[]> = computed(() => Provider.store.getters['researchesResults/items']);
    const data: Ref<ChartData | undefined> = ref();
    const mounted = ref(false);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);

    onBeforeMount(async () => {
      const fq = new FilterQuery();
      if (!props.patientResearch.id) {
        return;
      }
      fq.filterModels.push(ResearchesResultsFiltersLib.byPatientResearchId(props.patientResearch.id));
      fq.sortModels.push(ResearchesResultsSortsLib.byDate());
      await Provider.store.dispatch('researchesResults/getAll', { filterQuery: fq });
      data.value = props.research.getChartDataSets(researchResults.value, patient.value.human.dateBirth, patient.value.human.isMale);
      mounted.value = true;
    });

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 5,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            // label: (context: TooltipItem<keyof ChartTypeRegistry>) => context.formattedValue + ': ' + (context.dataset as ChartDataSet).results[context.dataIndex],
          },
        },
      },
    };

    return {
      patient,
      mounted,
      options,
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.research-info {
  position: fixed;
  width: calc(80% - 130px);
  height: 70vh;
  background: #ffffff;
  top: 170px;
  left: calc(50% + 120px);
  transform: translateX(-50%);
  margin: 0;
  padding: 0px 10px 10px 10px;
  border: $normal-darker-border;
  border-radius: $normal-border-radius;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
}

@media (max-width: 1690px) {
  .research-info {
    height: 65vh;
    top: 205px;
  }
}

@media (max-width: 1436px) {
  .research-info {
    top: 205px;
  }
}

@media (max-width: 1050px) {
  .research-info {
    top: 246px;
  }
}

@media (max-width: 992px) {
  .research-info {
    top: 205px;
    margin: 0 10px 0 0;
    width: calc(90% - 20px);
    height: 65vh;
    background: #ffffff;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media screen and (max-width: 822px) {
  .research-info {
    top: 246px;
  }
}

@media screen and (max-width: 502px) {
  .research-info {
    height: 55vh;
    top: 328px;
  }
}

@media screen and (max-width: 342px) {
  .research-info {
    height: 35vh;
    top: 492px;
  }
}
</style>
