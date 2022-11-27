import { React } from 'react'
import { Locale } from "date-fns"

export interface IPaintPeriodItem {
  id: string
  line: number
  start_at: string
  end_at: string
}

export interface IEventAreaItemComponent {
  id: string
}

export interface IScheduleTreeData {
  id: string
  title?: string
  data: IScheduleTreeDate[]
}

export interface IScheduleTreeData {
  id: string
  title?: string
  data: IScheduleTreeDate[]
}

export interface IScheduleTreePlotData extends Omit<IScheduleTreeData, 'data'> {
  totalLines: number
  data: IScheduleTreePlotDate[]
}

export interface IScheduleTreeDate {
  start_at: string
  end_at: string
  datum?: unknown
}

export interface IScheduleTreePlotDate extends IScheduleTreeDate {
  line: number
  uuid: string
}

export interface IScheduleTreePlotDateEvent {
  id: string
  width: number
  datum?: unknown
  isActive: boolean
}

export interface IScheduleTreeSettings {
  checkOverlappingDate?: boolean
}

export interface IScheduleTreeProps {
  data: IScheduleTreeData[]
  template?: string | ITemplateView
  components?: IScheduleTreeComponents
  hideSidebar?: boolean
  settings?: IScheduleTreeSettings
  loading?: boolean
  onChangeRangeDates?: (start: number, end: number) => void
  locale?: Locale
}

interface IScheduleBaseProps {
  plotData: IScheduleTreePlotData[]
  eventsViewData: IScheduleTreePlotDate[]
  template?: string | ITemplateView
}

export interface IScheduleTree extends IScheduleBaseProps {
  data: IScheduleTreeData[]
  components?: {
    eventAreaItem?: (datum: IEventAreaItemComponent) => React.ReactElement
  }
}

export interface IScheduleTreeProvider extends IScheduleBaseProps {
  months: Date[]
  days: Date[]
  controls: IControls
  components?: IScheduleTreeComponents
  hideSidebar?: boolean
  locale: Locale
}

export interface IControls {
  addPreviousMonth: () => void
  addNextMonth: () => void
  scrollToToday: () => void
  setTemplate: React.Dispatch<React.SetStateAction<ITemplateView>>
  jumpToPreviousMonth: () => void
  jumpToNextMonth: () => void
}

export interface IBeforeHeaderData {
  controls: IControls
}

export interface ISlots {
  beforeHeader?: (datum: IBeforeHeaderData) => React.ReactElement
}

interface IScheduleTreeComponents {
  slots?: ISlots
  header?: {
    sidebarTop?: React.ReactElement
    renderMonth?: (date: Date, dateraw: string) => React.ReactElement
  }
  eventAreaItem?: (datum: IScheduleTreePlotDateEvent) => React.ReactElement
  sibebarItem?: (datum: IScheduleTreePlotData) => React.ReactElement
  loadingOverlay?: React.ReactElement
}

export type ITemplateView = 'day' | 'month' | 'week'

export interface IStyledTemplateDiv {
  template: string
}
