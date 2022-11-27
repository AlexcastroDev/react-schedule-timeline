import { format } from 'date-fns'
import React from 'react'
import * as Styled from './Day.styles'
import { useScheduleTreeContext } from '../../../../provider'

interface IEventsWrapperDay {
  date: string
}

const EventsWrapperDay: React.FC<IEventsWrapperDay> = ({ date }) => {
  const { components, locale } = useScheduleTreeContext()

  const dateFormatted = format(new Date(date), 'EEE, dd', {
    locale,
  })
  const dateFormattedDataItem = format(new Date(date), 'yyyy-MM-dd')

  return (
    <Styled.Item
      data-item-date={dateFormattedDataItem}
      className='block--events-item'
    >
      {components?.header?.renderMonth
        ? components?.header?.renderMonth(new Date(date), date)
        : dateFormatted}
    </Styled.Item>
  )
}

export default EventsWrapperDay
