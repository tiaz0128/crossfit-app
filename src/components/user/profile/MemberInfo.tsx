import * as React from 'react';
import {
  Stack,
  Card,
  CardMedia,
  Button,
  IconButton,
  Typography,
  Divider,
  Grid,
  Box,
} from '@mui/material';

import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';

import DialogInputs from './DialogInputs';
import NumberRecordInput from '../../common/form/NumberRecordInput';
import TimeRecordInput from '../../common/form/TimeRecordInput';

export default function MemberInfo({
  mobile,
  enableEdit = false,
}: {
  mobile: boolean;
  enableEdit?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card component="section" sx={{ border: 'none', boxShadow: 'none', pb: 5 }}>
      <Box>
        <Stack position="relative">
          <CardMedia component="img" image="img/profile-bg.jpg" sx={{ maxHeight: '200px' }} />
          <Typography
            component="h1"
            variant="h4"
            position="absolute"
            mx={1}
            fontWeight={700}
            sx={{ color: '#fff' }}
          >
            tiaz0128
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxWidth: '140px',
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1)',
              borderRadius: '50%',
              border: '5px solid #fff;',
            }}
            image="img/profile.jpg"
          />
          <Box
            sx={{
              width: '130px',
              height: '80px',
              zIndex: 1,
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'end',
            }}
          >
            <IconButton
              color="warning"
              aria-label="Edit Profile"
              component="span"
              sx={{ p: 0 }}
              onClick={() => handleClickOpen()}
            >
              {enableEdit ? (
                <SettingsApplicationsRoundedIcon sx={{ color: '#ffc107', fontSize: '40px' }} />
              ) : (
                <LocalPoliceIcon sx={{ color: '#ffc107', fontSize: '40px' }} />
              )}
            </IconButton>
          </Box>
        </Stack>

        <DialogInputs open={open} handleClose={handleClose} />

        <Stack px={2} mt={-1}>
          <Stack direction="row" alignItems="flex-end">
            <Typography
              component="span"
              variant="h6"
              letterSpacing={2}
              sx={{ textShadow: '0.2px 0.2px 0.5px black' }}
            >
              주환석
            </Typography>
            <Typography component="span" variant="body1" sx={{ ml: 1 }}>
              35
            </Typography>
          </Stack>
          <Divider variant="middle" sx={{ width: '80%', my: '3px', mx: '0' }} />
          <Typography component="span" variant="body2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim necessitatibus corporis
            accusamus debitis omnis maxime a, cupiditate earum laborum similique reiciendis.
            Suscipit aperiam, quisquam magni hic id pariatur dolore rem!
          </Typography>
        </Stack>

        <Stack
          sx={{
            mt: 5,
            px: 2,
          }}
        >
          <Stack direction="row">
            <Typography component="h2" variant="h5" sx={{ marginBottom: 1 }}>
              BENCHMARK STATS
            </Typography>
            {enableEdit && (
              <Box component="menu" ml={2}>
                <Button
                  variant="contained"
                  color={edit ? 'warning' : 'primary'}
                  size="small"
                  onClick={() => setEdit(!edit)}
                >
                  {edit ? 'Save' : 'Edit'}
                </Button>
              </Box>
            )}
          </Stack>
          <Grid
            container
            direction={mobile ? 'row' : 'column'}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item sx={{ marginRight: 2, minWidth: '200px' }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography component="span" variant="subtitle1" sx={{ height: '32px' }}>
                  Back Squat
                </Typography>
                {edit ? (
                  <NumberRecordInput unit="kg" />
                ) : (
                  <Typography component="span" variant="subtitle1">
                    150 <span>kg</span>
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography component="span" variant="subtitle1">
                  Clean and Jerk
                </Typography>
                <Typography component="span" variant="subtitle1">
                  111 kg
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography component="span" variant="subtitle1">
                  Snatch
                </Typography>
                <Typography component="span" variant="subtitle1">
                  87 kg
                </Typography>
              </Stack>
            </Grid>

            {mobile ? (
              <Divider orientation="vertical" sx={{ height: 'auto !important', mx: 5 }} />
            ) : (
              <Divider sx={{ my: 2, flex: 1 }} />
            )}

            <Grid item sx={{ marginRight: 2, minWidth: '200px' }}>
              <Stack direction="row" justifyContent={'space-between'}>
                <Typography component="span" variant="subtitle1" sx={{ height: '32px' }}>
                  Fran
                </Typography>
                {edit ? (
                  <TimeRecordInput />
                ) : (
                  <Typography component="span" variant="subtitle1">
                    2:13
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" justifyContent={'space-between'}>
                <Typography component="span" variant="subtitle1">
                  Grace
                </Typography>
                <Typography component="span" variant="subtitle1">
                  1:21
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent={'space-between'}>
                <Typography component="span" variant="subtitle1">
                  Helen
                </Typography>
                <Typography component="span" variant="subtitle1">
                  24:12
                </Typography>
              </Stack>
            </Grid>
            <Grid item sx={{ flex: 1, minWidth: '200px' }}></Grid>
          </Grid>
        </Stack>
      </Box>
    </Card>
  );
}
