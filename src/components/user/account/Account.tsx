import React, { useEffect } from 'react';
import { Button, Card, Checkbox, Container, FormGroup, Stack } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import krLocale from 'date-fns/locale/ko';
import { differenceInDays, addDays } from 'date-fns';

import { IMaskInput } from 'react-imask';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateRange } from '@mui/lab/DateRangePicker';

import RulesPopup from './RulesPopup';
import { MenuItem } from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import * as IMask from 'imask';
import { getBoxInfo } from '../../../api/boxInfo';

const GridItem = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '2em',
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

const DateMaskCustom = React.forwardRef<HTMLElement, any>(function (props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      mask="Y.m.d"
      blocks={{
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
        },
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      {...other}
    />
  );
});

//

const displayMembershipPrice = (discountName: string, discountType: string, discount: number) => {
  if (discountType === '10')
    return (
      <>
        <span>{discountName}</span>
        <span style={{ marginLeft: 'auto' }}>
          <span>&#8361; </span>
          {discount.toLocaleString('ko-kr')}
        </span>
      </>
    );

  return (
    <>
      <span>{discountName}</span>
      <span style={{ marginLeft: 'auto' }}>{discount + ` %`}</span>
    </>
  );
};

const calculateDiscount = (
  membershipPrice: number,
  discountType: string,
  discount: number
): number => {
  if (discountType === '0') return 0;
  if (discountType === '10') return discount;
  if (discountType === '20') return membershipPrice * discount * 0.01;
  return 0;
};

const calculateOptionalPrice = (optional: any, optionalPrice: any) => {
  return Object.keys(optional).reduce((optionalPriceTotal, key) => {
    if (optional[key]) {
      const price = optionalPrice[key][1];
      return optionalPriceTotal + price;
    }
    return optionalPriceTotal;
  }, 0);
};

//

interface State {
  name: string;
  birthDay: string;
  phone: string;
  range: DateRange<Date>;
  sex: string;
  month: number;
  disCount: string;
}

