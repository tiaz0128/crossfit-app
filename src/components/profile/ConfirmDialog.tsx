import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({
  openAlert,
  handleClose,
}: {
  openAlert: boolean;
  handleClose: () => void;
}) {
  return (
    <div>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 2, maxWidth: '570px', m: '0 auto' }}
      >
        <DialogTitle id="alert-dialog-title">{'변경'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            변경된 내역이 있습니다. 저장하지 않고 닫겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            아니오
          </Button>
          <Button color="primary" onClick={handleClose} autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
