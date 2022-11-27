import format from 'date-fns/format'
import React from 'react'
import add from 'date-fns/add'
import sub from 'date-fns/sub'
import {
  IScheduleTreeData,
  IScheduleTreePlotData,
  IScheduleTreePlotDate,
  IScheduleTreeSettings,
  ITemplateView,
} from '../interfaces'
import previousMonday from 'date-fns/previousMonday'
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'
import { hashCode } from '../utils/hash'
import DistributeDateOverlap from '../utils/DistributeDateOverlap'
import enGB from 'date-fns/locale/en-GB'
import { Locale } from 'date-fns'

export const useSchedule = (settings?: IScheduleTreeSettings) => {
  const [months, setMonths] = React.useState<Date[]>([])
  const [days, setDays] = React.useState<Date[]>([])
  const [template, setTemplate] = React.useState<ITemplateView>('month')
  const [initialData, setInitialData] = React.useState<IScheduleTreeData[]>(
    [] as IScheduleTreeData[]
  )

  const computedLocale: Locale = React.useMemo(() => {
    return enGB
  }, [])

  const mountWeek = () => {
    const baseWeek = previousMonday(new Date())

    const previousWeek = sub(baseWeek, { weeks: 1 })
    const nextWeek = add(baseWeek, { weeks: 1 })

    setMonths([previousWeek, baseWeek, nextWeek])
  }

  const mountMonth = () => {
    const baseMonth = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-01`
    const currentMonth = new Date(baseMonth)

    setMonths([currentMonth])
  }

  const mountDailyMonth = () => {
    setDays([new Date()])
  }

  React.useEffect(() => {
    setMonths([])
    if (template === 'month') {
      mountMonth()
    }

    if (template === 'day') {
      mountDailyMonth()
    }

    if (template === 'week') {
      mountWeek()
    }
  }, [template])

  const jumpToPreviousMonth = React.useCallback(() => {
    const periodToAdd = sub(months[0], { months: 1 })

    setMonths([periodToAdd])

    setTimeout(() => {
      const currentDay = format(periodToAdd, 'yyyy-MM')
      const element = document.querySelector(
        `[data-header-column-date="${currentDay}"]`
      )

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'start',
        })
      }
    }, 200)
  }, [months])

  const jumpToNextMonth = React.useCallback(() => {
    const periodToAdd = add(months[0], { months: 1 })

    setMonths([periodToAdd])

    setTimeout(() => {
      const currentDay = format(periodToAdd, 'yyyy-MM')
      const element = document.querySelector(
        `[data-header-column-date="${currentDay}"]`
      )

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'start',
        })
      }
    }, 200)
  }, [months])

  const addPreviousMonth = React.useCallback(() => {
    const previousScroll = getPreviousDateScroll()
    if (previousScroll) {
      previousScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      })
      return
    }

    let periodToAdd: Date = new Date()

    if (template === 'day') {
      periodToAdd = sub(months[0], { days: 1 })
    }
    if (template === 'week') {
      periodToAdd = sub(months[0], { weeks: 1 })
    }

    if (template === 'month') {
      periodToAdd = sub(months[0], { months: 1 })
    }

    setMonths([periodToAdd, ...months])

    setTimeout(() => {
      const currentDay = format(periodToAdd, 'yyyy-MM')
      const element = document.querySelector(
        `[data-header-column-date="${currentDay}"]`
      )

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'start',
        })
      }
    }, 200)
  }, [months])

  const addNextMonth = React.useCallback(() => {
    const nextScroll = getNextDateScroll()
    if (nextScroll) {
      nextScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      })
      return
    }
    let periodToAdd: Date = new Date()

    if (template === 'day') {
      periodToAdd = add(months[months.length - 1], { days: 1 })
    }
    if (template === 'week') {
      periodToAdd = add(months[months.length - 1], { weeks: 1 })
    }

    if (template === 'month') {
      periodToAdd = add(months[months.length - 1], { months: 1 })
    }

    setMonths([...months, periodToAdd])

    setTimeout(() => {
      const currentDay = format(periodToAdd, 'yyyy-MM')
      const element = document.querySelector(
        `[data-header-column-date="${currentDay}"]`
      )

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'start',
        })
      }
    }, 200)
  }, [months])

  const scrollToToday = () => {
    let periodToAdd: Date = new Date()

    const currentDay = format(periodToAdd, 'yyyy-MM-dd')
    const element = document.querySelector(`[data-item-date="${currentDay}"]`)
    if (!element) {
      setMonths([periodToAdd])
    }
  }

  React.useEffect(() => {
    let periodToAdd: Date = new Date()
    const currentDay = format(periodToAdd, 'yyyy-MM-dd')
    const element = document.querySelector(`[data-item-date="${currentDay}"]`)

    setTimeout(() => {
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }, 200)
  }, [months])

  const plotData: IScheduleTreePlotData[] = React.useMemo(() => {
    return initialData.map((item, key) => {
      const currentItem = { ...item } as IScheduleTreePlotData

      const intervals = new DistributeDateOverlap(
        currentItem.data.map((item) => ({
          row: item,
          start: item.start_at,
          end: item.end_at,
        }))
      ).resultsWithISOFormat

      currentItem.data = intervals.map((item) => {
        return {
          line: item.line,
          start_at: item.start,
          end_at: item.end,
          uuid: hashCode(JSON.stringify(item.row)).toString(),
          datum: (item.row as IScheduleTreePlotDate).datum,
        } as unknown as IScheduleTreePlotDate
      })

      currentItem.totalLines =
        Math.max(...intervals.map((item) => item.line || 0)) + 1
      return currentItem as IScheduleTreePlotData
    })
  }, [initialData, settings])

  const eventsViewDataMapper = (
    periodItem: IScheduleTreePlotData,
    key: number
  ) => {
    return periodItem.data.map((periodItemData) => {
      const line = periodItemData.line + key
      return {
        start_at: periodItemData.start_at,
        end_at: periodItemData.end_at,
        uuid: periodItemData.uuid,
        id: periodItem.id + line,
        line: line,
      }
    })
  }

  const eventsViewData: IScheduleTreePlotDate[] = React.useMemo(() => {
    const localData = plotData.map(eventsViewDataMapper).flat()
    return localData
  }, [plotData])

  /*
    @startPositionLeft is the size of Nav.
  */
  const getNextDateScroll = () => {
    const startPositionLeft = 64
    let nextNodeIndex = 0
    const containers =
      Object.values(document.getElementsByClassName('block--month-wrapper')) ||
      []
    const containersSize = containers.length - 1

    for (let index = 0; index <= containersSize; index++) {
      const objectBoundDom = containers[index].getBoundingClientRect()
      const isVisible = objectBoundDom.right - startPositionLeft > 0
      if (isVisible && index < containersSize) {
        nextNodeIndex = index + 1
        break
      }
    }

    if (nextNodeIndex > 0) {
      return containers[nextNodeIndex]
    }
    return null
  }

  /*
    @startPositionLeft is the size of Nav.
  */
  const getPreviousDateScroll = () => {
    const startPositionLeft = 64
    let previousNodeIndex = 0
    const containers =
      Object.values(document.getElementsByClassName('block--month-wrapper')) ||
      []
    const containersSize = containers.length - 1

    for (let index = containersSize; index >= -1; index--) {
      if (index < 0) {
        break
      }

      const objectBoundDom = containers[index].getBoundingClientRect()

      const hasMonthBefore = objectBoundDom.right - startPositionLeft > 0

      if (hasMonthBefore) {
        previousNodeIndex = index - 1
      }
    }

    if (previousNodeIndex >= 0) {
      return containers[previousNodeIndex]
    }
    return null
  }

  return {
    setTemplate,
    addPreviousMonth,
    addNextMonth,
    setInitialData,
    scrollToToday,
    jumpToPreviousMonth,
    jumpToNextMonth,
    days,
    template,
    months,
    plotData,
    eventsViewData,
    locale: computedLocale
  }
}
