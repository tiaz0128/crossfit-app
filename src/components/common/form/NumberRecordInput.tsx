import { Input, InputAdornment } from '@mui/material';
import * as React from 'react';
import { IMaskInput } from 'react-imask';

const numberRecordMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      // eslint-disable-next-line no-octal-escape
      mask="000"
      inputRef={ref}
      onAccept={(value: any) => {
        onChange({ target: { name: props.name, value } });
      }}
      {...other}
    />
  );
});

interface NumberRecordInputProps {
  unit: string;
}

const NumberRecordInput: React.FunctionComponent<NumberRecordInputProps> = ({ unit }) => {
  return (
    <Input
      inputComponent={numberRecordMaskCustom}
      endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
      sx={{ width: '55px' }}
    ></Input>
  );
};

export default NumberRecordInput;
