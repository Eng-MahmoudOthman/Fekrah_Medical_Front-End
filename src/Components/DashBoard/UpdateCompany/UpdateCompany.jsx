import React, { Fragment, useContext, useState } from 'react'
import { CompanyContext } from '../../../Context/CompanyContext.js'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';




export default function UpdateCompany() {

   const navigate = useNavigate()
   const{ company } = useContext(CompanyContext)
   let header = {
      token:localStorage.getItem("token"),
   };


   const [error , setError] = useState(null)
   const [loading , setLoading] = useState(false)


   async function UpdateCompany(values){
      setLoading(true)
      let response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/company/${company._id}` , values , {headers:header})
      .catch((error)=>{
         setError(error.response.data.message)
         toast.error(error.response.data.message)
         setLoading(false)
      })
      
      if(response?.data.message === "success"){
         setLoading(false)
         navigate(`/dashboard/companyDashboard`)
         toast.success("Successfully Change")
      }
   }

   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Company Should be More than 2").max(50 , "Company less than 50").required("Company is Required").trim() ,
      address:Yup.string().required().trim() ,
      phone:Yup.string().required().trim() ,
      description:Yup.string().min(2 , "Company Should be More than 2").max(500 , "Company less than 500").required("Company is Required").trim() ,
      
      isActive:Yup.boolean().required().oneOf([true ,false]) ,
   })




   let formik = useFormik({
      initialValues:{
         name:company.name || "" ,
         address:company.address || "",
         phone:company.phone || "",
         description:company.description || "",
         isActive: company.isActive || "", 
      }  , validationSchema , 
      onSubmit:UpdateCompany
   })




   return (
      <Fragment>
         <div className="w-75 p-2 m-auto mt-5 OrderLoggedUser ">
            <h1 className="main-header">Update Company</h1>
            <div className='under-header'></div>

            <form action="" onSubmit={formik.handleSubmit}>

               {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

               <div className="my-4">
                  <label htmlFor="name" className="form-label">Enter Company Name</label>
                  <input type="text" 
                     value={formik.values.name}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="name"  
                     name="name" 
                     placeholder="Name Company" />
                  {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-4 p-2">{formik.errors.name}</div> :""}
               </div>




               <div className="my-4">
                  <label htmlFor="phone" className="form-label">Enter Company Phone</label>
                  <input type="text" 
                     value={formik.values.phone}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="phone"  
                     name="phone" 
                     placeholder="000-00-000-000" />
                  {formik.errors.phone  && formik.touched.phone?<div className="alert alert-danger mt-4 p-2">{formik.errors.phone}</div> :""}
               </div>





               <div className="my-4">
                  <label htmlFor="address" className="form-label">Enter Address</label>
                  <input type="text" 
                     value={formik.values.address}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="address"  
                     name="address" 
                     placeholder="Enter Address" />
                  {formik.errors.address && formik.touched.address?<div className="alert alert-danger mt-4 p-2">{formik.errors.address}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="description" className="form-label">Enter Description</label>
                  <input type="text" 
                     value={formik.values.description}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="description"  
                     name="description" 
                     placeholder="Enter Description" />
                  {formik.errors.description && formik.touched.description?<div className="alert alert-danger mt-4 p-2">{formik.errors.description}</div> :""}
               </div>



               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value="true"
                     id="true"
                     name="isActive" />
                  <label className="form-check-label" htmlFor="true">Active</label>
               </div>



               <div className="form-check form-check-inline mx-5">
                  <input className="form-check-input" type="radio" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value="false"
                     id="false"
                     name="isActive" />
                  <label className="form-check-label" htmlFor="false">Blocked</label>
               </div>

               <div class="d-grid gap-2 col-6 mx-auto">
                  {loading? 
                     <button className="btn bg-main text-white btn-lg mt-2 w-50 m-auto"><i class="fa fa-spinner fa-spin text-white fa-1x"></i></button>
                     : 
                     <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-lg mt-2">Update Company</button>
                  }
               </div>
               
            </form>
         </div>      
      </Fragment>
   )
}
