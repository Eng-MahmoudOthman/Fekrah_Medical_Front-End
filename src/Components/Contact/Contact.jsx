import React, { Fragment } from 'react'
import imgShare from "../../Assets/images/share.png" ;
import qrCode from "../../Assets/images/qrCode.png"

import { Link } from 'react-router-dom'

export default function Contact() {
   return (
      <Fragment>
         <div className="container">
            <h1 className='main-header'>Contact Me</h1>
            <div className='under-header'></div>

               <h2 className=" h4 text-center mb-4">Fekra Company Medical Advertising</h2>
               <div className="row">


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



               <div className="col-md-12">
                  <p className="footer-info">
                     Fekra is a leading medical advertising company that specializes in providing innovative and effective marketing solutions for healthcare companies and institutions. With a firm belief in the power of advertising and marketing in the success of medical businesses, Fekra was founded to help these organizations effectively communicate with their target audience and strengthen their position in the market.
                     At Fekra, we offer our services in both English and Arabic, recognizing the importance of catering to a diverse clientele. By leveraging these two languages, we ensure seamless communication with clients across different regions in the Arab world as well as the Western market, delivering exceptional services in the language that our clients feel comfortable and confident in.
                  </p>
               </div>

               </div>
         </div>
      </Fragment>
   )
}
