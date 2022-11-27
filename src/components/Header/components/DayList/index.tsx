import * as Styled from './MonthList.styles'
import { format } from 'date-fns'
import { useScheduleTreeContext } from '../../../../provider'
import EventsWrapperHour from '../EventsWrapperHour'

const MonthList = () => {
  const { hideSidebar, days, locale } = useScheduleTreeContext()

  return (
    <Styled.MonthRow className='block--header-month-row'>
      {days.map((currentDay, key) => {
        const year = currentDay.getFullYear()
        const month = currentDay.getMonth() + 1
        const monthLabel = month.toString().padStart(2, '0')

        const getDayLabel = format(currentDay, 'EEEE, dd MMMM', {
          locale,
        })

        return (
          <Styled.MonthColumn
            data-header-column-date={`${year}-${monthLabel}`}
            key={key}
          >
            <Styled.MonthWrapper className='block--month-wrapper'>
              <Styled.MonthText sidebar={!hideSidebar}>
                {getDayLabel}
              </Styled.MonthText>
            </Styled.MonthWrapper>
            <Styled.MonthsWrapper className='block--months-wrapper'>
              {new Array(24).fill(0).map((_, dayHour) => {
                return (
                  <EventsWrapperHour
                    key={dayHour}
                    date={`${year}-${month}-${currentDay.getDate()}`}
                    hour={dayHour}
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
