export class Sequential {
  static ALLOWED_LENGTH = 9;
  static MAX_VALUE = 999_999_999;
  static MIN_VALUE = 1;

  constructor(readonly value: number) {
    this.value = value;
    this.ensureValueIsDefined(value);
    this.validateMaxAndMinValue(value);
  }

  private ensureValueIsDefined(value: number) {
    if (typeof value !== 'number') {
      throw new Error('sequentail must be a number');
    }

    if (value === undefined || value === null) {
      throw new Error('sequentail must be a defined');
    }
  }

  private validateMaxAndMinValue(value: number) {
    if (value < Sequential.MIN_VALUE) {
      throw new Error(
        `got ${value}: min value for sequential is ${Sequential.MIN_VALUE}`,
      );
    }

    if (value > Sequential.MAX_VALUE) {
      throw new Error(
        `got ${value}: max value for sequential is ${Sequential.MAX_VALUE}`,
      );
    }
  }

  toString() {
    return this.value.toString().padStart(9, '0');
  }
}
