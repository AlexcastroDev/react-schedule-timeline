import React from 'react'
import * as Styled from './Loader.styles'

const Loader: React.FC = () => {
  return (
    <Styled.Container>
      <Styled.Spinner />
    </Styled.Container>
  )
}

export default Loader
