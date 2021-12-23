import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import * as React from 'react';

// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     background:
//       theme.palette.type === "dark"
//         ? "#535353"
//         : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

//     color: "#fff",
//     padding: 20,
//     marginTop: theme.spacing(2),
//     marginBottom: "1em"
//   }
// }));

const wodInfo = {
  id: '2021/12/22',
  TeamWod: 2,
  timeCap: '22',
  option: 'AMRAP',
  workOut: {
    buyIn: '',
    main: [
      '40 Pull up',
      '10 Team Burpee',
      '40 Hang Power Snatch (95/65)',
      '10 Team Burpee',
      '40 Push Press(95/65)',
      '10 Team Burpee',
    ],
    buyOut: '',
  },
  hero: '',
};

function WodCard() {
  // const classes = useStyles();

  return (
    <Card
      // className={classes.root}
      sx={{
        minWidth: 375,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography component="h3" variant="subtitle1" sx={{ textAlign: 'right' }}>
          {new Date().toDateString()}
        </Typography>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
          WOD
        </Typography>

        <Divider light sx={{ border: 2 }} />
        <Box sx={{ my: 1 }}>
          <Typography component="div" variant="h6">
            {wodInfo.TeamWod !== 1 && 'Team of ' + wodInfo.TeamWod}
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
      </CardContent>
    </Card>
  );
}

export default WodCard;
