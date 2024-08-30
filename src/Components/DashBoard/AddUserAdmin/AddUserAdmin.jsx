import React, { Fragment } from 'react'
import axios from "axios";
import { useFormik } from "formik" ;
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import Swal from 'sweetalert2';

export default function AddUserAdmin() {

   let header = {
      token:localStorage.getItem("token"),
   };

   async function submitAddUser(values){
      let {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users` , values ,  {headers:header})
      .catch((error)=>{
         toast.error(error.response.data.message)
      })

      if(data.message === "success"){
            Swal.fire({
               title: `
                  Name: ${values.name}
                  Email: ${values.email}
                  Password :${values.password}
                  phone: ${values.phone}
                  birthDay: ${values.birthDay}
                  Role: ${values.role}
               `,
               showClass: {
               popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
               `
               },
               hideClass: {
               popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
               `
               }
            });
      }
   }

   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      email:Yup.string().email().required().trim() ,
      phone:Yup.string().required().trim() ,
      birthDay:Yup.string().required().trim() ,
      role:Yup.string().required() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      rePassword:Yup.string().oneOf([Yup.ref("password")]  , "rePassword Should be Same Password").required() ,
   })




   let formik = useFormik({
      initialValues:{
         name:"" ,
         phone:"" ,
         email:"" ,
         role:"" ,
         birthDay:"" ,
         password:"" ,
         rePassword:"" 
      } , validationSchema , 
      onSubmit:submitAddUser
   })
   return (
      <Fragment>

         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Add Now User</h1>
            <div className='under-header'></div>

            <form action="" onSubmit={formik.handleSubmit}>

               <div className="my-4">
                  <label htmlFor="name" className="form-label">Enter User Name</label>
                  <input type="text" 
                     value={formik.values.name}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="name"  
                     name="name" 
                     placeholder="Mahmoud Othman" />
                  {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-4 p-2">{formik.errors.name}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="email" className="form-label">Enter User Email</label>
                  <input type="email" 
                     value={formik.values.email}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="email"  
                     name="email" 
                     placeholder="name@example.com" />
                  {formik.errors.email  && formik.touched.email?<div className="alert alert-danger mt-4 p-2">{formik.errors.email}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="phone" className="form-label">Enter User Phone</label>
                  {/* <input type="tel"  */}
                  <input type="text" 
                     value={formik.values.phone}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="phone"  
                     name="phone" 
                     placeholder="01X XXX XXX XX" />
                  {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger mt-4 p-2">{formik.errors.phone}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="birthDay" className="form-label">Enter User birthDay</label>
                  {/* <input type="tel"  */}
                  <input type="date" 
                     value={formik.values.birthDay}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="birthDay"  
                     name="birthDay" 
                     placeholder="xxxx-xx-xx" />
                  {formik.errors.birthDay && formik.touched.birthDay?<div className="alert alert-danger mt-4 p-2">{formik.errors.birthDay}</div> :""}
               </div>


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


               <div className="my-4">
                  <label htmlFor="password" className="form-label">Enter User Password</label>
                  <input type="password" 
                     value={formik.values.password}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="password"  
                     name="password" 
                     placeholder="Enter Password" />
                  {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-4 p-2">{formik.errors.password}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="rePassword" className="form-label">Enter User rePassword</label>
                  <input type="password" 
                     value={formik.values.rePassword}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="rePassword"  
                     name="rePassword" 
                     placeholder="Enter rePassword" />
                  {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger mt-4 p-2">{formik.errors.rePassword}</div> :""}
               </div>



               <div className="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-sm mt-2">Add User</button>
               </div>

            </form>
         </div>

      </Fragment>
   )
}
