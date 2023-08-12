<template>
  <div class="select-block">
    <Button button-class="plus-button" icon="plus" icon-class="icon-plus" @click="toggleAddAllergen">
      <template #icon>
        <svg class="icon-plus">
          <use xlink:href="#plus"></use>
        </svg>
      </template>
    </Button>
    <div class="item-list">
      <div
        v-for="variant in question.questionVariants.filter((q) => !!researchResult.getQuestionVariantAnswer(q.id))"
        :key="variant.id"
        class="item-line"
      >
        <div class="left">
          <div class="item-counter">
            <NumberProp
              v-if="question.valueType.isNumber()"
              :research-result="researchResult"
              :question="question"
              :variant-id="variant.id"
            />
          </div>
          <div class="item-name">{{ variant.name }}</div>
        </div>
        <div class="button">
          <Button
            text="Удалить"
            width="100%"
            height="40px"
            font-size="16px"
            border-radius="5px"
            color="#B0A4C0"
            background="#ffffff"
            :with-icon="false"
            :color-swap="true"
            @click="$classHelper.RemoveFromClassById(researchResult.getQuestionVariantAnswer(variant.id)?.id, researchResult.answers, [])"
          >
          </Button>
        </div>
      </div>
    </div>
    <div v-if="addAllergen" class="blur"></div>
    <div v-if="addAllergen" class="select-form">
      <ResearcheContainer background="#ffffff" padding="0px">
        <template #header>
          <div class="header-block">
            <div class="researche-title">
              <Button
                text="Назад"
                background="#ffffff"
                margin-right="10px"
                height="42px"
                font-size="16px"
                border-radius="5px"
                color="#343e5c"
                @click="toggleAddAllergen"
              >
                <template #icon>
                  <svg class="icon-back">
                    <use xlink:href="#back"></use>
                  </svg>
                </template>
              </Button>
              <div class="researche-name">Выберите аллергены из списка</div>
            </div>
            <GridContainer max-width="600px" grid-gap="6px" grid-template-columns="repeat(auto-fit, minmax(60px, 1fr))" margin="10px 0">
              <template #grid-items>
                <AlphabetFilter />
              </template>
            </GridContainer>
            <el-input v-model="filterString" placeholder="Найти вариант" />
          </div>
        </template>

        <template #body>
          <div class="body">
            <GridContainer grid-gap="5px" margin="10px 0">
              <template #grid-items>
                <Button
                  v-for="variant in filteredVariants"
                  :key="variant.id"
                  :text="variant.name"
                  :background="researchResult.getQuestionVariantAnswer(variant.id) ? '#DFF2F8' : '#ffffff'"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :with-icon="false"
                  @click="addAnswerToQuestionVariant(variant)"
                >
                </Button>
              </template>
            </GridContainer>
          </div>
        </template>
      </ResearcheContainer>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import Answer from '@/classes/Answer';
import Question from '@/classes/Question';
import QuestionVariant from '@/classes/QuestionVariant';
import ResearchResult from '@/classes/ResearchResult';
import AlphabetFilter from '@/components/admin/Patients/AlphabetFilter.vue';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import ResearcheContainer from '@/components/admin/Patients/ResearcheContainer.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import Button from '@/components/Base/Button.vue';
import StringsService from '@/services/Strings';

export default defineComponent({
  name: 'SetSelect',
  components: {
    GridContainer,
    Button,
    ResearcheContainer,
    AlphabetFilter,
    NumberProp,
  },
  props: {
    researchResult: {
      type: Object as PropType<ResearchResult>,
      required: true,
    },
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'fill'],
  setup(props, { emit }) {
    const addAllergen = ref(false);
    const answer = props.researchResult.getOrCreateAnswer(props.question);
    const filterString: Ref<string> = ref('');
    const filteredVariants: ComputedRef<QuestionVariant[]> = computed(() => {
      if (filterString.value === '') {
        return props.question.questionVariants;
      }
      return props.question.questionVariants.filter((qv: QuestionVariant) => StringsService.stringsEquals(filterString.value, qv.name));
    });

    const filledCheck = (): void => {
      answer.filled = answer.selectedAnswerVariants.length > 0;
      props.researchResult.calculateFilling();
      emit('fill');
    };
    const selectVariant = (selected: boolean, variantId: string) => {
      answer.setSelectedAnswerVariant(selected, variantId);
      filledCheck();
    };

    const toggleAddAllergen = async () => {
      addAllergen.value = !addAllergen.value;
    };
    const addAnswerToQuestionVariant = async (questionVariant: QuestionVariant): Promise<void> => {
      if (props.researchResult.getQuestionVariantAnswer(questionVariant.id as string)) {
        return;
      }
      const answer = Answer.Create(props.question);
      answer.questionVariantId = questionVariant.id;
      props.researchResult.addAnswer(answer);
      console.log(props.researchResult.answers);
    };

    const getAns = (v: string) => {
      return props.researchResult.getQuestionVariantAnswer(v)?.valueNumber;
    };

    return {
      filterString,
      filteredVariants,
      getAns,
      selectVariant,
      filledCheck,
      answer,
      toggleAddAllergen,
      addAllergen,
      addAnswerToQuestionVariant,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.plus-button {
  width: 100%;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 60px;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.icon-back {
  width: 24px;
  height: 24px;
}

.researche-title {
  width: calc(100% - 2px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.researche-name {
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  font-size: 14px;
  text-transform: uppercase;
}

.body {
  padding: 0 10px;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 20;
}

.select-form {
  position: fixed;
  top: 49%;
  left: 50%;
  width: calc(99% - 22px);
  height: calc(98% - 22px);
  transform: translate(-50%, -50%);
  z-index: 21;
  max-height: 97vh;
  background: #ffffff;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  overflow: hidden;
  overflow-y: auto;
}

.header-block {
  padding: 10px;
  border-bottom: $light-pink-border;
}

.item-line {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  background: $site_light_gray;
  padding: 10px;
  margin-top: 10px;
}

.left {
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  color: #343e5c;
  min-width: 280px;
}

.item-counter {
  min-width: 180px;
  margin-right: 20px;
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

:deep(.el-form-item) {
  display: block;
  width: 260px;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
}
</style>
