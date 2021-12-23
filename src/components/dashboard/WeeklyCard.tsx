import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/lab';
import { Badge, Card, CardContent, TextField } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import * as React from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3003' });

const getDate = async (month: number | string) => {
  const res = await api.get(`/check/2021`);
  return res.data.month[month];
};

function WeeklyCard() {
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [check, setCheck] = React.useState<number[]>([]);

  React.useEffect(() => {
    getDate(new Date().getMonth()).then((data) => {
      setCheck(data);
    });
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 375,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
            onMonthChange={async (newDate) => {
              const data = await getDate(newDate!.getMonth());
              setCheck(data);
            }}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth && check.includes(day!.getDate());

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

export default WeeklyCard;
