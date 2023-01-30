import IRegion from '@/interfaces/IRegion';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassBuilder from '@/services/ClassBuilder';
import ChopScaleQuestionScore from '@/classes/ChopScaleQuestionScore';

export default class ChopScaleQuestion {
  id?: string;
  name = '';
  order = 0;
  description = '';
  comment = '';
  @ClassBuilder.GetClassConstructorForArray(ChopScaleQuestionScore)
  chopScaleQuestionScores: ChopScaleQuestionScore[] = [];

  constructor(i?: IRegion) {
    ClassBuilder.BuildPrimitives(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [];
  }
}
