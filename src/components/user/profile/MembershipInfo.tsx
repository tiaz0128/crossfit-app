import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import DateRangeCalendar from './DateRangeCalendar';
import InfoCard from './InfoCard';
import InfoTable from './InfoTable';
import { rows } from './Profile';

export default function MembershipInfo({
  membershipDays,
  additionalDays,
}: {
  membershipDays: Date[];
  additionalDays: number;
}) {
  return (
    <Card component="section" sx={{ border: 'none', boxShadow: 'none', my: 3 }}>
      <CardContent>
        <Typography component="h2" variant="h5" sx={{ marginBottom: 1 }}>
          Membership STATS
        </Typography>
        <Box sx={{ maxWidth: '630px' }}>
          <InfoCard />
        </Box>

        <Card sx={{ marginBottom: 4, maxWidth: '630px' }}>
          <DateRangeCalendar
            startDay={membershipDays[0]}
            endDay={membershipDays[1]}
            additionalDays={additionalDays}
          />
        </Card>

        <Box sx={{ marginBottom: 5, maxWidth: '630px' }}>
          <Typography component="h2" variant="h5" sx={{ marginBottom: 1 }}>
            Register INFO
          </Typography>
          <InfoTable rows={rows} />
        </Box>
      </CardContent>
    </Card>
  );
}
