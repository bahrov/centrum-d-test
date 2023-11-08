import ModeSwitch from './ModeSwitch';
import getErrorMessage from '../helpers/getErrorMessage';
import getRatesByDate from '../requests/getRatesByDate';
import { useContekst } from '../context';
import { useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dashboard, Search, Visibility } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useColorScheme,
} from '@mui/material';

const Menu = () => {
  const { mode } = useColorScheme();
  const navigate = useNavigate();
  const context = useContekst();

  const getColor = (isActive: boolean) => {
    if (isActive) {
      return mode === 'light' ? 'white' : 'rgb(66, 165, 245)';
    }
    return mode === 'light' ? 'rgb(25,54,93)' : '#fff';
  };

  const getTodaysRate = useCallback(async () => {
    try {
      context.setLoading(true);
      const [today] = new Date().toISOString().split('T');
      const rates = await getRatesByDate(today);
      if (rates.error) {
        throw new Error(rates.error);
      }
      if (rates.data) {
        context.setOriginalRates(rates.data);
      }
    } catch (error: unknown) {
      context.setError(getErrorMessage(error));
    } finally {
      context.setLoading(false);
    }
  }, [context]);

  useEffect(() => {
    if (!context.originalRates.length) {
      getTodaysRate();
    }
  }, [context, getTodaysRate]);

  return (
    <>
      <Box sx={{ pt: 8 }}>
        <AppBar position='fixed' color='primary'>
          <Toolbar className='space-between'>
            <Box>
              <NavLink
                to='/'
                style={({ isActive }) => ({
                  color: getColor(isActive),
                })}
              >
                <Tooltip title='Home'>
                  <IconButton color='inherit' onClick={() => navigate('/')}>
                    <Dashboard />
                  </IconButton>
                </Tooltip>
              </NavLink>
              <NavLink
                to='/changed'
                style={({ isActive }) => ({
                  color: getColor(isActive),
                })}
              >
                <Tooltip title='Changed exchange rates'>
                  <IconButton
                    color='inherit'
                    onClick={() => navigate('/changed')}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </NavLink>
              <NavLink
                to='/search'
                style={({ isActive }) => ({
                  color: getColor(isActive),
                })}
              >
                <Tooltip title='Search rate by date'>
                  <IconButton
                    size='small'
                    color='inherit'
                    onClick={() => navigate('/changed')}
                  >
                    <Search />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </Box>
            <ModeSwitch />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Menu;
