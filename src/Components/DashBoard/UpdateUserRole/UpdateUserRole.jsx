import React, { Fragment } from 'react'
import axios from "axios";
import { useFormik } from "formik" ;
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import Swal from 'sweetalert2';

export default function UpdateUserRole() {
   const {id} = useParams();
   const navigate  = useNavigate()

   let header = {
      token:localStorage.getItem("token"),
   };

   async function submitUpdateRole(values){
      let {data} = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/role/${id}` , values ,  {headers:header})
      .catch((error)=>{
         toast.error(error.response.data.message)
      })

      if(data.message === "success"){
            Swal.fire({
               position: "top-center",
               icon: "success" ,
               title: "Your work has been saved",
               showConfirmButton: false,
               timer: 1500
            });
            navigate(`/dashboard/specificUser/${id}`)
      }
   }

   let validationSchema = Yup.object({
      role:Yup.string().required() ,
   })




   let formik = useFormik({
      initialValues:{
         role:"" ,
      } , validationSchema , 
      onSubmit:submitUpdateRole
   })


   
   return (
      <Fragment>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Update User Role</h1>
            <div className='under-header'></div>

            <form action="" onSubmit={formik.handleSubmit}>

               <div className="my-4">
                  <label htmlFor="role" className="form-label">Enter User Role</label>
                  <select name="role" id="role"  className="form-control"
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} 
                        value={formik.values.role} >

                     <option value="">Select Role</option>
                     <option value="admin">Admin</option>    
                     <option value="moderator">Moderator</option>    
                     <option value="user">User</option>    
                  </select>

                  {formik.errors.role && formik.touched.role?<div className="alert alert-danger mt-4 p-2">{formik.errors.role}</div> :""}
               </div>

               <div className="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-sm mt-2">Send Data</button>
               </div>

            </form>
         </div>
      </Fragment>
   )
}
