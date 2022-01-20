import React from 'react';
import { Container, Stack } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { differenceInCalendarDays } from 'date-fns';

import MemberInfo from './MemberInfo';
import MembershipInfo from './MembershipInfo';

interface InfoDays {
  id: string;
  member: string | null;
  kind: string;
  startDay: Date;
  endDay: Date;
}

function createData(
  id: string,
  member: string | null,
  kind: string,
  startDay: Date,
  endDay: Date
): InfoDays {
  return { id, member, kind, startDay, endDay };
}

export const rows: InfoDays[] = [
  createData('20211231001', '01012345678', '연장', new Date('2021-12-31'), new Date('2022-01-04')),
  createData('20211214001', null, '휴관', new Date('2021-12-14'), new Date('2021-12-15')),
  createData('20211201001', '01012345678', '등록', new Date('2021-11-12'), new Date('2022-01-31')),
];

interface ProfileProps {}

const Profile: React.FunctionComponent<ProfileProps> = () => {
  const screenSize = useMediaQuery('(min-width:600px)');

  const [membershipDays, setMembershipDays] = React.useState<Date[]>([new Date(), new Date()]);
  const [additionalDays, setAdditionalDays] = React.useState<number>(0);

  React.useEffect(() => {
    const len = rows.length - 1;
    const calculatedDays = rows.reduce((prev, next, idx) => {
      if (len === idx) return prev;
      return prev + differenceInCalendarDays(next.endDay, next.startDay);
    }, 0);

    setMembershipDays([rows[2].startDay, rows[2].endDay]);
    setAdditionalDays(calculatedDays);
  }, []);

  return (
    <Container component="main" sx={{ p: screenSize ? 3 : 1 }}>
      <Stack component="div" direction="column">
        <MemberInfo mobile={screenSize} enableEdit={true} />
        <MembershipInfo membershipDays={membershipDays} additionalDays={additionalDays} />
      </Stack>
    </Container>
  );
};

export default Profile;
