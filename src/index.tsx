import React from 'react'
import ScheduleTreeContext from './provider'
import Header from './components/Header'
import EventsWrapper from './components/EventsWrapper'
import { useSchedule } from './hooks/useScheduleTree'
import { IScheduleTreeProps, ITemplateView } from './interfaces'
import * as Styled from './ScheduleTree.styles'
import {
  getElementOffsetLeft,
  getWidthBasedOnHour,
} from './utils/DateGenerator'
import { ScheduleTreeSchemaTheme } from './constants'
import { getDistanceBetweenElements } from './utils/nodes'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import Loader from './components/Loader'

const ScheduleTree: React.FC<IScheduleTreeProps> = ({
  template: templateProp,
  onChangeRangeDates,
  components,
  data,
  hideSidebar,
  settings,
  loading = false,
}) => {
  const {
    setTemplate,
    addPreviousMonth,
    addNextMonth,
    setInitialData,
    scrollToToday,
    jumpToPreviousMonth,
    jumpToNextMonth,
    template,
    months,
    days,
    plotData,
    eventsViewData,
    locale
  } = useSchedule(settings)

  React.useEffect(() => {
    templateProp && setTemplate(templateProp as ITemplateView)
  }, [templateProp])

  React.useEffect(() => {
    data && setInitialData(data)
  }, [data])

  React.useEffect(() => {
    try {
      const start = months.at(0)
      const end = months.at(-1)
      if (start && end) {
        const startAt = new Date(start).setDate(1)
        const endAt = new Date(end).setDate(getDaysInMonth(end))
        onChangeRangeDates && onChangeRangeDates(startAt, endAt)
      }
    } catch {
      console.warn('Schedule: no range available')
    }
  }, [months])

  React.useEffect(() => {
    setTimeout(() => {
      scrollToToday()
    }, 200)
  }, [])

  React.useEffect(() => {
    const nodes = document.querySelectorAll(
      "[data-event-type='event']"
    ) as unknown as HTMLElement[]

    Object.values(nodes).map((nodeEvent) => {
      const startAttribute = nodeEvent.getAttribute('data-event-start') || ''
      const endAttribute = nodeEvent.getAttribute('data-event-end') || ''
      const nodesEvents = document.getElementsByClassName(
        'block--events-item'
      ) as unknown as HTMLElement[]

      let lineAttribute = Number(nodeEvent.getAttribute('data-event-line') || 0)

      let topPosition =
        lineAttribute *
        (ScheduleTreeSchemaTheme.size.eventHeight +
          ScheduleTreeSchemaTheme.spacing.eventLine * 2)
      topPosition = topPosition === 0 ? 8 : topPosition

      if (lineAttribute > 0) {
        const line = lineAttribute + 1
        const spacingWrapper = ScheduleTreeSchemaTheme.spacing.eventLine * line
        topPosition =
          lineAttribute * ScheduleTreeSchemaTheme.size.eventHeight +
          spacingWrapper
      }

      const startDateString = startAttribute.split('T')[0]
      const endDateString = endAttribute.split('T')[0]

      const elementStart = document.querySelector(
        `[data-item-date='${startDateString}']`
      )
      const elementEnd = document.querySelector(
        `[data-item-date='${endDateString}']`
      )

      if (elementStart && elementEnd) {
        const widthBasedHour = getWidthBasedOnHour(endAttribute)

        const spaceBetweenDivs =
          getDistanceBetweenElements(elementStart, elementEnd) + widthBasedHour

        const leftPosition = getElementOffsetLeft(startDateString, elementStart)
        nodeEvent.style.width = `${spaceBetweenDivs}px`
        nodeEvent.style.transform = `translate(${leftPosition}px, ${topPosition}px)`
        nodeEvent.style.borderRadius = '38px'
      }

      if (!elementStart && !elementEnd) {
        nodeEvent.style.display = 'none'
      } else {
        nodeEvent.style.display = 'flex'
      }

      if (!elementStart && elementEnd && nodesEvents.length > 0) {
        const spaceBetweenDivs = getDistanceBetweenElements(
          nodesEvents[0],
          elementEnd
        )
        nodeEvent.style.transform = `translate(${-2}px, ${topPosition}px)`
        nodeEvent.style.width = `${spaceBetweenDivs}px`
        nodeEvent.style.borderRadius = '0 38px 38px 0'
      }

      if (elementStart && !elementEnd) {
        const spaceBetweenDivs = getDistanceBetweenElements(
          elementStart,
          nodesEvents[nodesEvents.length - 2]
        )
        const leftPosition = getElementOffsetLeft(startDateString, elementStart)
        nodeEvent.style.width = `${
          spaceBetweenDivs + ScheduleTreeSchemaTheme.size.day
        }px`
        nodeEvent.style.transform = `translate(${leftPosition}px, ${topPosition}px)`
        nodeEvent.style.borderRadius = '38px'
        nodeEvent.style.borderRadius = '38px 0 0 38px'
      }
    })
  }, [plotData, months])

  const controls = {
    addPreviousMonth,
    addNextMonth,
    setTemplate,
    scrollToToday,
    jumpToPreviousMonth,
    jumpToNextMonth,
  }
  return (
    <ScheduleTreeContext.Provider
      value={{
        template,
        controls,
        months,
        days,
        components,
        plotData,
        eventsViewData,
        hideSidebar,
        locale
      }}
    >
      <Styled.Header>
        {components?.slots?.beforeHeader &&
          components?.slots?.beforeHeader({ controls })}
        <Styled.Container className='block--schedule-wrapper'>
          <Header />
          <EventsWrapper />
          {loading && components?.loadingOverlay && components?.loadingOverlay}
          {loading && !components?.loadingOverlay && <Loader />}
        </Styled.Container>
      </Styled.Header>
    </ScheduleTreeContext.Provider>
  )
}

export default ScheduleTree
export * from './interfaces'
