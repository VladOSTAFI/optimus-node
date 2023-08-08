import React, { useCallback, useState } from 'react';
import { TextField } from '@mui/material';

import { BaseModal } from '@/components';

interface AddNodeModalProps {
  open: boolean;

  onClose: () => void;
  onAdd: (data: any) => void;
}

const AddNodeModal: React.FC<AddNodeModalProps> = (props) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = useCallback(() => {
    props.onAdd(formData);

    props.onClose();
  }, [formData, props.onClose]);

  const handleCancel = useCallback(() => {
    props.onClose();
  }, [props.onClose]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: fieldValue,
      }));
    },
    [],
  );

  return (
    <BaseModal
      title="Add node to the server"
      open={props.open}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <TextField
        autoFocus
        margin="dense"
        name="nodeName"
        label="Node name"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="name"
        label="Node name(in telemetry)"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="walletAddress"
        label="Wallet address"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
    </BaseModal>
  );
};

export default AddNodeModal;
