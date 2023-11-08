import Background from './components/Background.tsx';
import ErrorPage from './pages/error/index.tsx';
import HomePage from './pages/home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <Background>
        <HomePage location='home' />
      </Background>
    ),
  },
  {
    path: '/changed/:cc?',
    errorElement: <ErrorPage />,
    element: (
      <Background>
        <HomePage location='changed' />
      </Background>
    ),
  },
  {
    path: '/search',
    errorElement: <ErrorPage />,
    element: (
      <Background>
        <HomePage location='search' />
      </Background>
    ),
  },
]);

export default router;
