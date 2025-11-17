import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Services from "../Pages/Services/Services";
import About from "../Pages/About/About";
import Pricing from "../Pages/Pricing/Pricing";
import Rider from "../Pages/Rider/Rider";


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
        path: '/pricing',
        Component: Pricing
      },
      
      {
        path: '/rider',
        Component: Rider
      },

    ]
  },
]);   