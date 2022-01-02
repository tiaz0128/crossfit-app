import { Grid } from '@mui/material';

import * as React from 'react';
import { useState, useEffect } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';

import { addWeeks } from 'date-fns';
import { getSelectedWeek, getClickedDate } from '../../util/time';

import MonthCalendar from './MonthCalendar';
import MuscleMap from './MuscleMap';
import PersonalRecord from './PersonalRecord';
import WodCard from './WodCard';
import WeekCalendar from './WeekCalendar';

function DashBoard() {
  const mobile = useMediaQuery('(min-width:824px)');
  const desktop = useMediaQuery('(min-width:1200px)');

  const today = new Date();

  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedWeek, setSelectWeek] = useState(getSelectedWeek(today));

  const handleWeek = (oneWeek: number) => {
    setSelectedDay(addWeeks(selectedDay, oneWeek));
  };

  const handleDay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSelectedDay(getClickedDate(e.currentTarget.querySelector('div') as HTMLDivElement));
  };

  useEffect(() => {
    setSelectWeek(getSelectedWeek(selectedDay));
  }, [selectedDay]);

  return (
    <Grid container flex="flex" spacing={2} sx={{ p: 2 }}>
      <Grid item xs={mobile ? 6 : 12}>
        <WeekCalendar
          selectedDay={selectedDay}
          handleDay={handleDay}
          selectedWeek={selectedWeek}
          handleWeek={handleWeek}
        />
      </Grid>

      <Grid item xs={mobile ? 6 : 12}>
        <WodCard selectedDay={selectedDay} />
      </Grid>

      <Grid item xs={mobile ? 6 : 12}>
        <MuscleMap />
      </Grid>

      <Grid item xs={mobile ? 4 : 12} display={desktop ? '' : 'none'}>
        <MonthCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </Grid>
      <Grid item xs={desktop ? 8 : 12}>
        <PersonalRecord />
      </Grid>
    </Grid>
  );
}

export default DashBoard;
