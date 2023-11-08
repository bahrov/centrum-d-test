import React from 'react';
import { useContekst } from '../context';
import { Close } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

const Error: React.FC = () => {
  const context = useContekst();

  const onClose = () => {
    context?.setError('');
  };

  return (
    <Dialog open={!!context?.error}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <Typography>{context?.error}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={onClose}
          startIcon={<Close />}
          variant='outlined'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Error;