function Membership() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const screenSize = useMediaQuery('(min-width:600px)');
  const today = React.useRef(new Date());

  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState<State>({
    name: '',
    birthDay: '1990.01.01',
    range: [today.current, addDays(today.current, 30)],
    phone: '010-',
    sex: 'male',
    month: 1,
    disCount: '0',
  });

  const [optional, setOptional] = React.useState<{ [key: string]: boolean }>({});
  const [read, setRead] = React.useState<boolean>(false);
  const [boxInfo, setBoxInfo] = React.useState<any>(false);

  const { membershipPrice, discountPrice, optionalPrice } = boxInfo;

  useEffect(() => {
    getBoxInfo().then((data) => {
      setBoxInfo(data);
      const keys = Object.keys(data.optionalPrice);
      const opt: { [key: string]: boolean } = {};
      keys.forEach((key) => (opt[key] = false));
      setOptional(opt);
      setValues({ ...values });
    });
  }, []);

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
      range: [values.range[0], addDays(values.range[0] || today.current, 30 * value)],
    });
  };

  const handleDiscount = (event: SelectChangeEvent<typeof values.disCount>) => {
    setValues({ ...values, disCount: event.target.value });
  };

  const handleRangeDate = (newValue: DateRange<Date>) => {
    setValues({
      ...values,
      range: newValue,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOptional = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptional({
      ...optional,
      [event.target.name]: event.target.checked,
    });
  };

  const cal = () => {
    const m = membershipPrice[values.month];
    const o = calculateOptionalPrice(optional, optionalPrice);
    let d = 0;
    if (discountPrice[values.disCount]) {
      d = calculateDiscount(
        membershipPrice[values.month],
        discountPrice[values.disCount][1],
        discountPrice[values.disCount][2]
      );
    }

    return m + o - d;
  };

  return (
    <Container component="main" sx={{ p: screenSize ? 3 : 1 }}>
      <Stack
        component="div"
        direction="column"
        sx={
          matches
            ? { margin: '24px auto', width: '100%' }
            : {
                margin: '24px auto',
                width: '100%',
                maxWidth: '500px',
              }
        }
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: '#343434',
            textAlign: 'center',
            mb: 6,
          }}
        >
          회원 등록 신청서
        </Typography>

        <Stack
          sx={
            matches
              ? { flexDirection: 'row', gap: 3, justifyContent: 'center' }
              : { margin: '0 auto' }
          }
        >
          <Card sx={matches ? { p: 3, flex: '1' } : { p: 3 }}>
            <Typography variant="h6" component="h2" mb={3}>
              회원 정보
            </Typography>
            <Stack direction="row" sx={{ width: '100%', height: '45px', alignItems: 'baseline' }}>
              <FormLabel sx={{ mr: 3, minWidth: '80px' }}>성 명</FormLabel>
              <Input fullWidth />
            </Stack>
            <Stack
              direction="row"
              sx={{ width: '100%', height: '45px', alignItems: 'center', mt: 3 }}
            >
              <FormLabel sx={{ mr: 3, minWidth: '80px' }}>성 별</FormLabel>
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
            </Stack>
            <Stack
              direction="row"
              sx={{ width: '100%', height: '45px', alignItems: 'center', mt: 3 }}
            >
              <FormLabel sx={{ mr: 3, minWidth: '80px' }}>생년월일</FormLabel>
              <Input
                value={values.birthDay}
                onChange={handleChange}
                name="birthDay"
                id="formatted-date-mask-input"
                inputComponent={DateMaskCustom as any}
                placeholder="1999.01.01"
                fullWidth
                sx={{ maxWidth: '400px' }}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ width: '100%', height: '45px', alignItems: 'center', my: 3 }}
            >
              <FormLabel sx={{ mr: 3, minWidth: '80px' }}>연락처</FormLabel>
              <Input
                value={values.phone}
                onChange={handleChange}
                name="phone"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom as any}
                placeholder="010-XXXX-XXXX"
                fullWidth
                sx={{ maxWidth: '400px' }}
              />
            </Stack>
          </Card>

          <Card sx={matches ? { p: 3, flex: '1' } : { p: 3, mt: 3 }}>
            <Typography variant="h6" component="h2" mb={3}>
              회원권 종류
            </Typography>
            <Stack sx={{ maxWidth: '470px' }}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  aria-label="month"
                  value={values.month}
                  name="month"
                  onChange={handleMonth}
                  row
                  sx={{ mb: 3, mx: 'auto' }}
                >
                  {membershipPrice &&
                    Object.keys(membershipPrice).map((key) => (
                      <FormControlLabel
                        key={key}
                        value={key}
                        control={<Radio />}
                        label={`${key}개월`}
                      />
                    ))}
                </RadioGroup>
              </FormControl>

              <Stack direction="row" alignItems="baseline" mb={3}>
                <Typography variant="h5">{values.month} 개월</Typography>
                <span>
                  (
                  {values.range &&
                    differenceInDays(values.range[1] as Date, values.range[0] as Date)}
                  일)
                </span>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flex: 1,
                  }}
                >
                  <span>&#8361;&nbsp;</span>
                  <span>
                    {membershipPrice && membershipPrice[values.month].toLocaleString('ko-kr')}
                  </span>
                </div>
              </Stack>

              <LocalizationProvider dateAdapter={AdapterDateFns} locale={krLocale}>
                <MobileDateRangePicker
                  startText="시작일"
                  endText="종료일"
                  value={values.range}
                  mask={'____.__.__'}
                  inputFormat="yyyy.MM.dd"
                  onChange={handleRangeDate}
                  renderInput={(startProps, endProps) => (
                    <Stack direction="row" m="20px auto">
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2, alignSelf: 'center', fontSize: '1.5rem' }}> ~ </Box>
                      <TextField {...endProps} />
                    </Stack>
                  )}
                />
              </LocalizationProvider>
              <FormControl sx={{ my: 3 }} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">할인</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={values.disCount}
                  label="disCount"
                  onChange={handleDiscount}
                >
                  <MenuItem value={'0'}>
                    <em>없음</em>
                  </MenuItem>
                  {discountPrice &&
                    Object.keys(discountPrice).map((key) => {
                      const [discountName, discountType, discount] = discountPrice[key];

                      return (
                        <MenuItem key={key} value={key}>
                          <Stack direction="row" sx={{ width: '100%', display: 'flex' }}>
                            {displayMembershipPrice(discountName, discountType, discount)}
                          </Stack>
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <FormControl>
                <Stack sx={{ '& .MuiTypography-root': { width: '100%' } }}>
                  {optionalPrice &&
                    Object.keys(optional).map((key) => {
                      const [optionalPriceName, price] = optionalPrice[key];

                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={key}
                              checked={optional[key]}
                              onChange={handleOptional}
                            />
                          }
                          label={
                            <span style={{ display: 'flex' }}>
                              {`${optionalPriceName}`}
                              <span style={{ marginLeft: 'auto' }}>
                                &#8361; {`${price.toLocaleString('ko-kr')}`}
                              </span>
                            </span>
                          }
                          sx={{ width: '100%' }}
                        />
                      );
                    })}
                </Stack>
              </FormControl>
            </Stack>
          </Card>
        </Stack>

        <Stack sx={matches ? { flexDirection: 'row', justifyContent: 'center' } : {}}>
          <Card sx={{ p: 5, m: 3, width: matches ? '600px' : 'auto' }}>
            <Stack direction="row" alignItems="baseline">
              <Typography variant="h6" color="#818181">
                회원권 금액
                <span style={{ fontSize: '.75em', color: '#818181' }}>
                  (
                  {values.range &&
                    differenceInDays(values.range[1] as Date, values.range[0] as Date)}
                  일)
                </span>
              </Typography>
              <Typography variant="h6" ml="auto">
                {membershipPrice && membershipPrice[values.month].toLocaleString('ko-kr')}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="baseline">
              <Typography variant="h6" color="#818181">
                할인 금액
              </Typography>
              <Typography variant="h6" ml="auto" color="#ff5722">
                {(discountPrice &&
                  discountPrice[values.disCount] &&
                  `- ${calculateDiscount(
                    membershipPrice[values.month],
                    discountPrice[values.disCount][1],
                    discountPrice[values.disCount][2]
                  ).toLocaleString('ko-kr')}`) ||
                  0}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="baseline">
              <Typography variant="h6" color="#818181">
                추가 금액
              </Typography>
              <Typography variant="h6" ml="auto">
                {calculateOptionalPrice(optional, optionalPrice).toLocaleString('ko-kr')}
              </Typography>
            </Stack>
            <Divider sx={{ m: 1, borderColor: '#818181' }} />
            <Stack direction="row" alignItems="baseline">
              <Typography variant="h5" fontWeight={800}>
                총 금액
              </Typography>
              <Typography variant="h5" ml="auto" fontWeight={800}>
                {(discountPrice && cal().toLocaleString('ko-kr')) || 0}
              </Typography>
            </Stack>
          </Card>
        </Stack>

        <Stack direction="row" p={3} gap={3}>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            startIcon={read ? <CheckCircleIcon /> : <TextSnippetIcon />}
            sx={{ fontSize: '1.25rem', color: 'white', padding: '1em', width: '100%' }}
          >
            회원약관
          </Button>
          <Button
            variant="contained"
            disabled={!read}
            startIcon={<HowToRegIcon />}
            sx={{
              fontSize: '1.25rem',
              color: 'white',
              padding: '1em',
              width: '100%',
            }}
          >
            등록
          </Button>
        </Stack>
      </Stack>

      <RulesPopup open={open} setOpen={setOpen} read={read} setRead={setRead} />
    </Container>
  );
}

export default Membership;
