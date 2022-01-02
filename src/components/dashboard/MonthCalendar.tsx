import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/lab';
import { Badge, Card, CardContent, TextField } from '@mui/material';
import { ko } from 'date-fns/locale';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import * as React from 'react';

import { getCheckDay } from '../../api';

function MonthCalendar({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (newState: Date) => void;
}) {
  const [checkDays, setCheckDays] = React.useState<number[]>([]);

  React.useEffect(() => {
    ko!.options!.weekStartsOn = 1;
    getCheckDay(selectedDay).then((data) => {
      setCheckDays(data);
    });
  }, []);

  return (
    <Card
      sx={{
        minWidth: 405,
        height: 405,
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
      }}
    >
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDay}
            onChange={(newDate) => {
              setSelectedDay(newDate as Date);
            }}
            renderInput={(params) => <TextField {...params} />}
            onMonthChange={async (newDate) => {
              try {
                const data = await getCheckDay(newDate);
                setCheckDays(data);
              } catch (e) {
                setCheckDays([]);
              }
            }}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth && checkDays.includes(day!.getDate());

              return (
                <Badge
                  key={day?.toString()}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  color="warning"
                  {...(isSelected && { variant: 'dot' })}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              );
            }}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}

export default MonthCalendar;
