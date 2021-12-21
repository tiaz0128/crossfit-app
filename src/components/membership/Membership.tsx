import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import krLocale from 'date-fns/locale/ko';
import { format } from 'date-fns';

import styles from './membership.module.css';

import { IMaskInput } from 'react-imask';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import Container from '@mui/material/Container';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateRange } from '@mui/lab/DateRangePicker';

import ScrollDialog from './test';

const GridItem = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '1.5em',
}));

GridItem.defaultProps = {
  item: true,
  sm: 6,
  xs: 12,
};

const TextMaskCustom = React.forwardRef<HTMLElement, any>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      mask="\0\1\0-000[0]-0000"
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      {...other}
    />
  );
});

interface State {
  name: string;
  birthDay: string | Date | null;
  phone: string;
  range: DateRange<Date>;
  sex: string;
  month: number;
}

function Membership() {
  const today = React.useRef(new Date());

  const [values, setValues] = React.useState<State>({
    name: '',
    birthDay: new Date('1990-01-01'),
    range: [today.current, new Date(new Date().setDate(new Date().getDate() + 30))],
    phone: '010-',
    sex: 'male',
    month: 1,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);

    setValues({
      ...values,
      [event.target.name]: value,
      range: [today.current, new Date(new Date().setDate(new Date().getDate() + 30 * value))],
    });
  };

  const handleDate = (newValue: Date | null) => {
    setValues({
      ...values,
      birthDay: format(newValue as Date, 'yyyy-MM-dd') as string,
    });
  };

  const handleRangeDate = (newValue: DateRange<Date>) => {
    setValues({
      ...values,
      range: newValue,
    });
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h2"
        component="div"
        gutterBottom
        sx={{
          color: '#343434',
          textAlign: 'center',
          marginTop: '0.25em',
          fontSize: '2.4em',
        }}
      >
        회원 가입 신청서
      </Typography>
      <Divider />
      <Box
        className={styles.membershipbox}
        sx={{
          bgcolor: '#fff',
          height: '80vh',
          padding: '20px',
        }}
      >
        <Grid container spacing={5}>
          <GridItem>
            <TextField
              id="standard-basic"
              label="성 명"
              helperText="Please enter your name"
              fullWidth
              variant="standard"
            ></TextField>
          </GridItem>

          <GridItem>
            <FormControl fullWidth>
              <InputLabel variant="standard">전화번호</InputLabel>
              <Input
                value={values.phone}
                onChange={handleChange}
                name="phone"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom as any}
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={krLocale}>
              <Stack>
                <MobileDatePicker
                  label="생년월일"
                  inputFormat="yyyy.MM.dd"
                  value={values.birthDay}
                  onChange={handleDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </GridItem>

          <GridItem>
            <FormControl component="fieldset">
              <FormLabel component="legend">성 별</FormLabel>
              <RadioGroup
                aria-label="성별"
                value={values.sex}
                onChange={handleChange}
                name="sex"
                row
              >
                <FormControlLabel value="male" control={<Radio />} label="남자" />
                <FormControlLabel value="female" control={<Radio />} label="여자" />
              </RadioGroup>
            </FormControl>
          </GridItem>

          <GridItem sm={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">개월수</FormLabel>
              <RadioGroup
                aria-label="month"
                value={values.month}
                name="month"
                onChange={handleMonth}
                row
              >
                <FormControlLabel value={1} control={<Radio />} label="1개월" />
                <FormControlLabel value={3} control={<Radio />} label="3개월" />
              </RadioGroup>
            </FormControl>
          </GridItem>

          <GridItem sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={krLocale}>
              <Stack>
                <MobileDateRangePicker
                  startText="시작일"
                  endText="종료일"
                  value={values.range}
                  mask={'____.__.__'}
                  inputFormat="yyyy.MM.dd"
                  onChange={handleRangeDate}
                  renderInput={(startProps, endProps) => (
                    <div className={styles.dateRage}>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> ~ </Box>
                      <TextField {...endProps} />
                    </div>
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </GridItem>

          <GridItem sm={12} xs={12} sx={{ padding: '0px', margin: '0px auto 200px' }}>
            <ScrollDialog />
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
}

export default Membership;
