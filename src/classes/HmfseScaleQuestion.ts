import HmfseScaleQuestionScore from '@/classes/HmfseScaleQuestionScore';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IRegion from '@/interfaces/IRegion';
import ClassBuilder from '@/services/ClassBuilder';

export default class HmfseScaleQuestion {
  id?: string;
  name = '';
  order = 0;
  description = '';
  comment = '';
  @ClassBuilder.GetClassConstructorForArray(HmfseScaleQuestionScore)
  hmfseScaleQuestionScores: HmfseScaleQuestionScore[] = [];

  constructor(i?: IRegion) {
    ClassBuilder.BuildPrimitives(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [];
  }
}
