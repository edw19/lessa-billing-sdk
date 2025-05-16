import { isCedula } from "validator-ec";
export class Cedula {
  public static readonly ALLOWED_LENGTH = 10;

  constructor(private readonly value: string) {
    this.value;
    this.ensureValueIsDefined(value);
    this.ensureLengthValue(value);
    this.validateIdentification(value);
  }

  private ensureValueIsDefined(value: string) {
    if (typeof value !== 'string') {
      throw new Error('primitive value for cédula must be a string');
    }

    if (value === undefined || value === null || value === '') {
      throw new Error('Cédula must be defined');
    }
  }

  private ensureLengthValue(value: string) {
    if (value.length !== Cedula.ALLOWED_LENGTH) {
      throw new Error('Bad Length for cédula value');
    }
  }

  private validateIdentification(cedula: string): void {

    const isValid = isCedula(cedula);

    if (!isValid) {
      throw new Error('La cédula no es válida');
    }

  }

  get cedulaValue() {
    return this.value;
  }
}
