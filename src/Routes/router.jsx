import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Services from "../Pages/Services/Services";
import About from "../Pages/About/About";
import Pricing from "../Pages/Pricing/Pricing";
import Rider from "../Pages/Rider/Rider";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcel from "../Pages/Dashboard/MyParcel/MyParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";



  export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index: true,
        Component:Home
      },
      {
        path: '/services',
        Component: Services
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: ()=> fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/sendParcel',
        element: <PrivateRoute>
           <SendParcel></SendParcel>
        </PrivateRoute>,
        loader: ()=> fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path: '/pricing',
        Component: Pricing
      },
      
      {
        path: '/rider',
        element: <PrivateRoute>
           <Rider></Rider>
        </PrivateRoute>
      },

    ]
  },
  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path: '/login',
        Component:Login
      },
      {
        path: '/register',
        Component:Register
      },
    ]
  },
  {
    path:'/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path:'my-parcel',
        Component:MyParcel

      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component:PaymentSuccess 
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      }
    ]
  }
]);   