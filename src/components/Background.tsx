import Menu from './Menu';
import React from 'react';
import { Paper } from '@mui/material';

const Background: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Paper className='background'>
      <Menu />
      <section className='ph-1'>{children}</section>
    </Paper>
  );
};

export default Background;
