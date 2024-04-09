import HmfseScaleQuestion from '@/classes/HmfseScaleQuestion';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassBuilder from '@/services/ClassBuilder';
import Strings from '@/services/Strings';

export default class HmfseScaleQuestionScore {
  id?: string;
  name = '';
  score = 0;
  hmfseScaleQuestion?: HmfseScaleQuestion;
  hmfseScaleQuestionId?: string;

  constructor(i?: HmfseScaleQuestionScore) {
    ClassBuilder.BuildPrimitives(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [];
  }
// TODO
  // getFormattedScores(): string {
  //   return Strings.BuildNameNumbersFromNumber(this.score, ['балл', 'балла', 'баллов']);
  // }
}
