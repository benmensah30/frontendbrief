import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './Components/Pages/Registration/Registration.jsx';
import OtpCode from './Components/Pages/OtpCOde/OtpCode.jsx';
import Dashboard from './Components/Pages/Dashboard/Dashboard.jsx';
import Test from './Test.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/otp-code/:email",
    element: <OtpCode />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path:"/test",
    element: <Test />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
