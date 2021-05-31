export default interface IPeriod {
  dateStart?: string;
  dateEnd?: string;

  dateStartLess: () => boolean;
}
