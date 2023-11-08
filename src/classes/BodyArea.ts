export default abstract class BodyArea {
  static Mosteller(weight: number, height: number): number {
    return 0.0167 * Math.pow(weight, 0.5) * Math.pow(height, 0.5);
  }
  static DuBois(weight: number, height: number): number {
    return 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
  }
  static Haycock(weight: number, height: number): number {
    return 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964);
  }

  static GetNormForAge(ageInMonths: number, isMale: boolean): number {
    switch (true) {
      case ageInMonths < 24:
        return 0.5;
      case ageInMonths < 108:
        return 1.07;
      case ageInMonths < 120:
        return 1.14;
      case ageInMonths <= 156:
        return 1.33;
      default:
        return isMale ? 1.9 : 1.6;
    }
  }
}
