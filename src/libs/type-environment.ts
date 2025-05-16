export class TypeEnvironment {
  static readonly ALLOWED_LENGTH = 1;
  static readonly PRODUCTION = 2;
  static readonly TEST = 1;
  static readonly LIST_TYPE_ENVIRONMENT = [
    TypeEnvironment.TEST,
    TypeEnvironment.PRODUCTION,
  ];

  constructor(private readonly value: number) {
    this.value = value;
    this.ensureValueIsDefined(value);
    this.validateTypeEnvironment(value);
  }

  private ensureValueIsDefined(value: number) {
    if (typeof value !== 'number') {
      throw new Error('type of environment must be a number');
    }

    if (value === undefined || value === null) {
      throw new Error('type of environment must be a defined');
    }
  }

  private validateTypeEnvironment(value: number) {
    if (!TypeEnvironment.LIST_TYPE_ENVIRONMENT.includes(value)) {
      throw new Error(
        `type of environment its not support yet code: ${value} `,
      );
    }
  }

  get typeEnvironmentValue() {
    return this.value;
  }
}
