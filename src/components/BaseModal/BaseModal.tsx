import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface ModalProps extends React.ComponentProps<typeof Dialog> {
  title: string;

  submitTitle?: string;
  cancelTitle?: string;

  onSubmit?: () => void;
  onCancel?: () => void;
}

const BaseModal: React.FC<ModalProps> = (props) => {
  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitle style={{ borderBottom: '1px solid #949494' }}>
        {props.title}
      </DialogTitle>

      <DialogContent>{props.children}</DialogContent>

      <DialogActions style={{ borderTop: '1px solid #949494' }}>
        <Button onClick={props.onCancel}>
          {props.cancelTitle ?? 'Cancel'}
        </Button>
        <Button variant="contained" onClick={props.onSubmit}>
          {props.submitTitle ?? 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseModal;
