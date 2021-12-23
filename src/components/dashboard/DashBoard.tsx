import { Grid } from '@mui/material';
import WodCard from './WodCard';
import * as React from 'react';

// import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import WeeklyCard from './WeeklyCard';

function DashBoard() {
  const matches = useMediaQuery('(min-width:850px)');

  return (
    <Grid container flex="flex" spacing={2}>
      <Grid item xs={matches ? 6 : 12}>
        <WodCard />
      </Grid>
      <Grid item xs={matches ? 6 : 12}>
        <WeeklyCard />
      </Grid>
    </Grid>
  );
}

export default DashBoard;
