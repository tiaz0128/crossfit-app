import { Stack, Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import React from 'react';
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
    <Card component="section" sx={{ border: 'none', boxShadow: 'none', my: 5 }}>
      <CardHeader>Membership STATS</CardHeader>
      <CardContent>
        <Typography component="h2" variant="h5" sx={{ marginBottom: 1 }}>
          Membership STATS
        </Typography>
        <Box sx={{ maxWidth: '630px' }}>
          <InfoCard />
        </Box>

        <Card sx={{ marginBottom: 2 }}>
          <DateRangeCalendar
            startDay={membershipDays[0]}
            endDay={membershipDays[1]}
            additionalDays={additionalDays}
          />
        </Card>

        <Box sx={{ marginBottom: 5 }}>
          <Typography component="h3" variant="h6" sx={{ marginBottom: 1 }}>
            Register INFO
          </Typography>
          <InfoTable rows={rows} />
        </Box>
      </CardContent>
    </Card>
  );
}
