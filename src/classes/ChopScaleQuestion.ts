import ChopScaleQuestionScore from '@/classes/ChopScaleQuestionScore';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IRegion from '@/interfaces/IRegion';
import ClassBuilder from '@/services/ClassBuilder';

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
