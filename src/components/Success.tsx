import { useContekst } from '../context';
import { Alert, IconButton } from '@mui/material';
import { CheckCircleOutline, Close } from '@mui/icons-material';
import { useCallback, useEffect } from 'react';

const Success = () => {
  const context = useContekst();

  const onClose = useCallback(() => {
    context.setSuccess('');
  }, [context]);

  const closeButton = () => (
    <IconButton color='inherit' size='small' onClick={onClose}>
      <Close />
    </IconButton>
  );

  useEffect(() => {
    if (context.success) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [context, onClose]);

  if (context.success) {
    return (
      <Alert
        action={closeButton()}
        icon={<CheckCircleOutline fontSize='inherit' />}
        severity='success'
        variant='filled'
        className='sucess'
      >
        {`${context.success}`}
      </Alert>
    );
  }

  return null;
};

export default Success;
