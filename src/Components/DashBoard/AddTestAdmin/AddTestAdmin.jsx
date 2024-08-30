import axios from 'axios'
import { useFormik } from 'formik'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { CompanyContext } from '../../../Context/CompanyContext.js'
import { TestContext } from '../../../Context/TestContext.js'



export default function AddTestAdmin() {
   const navigate = useNavigate() ;
   const [check , setCheck] = useState(true)
   const{allCompanyInfo  , getAllCompanyInfo} = useContext(CompanyContext)
   const{getAllTests , tests } = useContext(TestContext)
   let header = {
      token:localStorage.getItem("token"),
   };


   
   async function submitAddTest(values){
      let response =   await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/test` , values , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      });

      if(response?.data.message === "success"){
         Swal.fire({
            title:response?.data.message  ,
            text: check ? "Success Added New Test" : "Success Added New Price" ,   
            icon: "success"
         });
         navigate('/dashBoard/testDashboard')
      }
   }

   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      description:Yup.string().min(2 , "Description Should be More than 2").max(500 , "Description less than 50").trim() ,
      condition:Yup.string().min(2 , "Condition Should be More than 2").max(500 , "Condition less than 50").trim() ,
      company:Yup.string().max(24 , "Company less than 14").required("Company is Required") ,
      price:Yup.number().required() ,
      discount:Yup.number().required() ,
      final_amount:Yup.number().required() ,
   })



   let formik = useFormik({
      initialValues:{
         name:"" ,
         description:"" ,
         condition:"" ,
         company:"" ,
         price:"" ,
         discount:"" ,
         final_amount:"" 
      } , validationSchema , 
      onSubmit:submitAddTest
   })


   useEffect(() => {
      getAllCompanyInfo() ;
      getAllTests() ;
   }, [])
   

   return (
      <Fragment>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Add New Test</h1>
            <div className='under-header'></div>



            <form action="" className='d-flex justify-content-around'>
                  <div>
                     <label htmlFor="test" className="form-label">New Test</label>
                     <input onChange={()=>{setCheck(true)}} checked={check} type="radio" name="check" id="test" className='ms-4'/>
                  </div>

                  <div>
                     <label htmlFor="price" className="form-label">New Price</label>
                     <input onChange={()=>{setCheck(false)}} type="radio" name="check" id="price" className='ms-4 form-lg' />
                  </div>
            </form>




            <form action="" onSubmit={formik.handleSubmit}>

               {check ? <><h6 className='mt-4'>Please Enter Information Test  <i class="fa-solid fa-bed mx-2 text-danger"></i>  :</h6> </> : <><h6  className='mt-4'>Please Enter Information Company Price : </h6></>}


               {check ? <>
                  <div className="my-4">
                     <label htmlFor="name" className="form-label">Enter Test Name</label>
                     <input type="text" 
                        value={formik.values.name}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="name"  
                        name="name" 
                        placeholder="Enter Test Name" />
                     {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-4 p-2">{formik.errors.name}</div> :""}
                  </div>
               </> : <>
                  <div className="my-4">
                     <label htmlFor="name" className="form-label">Enter Test Name</label>
                     <select name="name" id="name"  className="form-control"
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur} 
                           value={formik.values.name} >

                        <option value="">Select Test Name</option>
                        {tests.map((ele)=>{
                           return (
                              <option value={ele.name}>{ele.name}</option>
                           )
                        })}      
                     </select>

                     {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-4 p-2">{formik.errors.name}</div> :""}
                  </div>
               </>}



               {check ? <>
                     <div className="my-4">
                        <label htmlFor="description" className="form-label">Write Description</label>
                        <input type="text" 
                           value={formik.values.description}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="description"  
                           name="description" 
                           placeholder="Write Description" />
                        {formik.errors.description  && formik.touched.description?<div className="alert alert-danger mt-4 p-2">{formik.errors.description}</div> :""}
                     </div>


                     <div className="my-4">
                        <label htmlFor="condition" className="form-label">Write Test Condition</label>
                        <input type="text" 
                           value={formik.values.condition}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="condition"  
                           name="condition" 
                           placeholder="Write Test Condition" />
                        {formik.errors.condition && formik.touched.condition?<div className="alert alert-danger mt-4 p-2">{formik.errors.condition}</div> :""}
                     </div>
               </> : <></>}


               <div className="my-4">
                  <label htmlFor="company" className="form-label">Enter Company</label>
                  <select name="company" id="company"  className="form-control"
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} 
                        value={formik.values.company} >

                     <option value="">Select Company</option>
                     {allCompanyInfo.map((ele)=>{
                        return (
                           <option value={ele._id}>{ele.name}</option>
                        )
                     })}      
                  </select>

                  {formik.errors.company && formik.touched.company?<div className="alert alert-danger mt-4 p-2">{formik.errors.company}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="price" className="form-label">Enter Price</label>
                  <input type="number" 
                     value={formik.values.price}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="price"  
                     name="price" 
                     placeholder="Enter Price" />
                  {formik.errors.price && formik.touched.price?<div className="alert alert-danger mt-4 p-2">{formik.errors.price}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="discount" className="form-label">Enter Discount</label>
                  <input type="number" 
                     value={formik.values.discount}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="discount"  
                     name="discount" 
                     placeholder="Enter Discount" />
                  {formik.errors.discount && formik.touched.discount?<div className="alert alert-danger mt-4 p-2">{formik.errors.discount}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="final_amount" className="form-label">Enter Final Amount</label>
                  <input type="number" 
                     value={formik.values.final_amount}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="final_amount"  
                     name="final_amount" 
                     placeholder="Enter Final Amount" />
                  {formik.errors.final_amount && formik.touched.final_amount?<div className="alert alert-danger mt-4 p-2">{formik.errors.final_amount}</div> :""}
               </div>



               <div className="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-sm mt-2">Send Data</button>
               </div>

            </form>
         </div>

      </Fragment>
   )
}
