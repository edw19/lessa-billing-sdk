export class IssueDate {
  static ALLOWED_LENGTH = 8;
  private day: number;
  private month: number;
  private year: number;
  private issuedate: string;

  constructor(values: { day: number; month: number; year: number }) {
    this.ensureValuesAreDefined(values);
    this.day = values.day;
    this.month = values.month;
    this.year = values.year;

    this.validateDay(this.day);
    this.validateMonth(this.month);
    this.validateYear(this.year);

    this.issuedate = `${this.day.toString().padStart(2, '0')}${this.month.toString().padStart(2, '0')}${this.year.toString()}`;
    this.validateLength(this.issuedate);
  }

  private validateDay(value: number) {
    if (value < 1 || value > 31) {
      throw new Error('Invalid day for issue date');
    }
  }

  private validateMonth(value: number) {
    if (value < 1 || value > 12) {
      throw new Error('Invalid month for issue date');
    }
  }
  private validateYear(value: number) {
    if (value.toString().length !== 4) {
      throw new Error('Invalid year for issue date');
    }
  }

  private ensureValuesAreDefined(values: {
    day: number;
    month: number;
    year: number;
  }) {
    if (
      values?.day === undefined ||
      values?.month === undefined ||
      values?.year === undefined
    ) {
      throw new Error('day, month and year must be defined');
    }

    for (const [key, value] of Object.entries(values)) {
      if (typeof value !== 'number') {
        throw new Error(`${key} must be a number`);
      }

      if (value === undefined || value === null) {
        throw new Error(`${key} must be defined defined`);
      }
    }
  }

  private validateLength(value: string) {
    if (value.length !== IssueDate.ALLOWED_LENGTH) {
      throw new Error('invalid length for issue date');
    }
  }

  get issueDateValue(): string {
    return this.issuedate;
  }
}
