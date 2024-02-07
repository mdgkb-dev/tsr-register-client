<template>
  <RightSliderContainer :toggle="toggle">
    <template #header>
      <Button button-class="save-button" text="График" @click="toggleChart" />
      <Button button-class="save-button" text="Xlsx" @click="getXlsx" />
    </template>
    <CollapseContainer>
      <template #default="scope">
        <div v-for="(result, i) in patientResearch.researchResults" :key="result.id" @click="selectResult(result.id)">
          <CollapseItem :is-collaps="false" padding="0 8px" :active-id="scope.activeId" :tab-id="i" :selectable="true" @changeActiveId="scope.changeActiveId">
            <template #inside-title>
              <div @click.prevent="() => undefined">
                <InfoItem title="дата" margin="0" :with-open-window="false" width="100px">
                  <SmallDatePicker v-model:model-value="result.date" placeholder="Выбрать" width="85px" height="34px" @change="update(result)" @click.stop="() => undefined" />
                </InfoItem>
              </div>
            </template>
          </CollapseItem>
        </div>
      </template>
    </CollapseContainer>

    <template #button>
      <Button button-class="plus-button" text="Добавить" @click="addResult" />
    </template>
  </RightSliderContainer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import Button from '@/services/components/Button.vue';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import RightSliderContainer from '@/services/components/RightSliderContainer.vue';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientAnamnesesResultsList',
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
    const toggle = ref(false);
    const selectedId: Ref<string> = ref('');
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const update = async (item: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/update', item);
    };

    const addResult = async (): Promise<void> => {
      const item = props.patientResearch.addResult(props.research, props.patientResearch.id);
      await Provider.store.dispatch('researchesResults/create', item);
    };
    const selectResult = async (id: string): Promise<void> => {
      selectedId.value = id;
      emit('select', id);
    };

    const getXlsx = async (): Promise<void> => {
      await Provider.store.dispatch('researches/xlsx', { researchId: props.research.id, patientId: patient.value.id });
    };

    const chartOpened: Ref<boolean> = ref(false);
    const toggleChart = () => {
      emit('showChart');
      // chartOpened.value = !chartOpened.value;
    };

    return {
      chartOpened,
      toggleChart,
      getXlsx,
      selectedId,
      selectResult,
      toggle,
      addResult,
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
