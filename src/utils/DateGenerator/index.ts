import getDaysInMonth from 'date-fns/getDaysInMonth'
import { dayInMinutes, ScheduleTreeSchemaTheme } from '../../constants'
import NumberHelper from '../NumberHelper'
import PercentualHelper from '../PercentualHelper'

export function getMonthDays(year: number, month: number): string[] {
  return new Array(getDaysInMonth(new Date(year, month - 1)))
    .fill(1)
    .map((_, key) => String(key + 1).padStart(2, '0'))
}

export const getHourPosition = (date: string) => {
  try {
    const dateString = date.split('T')[0]
    const elementStart = document.querySelector(
      `[data-item-date='${dateString}']`
    )
    const monthString = (dateString || '').split('').slice(0, 7).join('')
    const elementMonth = document.querySelector(
      `[data-header-column-date='${monthString}']`
    )

    if (!elementStart && !elementMonth) {
      return 0
    }

    const hourString = date.split('T')[1]
    const startDiff = new Date('1970-01-01T00:00:00').getTime()
    const endDiff = new Date(`1970-01-01T${hourString}`).getTime()
    const minutesPositionLeft = millisToMinutes(endDiff - startDiff)
    const percent = new PercentualHelper(minutesPositionLeft).percentOf(
      dayInMinutes
    )

    const positionLeftBase = new NumberHelper(
      ScheduleTreeSchemaTheme.size.day
    ).subtractPercent(percent).value

    const positionLeft =
      (elementStart as HTMLElement).offsetLeft +
      (elementMonth as HTMLElement).offsetLeft +
      positionLeftBase

    return positionLeft
  } catch {
    return 0
  }
}

export const getWidthBasedOnHour = (date: string) => {
  const hourString = date.split('T')[1]
  const startDiff = new Date('1970-01-01T00:00:00').getTime()
  const endDiff = new Date(`1970-01-01T${hourString}`).getTime()
  const minutesPositionLeft = millisToMinutes(endDiff - startDiff)
  const percent = new PercentualHelper(minutesPositionLeft).percentOf(
    dayInMinutes
  )

  const positionLeftBase = new NumberHelper(
    ScheduleTreeSchemaTheme.size.day
  ).subtractPercent(percent).value

  return positionLeftBase
}

export const getElementOffsetLeft = (date: string, element: Element | null) => {
  const dateString = date.split('T')[0]
  const monthString = (dateString || '').split('').slice(0, 7).join('')

  const elementMonth = document.querySelector(
    `[data-header-column-date='${monthString}']`
  )

  const hourString = date.split('T')[1]
  const startDiff = new Date('1970-01-01T00:00:00').getTime()
  const endDiff = new Date(`1970-01-01T${hourString}`).getTime()
  const minutesPositionLeft = millisToMinutes(endDiff - startDiff)
  const percent = new PercentualHelper(minutesPositionLeft).percentOf(
    dayInMinutes
  )

  const positionLeftBase = new NumberHelper(
    ScheduleTreeSchemaTheme.size.day
  ).subtractPercent(percent).value

  const positionLeft =
    (element as HTMLElement).offsetLeft +
    (elementMonth as HTMLElement).offsetLeft +
    positionLeftBase

  return positionLeft
}

export function millisToMinutes(timing: number): number {
  const minutes = Math.floor(timing / 60000)
  return minutes
}
