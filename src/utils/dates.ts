import { format, utcToZonedTime } from 'date-fns-tz'
import { differenceInDays } from 'date-fns'

export const formatInTimeZone = (
  date: Date,
  fmt = 'yyyy-MM-dd kk:mm:ss xxx',
  tz = 'UTC'
) => format(utcToZonedTime(date, tz), fmt, { timeZone: tz })

export const formatDateUTC = (date: Date | string | null): Date | null => {
  try {
    let localDate = date as Date

    if (typeof date === 'object') {
      return null
    }

    if (typeof date === 'string') {
      localDate = new Date(date)
    }

    const day = String(localDate.getUTCDate()).padStart(2, '0')
    const month = localDate
      .toLocaleString('en-GB', { month: 'numeric', timeZone: 'UTC' })
      .padStart(2, '0')
    const year = localDate.getFullYear()

    return new Date(`${year}-${month}-${day}T00:00:00`)
  } catch (e) {
    return new Date()
  }
}

export const getDefaultFormatDate = (
  date: string | Date | undefined | null
): string => {
  try {
    let localDate = date as Date

    if (typeof date === 'string') {
      localDate = new Date(date)
    }

    return format(localDate, 'yyyy-MM-dd')
  } catch {
    return ''
  }
}

export const getStartAndEndTime = (
  startProps: string | Date | undefined,
  endProps: string | Date | undefined
) => {
  let start_at = null as Date | null
  let end_at = null as Date | null
  let days = 0

  try {
    if (startProps) {
      start_at = formatDateUTC(String(startProps))
    }

    if (endProps) {
      end_at = formatDateUTC(String(endProps))
    }

    if (start_at && end_at) {
      days = differenceInDays(end_at, start_at) + 1
    }

    return {
      startAt: start_at,
      endAt: end_at,
      days: days,
    }
  } catch {
    return {
      startAt: start_at,
      endAt: end_at,
      days: days,
    }
  }
}
