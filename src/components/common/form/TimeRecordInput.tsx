import * as React from 'react';
import { Input } from '@mui/material';
import { IMaskInput } from 'react-imask';

const timeRecordMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      // eslint-disable-next-line no-octal-escape
      mask="0[0]:00"
      inputRef={ref}
      onAccept={(value: any) => {
        onChange({ target: { name: props.name, value } });
      }}
      {...other}
    />
  );
});

interface TimeRecordInputProps {}

const TimeRecordInput: React.FunctionComponent<TimeRecordInputProps> = () => {
  return (
    <Input placeholder="00:00" inputComponent={timeRecordMaskCustom} sx={{ width: '42px' }}></Input>
  );
};

export default TimeRecordInput;
