/* eslint-disable react/display-name */
import dayjs from "dayjs";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";
import "./calendar.utils";
import {
  calendar,
  calendarMonths,
  calendarYears,
  checkIsDisabled,
  checkIsHoliday,
  checkIsInRange,
  checkIsSelected,
  MONTHS_EN,
  MONTHS_ID,
  WEEKDAYS_EN,
  WEEKDAYS_ID,
} from "./calendar.utils";
import "./scss/calendar.scss";
import clsx from "clsx";
import type {
  CalendarProps,
  ViewDate,
  MonthLabelProps,
  WeekNamesLabelProps,
  CalendarTransitionDirection,
} from "./calendar.type";
import { useControllableState } from "@/utils/hooks/use-controllable-state";
import ArrowLeft from "./assets/arrow-left.svg";
import ArrowRight from "./assets/arrow-right.svg";
import ArrowDown from "./assets/arrow-down.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { flushSync } from "react-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const Calendar = (props: CalendarProps) => {
  const { type = "single" } = props;
  const [viewDate, setViewDate] = useControllableState<ViewDate>({
    defaultValue: props.defaultViewDate,
    value: props.viewDate,
    onChange: props.onChangeViewDate,
  });

  const [value, setValue] = useControllableState<CalendarProps["value"]>({
    defaultValue: props.defaultValue as any,
    value: props.value as any,
    onChange: props.onChange as any,
  });
  const weeksRef = useRef(null);
  const calendarRef = useRef(null);
  const [direction, setDirection] = useState<CalendarTransitionDirection>({
    date: "right",
    calendar: "bottom",
  });
  const [calendarView, setCalendarView] = useState<"date" | "month" | "year">(
    "date"
  );
  const { month, year, tempEndDate } = viewDate as ViewDate;

  const dateNow = useMemo(() => dayjs(), []);

  const getCalendarDates = useCallback(() => {
    const date = dayjs().month(month).year(year);
    return calendar(date.month(), date.year());
  }, [month, year]);

  const renderDay = useCallback(
    () => (weekDay: number[]) => {
      const [cyear, cmonth, cdate] = weekDay;
      const currentDate = dayjs().month(cmonth).year(cyear).date(cdate);
      const viewDate = dayjs().month(month).year(year);
      const isInMonth =
        currentDate.isSame(viewDate, "month") &&
        currentDate.isSame(viewDate, "year");
      const isToday = currentDate.isSame(dateNow, "date");
      const isSelected = checkIsSelected(value, currentDate, type);
      const { isInRange, isEndDate, isStartDate } = checkIsInRange(
        value,
        currentDate,
        tempEndDate,
        type
      );
      const isHoliday = checkIsHoliday(currentDate);
      const isDisabled = checkIsDisabled(
        currentDate,
        props.disabledDate,
        props.minDate,
        props.maxDate
      );

      const onClickDate = () => {
        if (type === "single") {
          setValue(currentDate);
        } else if (type === "range") {
          const [startDate, endDate] = (value as dayjs.Dayjs[]) ?? [];
          if ((startDate && endDate) || (!startDate && !endDate)) {
            setValue([currentDate]);
            setViewDate((prev) => ({ ...prev!, tempEndDate: undefined }));
          } else {
            const isAfterStartDate = currentDate.isAfter(startDate, "date");
            setValue(
              isAfterStartDate
                ? [startDate, currentDate]
                : [currentDate, startDate]
            );
          }
        }
      };

      const onMouseEnter: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (type === "range") {
          const [startDate, endDate] = (value as dayjs.Dayjs[]) ?? [];
          if (endDate) return;
          const isSameDate = tempEndDate?.isSame(currentDate, "date");
          if (startDate?.isValid() && !endDate && !isSameDate) {
            setViewDate((prev) => ({
              ...prev!,
              tempEndDate: currentDate,
            }));
          }
        }
      };

      return (
        <div
          key={currentDate.toISOString()}
          className={clsx("calendar-daycontainer", {
            "is-in-range": isInRange && isInMonth,
            "is-start-date": isStartDate && isInMonth,
            "is-end-date": isEndDate && isInMonth,
          })}
        >
          <button
            className={clsx("calendar-daynumber", {
              "is-today": isToday,
              "is-selected": isSelected && isInMonth,
              "is-in-month": isInMonth,
              "is-in-range": isInRange && isInMonth,
              "is-holiday": isHoliday && isInMonth,
              "is-disabled": isDisabled && isInMonth,
            })}
            onMouseEnter={onMouseEnter}
            onClick={onClickDate}
            disabled={isDisabled || !isInMonth}
          >
            {currentDate.date()}
          </button>
        </div>
      );
    },
    [
      month,
      year,
      dateNow,
      type,
      value,
      setValue,
      props.minDate,
      props.maxDate,
      props.disabledDate,
      tempEndDate,
      setViewDate,
    ]
  );

  const renderCalendarDate = useCallback(() => {
    const targetDate = getCalendarDates();
    const weeksDate = targetDate.reduce(
      (acc, curr) => {
        if (acc.length) {
          const last = acc[acc.length - 1];
          if (last.length < 7) {
            last.push(curr);
            if (last.length === 7 && last.every((week) => week[1] !== month))
              acc.pop();
            return acc;
          } else {
            return [...acc, [curr]];
          }
        } else {
          return [[curr]];
        }
      },
      [] as number[][][]
    );
    return (
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={`${month}-${year}`}
          timeout={{ enter: 300, exit: 0 }}
          nodeRef={weeksRef}
          classNames={
            direction.date === "right"
              ? "calendar-slide-right"
              : "calendar-slide-left"
          }
          unmountOnExit
        >
          <div ref={weeksRef} className="calendar-weekscontainer">
            {weeksDate.map((week, idx) => (
              <div className="calendar-weekcontainer" key={idx}>
                {week.map(renderDay())}
              </div>
            ))}
          </div>
        </CSSTransition>
      </SwitchTransition>
    );
  }, [renderDay, getCalendarDates, month, year, direction.date]);

  const onChangeNavigationMonth = (type: "prev" | "next") => {
    flushSync(() => {
      const direction = { next: "right", prev: "left" };
      setDirection((prev) => ({
        ...prev,
        date: direction[type] as "right" | "left",
      }));
    });
    const { month, year } = viewDate!;
    let date = dayjs().month(month).year(year);
    if (type === "next") {
      date = date.add(1, "month");
    } else {
      date = date.subtract(1, "month");
    }
    setViewDate((prev) => ({
      ...prev,
      month: date.month(),
      year: date.year(),
    }));
  };

  const onChangeCalendarView = (type: "date" | "month" | "year") => {
    flushSync(() => {
      const order = ["date", "month", "year"];
      const curr = order.indexOf(calendarView);
      const next = order.indexOf(type);
      setDirection((prev) => ({
        ...prev,
        calendar: curr > next ? "top" : "bottom",
      }));
    });
    setCalendarView(type);
  };

  const onChangeYear = (year: number) => {
    setViewDate((prev) => ({ ...prev!, year }));
    onChangeCalendarView("month");
  };

  const onChangeMonth = (month: number) => {
    setViewDate((prev) => ({ ...prev!, month }));
    onChangeCalendarView("date");
  };

  return (
    <div className="calendar-root">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={calendarView}
          timeout={{ enter: 300, exit: 0 }}
          nodeRef={calendarRef}
          classNames={
            direction.calendar === "top"
              ? "calendar-slide-top"
              : "calendar-slide-bottom"
          }
          unmountOnExit
        >
          <div ref={calendarRef} className="calendar-date-container">
            {calendarView === "year" && (
              <CalendarYears year={year} onChange={onChangeYear} />
            )}
            {calendarView === "month" && (
              <CalendarMonths onChange={onChangeMonth} />
            )}
            {calendarView === "date" && (
              <>
                <div className="calendar-header">
                  <button
                    className="calendar-label-button"
                    onClick={() => onChangeCalendarView("year")}
                  >
                    <MonthLabel language="id" month={month} year={year} />
                    <ArrowDown className="calendar-label-button-icon" />
                  </button>
                  <div className="calendar-navigation">
                    <button
                      className="calendar-navigation-button"
                      onClick={() => onChangeNavigationMonth("prev")}
                    >
                      <ArrowLeft />
                    </button>
                    <button
                      className="calendar-navigation-button"
                      onClick={() => onChangeNavigationMonth("next")}
                    >
                      <ArrowRight />
                    </button>
                  </div>
                </div>
                <WeekNamesLabel
                  language="id"
                  className="datepicker-desktop-weeknames"
                />
                {renderCalendarDate()}
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Calendar;

export const MonthLabel: FC<MonthLabelProps> = ({
  language,
  month,
  year,
  className,
}) => {
  const MONTHS = language === "en" ? MONTHS_EN : MONTHS_ID;

  const getMonthLabel = () => {
    const date = dayjs().month(month).year(year);
    return `${MONTHS[date.month()][0]} ${date.year()}`;
  };
  return (
    <h2 className={clsx("calendar-monthlabel", className)}>
      {getMonthLabel()}
    </h2>
  );
};

export const WeekNamesLabel: FC<WeekNamesLabelProps> = ({
  language,
  className,
}) => {
  const WEEKDAYS = language === "en" ? WEEKDAYS_EN : WEEKDAYS_ID;
  const renderDayLabel = ([, shortDayLabel]: string[]) => {
    return (
      <div className="calendar-dayname" key={shortDayLabel}>
        {shortDayLabel}
      </div>
    );
  };
  return (
    <div className={clsx("calendar-weeknames", className)}>
      {WEEKDAYS.map(renderDayLabel)}
    </div>
  );
};

interface ScrollAreaYearProps {
  year: number;
  onChange: (year: number) => void;
}

const CalendarYears: FC<ScrollAreaYearProps> = ({ year, onChange }) => {
  const yearItemRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    yearItemRef.current?.scrollIntoView({
      block: "center",
    });
  }, []);
  return (
    <ScrollArea.Root className="calendar-scroll-area">
      <ScrollArea.Viewport className="calendar-scroll-area-viewport">
        <div className="calendar-year-container">
          {calendarYears().map((itemYear) => (
            <button
              key={itemYear}
              ref={year === itemYear ? yearItemRef : null}
              className={clsx("calendar-year-button", {
                active: year === itemYear,
              })}
              onClick={() => onChange(itemYear)}
              type="button"
            >
              {itemYear}
            </button>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="calendar-scroll-area-scrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="calendar-scroll-area-thumb" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

interface CalendarMonthsProps {
  onChange: (month: number) => void;
}

const CalendarMonths: FC<CalendarMonthsProps> = ({ onChange }) => {
  return (
    <div className="calendar-month-container">
      {calendarMonths().map((itemMonth, idx) => (
        <button
          key={idx}
          className="calendar-month-button"
          onClick={() => onChange(idx)}
          type="button"
        >
          {itemMonth.shortLabel}
        </button>
      ))}
    </div>
  );
};
