export class TypeReceipt {
  static ALLOWED_LENGTH = 2;
  static INVOICE_CODE = '01';
  static LIST_TYPE_RECEIPT = [TypeReceipt.INVOICE_CODE];

  constructor(private readonly value: string) {
    this.value = value;
    this.ensureValueIsDefined(value);
    this.validateLength(value);
    this.validateTypeReceipt(value);
  }

  private ensureValueIsDefined(value: string) {
    if (typeof value !== 'string') {
      throw new Error('type receipt must be a string');
    }

    if (value === undefined || value === null || value === '') {
      throw new Error('type receipt must be a defined');
    }
  }

  private validateLength(value: string) {
    if (value.length !== TypeReceipt.ALLOWED_LENGTH) {
      throw new Error('invalid length for type of receipt');
    }
  }

  private validateTypeReceipt(value: string) {
    if (!TypeReceipt.LIST_TYPE_RECEIPT.includes(value)) {
      throw new Error(`type of receipt its not support yet code: ${value} `);
    }
  }

  get typeReceiptValue() {
    return this.value;
  }
}
