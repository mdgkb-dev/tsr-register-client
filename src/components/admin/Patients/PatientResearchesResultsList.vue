<template>
  <RightSliderContainer :toggle="toggle">
    <div v-for="result in patientResearch.researchResults" :key="result.id" @click="selectResult(result.id)">
      <CollapseItem :is-collaps="false" padding="0 8px">
        <template #inside-title>
          <div @click.prevent="() => undefined">
            <InfoItem title="дата" margin="0" :with-open-window="false" width="100px">
              <SmallDatePicker
                v-model:model-value="result.date"
                placeholder="Выбрать"
                width="85px"
                height="34px"
                @change="update(result)"
                @click.stop="() => undefined"
              />
            </InfoItem>
          </div>
        </template>
      </CollapseItem>
    </div>
    <template #button>
      <Button button-class="plus-button" icon="plus" icon-class="icon-plus" @click="addResult" />
    </template>
  </RightSliderContainer>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import Button from '@/components/Base/Button.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import GeneralItem from '@/services/components/GeneralItem.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import RightSliderContainer from '@/services/components/RightSliderContainer.vue';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientResearchesResultsList',
  components: {
    StringItem,
    SmallDatePicker,
    GeneralItem,
    Button,
    RightSliderContainer,
    GridContainer,
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
  emits: ['select', 'update'],
  setup(props, { emit }) {
    const toggle = ref(false);
    const update = async (item: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/update', item);
    };

    const addResult = async (): Promise<void> => {
      const item = props.patientResearch.addResult(props.research, props.patientResearch.id);
      await Provider.store.dispatch('researchesResults/createWithoutReset', item);
    };
    const selectResult = async (id: string): Promise<void> => {
      emit('select', id);
      toggle.value = !toggle.value;
    };

    return {
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
  width: calc(100% - 20px);
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 60px;
  margin: 0 10px;
}
</style>
