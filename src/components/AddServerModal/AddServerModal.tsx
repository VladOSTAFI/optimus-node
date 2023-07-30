import React, { useCallback, useState } from 'react';
import { TextField } from '@mui/material';

import { BaseModal } from '@/components';
import { IServer } from '@/common';

interface AddServerModalProps {
  open: boolean;

  onClose: () => void;
  onAdd: (data: Omit<IServer, 'id'>) => void;
}

const AddServerModal: React.FC<AddServerModalProps> = (props) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = useCallback(() => {
    props.onAdd(formData as Omit<IServer, 'id'>);

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
      title="Add new server"
      open={props.open}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Server name"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="ip"
        label="IP"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="username"
        label="Username"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="password"
        label="Password"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
    </BaseModal>
  );
};

export default AddServerModal;
