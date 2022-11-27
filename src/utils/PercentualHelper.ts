export class PercentualHelper {
  private value: number

  constructor(initialValue: number) {
    this.value = initialValue
  }

  percentOf(anotherValue: number) {
    let result = parseFloat(((this.value / anotherValue) * 100).toFixed(2))
    result = Number.isNaN(result) ? 0 : result
    return result
  }
}

export default PercentualHelper
