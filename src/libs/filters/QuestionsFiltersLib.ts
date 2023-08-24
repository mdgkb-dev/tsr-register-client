import FilterModel from '@/services/classes/filters/FilterModel';

const QuestionsFiltersLib = (() => {
  const modelName = 'question';
  function onlyMkbQuestions(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelWithJoinV2(modelName, 'id', 'mkbQuestionDomain', 'id', 'questionId');
    // filterModel.joinTableId = id;
    // filterModel.operator = Operators.;
    // filterModel.label = label;
    return filterModel;
  }
  return {
    onlyMkbQuestions,
  };
})();

export default QuestionsFiltersLib;
