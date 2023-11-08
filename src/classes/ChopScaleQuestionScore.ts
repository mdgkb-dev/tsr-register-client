import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassBuilder from '@/services/ClassBuilder';
import StringsService from '@/services/Strings';

export default class ChopScaleQuestionScore {
  id?: string;
  name = '';
  score = 0;
  chopScaleQuestion?: ChopScaleQuestion;
  chopScaleQuestionId?: string;

  constructor(i?: ChopScaleQuestionScore) {
    ClassBuilder.BuildPrimitives(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [];
  }

  getFormattedScores(): string {
    return StringsService.buildNameNumbersFromNumber(this.score, ['балл', 'балла', 'баллов']);
  }
}
