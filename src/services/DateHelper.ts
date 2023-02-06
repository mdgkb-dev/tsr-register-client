export default class DateHelper {
  locale = 'ru-RU';

  constructor(locale?: string) {
    this.locale = locale ?? this.locale;
  }

  static DateDiff(startingDate: string, endingDate: string): string {
    let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    let endDate = new Date(endingDate);
    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    const startYear = startDate.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    return yearDiff + 'г., ' + monthDiff + 'м., ' + dayDiff + 'д.';
  }

  static GetMonthsDiff(date1: Date, date2: Date): number {
    let age = date2.getFullYear() - date1.getFullYear();
    const m = date2.getMonth() - date1.getMonth();
    age = age * 12 + m;
    return age;
  }
}
