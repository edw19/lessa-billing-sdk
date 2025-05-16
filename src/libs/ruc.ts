import { isRUC } from "validator-ec";
export class Ruc {
  static ALLOWED_LENGTH = 13;

  constructor(private readonly value: string) {
    this.value;
    this.ensureValueIsDefined(value);
    this.ensureLengthValue(value);
    this.validateRuc(value);
  }

  private ensureValueIsDefined(value: string) {
    if (typeof value !== 'string') {
      throw new Error('primitive value for ruc must be a string');
    }

    if (value === undefined || value === null || value === '') {
      throw new Error('Ruc must be defined');
    }
  }

  private ensureLengthValue(value: string) {
    if (value.length !== Ruc.ALLOWED_LENGTH) {
      throw new Error('Bad Length for ruc value');
    }
  }

  private validateRuc(value: string): void {
    const isValid = isRUC(value);

    if (!isValid) {
      throw new Error('El RUC no es válido');
    }
  }

  get rucValue() {
    return this.value;
  }

  getValue() {
    return this.value;
  }
}
