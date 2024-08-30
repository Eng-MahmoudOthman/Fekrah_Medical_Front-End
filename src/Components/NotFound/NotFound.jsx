import { Fragment } from "react"
import notFound from "../../Assets/images/notFound.png"




export default function NotFound(){

   return (
      <Fragment>
         <div className="w-50 m-auto">
            <h1 className="text-center fs-1 mt-5 fw-bold">Not Found Page</h1>
            <img src={notFound} className="w-100"/>
            {/* <img src={notFound} width={800}/> */}
         </div>
      </Fragment>
   )
}