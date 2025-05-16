export class Establishment {
  static MAX_ESTABLISHMENTS_ALLOWED = 999;
  static MIN_ESTABLISHMENTS_ALLOWED = 1;

  constructor(private readonly value: number) {
    this.value = value;
    this.ensureMinValue(value);
    this.ensureMaxValue(value);
  }

  ensureMaxValue(value: number) {
    if (value > Establishment.MAX_ESTABLISHMENTS_ALLOWED) {
      throw new Error(
        `got ${value}: exceeds the allowed value for establishment number. max: ${Establishment.MAX_ESTABLISHMENTS_ALLOWED}`,
      );
    }
  }

  ensureMinValue(value: number) {
    if (value < Establishment.MIN_ESTABLISHMENTS_ALLOWED) {
      throw new Error(
        `got ${value}: minimun value for establishment number is ${Establishment.MIN_ESTABLISHMENTS_ALLOWED}"`,
      );
    }
  }

  get establishmentValue(): number {
    return this.value;
  }

  toString(): string {
    return Establishment.transformCodeToLabel(this.value);
  }

  static transformCodeToLabel(code: number): string {
    return code.toString().padStart(3, '0');
  }
}
