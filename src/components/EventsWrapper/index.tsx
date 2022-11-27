import React from 'react'
import { useScheduleTreeContext } from '../../provider'
import EventWrapper from './components/Event'
import * as Styled from './EventWrapper.styles'

const EventsWrapper: React.FC = () => {
  const [lastKeyClicked, setLastKeyClicked] = React.useState<string | null>(
    null
  )
  const { plotData, hideSidebar, components } = useScheduleTreeContext()

  return (
    <Styled.Container className='block--events-wrapper'>
      {plotData &&
        plotData.map((item, key) => {
          return (
            <Styled.Item
              className='block--events-item'
              key={key}
              totalLines={item.totalLines}
            >
              {!hideSidebar && !components?.sibebarItem && (
                <Styled.Title className='block--events-item-title'>
                  {item.title}
                </Styled.Title>
              )}
              {!hideSidebar && components?.sibebarItem && (
                <Styled.Title className='block--events-item-title'>
                  {components?.sibebarItem(item)}
                </Styled.Title>
              )}

              <Styled.DatesWrapper
                className='block--event-month'
                data-item-line={key + 1}
              >
                <EventWrapper
                  item={item}
                  data={item.data}
                  setLastKeyClicked={setLastKeyClicked}
                  lastKeyClicked={lastKeyClicked}
                />
              </Styled.DatesWrapper>
            </Styled.Item>
          )
        })}
    </Styled.Container>
  )
}

export default React.memo(EventsWrapper)
