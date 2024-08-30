import axios from 'axios'
import { useFormik } from 'formik'
import React, { Fragment, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { TestContext } from '../../../Context/TestContext.js'


export default function UpdateTest() {
   const{id} = useParams() ;
   const {test} = useContext(TestContext) ;
   let navigate = useNavigate() ;

   let header = {
      token:localStorage.getItem("token"),
   };


   async function submitUpdateTest(values){
      Swal.fire({
         title: "Do you want to save the changes?",
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: "Save",
         denyButtonText: `Don't save`
      }).then(async(result) => {
         if (result.isConfirmed) {
            let response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/test/${id}` , values , {headers:header})
            .catch((error)=>{
               Swal.fire({
                  title:error.response.data.message  ,
                  text: "Please Try Again" ,   
                  icon: "error"
                  });
            });
            if(response?.data.message === "success"){
               navigate(`/dashBoard/specificTest/${id}`)
            }
         Swal.fire("Saved! Success Updated Test", "", "success");
         } else if (result.isDenied) {
         Swal.fire("Changes are not saved", "", "info");
         }
      });

   }


   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      description:Yup.string().min(2 , "Description Should be More than 2").max(500 , "Description less than 500").required("Description is Required").trim() ,
      condition:Yup.string().min(2 , "Condition Should be More than 2").max(500 , "Condition less than 500").required("Condition is Required").trim() ,
      isActive:Yup.string().required() ,
   })




   let formik = useFormik({
      initialValues:{
         name: test.name || "" ,
         description: test.description || "" ,
         condition: test.condition || "" ,
         isActive : "" ,
      } , validationSchema , 
      onSubmit:submitUpdateTest
   })


   return (
      <Fragment>

         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Update Test</h1>
            <div className='under-header'></div>
            <form action="" onSubmit={formik.handleSubmit}>

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


               <div>
                  <h6>Choose Test State :</h6>
                  <div className="form-check form-check-inline">
                     <input className="form-check-input" type="radio" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={true}
                        id="active"
                        name="isActive" />
                     <label className="form-check-label" htmlFor="active">Active</label>
                  </div>



                  <div className="form-check form-check-inline mx-5">
                     <input className="form-check-input" type="radio" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={false}
                        id="blocked"
                        name="isActive" />
                     <label className="form-check-label" htmlFor="blocked">Blocked</label>
                  </div>
               </div>

               <div className="d-grid gap-2 col-6 mx-auto my-5">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-sm mt-2">Send Data</button>
               </div>

            </form>
         </div>

      </Fragment>
   )
}
