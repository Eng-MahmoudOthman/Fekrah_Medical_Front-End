import { useFormik } from "formik" ;
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import axios from "axios";
import Swal from 'sweetalert2';
import { Fragment } from "react";

export default function LoginOnlineSystem(){
   let navigate = useNavigate()

   //& Handle Phone Empty Or Email Empty :
   async function submitLogin(values){
      let {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signInCompany` , values)
      .catch((error)=>{
         toast.error(error.response.data.message)
      })
      
      //^ Check Login Success User :
         if(data?.message === "success"){
            // & save Token In Local Storage And Save Token in Use Context :
            toast.success("Success")
            localStorage.setItem("company_token" , data.token) ;
            localStorage.setItem("company" , JSON.stringify(data.company))
            navigate("transportation") ;

            setTimeout(() => {
               logOut()
            }, (60*60*1000)); // After 2 hours  logout
            // 60*10*1000 = 600,000= 10 minute
            // 60*20*2*1000 = 2400,000= 1/3 hours
            // 60*60*1000 = 3600,000= 1 hours  
            // 60*60*2*1000 = 7200,000= 2 hours  
         }else{
            navigate("/onlineSystem") ;
         }
      }


   //& Handle Log Out :
   function logOut(){
      localStorage.removeItem("company")
      localStorage.removeItem("company_token")
      navigate("/onlineSystem")
      Swal.fire({
         title:"Session Expired !" ,
         text: "Session Expired .Please Try Log in Again !!" ,   
         icon: "error"
      });
   }


   let validationSchema = Yup.object({
      email:Yup.string().email().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{7,}$/ , "should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
   })


   let formik = useFormik({
      initialValues:{
         email:"" ,
         password:"" ,
      } , validationSchema , 
      onSubmit:submitLogin
   })


   return (
      <Fragment>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Log in Now Please !</h1>
            <div className='under-header'></div>

            

            <p className="text-secondary">Enter Your Company Email And Password To Sign in !</p>

            <form action="" onSubmit={formik.handleSubmit}>

               <div className="my-4">
                  <label htmlFor="email" className="form-label">Enter Your Company Email</label>
                  <input type="email" 
                     value={formik.values.email}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="email"  
                     name="email" 
                     placeholder="Company@example.com" />
                  {formik.errors.email  && formik.touched.email?<div className="alert alert-danger mt-4 p-2">{formik.errors.email}</div> :""}
               </div>

               <div className="my-4">
                  <label htmlFor="password" className="form-label">Enter Your Company Password</label>
                  <input type="password" 
                     value={formik.values.password}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="password"  
                     name="password" 
                     placeholder="Enter Password" />
                  {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-4 p-2">{formik.errors.password}</div> :""}
               </div>

               <div className="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-sm mt-2">Login</button>
               </div>

            </form>

         </div>
      </Fragment>
   )
} 