import React from 'react'
import { IScheduleTreeProvider } from '../interfaces'

const ScheduleTreeContext = React.createContext<IScheduleTreeProvider>(
  {} as IScheduleTreeProvider
)

export const useScheduleTreeContext = () =>
  React.useContext(ScheduleTreeContext)

export default ScheduleTreeContext
