import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage';
import MainPage from '../components/MainPage/MainPage';
import ViewRuns from '../components/ViewRuns/ViewRuns';
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
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: 'landing',
        element: <LandingPage />,
      },
      {
        path: 'viewruns',
        element: <ViewRuns />
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
