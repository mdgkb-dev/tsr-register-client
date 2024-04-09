<template>
  <div class="m-2">
    <h3>
      Тест от {{ $dateTimeFormatter.format(chopScaleTest.date) }} - <b>{{ chopScaleTest.getFormattedScoresSum() }}</b>
    </h3>
    <div v-for="question in chopScaleQuestions" :key="question.id">
      <div class="flex">
        <div class="flex-item break-word">
          <div>
            <b>{{ question.order + 1 }}. {{ question.name }} </b>
            <span class="ml-1">
              <el-icon v-if="chopScaleTest.questionResultExists(question.id)" color="green"><CircleCheckFilled /></el-icon>
              <el-icon v-else color="red"><WarningFilled /></el-icon>
            </span>
          </div>
          <div class="break-word">
            {{ question.description }}
            <wbr />
          </div>
        </div>
        <div class="flex-item">
          <el-divider direction="vertical" style="height: 100%" />
        </div>
        <div class="flex-item">
          <el-radio
            v-for="score in question.chopScaleQuestionScores"
            :key="score.id"
            :label="score.id"
            :model-value="chopScaleTest.getResult(score)"
            @change="chopScaleTest.setResult(question, score)"
          >
            {{ score.name }}
            <i> ({{ score.getFormattedScores() }})</i>
          </el-radio>
        </div>
      </div>
      <div>
        <el-divider />
      </div>
    </div>
    <div class="text-center">
      <el-button type="success" @click="save"
        >Сохранить, заполнено на {{ chopScaleTest.getFillingPercentage(chopScaleQuestions.length) }}%, результат: {{ chopScaleTest.getFormattedScoresSum() }}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { CircleCheckFilled, WarningFilled } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import ChopScaleTest from '@/classes/ChopScaleTest';
import DateTimeFormatter from '@/services/DateFormat';
import Provider from '@/services/Provider';
import Strings from '@/services/Strings';

export default defineComponent({
  name: 'ChopScaleForm',
  components: {
    WarningFilled,
    CircleCheckFilled,
  },
  emits: ['close'],
  props: {
    chopScaleTest: {
      type: Object as PropType<ChopScaleTest>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const mounted: Ref<boolean> = ref(false);
    const chopScaleQuestions: ComputedRef<ChopScaleQuestion[]> = computed(() => Provider.store.getters['chopScaleQuestions/items']);
    onBeforeMount(async () => {
      await Provider.store.dispatch('chopScaleQuestions/getAll');
    });

    const save = () => {
      emit('close');
    };

    return {
      save,
      Strings,
      DateTimeFormatter,
      mounted,
      chopScaleQuestions,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex {
  display: flex;

  &-item:nth-child(1) {
    flex: none;
    width: 35%;
  }
  &-item:nth-child(2) {
    flex: 1;
  }
  &-item:nth-child(3) {
    flex: 10;
  }
}

.m-2 {
  margin: 20px;
}

.ml-2 {
  margin-left: 20px;
}

.ml-1 {
  margin-left: 10px;
}
.break-word {
  //overflow-wrap: normal; /* не поддерживает IE, Firefox; является копией word-wrap */
  word-wrap: normal;
  word-break: normal; /* не поддерживает Opera12.14, значение keep-all не поддерживается IE, Chrome */
  //line-break: auto; /* нет поддержки для русского языка */
}
.text-center {
  text-align: center;
}
</style>
