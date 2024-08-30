import React, {useState } from 'react' ;
import { useFormik } from "formik" ;
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link, useNavigate} from "react-router-dom";
// import logo from "../../../Assets/images/approved_logo.jpg"
import logo from "../../../Assets/images/approved.webp"
import { Fragment } from 'react';
// import logo from "../../../Assets/images/transportation.jpg"





export default function TransportationOnline() {
   const [url , setUrl] = useState("") ;
   let navigate = useNavigate()
   let header = {
      token:localStorage.getItem("company_token")  ,
   };

   //& Handle Phone Empty Or Email Empty :
   async function submitTransportation(values){
      let response =   await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/order/transform_Online_System` , values , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setUrl(response?.data.url)
         Swal.fire({
            position: "top-center",
            icon: "success",
            title:  "Approved Successfully Please Print The PDF File Attention Appear File Only One !" ,
            showConfirmButton: true,
            timer: 10000
         });
      }
   }



   let validationSchema = Yup.object({
      email:Yup.string().email().trim() ,
      invoice_number:Yup.string().required().matches(/^[0-9]{10}$/ , "should be Invoice Number Contain 10 Number")
   })



   let formik = useFormik({
      initialValues:{
         email:"" ,
         invoice_number:"" ,
      } , validationSchema , 
      onSubmit:submitTransportation
   })


   return (

      <Fragment>
         <div className="container">
            <h1 className='main-header mt-5 pt-5'>transportation Online</h1>
            <div className='under-header'></div>  

            <div className="row m-0">

               <div className="col-md-12">
                  <div className='text-center'>
                     <img src={logo} className='rounded-2 w-100 ' alt="approved"  />
                  </div>
               </div>


               <form  className='' onSubmit={formik.handleSubmit}>
                  <h4 className='text-center my-4'>Enter Your Branch Email And Invoice Number Please !</h4>

                  <div className="my-4  offset-md-2 col-md-8">
                     <label htmlFor="email" className="form-label">Enter Your Branch Email</label>
                     <input type="email" 
                        value={formik.values.email}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="email"  
                        name="email" 
                        placeholder="Branch Email @ example.com" />
                     {formik.errors.email  && formik.touched.email?<div className="alert alert-danger mt-4 p-2">{formik.errors.email}</div> :""}
                  </div>

                  <div className="my-4 offset-md-2  col-md-8">
                     <label htmlFor="invoice_number" className="form-label">Enter Invoice Number</label>
                     <input type="text" 
                        value={formik.values.invoice_number}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="invoice_number"  
                        name="invoice_number" 
                        placeholder="Enter Invoice Number [ 00-00-00-0000 ]"
                        maxLength={10}
                        />
                     {formik.errors.invoice_number && formik.touched.invoice_number?<div className="alert alert-danger mt-4 p-2">{formik.errors.invoice_number}</div> :""}
                  </div>

                  <div className="offset-md-2  col-md-8">
                     <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn w-100 bg-main text-white btn-sm mt-2">Send Invoice Number</button>
                     {url ? 
                        <>
                           <Link to={url} download target='_blank' className="btn w-50 btn-outline-primary btn-sm my-4">Download PDF Transform  <i class="fa-solid fa-file-pdf mx-4"></i> </Link>
                        </> : <></>}
                  </div>

               </form>

            </div>
         </div>
      </Fragment>

   )
}
