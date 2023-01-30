const StringsService = (() => {
  function _capitalizeString(str: string): string {
    if (!str) {
      return '';
    }
    return str[0].toUpperCase() + str.slice(1);
  }

  const cases = [2, 0, 1, 1, 1, 2];
  function _buildNameNumbersFromNumber(num: number, titles: string[]): string {
    return num + ' ' + titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
  }

  function _buildNameNumbersFromArray(array: Array<unknown>, titles: string[]): string {
    return (
      array.length +
      ' ' +
      titles[array.length % 100 > 4 && array.length % 100 < 20 ? 2 : cases[array.length % 10 < 5 ? array.length % 10 : 5]]
    );
  }

  return {
    capitalizeString: _capitalizeString,
    buildNameNumbersFromNumber: _buildNameNumbersFromNumber,
    buildNameNumbersFromArray: _buildNameNumbersFromArray,
  };
})();

export default StringsService;
