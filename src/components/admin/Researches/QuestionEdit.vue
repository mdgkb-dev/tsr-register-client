<template>
  <div class="q-container">
    <SelectValueType :selected-type="question.valueType" @select="selectType" />
    <button v-if="question.valueType.isNumber()" class="admin-add2" @click="edit">+ Добавить варианты ответов числового вида</button>
  </div>

  <!-- <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="fill" /> -->
  <!-- <hr /> -->
  <component :is="component" :question="question" />
  <ModalWindow
    v-if="questionVariantsModalOpened"
    :show="questionVariantsModalOpened"
    title="Варианты ответов числового вида"
    @close="questionVariantsModalOpened = false"
  >
    <div class="tools-buttons">
      <button class="admin-add" @click="addVariant()">+ Добавить</button>
    </div>
    <div v-for="(variant, i) in question.questionVariants" :key="variant.id" class="container">
      <button class="admin-del" @click="removeVariant(variant.id)">Удалить</button>
      <div class="list-number">
        {{ i + 1 }}
      </div>
      <el-input v-model="variant.name" @focus.stop @blur="updateVariant(variant)" />
    </div>
    <!-- <SessionConstructor :start-time="selectedSession" :session="selectedSession" @close="showEditSessionModal = false" /> -->
    <!-- <Button button-class="del-button" text="Удалить" @click="removeSession" /> -->
  </ModalWindow>
</template>

<script setup lang="ts">
import Question from '@/classes/Question';
import DatePropEdit from '@/components/admin/Researches/DatePropEdit.vue';
import NumberPropEdit from '@/components/admin/Researches/NumberPropEdit.vue';
import RadioPropEdit from '@/components/admin/Researches/RadioPropEdit.vue';
import SetPropEdit from '@/components/admin/Researches/SetPropEdit.vue';
import StringPropEdit from '@/components/admin/Researches/StringPropEdit.vue';

const questionVariantsModalOpened = ref(false);

const edit = () => {
  questionVariantsModalOpened.value = true;
};

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
});

const valueType: Ref<ValueType> = Store.Item('valueTypes');

const selectType = async (itemName: string) => {
  await Store.Get('valueTypes', itemName);
  props.question.setType(valueType.value);
  await Store.Update('questions', props.question);
};

const components = {
  num: NumberPropEdit,
  string: StringPropEdit,
  radio: RadioPropEdit,
  set: SetPropEdit,
  date: DatePropEdit,
};
const component = computed(() => {
  console.log(props.question);
  if (props.question.valueType.isNumber()) {
    return components['num'];
  }
  if (props.question.valueType.isRadio()) {
    return components['radio'];
  }
  if (props.question.valueType.isString()) {
    return components['string'];
  }
  if (props.question.valueType.isDate()) {
    return components['date'];
  }
  if (props.question.valueType.isSet()) {
    return components['set'];
  }
  return 'no';
});

const updateVariant = async (item: QuestionVariant) => {
  sort(props.question.questionVariants);
  await Store.Update('questionVariants', item);
};

const removeVariant = async (id: string) => {
  ClassHelper.RemoveFromClassById(id, props.question.questionVariants);
  sort(props.question.questionVariants);
  await Store.Remove('questionVariants', id);
};

const addVariant = async () => {
  const item = props.question.addQuestionVariant();
  sort(props.question.questionVariants);
  await Store.Create('questionVariants', item);
};
</script>

<style lang="scss" scoped>
.q-container {
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 0 0px;
}

.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  margin: 10px;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
}

.admin-add2 {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add2:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.admin-del {
  position: absolute;
  top: 10px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.container {
  position: relative;
  width: calc(100% - 62px);
  margin: 0px 20px 20px 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 40px 10px 10px 10px;
  background: #dff2f8;
}

.list-number {
  position: absolute;
  top: 7px;
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
}
</style>
