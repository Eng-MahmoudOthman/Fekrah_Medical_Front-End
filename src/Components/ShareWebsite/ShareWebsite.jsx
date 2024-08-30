import React, { Fragment } from 'react'
import qrCode from "../../Assets/images/qrCode.png"
import imgShare from "../../Assets/images/share.png"
import { Link } from 'react-router-dom'

export default function ShareWebsite() {
   return (
      <Fragment>
         <div className="container pt-5">
         <h1 className='main-header'>Share Website Url </h1>
         <div className='under-header'></div>

            <div className="row align-item-center">

               <div className="col-md-6 text-center">
                  <div className='w-100 text-center '>
                     <img src={imgShare} className='w-100' alt="qrCode" />
                  </div>
                  <p className='text-success'>Share Link </p>
               </div>

               <div className="col-md-6 text-center mt-4">
                  <div className='w-100 text-center mb-4'>
                     <img src={qrCode} className='w-50 border border-4 border-danger rounded-2 p-4' alt="qrCode" />
                  </div>
                  <Link to="#" target='_blank' className='text-primary'>Website Link Click Here !</Link>
                  <p className='text-danger'>http://localhost:3000/#/shareWebsite</p>
               </div>
            </div>
         </div>
      </Fragment>
   )
}
