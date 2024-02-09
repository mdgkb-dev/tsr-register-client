import { v4 as uuidv4 } from 'uuid';

import AnswerFile from '@/classes/AnswerFile';
import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import SelectedAnswerVariant from '@/classes/SelectedAnswerVariant';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Answer {
  id?: string;
  valueString?: string;
  valueOther?: string;
  valueNumber?: number;
  valueDate?: Date;
  @ClassHelper.GetClassConstructor(AnswerVariant)
  answerVariant?: AnswerVariant;
  answerVariantId?: string;
  order = 0;
  @ClassHelper.GetClassConstructor(SelectedAnswerVariant)
  selectedAnswerVariants: SelectedAnswerVariant[] = [];
  selectedAnswerVariantsForDelete: string[] = [];
  patientId?: string;
  questionId?: string;
  questionVariantId?: string;
  filled = false;

  researchResultId?: string;

  @ClassHelper.GetClassConstructor(AnswerFile)
  answerFiles: AnswerFile[] = [];
  answerFilesForDelete: string[] = [];

  constructor(i?: Answer) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(question: Question): Answer {
    const item = new Answer();
    item.id = uuidv4();
    item.questionId = question.id;
    item.order = question.order;
    item.valueNumber = 0;
    item.valueString = '';
    item.valueDate = new Date();
    return item;
  }

  static CreateMany(questions: Question[]): Answer[] {
    return questions.map((q: Question) => Answer.Create(q));
  }

  addFile(): AnswerFile {
    const file = new AnswerFile();
    file.id = uuidv4();
    file.answerId = this.id;
    this.answerFiles.push(file);
    return file;
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.answerFiles.forEach((af: AnswerFile) => fileInfos.push(af.fileInfo));
    return fileInfos;
  }

  getSelectedAnswerVariant(answerVariantId?: string): boolean {
    // if (registerPropWithDateId) {
    //   return this.registerPropertySetToPatient?.some(
    //     (i: RegisterPropertySetToPatient) => i.registerPropertySetId === setId && i.propWithDateId === registerPropWithDateId
    //   );
    // }
    return this.selectedAnswerVariants?.some((i: SelectedAnswerVariant) => i.answerVariantId === answerVariantId);
  }

  setSelectedAnswerVariant(selected: boolean, answerVariantId?: string): void {
    if (selected) {
      const item = SelectedAnswerVariant.Create(this.id, answerVariantId);
      // if (registerPropWithDateId) {
      //   registerPropertySetToPatient.propWithDateId = registerPropWithDateId;
      // }
      this.selectedAnswerVariants.push(item);
      return;
    }
    const findedIndex = this.selectedAnswerVariants.findIndex((v: SelectedAnswerVariant) => v.answerVariantId === answerVariantId);
    ClassHelper.RemoveFromClassByIndex(findedIndex, this.selectedAnswerVariants, this.selectedAnswerVariantsForDelete);
  }
  static GetClassName(): string {
    return 'answer';
  }
}
