import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Alert, AlertTitle } from '@mui/material';

interface CustomAlertProps {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  type,
  title,
  description,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
