import './App.css';
import router from './router.tsx';
import ContextProvider from './context/index.tsx';
import Error from './components/Error.tsx';
import Preloader from './components/Preloader.tsx';
import Success from './components/Success.tsx';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <ContextProvider>
      <CssVarsProvider>
        <RouterProvider router={router} />
        <Error />
        <Success />
        <Preloader />
      </CssVarsProvider>
    </ContextProvider>
  );
}

export default App;
