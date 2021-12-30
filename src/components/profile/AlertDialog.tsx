import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
  openAlter,
  alertTitle,
  alertDescription,
  closeAlter,
  handleClose,
}: {
  openAlter: boolean;
  alertTitle: string;
  alertDescription: string;
  closeAlter: () => void;
  handleClose?: () => void;
}) {
  return (
    <div>
      <Dialog
        open={openAlter}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 2, maxWidth: '570px', m: '0 auto' }}
      >
        <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{alertDescription}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              closeAlter();
              handleClose && handleClose();
            }}
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
