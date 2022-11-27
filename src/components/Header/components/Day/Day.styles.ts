import styled from '@emotion/styled'
import { ScheduleTreeSchemaTheme } from '../../../../constants'

export const Item = styled.div`
  box-sizing: border-box;
  min-width: ${ScheduleTreeSchemaTheme.size.day}px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
`
