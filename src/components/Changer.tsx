import { RateType } from '../types/rate';
import { useContekst } from '../context';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Changer = ({ cc }: { cc: string }) => {
  const context = useContekst();

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const editing: RateType = useMemo(() => {
    const dummyRate = {
      r030: NaN,
      txt: '',
      rate: NaN,
      cc: '',
      exchangedate: '',
    };
    let result = context.editedRates.find((currency) => currency.cc === cc);
    if (!result) {
      result = context.originalRates.find((currency) => currency.cc === cc);
    }
    if (!result) {
      return dummyRate;
    }
    return result;
  }, [cc, context]);

  const onSave = () => {
    let value = inputRef.current?.value;
    if (value == undefined) {
      value = '0';
    }
    const prevState = [...context.editedRates];
    const index = prevState.findIndex((currency) => currency.cc === editing.cc);
    if (index >= 0) {
      prevState[index].rate = parseInt(value);
    } else {
      prevState.push({ ...editing, rate: parseInt(value) });
    }
    context.setEditedRates([...prevState]);
    navigate('/changed');
  };

  useEffect(() => {
    if (inputRef.current && 'value' in inputRef.current) {
      inputRef.current.value = editing.rate.toString();
    }
  }, [editing]);

  return (
    <Box sx={{ mt: 20 }}>
      <Typography
        align='center'
        className='title'
      >{`Provide your value for ${editing.txt}`}</Typography>
      <Box className='centrate'>
        <TextField inputRef={inputRef} size='small' className='mr-2' />
        <Button onClick={onSave}>Save</Button>
      </Box>
    </Box>
  );
};

export default Changer;
