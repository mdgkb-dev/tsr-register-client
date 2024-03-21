<template>
  <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="fill" />
  <component :is="getComponent()" v-else :research-result="researchResult" :question="question" @fill="fill" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import DateQuestion from '@/components/admin/Research/DateQuestion.vue';
import FilesProp from '@/components/admin/Research/FilesProp.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import RadioProp from '@/components/admin/Research/RadioProp.vue';
import SetProp from '@/components/admin/Research/SetProp.vue';
import SetSelect from '@/components/admin/Research/SetSelect.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';
import Provider from '@/services/Provider/Provider';
import ValueTypesComponentMap from '@/interfaces/valueTypes/ValueTypesComponentMap';
import scroll from '@/services/Scroll';
export default defineComponent({
  name: 'QuestionComponent',
  components: {
    SetProp,
    RadioProp,
    NumberProp,
    DateQuestion,
    StringProp,
    SetSelect,
    FilesProp,
  },

  props: {
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
  },
  setup(props) {
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const getComponent = () => {
      if (props.question.valueType.isRadio()) {
        return 'RadioProp';
      }
      if (props.question.valueType.isSet()) {
        return 'SetProp';
      }
      if (props.question.valueType.isNumber()) {
        return 'NumberProp';
      }
      return ValueTypesComponentMap[props.question.valueType.name].name;
    };

    const fill = () => {
      scroll(props.question.getIdWithoutDashes());
      researchResult.value.changed = true;
      console.log(researchResult.value);
    };
    return {
      getComponent,
      researchResult,
      fill,
    };
  },
});
</script>

<style lang="scss" scoped></style>
