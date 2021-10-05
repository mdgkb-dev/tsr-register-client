import IHistory from '@/interfaces/history/IHistory';

export default class History implements IHistory {
  id?: string;
  requestDate?: Date;
  requestType?: string;

  constructor(history?: IHistory) {
    if (!history) {
      return;
    }
    this.id = history.id;
    this.requestDate = history.requestDate;
    this.requestType = history.requestType;
  }
}
