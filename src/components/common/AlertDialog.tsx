import * as React from 'react';
import {
  Container,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from '@mui/material';

interface AlertDialogProps {
  openAlter: boolean;
  alertTitle: string;
  alertDescription: string;
  handleCloseAlter: () => void;
  handleCloseParent?: () => void;
}

const AlertDialog: React.FunctionComponent<AlertDialogProps> = ({
  openAlter,
  alertTitle,
  alertDescription,
  handleCloseAlter,
  handleCloseParent,
}) => {
  return (
    <Container>
      <Dialog
        open={openAlter}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 2, maxWidth: '570px', m: '0 auto' }}
      >
        <DialogTitle>{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{alertDescription}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              handleCloseAlter();
              handleCloseParent && handleCloseParent();
            }}
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AlertDialog;
