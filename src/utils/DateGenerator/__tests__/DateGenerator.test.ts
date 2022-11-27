import { getMonthDays } from '..'

describe('Date Generators', () => {
  it('should generate a array of integer', () => {
    expect(getMonthDays(2022, 11).length).toEqual(30)
  })
})
