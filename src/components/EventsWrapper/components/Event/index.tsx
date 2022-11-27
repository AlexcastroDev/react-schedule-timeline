import React from 'react'
import {
  IScheduleTreePlotData,
  IScheduleTreePlotDate,
} from '../../../../interfaces'
import { millisToMinutes } from '../../../../utils/DateGenerator'
import * as Styled from './Event.styles'
import { useScheduleTreeContext } from '../../../../provider'
import { dayInMinutes, ScheduleTreeSchemaTheme } from '../../../../constants'

interface IEventsWrapperDay {
  data: IScheduleTreePlotDate[]
  item: IScheduleTreePlotData
  setLastKeyClicked: React.Dispatch<React.SetStateAction<string | null>>
  lastKeyClicked: string | null
}

const EventWrapper: React.FC<IEventsWrapperDay> = ({
  data,
  item,
  setLastKeyClicked,
  lastKeyClicked,
}) => {
  const { components } = useScheduleTreeContext()
  const getEventContainer = React.useCallback(
    (event: IScheduleTreePlotDate, width: number, isActive: boolean) => {
      if (components?.eventAreaItem) {
        return (
          components?.eventAreaItem &&
          components?.eventAreaItem({
            id: item?.id,
            width,
            datum: event.datum,
            isActive,
          })
        )
      }

      return
    },
    [components, item]
  )

  return (
    <Styled.Container>
      {data.map((event, key) => {
        const start = new Date(event.start_at).getTime()
        const end = new Date(event.end_at).getTime()
        const diffInMinutes = millisToMinutes(end - start)
        const width =
          (ScheduleTreeSchemaTheme.size.day / dayInMinutes) * diffInMinutes
        const isActive =
          !!lastKeyClicked && lastKeyClicked === String(event.uuid)
        return (
          <Styled.Event
            key={key}
            className={
              isActive
                ? 'block--event-content block--event-content--active'
                : 'block--event-content'
            }
            data-event-start={event.start_at}
            data-event-end={event.end_at}
            minutes={diffInMinutes}
            data-event-type='event'
            data-event-line={event.line}
            onClick={() => setLastKeyClicked(event.uuid)}
            style={{
              zIndex: isActive ? 1300 : 900,
            }}
          >
            {getEventContainer(event, width, isActive)}
          </Styled.Event>
        )
      })}
    </Styled.Container>
  )
}

export default React.memo(EventWrapper)
