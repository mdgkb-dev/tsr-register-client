<template>
  <div>
    <SelectValueType :selected-type="question.valueType" @select="selectType" />
    <Button text="Добавить" button-class="edit-button" icon="settings" icon-class="edit-icon" @click="edit" />
  </div>

  <!-- <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="fill" /> -->
  <hr />
  <component :is="component" :question="question" />
  <ModalWindow
    v-if="questionVariantsModalOpened"
    :show="questionVariantsModalOpened"
    title="Добавить подпункты вопроса"
    @close="questionVariantsModalOpened = false"
  >
    <div v-for="variant in question.questionVariants" :key="variant.id">
      <el-input v-model="variant.name" @blur="updateVariant(variant)" />
      <Button text="Удалить" @click="removeVariant(variant.id)" />
    </div>
    <Button text="Добавить" @click="addVariant()" />

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

<style lang="scss" scoped></style>
