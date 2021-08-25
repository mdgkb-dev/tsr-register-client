import moment from 'moment';

export default interface IToUtcDateMethods {
  getMonth?: () => number;
  parseZone?: () => moment.Moment;
}
