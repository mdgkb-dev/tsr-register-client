import ChopScaleQuestionScore from '@/classes/ChopScaleQuestionScore';
import ChopScaleTest from '@/classes/ChopScaleTest';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassBuilder from '@/services/ClassBuilder';

export default class ChopScaleTestResult {
  id?: string;
  chopScaleTestId?: string;
  chopScaleTest?: ChopScaleTest;
  chopScaleQuestionScoreId?: string;
  chopScaleQuestionScore: ChopScaleQuestionScore = new ChopScaleQuestionScore();

  constructor(i?: ChopScaleTestResult) {
    ClassBuilder.BuildPrimitives(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [];
  }
}
