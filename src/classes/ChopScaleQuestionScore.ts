import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassBuilder from '@/services/ClassBuilder';
import Strings from '@/services/Strings';

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
// TODO
  // getFormattedScores(): string {
    
    // return Strings.BuildNameNumbersFromNumber(this.score, ['балл', 'балла', 'баллов']);
  // }
}
