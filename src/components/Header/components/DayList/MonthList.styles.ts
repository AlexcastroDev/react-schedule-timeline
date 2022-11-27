import styled from '@emotion/styled'
import { ScheduleTreeSchemaTheme } from '../../../../constants'

interface IContainerDefault {
  sidebar: boolean
}

export const Container = styled.div<IContainerDefault>`
  width: 100%;
  display: grid;
  position: sticky;
  top: 0;
  z-index: 1400;
  background: white;
  grid-template-columns: ${({ sidebar }) =>
    sidebar ? `${ScheduleTreeSchemaTheme.size.sidebar}px 1fr` : '1fr'};
  height: ${ScheduleTreeSchemaTheme.size.monthsHeight * 2}px;
`

export const TitleWrapper = styled.div<IContainerDefault>`
  background: white;
  position: sticky;
  z-index: 600;
  border-right: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  left: 0px;
`

export const DatesWrapper = styled.div`
  border-bottom: 1px solid #ededed;
`

export const MonthWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${ScheduleTreeSchemaTheme.size.monthsHeight}px;
`

export const MonthText = styled.div<IContainerDefault>`
  position: sticky;
  display: inline-block;
  padding-left: 16px;
  left: ${({ sidebar }) =>
    sidebar ? `${ScheduleTreeSchemaTheme.size.sidebar}px` : '0px'}};
`

export const MonthsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: ${ScheduleTreeSchemaTheme.size.monthsHeight}px;
`

export const MonthRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const MonthColumn = styled.div`
  display: flex;
  flex-direction: column;
`
