import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import MainPage from '../components/MainPage/MainPage';
import RunPage from '../components/RunPage';
import Layout from './Layout';
import DataPage from '../components/DataPage/DataPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: 'landing',
        element: <LandingPage />,
      },
      {
        path: 'run',
        element: <RunPage />
      },
      {
        path: '/data/:run_id',
        element: <DataPage />
      }

    ],
  },
]);
