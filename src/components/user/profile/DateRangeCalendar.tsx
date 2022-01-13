import * as React from 'react';

import { Stack, Typography } from '@mui/material';
import { DateRangePickerDay, StaticDateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { differenceInCalendarDays, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';

import useMediaQuery from '@mui/material/useMediaQuery';
import { setMMddFormat } from '../../../util/time';
import { renderDay, dateRangeStyle } from '../../../util/calendar';

interface DateRangeCalendarProps {
  startDay: Date;
  endDay: Date;
  additionalDays: number;
}

const DateRangeCalendar: React.FunctionComponent<DateRangeCalendarProps> = ({
  startDay,
  endDay,
  additionalDays = 0,
}) => {
  // React.useEffect(() => {
  //   ko!.options!.weekStartsOn = 1;
  // }, []);

  const desktop = useMediaQuery('(min-width:740px)');
  const duringDateString = `남은 회원 기간 : ${differenceInCalendarDays(endDay, new Date())} 일 `;

  return (
    <Stack sx={dateRangeStyle}>
      <Stack sx={{ px: 3, mt: 2 }}>
        <Typography component="div">
          <Typography component="span" variant="caption">
            {duringDateString}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            sx={{ backgroundColor: 'lightpink', borderRadius: 1, p: '1px' }}
          >{`연장 ${additionalDays} 일`}</Typography>
        </Typography>
        <Typography component="span" variant="h5" sx={{ my: 2 }}>
          {setMMddFormat(startDay)} – {setMMddFormat(addDays(endDay, additionalDays))}
        </Typography>
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
        <StaticDateRangePicker
          displayStaticWrapperAs={desktop ? 'desktop' : 'mobile'}
          readOnly
          value={[startDay, endDay]}
          onChange={() => {}}
          toolbarTitle={duringDateString}
          renderInput={(startProps, endProps) => <React.Fragment></React.Fragment>}
          renderDay={(date, dateRangePickerDayProps) => (
            <DateRangePickerDay
              {...dateRangePickerDayProps}
              sx={renderDay({ date, dateRangePickerDayProps, startDay, endDay, additionalDays })}
            />
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default DateRangeCalendar;
