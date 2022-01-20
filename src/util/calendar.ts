import { DateRangePickerDayProps } from '@mui/lab';
import { differenceInCalendarDays } from 'date-fns';

interface RenderDay {
  date: any;
  dateRangePickerDayProps: DateRangePickerDayProps<any>;
  startDay: Date;
  endDay: Date;
  additionalDays: number;
}

const renderDay = ({
  date,
  dateRangePickerDayProps,
  startDay,
  endDay,
  additionalDays,
}: RenderDay) => {
  const isPastDay =
    !dateRangePickerDayProps.outsideCurrentMonth && differenceInCalendarDays(date, startDay) < 0;

  const isFuture = differenceInCalendarDays(endDay, date) + additionalDays < 0;
  const isAddDays =
    differenceInCalendarDays(date, endDay) < 0 &&
    differenceInCalendarDays(date, endDay) < additionalDays;

  if (isPastDay || isFuture) return { color: 'gray', opacity: '0.2' };
  if (dateRangePickerDayProps.today)
    return {
      background: '#ffc107',
      color: '#fff',
      fontWeight: '500',
      border: '0 !important',
    };
  return { background: isAddDays ? '' : 'lightpink' };
};

const dateRangeStyle = {
  '& .PrivatePickersToolbar-root': {
    display: 'none',
  },
  '& div[role="presentation"]': {
    flexFlow: 'row-reverse',
    fontWeight: 600,
  },
  '& .MuiPickerStaticWrapper-root span:nth-of-type(7)': {
    color: 'blue',
  },
  '& .MuiPickerStaticWrapper-root span:nth-of-type(1)': {
    color: 'red',
  },
  '& .MuiPickerStaticWrapper-root button+span:nth-of-type(1)': {
    color: 'black',
    fontWeight: 600,
  },
};

export { renderDay, dateRangeStyle };
