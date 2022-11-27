import * as Styled from './Header.styles'
import { useScheduleTreeContext } from '../../provider'
import MonthList from './components/MonthList'

const Header = () => {
  const { components, hideSidebar } = useScheduleTreeContext()

  return (
    <Styled.Container sidebar={!hideSidebar} className='block--header-wrapper'>
      {!hideSidebar && (
        <Styled.TitleWrapper
          sidebar={!hideSidebar}
          className='block--header-title'
        >
          {components?.header?.sidebarTop}
        </Styled.TitleWrapper>
      )}

      <Styled.DatesWrapper className='block--header-wrapper-dates'>
        <MonthList />
      </Styled.DatesWrapper>
    </Styled.Container>
  )
}

export default Header
