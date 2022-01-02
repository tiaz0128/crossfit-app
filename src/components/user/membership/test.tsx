import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Typography from '@mui/material/Typography';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CloseIcon from '@mui/icons-material/Close';

import IconButton from '@mui/material/IconButton';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
} from '@mui/material';
import { rules } from './roles';

function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [read, setRead] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleRead = (e: any) => {
    const bottom = Math.ceil(e.target.scrollTop) === e.target.scrollHeight - e.target.clientHeight;
    if (bottom) setRead(true);
  };

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        onClick={handleClickOpen('paper')}
        variant="contained"
        startIcon={<TextSnippetIcon />}
        sx={{ fontSize: '1.25rem', color: 'white', padding: '1em', width: '100%' }}
      >
        필독! 회원약관
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Stack direction="row">
          <DialogTitle
            id="scroll-dialog-title"
            sx={{ textAlign: 'center', flex: '1', fontSize: '2rem' }}
          >
            회 원 약 관
          </DialogTitle>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent dividers={scroll === 'paper'} onScroll={handleRead}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ padding: '0' }}
          >
            {rules.map((rule, idx) => (
              <div key={idx}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  key={idx}
                  sx={{ marginTop: '1em' }}
                >
                  {rule.title}
                </Typography>
                {rule.content.map((text, i) => (
                  <Typography variant="body1" component="div" gutterBottom key={i}>
                    {text}
                  </Typography>
                ))}
              </div>
            ))}
          </DialogContent>
        </DialogContent>

        <DialogActions>
          <Stack>
            <FormHelperText>
              상기 본인은 위 약관의 모든 내용을 충분히 숙지하고 동의하기에 회원가입을 신청합니다.
            </FormHelperText>
            <FormControlLabel
              disabled={!read}
              sx={{ justifyContent: 'flex-end' }}
              control={
                <Checkbox
                  onClick={() => {
                    setTimeout(() => handleClose(), 500);
                  }}
                  name="agree"
                />
              }
              label="동의합니다."
            />
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(ScrollDialog);
