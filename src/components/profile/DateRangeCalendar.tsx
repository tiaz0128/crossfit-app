import * as React from 'react';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';

import { ko } from 'date-fns/locale';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import useMediaQuery from '@mui/material/useMediaQuery';
import { differenceInCalendarDays, addDays } from 'date-fns';

import { DateRangePickerDay } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import format from 'date-fns/format';

export default function DateRangeCalendar({
  startDay,
  endDay,
  additionalDays,
}: {
  startDay: Date;
  endDay: Date;
  additionalDays: number;
}) {
  React.useEffect(() => {
    ko!.options!.weekStartsOn = 1;
  }, []);

  const desktop = useMediaQuery('(min-width:740px)');
  const duringDateString = `남은 회원 기간 : ${differenceInCalendarDays(endDay, new Date())} 일`;

  return (
    <Stack
      sx={{
        '& .PrivatePickersToolbar-root': {
          display: 'none',
        },
        '& div[role="presentation"]': {
          flexFlow: 'row-reverse',
        },
      }}
    >
      <Stack sx={{ px: 3, mt: 2 }}>
        <Typography component="div">
          <Typography component="span" variant="caption">
            {duringDateString} +{' '}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            sx={{ backgroundColor: 'lightpink', borderRadius: 1, p: '1px' }}
          >{`연장 ${additionalDays} 일`}</Typography>
        </Typography>
        <Typography component="span" variant="h5" sx={{ my: 2 }}>
          {format(startDay, 'MM월 dd일')} – {format(addDays(endDay, additionalDays), 'MM월 dd일')}
        </Typography>
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
        <StaticDateRangePicker
          displayStaticWrapperAs={desktop ? 'desktop' : 'mobile'}
          readOnly
          toolbarFormat="MM월 dd일"
          value={[startDay, endDay]}
          onChange={() => {}}
          toolbarTitle={duringDateString}
          renderInput={(startProps, endProps) => <React.Fragment></React.Fragment>}
          renderDay={(date, dateRangePickerDayProps) => {
            const isPastDay =
              !dateRangePickerDayProps.outsideCurrentMonth &&
              differenceInCalendarDays(date, startDay) < 0;

            const isFuture = differenceInCalendarDays(endDay, date) + additionalDays < 0;
            const isAddDays =
              differenceInCalendarDays(date, endDay) < 0 &&
              differenceInCalendarDays(date, endDay) < additionalDays;

            return (
              <DateRangePickerDay
                sx={
                  ((isPastDay || isFuture) && { color: 'gray', opacity: '0.2' }) || {
                    background: isAddDays ? '' : 'lightpink',
                  }
                }
                {...dateRangePickerDayProps}
              />
            );
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}

DateRangeCalendar.defaultProps = {
  additionalDays: 0,
};
