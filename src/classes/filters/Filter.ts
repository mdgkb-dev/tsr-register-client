export default class Filter {
  filterNameMethod = (value: string, row: any) => row.human.getFullName() === value;
  filterDateMethod = (value: string, row: any) => row.human.dateBirth === value;
}
