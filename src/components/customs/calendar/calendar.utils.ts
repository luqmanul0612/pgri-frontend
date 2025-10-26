import dayjs from "dayjs";
import type { CalendarMonths, CalendarProps, WeekDays } from "./calendar.type";

export const MIN_YEAR = 1900;
export const MAX_YEAR = 2999;
export const THIS_YEAR = +dayjs().year();
export const THIS_MONTH = +dayjs().month();
export const CALENDAR_WEEKS = 6;

export const WEEKDAYS_ID: WeekDays = [
  ["Minggu", "Min"],
  ["Senin", "Sen"],
  ["Selasa", "Sel"],
  ["Rabu", "Rab"],
  ["Kamis", "Kam"],
  ["Jumat", "Jum"],
  ["Sabtu", "Sab"],
];

export const MONTHS_ID: CalendarMonths = [
  ["Januari", "Jan"],
  ["Februari", "Feb"],
  ["Maret", "Mar"],
  ["April", "Apr"],
  ["Mei", "Mei"],
  ["Juni", "Jun"],
  ["Juli", "Jul"],
  ["Agustus", "Agu"],
  ["September", "Sep"],
  ["Oktober", "Okt"],
  ["November", "Nov"],
  ["Desember", "Des"],
];

export const WEEKDAYS_EN: WeekDays = [
  ["Sunday", "Sun"],
  ["Monday", "Mon"],
  ["Tuesday", "Tue"],
  ["Wednesday", "Wed"],
  ["Thursday", "Thu"],
  ["Friday", "Fri"],
  ["Saturday", "Sat"],
];

export const MONTHS_EN: CalendarMonths = [
  ["January", "Jan"],
  ["February", "Feb"],
  ["March", "Mar"],
  ["April", "Apr"],
  ["May", "May"],
  ["June", "Jun"],
  ["July", "Jul"],
  ["August", "Aug"],
  ["September", "Sep"],
  ["October", "Oct"],
  ["November", "Nov"],
  ["December", "Dec"],
];

export const calendarYears = () => {
  const years = Array.from({ length: 200 }).map((_, idx) => idx + 1900);
  return years;
};

export const calendarMonths = () => {
  const months = MONTHS_ID.map((item) => ({
    label: item[0],
    shortLabel: item[1],
  }));
  return months;
};

export const checkIsInRange = (
  value?: CalendarProps["value"],
  currentDate?: dayjs.Dayjs,
  tempEndDate?: dayjs.Dayjs,
  type?: CalendarProps["type"]
) => {
  if (type === "range") {
    const [date1, date2] = (value as dayjs.Dayjs[]) ?? [];
    let startDate = date1;
    let endDate = date2 || tempEndDate;
    if (startDate && endDate && currentDate) {
      let tempSwipeDate = undefined;
      if (startDate.isAfter(endDate, "date")) {
        tempSwipeDate = startDate;
        startDate = endDate;
        endDate = tempSwipeDate;
      }
      const isInRange =
        currentDate.isAfter(startDate, "date") &&
        currentDate.isBefore(endDate, "date");
      const isSameDate = startDate?.isSame(endDate, "date");
      return {
        isInRange,
        isStartDate:
          date2 && currentDate.isSame(startDate, "date") && !isSameDate,
        isEndDate: date2 && currentDate.isSame(endDate, "date") && !isSameDate,
      };
    }
  }
  return {
    isInRange: false,
    isStartDate: false,
    isEndDate: false,
  };
};

export const checkIsSelected = (
  value: CalendarProps["value"],
  currentDate: dayjs.Dayjs,
  type: CalendarProps["type"]
) => {
  if (!value) return false;
  if (type === "single") {
    return currentDate.isSame(value as dayjs.Dayjs, "date");
  } else {
    const [startDate, endDate] = (value as dayjs.Dayjs[]) ?? [];
    return (
      startDate?.isSame(currentDate, "date") ||
      endDate?.isSame(currentDate, "date")
    );
  }
};

export const checkIsHoliday = (currentDate: dayjs.Dayjs) => {
  const isSunday = currentDate.day() === 0;
  return isSunday;
};

export const checkIsDisabled = (
  currentDate: dayjs.Dayjs,
  disabledDate?: (currentDate: dayjs.Dayjs) => boolean,
  minDate?: dayjs.Dayjs,
  maxDate?: dayjs.Dayjs
) => {
  const min = minDate ? currentDate.isBefore(minDate, "date") : false;
  const max = maxDate ? currentDate.isAfter(maxDate, "date") : false;
  return disabledDate?.(currentDate) || min || max;
};

export const calendar = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = dayjs().month(month).year(year).daysInMonth();
  const daysFromPrevMonth = dayjs()
    .month(month)
    .year(year)
    .startOf("month")
    .day();
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const prevMonth = dayjs().month(month).year(year).add(-1, "month");
  const nextMonth = dayjs().month(month).year(year).add(1, "month");

  const prevMonthDays = dayjs()
    .month(prevMonth.month())
    .year(prevMonth.year())
    .daysInMonth();

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((_, index) => {
    const date = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonth.year(), prevMonth.month(), date];
  });

  const thisMonthDates = [...new Array(monthDays)].map((_, index) => {
    const date = index + 1;
    return [year, month, date];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((_, index) => {
    const date = index + 1;
    return [nextMonth.year(), nextMonth.month(), date];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
