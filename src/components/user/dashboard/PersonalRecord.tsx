import { Card } from '@mui/material';
import * as React from 'react';
import { FunctionComponent } from 'react';

interface Props {}

const PersonalRecord: FunctionComponent<Props> = () => {
  return (
    <Card
      sx={{
        minWidth: 815,
        minHeight: 375,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      test
    </Card>
  );
};

export default PersonalRecord;
