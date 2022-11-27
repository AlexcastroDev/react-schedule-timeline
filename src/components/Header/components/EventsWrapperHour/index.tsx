import { format } from 'date-fns'
import React from 'react'
import { useScheduleTreeContext } from '../../../../provider'
import * as Styled from './EventsWrapperHour.styles'

interface IEventsWrapperHour {
  date: string
  hour: number
}

const EventsWrapperHour: React.FC<IEventsWrapperHour> = ({ date, hour }) => {
  const { locale } = useScheduleTreeContext()

  const minutes = [0, 15, 30, 45]
  return (
    <>
      {minutes.map((minute, key) => {
        const dateFormatted = format(
          new Date(date).setHours(hour, minute),
          'HH:mm',
          {
            locale,
          }
        )
        const dateItemLabel = `${date}T${dateFormatted}:00`
        return (
          <Styled.Item
            key={key}
            data-item-date={date}
            data-item-hour={dateItemLabel}
            className='block--events-item'
          >
            {dateFormatted}
          </Styled.Item>
        )
      })}
    </>
  )
}

export default EventsWrapperHour
