import { IconButton, Tooltip, useColorScheme } from '@mui/material';
import { useEffect } from 'react';
import { WbSunny, Nightlight } from '@mui/icons-material';

const ModeSwitch = () => {
  const getCurrentTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    if (getCurrentTheme()) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [setMode]);

  return (
    <Tooltip title='Change mode'>
      <IconButton
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <Nightlight /> : <WbSunny />}
      </IconButton>
    </Tooltip>
  );
};

export default ModeSwitch;
