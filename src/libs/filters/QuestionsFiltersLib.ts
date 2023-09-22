import Question from '@/classes/Question';
import QuestionFilter from '@/classes/QuestionFilter';
import FilterModel from '@/services/classes/filters/FilterModel';

const QuestionsFiltersLib = (() => {
  const modelName = 'question';
  function onlyFiltersQuetions(): FilterModel {
    const filterModel = FilterModel.OnlyIfSecondModelExists(Question, QuestionFilter);
    return filterModel;
  }
  return {
    onlyFiltersQuetions,
  };
})();

export default QuestionsFiltersLib;
