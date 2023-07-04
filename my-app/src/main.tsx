import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import ErrorPage from './ErrorPage';
import Root, { loader as rootLoader } from './routes/Root';
import Public, { loader as publicLoader } from './routes/Public';
import Private, { loader as privateLoader } from './routes/Private';
import Index from './routes/Index';
import SignIn, { action as authAction } from './routes/auth/SignIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "public",
        element: <Public />,
        errorElement: <ErrorPage />,
        loader: publicLoader,
      },
      {
        path: "private",
        element: <Private />,
        errorElement: <ErrorPage />,
        loader: privateLoader,
      },
      {
        path: "auth/signin",
        element: <SignIn />,
        action: authAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
