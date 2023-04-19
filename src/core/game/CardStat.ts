export default class CardStat {
  private errorsCount: number = 0;
  constructor() {}
  isError(): boolean {
    return !!this.errorsCount;
  }
  getErrorsCount(): number {
    return this.errorsCount;
  }
  reset(): void {
    this.errorsCount = 0;
  }
  addError(): void {
    this.errorsCount++;
  }
  setErrors(num: number): void {
    this.errorsCount = num;
  }
}
