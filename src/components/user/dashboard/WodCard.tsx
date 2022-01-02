import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

import * as React from 'react';
import { useState, useEffect } from 'react';

import { getWodInfo } from '../../../api';
import { setFullDateFormat } from '../../../util/time';

interface WodInfo {
  id: string;
  teamWod: number;
  timeCap: string;
  option: string;
  workOut: {
    buyIn: string;
    main: string[];
    buyOut: string;
  };
  hero: string;
}

function WodCard({ selectedDay }: { selectedDay: Date }) {
  const [wodInfo, setWodInfo] = useState<WodInfo | null>();

  useEffect(() => {
    getWodInfo(setFullDateFormat(selectedDay))
      .then((selectedWOD) => {
        setWodInfo(selectedWOD);
      })
      .catch(() => setWodInfo(null));
  }, [selectedDay]);

  return (
    <Card
      sx={{
        minWidth: 375,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography component="h3" variant="subtitle1" sx={{ textAlign: 'right' }}>
          {setFullDateFormat(selectedDay)}
        </Typography>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
          WOD
        </Typography>

        <Divider light sx={{ border: 2 }} />

        {wodInfo ? (
          <Box>
            <Box sx={{ my: 1 }}>
              {wodInfo.hero && (
                <Typography component="div" variant="h5" sx={{ my: 1 }}>
                  {wodInfo.hero}
                </Typography>
              )}
              <Typography component="div" variant="h6">
                {wodInfo.teamWod !== 1 && 'Team of ' + wodInfo.teamWod}
              </Typography>
              <Typography component="div" variant="h6">
                {wodInfo.option + ' ' + wodInfo.timeCap}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {wodInfo.workOut.buyIn && (
                <Typography component="div" variant="body1">
                  {wodInfo.workOut.buyIn}
                </Typography>
              )}
              {wodInfo.workOut.main.map((mov, idx) => (
                <Typography component="div" variant="h5" key={wodInfo.id + idx}>
                  {mov}
                </Typography>
              ))}
              {wodInfo.workOut.buyOut && (
                <Typography component="div" variant="body1">
                  {wodInfo.workOut.buyOut}
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Typography component="div" variant="h5" sx={{ my: 5, textAlign: 'center' }}>
            No Wod
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default WodCard;
