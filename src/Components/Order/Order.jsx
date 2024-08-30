import React, { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Order() {
   return (
      <Fragment>
         <div className="container mt-5 pt-5">
            <div>
               <Link to="" className='btn btn-outline-primary btn-sm  d-block w-50 m-auto' > Current Patient</Link>
               <Link to="newPatient" className='btn btn-outline-primary btn-sm  d-block w-50 m-auto my-2'> Other Patient</Link>
               <Link to="oldPatient" className='btn btn-outline-primary btn-sm  d-block w-50 m-auto'  >Search Patient Phone </Link>
            </div>

            <div>
               <Outlet></Outlet> 
            </div>
         </div>
      </Fragment>
   )
}
