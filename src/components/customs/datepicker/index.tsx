import { useCallback, useMemo, useState, type FC } from "react";
import { PatternFormat, type NumberFormatValues } from "react-number-format";
import TextField from "../textfield";
import "./datepicker.scss";
import dayjs from "dayjs";
import * as Popover from "@radix-ui/react-popover";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Calendar from "../calendar";
import { useControllableState } from "@/utils/hooks/use-controllable-state";
import CalendarIcon from "./assets/calendar.svg";
import type {
  DatePickerProps,
  DatepickerPropsRange,
  DatepickerPropsSingle,
} from "./datepicker.type";
dayjs.extend(customParseFormat);

const Datepicker: FC<DatePickerProps> = (props) => {
  const { type = "single", autoClose = true } = props;
  const [internalError, setInternalError] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useControllableState<DatePickerProps["value"]>({
    defaultValue: props.defaultValue as any,
    value: props.value as any,
    onChange: props.onChange as any,
  });

  const getInputValue = useCallback(() => {
    if (type === "single" && value)
      return dayjs(value as dayjs.Dayjs).format("DD/MM/YYYY");
    if (type === "range" && value) {
      const [startDate, endDate] = value as [dayjs.Dayjs, dayjs.Dayjs];
      return `${startDate ? dayjs(startDate).format("DD/MM/YYYY") : ""} - ${
        endDate ? dayjs(endDate).format("DD/MM/YYYY") : ""
      }`;
    }
    return "";
  }, [value, type]);

  const handleValueChange = useCallback(
    ({ formattedValue }: NumberFormatValues) => {
      if (type === "single" && formattedValue.length === 10) {
        const isValid = dayjs(formattedValue, "DD/MM/YYYY", true).isValid();
        if (isValid) {
          (setValue as DatepickerPropsSingle["onChange"])?.(
            dayjs(formattedValue, "DD/MM/YYYY")
          );
          setInternalError("");
          return;
        }
      } else if (type === "range" && formattedValue.length === 23) {
        const [startDate, endDate] = formattedValue.split(" - ");
        const isValid =
          dayjs(startDate, "DD/MM/YYYY", true).isValid() &&
          dayjs(endDate, "DD/MM/YYYY", true).isValid();
        if (isValid) {
          const rangeValue = [];
          if (startDate) rangeValue.push(dayjs(startDate, "DD/MM/YYYY"));
          if (endDate) rangeValue.push(dayjs(endDate, "DD/MM/YYYY"));
          (setValue as DatepickerPropsRange["onChange"])?.(
            rangeValue as [dayjs.Dayjs, dayjs.Dayjs]
          );
          setInternalError("");
          return;
        }
      }
      setInternalError("Invalid date format");
    },
    [type, setValue]
  );

  const defaultValueViewDate = useMemo(() => {
    let month = dayjs().month();
    let year = dayjs().year();
    if (type === "single" && value) {
      const date = value as dayjs.Dayjs;
      if (date.isValid()) {
        month = date.month();
        year = date.year();
      }
    } else if (type === "range") {
      const dates = (value as [dayjs.Dayjs, dayjs.Dayjs]) ?? [];
      if (dates?.length > 1) {
        const date = dates[0] || dates[1];
        month = date.month();
        year = date.year();
      }
    }
    return { month, year };
  }, [value, type]);

  const onChangeDate = (date: dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) => {
    setValue(date);
    const validDate =
      (type === "range" && (date as [dayjs.Dayjs, dayjs.Dayjs]).length === 2) ||
      type === "single";
    if (autoClose && validDate) {
      setOpen(false);
    }
  };

  return (
    <>
      <PatternFormat
        label={props.label}
        format={type === "single" ? "##/##/####" : "##/##/#### - ##/##/####"}
        error={!!internalError || props.error}
        value={getInputValue()}
        onValueChange={handleValueChange}
        helperText={internalError ?? props.helperText}
        placeholder={
          (props.placeholder ?? type === "single")
            ? "DD/MM/YYYY"
            : "DD/MM/YYYY - DD/MM/YYYY"
        }
        endIcon={
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button
                type="button"
                className="datepicker-button"
                onClick={() => setOpen((open) => !open)}
              >
                <CalendarIcon />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="datepicker-popover-content"
                sideOffset={5}
              >
                <Calendar
                  language="id"
                  type={type as any}
                  value={value as any}
                  onChange={onChangeDate}
                  defaultViewDate={defaultValueViewDate}
                  maxDate={props.maxDate}
                  minDate={props.minDate}
                  disabledDate={props.disabledDate}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        }
        customInput={TextField}
      />
    </>
  );
};

export default Datepicker;
