import IColorPercentile from '@/interfaces/shared/IColorPercentile';

export default class ColorPercentile implements IColorPercentile {
  color = '';
  textColor = 'white';
  percentiles = '';
  recomendation = '';

  constructor(colorPercentile?: IColorPercentile) {
    if (!colorPercentile) {
      return;
    }
    this.color = colorPercentile.color;
    this.percentiles = colorPercentile.percentiles;
    this.recomendation = colorPercentile.recomendation;
    if (this.color === 'yellow' || this.color === 'lightGreen') {
      this.textColor = 'black';
    }
  }
}
