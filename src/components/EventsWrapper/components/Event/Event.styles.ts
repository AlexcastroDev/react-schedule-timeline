import styled from '@emotion/styled'
import { ScheduleTreeSchemaTheme, dayInMinutes } from '../../../../constants'

interface IEventDiv {
  minutes: number
}

export const Event = styled.div<IEventDiv>`
  position: absolute;
  height: ${ScheduleTreeSchemaTheme.size.eventHeight}px;
  width: ${({ minutes }) =>
    (ScheduleTreeSchemaTheme.size.day / dayInMinutes) * minutes}px;
  background: white;
  box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.08);
  border-radius: 38px;
`

export const Container = styled.div`
  position: relative;
`
