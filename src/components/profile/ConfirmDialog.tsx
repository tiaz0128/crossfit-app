import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({
  openConfirm,
  confirmTitle,
  confirmDescription,
  closeConfirm,
  handleClose,
}: {
  openConfirm: boolean;
  confirmTitle: string;
  confirmDescription: string;
  closeConfirm: () => void;
  handleClose: () => void;
}) {
  return (
    <div>
      <Dialog
        open={openConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 2, maxWidth: '570px', m: '0 auto' }}
      >
        <DialogTitle id="alert-dialog-title">{confirmTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{confirmDescription}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={closeConfirm}>
            아니오
          </Button>
          <Button
            color="primary"
            onClick={() => {
              closeConfirm();
              handleClose();
            }}
            autoFocus
          >
            예
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
