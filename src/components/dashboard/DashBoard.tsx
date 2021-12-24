import { Grid } from '@mui/material';
import WodCard from './WodCard';
import * as React from 'react';

// import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import WeeklyCard from './WeeklyCard';
import MuscleMap from './MuscleMap';
import PersonalRecord from './PersonalRecord';

function DashBoard() {
  const matches = useMediaQuery('(min-width:824px)');
  const tes = useMediaQuery('(min-width:1200px)');

  return (
    <Grid container flex="flex" spacing={2} sx={{ p: 2 }}>
      <Grid item xs={matches ? 6 : 12}>
        <WodCard />
      </Grid>
      <Grid item xs={matches ? 6 : 12}>
        <MuscleMap />
      </Grid>
      <Grid item xs={matches ? 4 : 12} display={tes ? '' : 'none'}>
        <WeeklyCard />
      </Grid>
      <Grid item xs={tes ? 8 : 12}>
        <PersonalRecord />
      </Grid>
    </Grid>
  );
}

export default DashBoard;
