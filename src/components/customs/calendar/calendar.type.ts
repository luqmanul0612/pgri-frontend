import dayjs from "dayjs";

export interface CalendarTransitionDirection {
  date: "left" | "right";
  calendar: "top" | "bottom";
}
export interface CalendarPropsSingle {
  type?: "single";
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  defaultValue?: dayjs.Dayjs;
}

export interface CalendarPropsRange {
  type?: "range";
  value?: dayjs.Dayjs[];
  onChange?: (value: dayjs.Dayjs[]) => void;
  defaultValue?: dayjs.Dayjs[];
}

export interface CalendarPropsBase {
  language?: "id" | "en";
  disabledDate?: (currentDate: dayjs.Dayjs) => boolean;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  viewDate?: ViewDate;
  onChangeViewDate?: React.Dispatch<React.SetStateAction<ViewDate>>;
  defaultViewDate?: ViewDate;
}

export type CalendarProps = (CalendarPropsSingle | CalendarPropsRange) &
  CalendarPropsBase;

export type WeekDays = string[][];
export type CalendarMonths = string[][];

export type MonthLabelProps = {
  language: "id" | "en";
  month: number;
  year: number;
  className?: string;
};

export type WeekNamesLabelProps = { language: "id" | "en"; className?: string };

export type ViewDate = {
  month: number;
  year: number;
  tempEndDate?: dayjs.Dayjs;
};
