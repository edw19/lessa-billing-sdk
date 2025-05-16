import { EmissionPoint } from './emision-point';
import { Establishment } from './establishment';
import { IssueDate } from './issue-date';
import { Ruc } from './ruc';
import { Sequential } from './sequential';
import { TypeEnvironment } from './type-environment';
import { TypeReceipt } from './type-receipt';

export type AccessKeyValues = {
  issueDate: string;
  typeReceipt: string;
  ruc: string;
  environment: string;
  establishment: string;
  emissionPoint: string;
  sequential: string;
  randomNumeric: string;
  typeIssue: string;
  checkDigit: string;
};

export type AccessKeyProps = {
  issueDate: {
    day: number;
    month: number;
    year: number;
  };
  typeReceipt: string;
  ruc: string;
  typeEnvironment: number;
  establishment: number;
  emissionPoint: number;
  sequential: number;
  randomNumeric?: number;
};


export class AccessKey {
  static readonly TYPE_OF_ISSUE = 1; // tipo de emision 1 = normal es el unico valor en la ficha tecnica del SRI
  static readonly ALLOWED_LENGTH = 49;

  private issueDate: IssueDate;
  private typeReceipt: TypeReceipt;
  private ruc: Ruc;
  private typeEnvironment: TypeEnvironment;
  private establishmentNumber: Establishment;
  private emissionPointNumber: EmissionPoint;
  private sequential: Sequential;
  private keyAccess: string;

  constructor(values: AccessKeyProps) {
    this.issueDate = new IssueDate(values.issueDate);
    this.typeReceipt = new TypeReceipt(values.typeReceipt);
    this.ruc = new Ruc(values.ruc);
    this.typeEnvironment = new TypeEnvironment(values.typeEnvironment);
    this.establishmentNumber = new Establishment(values.establishment);
    this.emissionPointNumber = new EmissionPoint(values.emissionPoint);
    this.sequential = new Sequential(values.sequential);

    const ka = `${this.issueDate.issueDateValue}${this.typeReceipt.typeReceiptValue}${this.ruc.rucValue}${this.typeEnvironment.typeEnvironmentValue}${this.establishmentNumber.toString()}${this.emissionPointNumber.toString()}${this.sequential.toString()}${values?.randomNumeric ?? AccessKey.ramdomNumericCode()}${AccessKey.TYPE_OF_ISSUE}`;
    this.keyAccess = `${ka}${AccessKey.generateCheckDigit(ka)}`;
    this.ensureValidLenght(this.keyAccess);
  }

  private ensureValidLenght(keyAccess: string) {
    if (keyAccess.length !== AccessKey.ALLOWED_LENGTH) {
      throw new Error('invalid length for key Access');
    }
  }

  static generateCheckDigit(keyAccess: string) {
    let sum = 0;
    let ponderado = 2;
    for (let index = 47; index > -1; index--) {
      if (ponderado > 7) {
        ponderado = 2;
      }
      sum += parseInt(keyAccess[index] as string) * ponderado;
      ponderado++;
    }
    const result = 11 - (sum % 11);
    if (result === 11) {
      return 0;
    }
    if (result === 10) {
      return 1;
    }
    return result;
  }

  static ramdomNumericCode(): number {
    const random = Math.floor(10_000_000 + Math.random() * 90_000_000);

    if (random.toString().length < 8) {
      throw new Error('Bad Random numeric for key access');
    }

    return random;
  }

  getValue() {
    return this.keyAccess;
  }

  get accessKeyValue(): string {
    return this.keyAccess;
  }

  getAccessKeyInValues() {
    return AccessKey.toObject(this.keyAccess);
  }

  static toObject(keyAccess: string): AccessKeyValues {
    return {
      issueDate: keyAccess.substring(0, 8),
      typeReceipt: keyAccess.substring(8, 10),
      ruc: keyAccess.substring(10, 23),
      environment: keyAccess.substring(23, 24),
      establishment: keyAccess.substring(24, 27),
      emissionPoint: keyAccess.substring(27, 30),
      sequential: keyAccess.substring(30, 39),
      randomNumeric: keyAccess.substring(39, 47),
      typeIssue: keyAccess.substring(47, 48),
      checkDigit: keyAccess.substring(48, 49),
    };
  }

  static getValuesFromAccessKey(keyAccess: string): AccessKeyValues {
    if (typeof keyAccess !== 'string') {
      throw new Error('primitive value for access key must be a string');
    }

    if (keyAccess === undefined || keyAccess === null || keyAccess === '') {
      throw new Error('access kye must be defined');
    }

    if (keyAccess.length !== AccessKey.ALLOWED_LENGTH) {
      throw new Error('Invalid length for access key');
    }

    return AccessKey.toObject(keyAccess);
  }
}
