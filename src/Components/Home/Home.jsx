import { Fragment } from "react";
import FeaturedHome from "../FeaturedHome/FeaturedHome.jsx";
import { Helmet } from 'react-helmet';



export default function Home (){






   return (
      <Fragment>
         <FeaturedHome/>

         <Helmet>
            <title>Fekra Company Medical Advertising</title>
         </Helmet>
      </Fragment>
   )
} 