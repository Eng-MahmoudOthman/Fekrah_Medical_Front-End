import axios from "axios";
import { useFormik } from "formik" ;
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';



export default function Register(){

   let navigate = useNavigate()
   const [error , setError] = useState(null)
   const [loading , setLoading] = useState(false)

   async function submitRegister(values){
      setLoading(true)
      let {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signUp` , values)
      .catch((error)=>{
         setError(error.response.data.message)
         toast.error(error.response.data.message)
         setLoading(false)
      })

      if(data.message === "success"){
         setLoading(false)
         navigate("/login")
         console.log(data.token);
         localStorage.setItem("token" , data.token)
      }
   }


   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      email:Yup.string().email().required().trim() ,
      phone:Yup.string().required().trim() ,
      birthDay:Yup.string().required().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      rePassword:Yup.string().oneOf([Yup.ref("password")]  , "rePassword Should be Same Password").required() ,
   })


   let formik = useFormik({
      initialValues:{
         name:"" ,
         phone:"" ,
         email:"" ,
         birthDay:"" ,
         password:"" ,
         rePassword:"" 
      } , validationSchema , 
      onSubmit:submitRegister
   })

   return (
      <Fragment>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Register Now</h1>
            <div className='under-header'></div>

            <form action="" onSubmit={formik.handleSubmit}>

               {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

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



               <div className="d-grid gap-2 col-8 mx-auto">
                  {loading ? 
                        <button className="btn bg-main text-white btn-sm mt-2"> <i class="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                     : 
                        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-sm mt-2">Register</button>
                  }
                  <p className="text-center mt-1">Don't have an account?<Link className="m-2 text-primary" to="/login" >  Log in </Link></p>
               </div>

            </form>
         </div>
      </Fragment>
   )
} 