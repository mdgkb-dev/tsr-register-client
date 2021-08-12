export default function () {
  const filterNameMethod = (value: string, row: any) => row.human.getFullName() === value;
  const filterDateMethod = (value: string, row: any) => row.human.dateBirth === value;

  return {
    filterNameMethod,
    filterDateMethod,
  };
}
