import * as React from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmDialogProps {
  openConfirm: boolean;
  confirmTitle: string;
  confirmDescription: string;
  handleCloseConfirm: () => void;
  handleCloseParent?: () => void;
}

const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  openConfirm,
  confirmTitle,
  confirmDescription,
  handleCloseConfirm,
  handleCloseParent,
}) => {
  return (
    <Container>
      <Dialog
        open={openConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 2, maxWidth: '570px', m: '0 auto' }}
      >
        <DialogTitle>{confirmTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDescription}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseConfirm}>
            아니오
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleCloseConfirm();
              handleCloseParent && handleCloseParent();
            }}
            autoFocus
          >
            예
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConfirmDialog;
