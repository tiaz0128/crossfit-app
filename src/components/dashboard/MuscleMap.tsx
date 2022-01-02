import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';
import { FunctionComponent } from 'react';

interface Props {}

const MuscleMap: FunctionComponent<Props> = () => {
  return (
    <Card
      sx={{
        minWidth: 375,
        minHeight: 375,
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box
        component="div"
        sx={{
          background: 'rgba(255, 152, 152, 0.12)',
          height: '170px',
          width: '220px',
          position: 'absolute',
          top: '40%',
        }}
      ></Box>

      <Box
        component="div"
        sx={{
          background: 'rgba(255, 0, 0, 0.11)',
          height: '40px',
          width: '220px',
          position: 'absolute',
          top: '50%',
        }}
      ></Box>
      <Box
        component="div"
        sx={{
          background: 'rgba(255, 0, 0, 0.278)',
          height: '34px',
          width: '200px',
          position: 'absolute',
          top: '63%',
        }}
      ></Box>
      <Box
        component="div"
        sx={{
          background: 'rgba(255, 0, 0, 0.78)',
          height: '34px',
          width: '200px',
          position: 'absolute',
          top: '75%',
        }}
      ></Box>
      <CardMedia
        component="img"
        height="140"
        image="img/muscle2.png"
        alt="근육"
        sx={{ width: '250px', height: '80%', position: 'absolute' }}
      />
      <Typography
        component="h3"
        variant="h5"
        sx={{ m: 1, alignSelf: 'flex-start', fontWeight: 'bold' }}
      >
        근육 과부화
      </Typography>
    </Card>
  );
};

export default MuscleMap;
