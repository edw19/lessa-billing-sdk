export class EmissionPoint {
  static MAX_EMISSION_POINTS_ALLOWED = 999;
  static MIN_EMISSION_POINTS_ALLOWED = 1;

  constructor(private readonly value: number) {
    this.value = value;
    this.ensureMinValue(value);
    this.ensureMaxValue(value);
  }

  ensureMaxValue(value: number) {
    if (value > EmissionPoint.MAX_EMISSION_POINTS_ALLOWED) {
      throw new Error(
        `got ${value}: exceeds the allowed value for emission points number max: ${EmissionPoint.MAX_EMISSION_POINTS_ALLOWED}`,
      );
    }
  }

  ensureMinValue(value: number) {
    if (value < EmissionPoint.MIN_EMISSION_POINTS_ALLOWED) {
      throw new Error(
        `got ${value}: minimun value for emission points is ${EmissionPoint.MIN_EMISSION_POINTS_ALLOWED}"`,
      );
    }
  }

  get emissionPointValue(): number {
    return this.value;
  }

  toString() {
    return EmissionPoint.transformPointToLabel(this.value);
  }

  static transformPointToLabel(point: number): string {
    return point.toString().padStart(3, '0');
  }

}
