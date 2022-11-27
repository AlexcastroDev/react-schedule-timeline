import * as Styled from './MonthList.styles'
import { getMonthDays } from '../../../../utils/DateGenerator'
import EventsWrapperDay from '../Day'
import { format } from 'date-fns'
import { useScheduleTreeContext } from '../../../../provider'

const MonthList = () => {
  const { hideSidebar, months, locale } = useScheduleTreeContext()

  return (
    <Styled.MonthRow className='block--header-month-row'>
      {new Array(months.length).fill(0).map((_, key) => {
        const year = months[key].getFullYear()
        const month = months[key].getMonth() + 1
        const monthLabel = month.toString().padStart(2, '0')
        const dateMonthJSBase = month - 1
        const getMonth = getMonthDays(year, month)

        const getMonthLabel = format(
          new Date(2022, dateMonthJSBase, 1),
          'MMMM',
          {
            locale,
          }
        )

        return (
          <Styled.MonthColumn
            data-header-column-date={`${year}-${monthLabel}`}
            key={key}
          >
            <Styled.MonthWrapper className='block--month-wrapper'>
              <Styled.MonthText sidebar={!hideSidebar}>
                {getMonthLabel}
              </Styled.MonthText>
            </Styled.MonthWrapper>
            <Styled.MonthsWrapper className='block--months-wrapper'>
              {getMonth.map((day, dayKey) => {
                return (
                  <EventsWrapperDay
                    key={dayKey}
                    date={`${year}-${month}-${day}`}
                  />
                )
              })}
            </Styled.MonthsWrapper>
          </Styled.MonthColumn>
        )
      })}
    </Styled.MonthRow>
  )
}

export default MonthList
