import type dayjs from "dayjs";

export interface DatepickerPropsSingle {
  type?: "single";
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  defaultValue?: dayjs.Dayjs;
}

export interface DatepickerPropsRange {
  type: "range";
  value?: [dayjs.Dayjs, dayjs.Dayjs];
  onChange?: (value: [dayjs.Dayjs, dayjs.Dayjs]) => void;
  defaultValue?: [dayjs.Dayjs, dayjs.Dayjs];
}

type UnionDatePickerType = DatepickerPropsSingle | DatepickerPropsRange;

interface DatePickerMainProps {
  label?: string | React.ReactNode;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  autoClose?: boolean;
  disabledDate?: (currentDate: dayjs.Dayjs) => boolean;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
}

export type DatePickerProps = DatePickerMainProps & UnionDatePickerType;
