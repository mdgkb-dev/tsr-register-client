<template>
  <div class="m-2">
    <h3>
      Тест от {{ $dateTimeFormatter.format(hmfseScaleTest.date) }} - <b>{{ hmfseScaleTest.getFormattedScoresSum() }}</b>
    </h3>
    <div v-for="question in hmfseScaleQuestions" :key="question.id">
      <div class="flex">
        <div class="flex-item break-word">
          <div>
            <b>{{ question.order + 1 }}. {{ question.name }} </b>
            <span class="ml-1">
              <el-icon v-if="hmfseScaleTest.questionResultExists(question.id)" color="green"><CircleCheckFilled /></el-icon>
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
            v-for="score in question.hmfseScaleQuestionScores"
            :key="score.id"
            :label="score.id"
            :model-value="hmfseScaleTest.getResult(score)"
            @change="hmfseScaleTest.setResult(question, score)"
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
        >Сохранить, заполнено на {{ hmfseScaleTest.getFillingPercentage(hmfseScaleQuestions.length) }}%, результат:
        {{ hmfseScaleTest.getFormattedScoresSum() }}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { CircleCheckFilled, WarningFilled } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import HmfseScaleQuestion from '@/classes/HmfseScaleQuestion';
import HmfseScaleTest from '@/classes/HmfseScaleTest';
import DateTimeFormatter from '@/services/DateFormat';
import Provider from '@/services/Provider';
import StringsService from '@/services/Strings';

export default defineComponent({
  name: 'HmfseScaleForm',
  components: {
    WarningFilled,
    CircleCheckFilled,
  },
  emits: ['close'],
  props: {
    hmfseScaleTest: {
      type: Object as PropType<HmfseScaleTest>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const mounted: Ref<boolean> = ref(false);
    const hmfseScaleQuestions: ComputedRef<HmfseScaleQuestion[]> = computed(() => Provider.store.getters['hmfseScaleQuestions/items']);
    onBeforeMount(async () => {
      await Provider.store.dispatch('hmfseScaleQuestions/getAll');
    });

    const save = () => {
      emit('close');
    };

    return {
      save,
      StringsService,
      DateTimeFormatter,
      mounted,
      hmfseScaleQuestions,
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
