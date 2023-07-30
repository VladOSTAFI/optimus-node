import React, { useCallback, useState } from 'react';
import { BaseModal } from '@/components';
import { TextField } from '@mui/material';

interface AddNodeModalProps {
  node: any;

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
      title={`Add ${props.node?.name} node to the server`}
      open={props.open}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Node name"
        type="text"
        fullWidth
        variant="standard"
        required
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="address"
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
