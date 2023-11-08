import { RateType } from '../types/rate';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Typography } from '@mui/material';

type propTypes = {
  rate: RateType;
};

const CurrencyItem = ({ rate }: propTypes) => {
  const navigate = useNavigate();
  return (
    <MenuItem
      onClick={() => navigate(`/changed/${rate.cc}`)}
      key={rate.cc}
      sx={{ justifyContent: 'start' }}
    >
      <Typography sx={{ fontWeight: '600', flex: 1 }}>{rate.txt}</Typography>
      <Typography sx={{ flex: 1 }}>{rate.rate}</Typography>
    </MenuItem>
  );
};

export default CurrencyItem;
