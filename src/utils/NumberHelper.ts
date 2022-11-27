class NumberHelper {
  public initValue: number
  private finalValue = 0

  constructor(value: number) {
    this.initValue = value
    this.finalValue = value
  }

  addPercent(value: number) {
    const percent = (value / 100) * this.finalValue

    let newValue = Number((this.finalValue + percent).toFixed(2))

    newValue = !Number.isNaN(newValue) ? newValue : 0
    this.finalValue = newValue

    return this
  }

  subtractPercent(value: number) {
    let newValue = this.finalValue * (value / 100)
    newValue = !Number.isNaN(newValue) ? newValue : 0
    this.finalValue = Number(newValue.toFixed(2))

    return this
  }

  addValue(value: number) {
    let newValue = this.finalValue + value

    newValue = Number(newValue.toFixed(2))
    newValue = !Number.isNaN(newValue) ? newValue : 0
    this.finalValue = newValue
    return this
  }

  withDays(days: number) {
    let newValue = Number((this.finalValue * days).toFixed(2))

    newValue = !Number.isNaN(newValue) ? newValue : 0
    this.finalValue = newValue

    return this
  }

  multiply(value: number) {
    this.withDays(value)

    return this
  }

  divide(value: number) {
    let newValue = Number((this.finalValue / value).toFixed(2))

    newValue = !Number.isNaN(newValue) ? newValue : 0
    this.finalValue = newValue

    return this
  }

  withoutDays(days: number) {
    let newValue = Number((this.finalValue / days).toFixed(2))

    newValue = !Number.isNaN(newValue) ? newValue : 0
    this.finalValue = newValue

    return this
  }

  get value() {
    return this.finalValue
  }
}

export default NumberHelper
