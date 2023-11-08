import HmfseScaleQuestionScore from '@/classes/HmfseScaleQuestionScore';
import HmfseScaleTest from '@/classes/HmfseScaleTest';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassBuilder from '@/services/ClassBuilder';

export default class HmfseScaleTestResult {
  id?: string;
  hmfseScaleTestId?: string;
  hmfseScaleTest?: HmfseScaleTest;
  hmfseScaleQuestionScoreId?: string;
  hmfseScaleQuestionScore: HmfseScaleQuestionScore = new HmfseScaleQuestionScore();

  constructor(i?: HmfseScaleTestResult) {
    ClassBuilder.BuildPrimitives(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [];
  }
}
