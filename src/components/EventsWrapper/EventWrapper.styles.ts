import styled from '@emotion/styled'
import { ScheduleTreeSchemaTheme } from '../../constants'

interface IItemDiv {
  totalLines: number
}

export const Container = styled.div``

export const Item = styled.div<IItemDiv>`
  width: 100%;
  background: white;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  height: ${({ totalLines }) => {
    const eventLineHeight =
      totalLines * ScheduleTreeSchemaTheme.size.eventHeight
    const eventLineSpacing =
      totalLines * ScheduleTreeSchemaTheme.spacing.eventLine +
      ScheduleTreeSchemaTheme.spacing.eventLine
    return `${eventLineHeight + eventLineSpacing}px`
  }};
`

export const Title = styled.div`
  background: white;
  position: sticky;
  left: ${ScheduleTreeSchemaTheme.sticky.sidebar}px;
  z-index: 1100;
  border-bottom: 1px solid #ededed;
  border-right: 1px solid #ededed;
`

export const DatesWrapper = styled.div`
  display: flex;
`
