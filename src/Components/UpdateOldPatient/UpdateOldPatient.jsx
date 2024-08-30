import React, { Fragment, useContext , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext.js';
import { PatientContext } from '../../Context/PatientContext.js';
import { UserContext } from '../../Context/UserContext.js';


export default function UpdateOldPatient({socket}) {
   const [error , setError] = useState(null) ;
   const [loading , setLoading] = useState(false) ;
   const { patient } = useContext(PatientContext) ;
   const { setItemCount} = useContext(CartContext) ;
   const { loggedUser} = useContext(UserContext) ;
   const navigate = useNavigate()

   let header = {
      token:localStorage.getItem("token"),
   };



   async function submitOrder(values){
      setLoading(true)
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/order/orderLoggedUser` , values , {headers:header})
      .catch((error)=>{
         setError(error.response.data.message)
         toast.error(error.response.data.message)
         setLoading(false)
      })

      if(response?.data.message === "success"){
         // toast.success(`${data.message == "success"? "Success" : ""} Complete Order`) ;
         toast.success(`${response.data.message.charAt(0).toUpperCase()}${response.data.message.slice(1)} Complete Order`)
         setItemCount(0)
         setLoading(false)
         navigate(`/sendInvoice/${response.data.add_Invoice_Order._id}`)

         //^ Socket Send Notification :
         socket.emit("sendNotification" , {
            sender:loggedUser.email ,
            type:"addOrder"
         })
      }
   }

   let validationSchema = Yup.object({
      patient_Name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      patient_Phone:Yup.string().required().trim() ,
      branch:Yup.string().required().trim() ,
      birthDay:Yup.string().required().trim() ,
      gender:Yup.string().required().oneOf(["male" , "female"]) ,
      doctor_Name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim()  ,
      city:Yup.string().min(2 , "Name Should be More than 2").max(200 , "Name less than 200").required("Name is Required").trim()  ,
      street:Yup.string().min(2 , "Name Should be More than 2").max(200 , "Name less than 200").required("Name is Required").trim()  ,
      patient_History:Yup.string().min(2 , "Name Should be More than 2").max(500 , "Name less than 500").required("Name is Required").trim()  ,
   })

   let formik = useFormik({
      initialValues:{
         patient_Name: patient.patient_Name || "" ,
         patient_Phone: patient.patient_Phone || "",
         birthDay: patient.birthDay?.slice(0,10) || "",
         gender: patient.gender || "" ,
         doctor_Name: patient.doctor_Name || "" ,
         city: patient.address?.city ||  "" ,
         street: patient.address?.street || "" ,
         branch: "" ,
         patient_History: patient.patient_History || ""
      }  , validationSchema , 
      onSubmit:submitOrder
   })


   return (
      <Fragment>
         <div className="p-2 m-auto mt-5 OrderLoggedUser ">
            <h1 className="main-header">Search in Old Patient</h1>
            <div className='under-header'></div>

            <form action="" onSubmit={formik.handleSubmit}>
               {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

               <div className="my-4">
                  <label htmlFor="patient_Name" className="form-label">Enter User Name</label>
                  <input type="text" 
                     value={formik.values.patient_Name}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="patient_Name"  
                     name="patient_Name" 
                     placeholder="Mahmoud Othman" />
                  {formik.errors.patient_Name && formik.touched.patient_Name?<div className="alert alert-danger mt-4 p-2">{formik.errors.patient_Name}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="patient_Phone" className="form-label">Enter User Phone</label>
                  {/* <input type="tel"  */}
                  <input type="text" 
                     value={formik.values.patient_Phone}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="patient_Phone"  
                     name="patient_Phone" 
                     placeholder="01X XXX XXX XX" />
                  {formik.errors.patient_Phone && formik.touched.patient_Phone?<div className="alert alert-danger mt-4 p-2">{formik.errors.patient_Phone}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="birthDay" className="form-label">Enter User birthDay</label>
                  <input type="text" 
                     value={formik.values.birthDay}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="birthDay"  
                     name="birthDay" 
                     placeholder="YYYY-MM-DD" />
                  {formik.errors.birthDay  && formik.touched.birthDay?<div className="alert alert-danger mt-4 p-2">{formik.errors.birthDay}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="gender" className="form-label">Enter Male Or Female</label>
                  {/* <input type="tel"  */}
                  <input type="text" 
                     value={formik.values.gender}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="gender"  
                     name="gender" 
                     placeholder="Male Or Female" />
                  {formik.errors.gender && formik.touched.gender?<div className="alert alert-danger mt-4 p-2">{formik.errors.gender}</div> :""}
               </div>



               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value="male"
                     id="male"
                     name="gender" />
                  <label className="form-check-label" htmlFor="male">Male</label>
               </div>



               <div className="form-check form-check-inline mx-5">
                  <input className="form-check-input" type="radio" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value="female"
                     id="female"
                     name="gender" />
                  <label className="form-check-label" htmlFor="female">Female</label>
               </div>



               <div className="my-4">
                  <label htmlFor="doctor_Name" className="form-label">Enter doctor_Name</label>
                  {/* <input type="tel"  */}
                  <input type="text" 
                     value={formik.values.doctor_Name}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="doctor_Name"  
                     name="doctor_Name" 
                     placeholder="doctor_Name" />
                  {formik.errors.doctor_Name && formik.touched.doctor_Name?<div className="alert alert-danger mt-4 p-2">{formik.errors.doctor_Name}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="city" className="form-label">Enter city</label>
                  <input type="text" 
                     value={formik.values.city}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="city"  
                     name="city" 
                     placeholder="Enter city" />
                  {formik.errors.city && formik.touched.city?<div className="alert alert-danger mt-4 p-2">{formik.errors.city}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="street" className="form-label">Enter street</label>
                  <input type="text" 
                     value={formik.values.street}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="street"  
                     name="street" 
                     placeholder="Enter street" />
                  {formik.errors.street && formik.touched.street?<div className="alert alert-danger mt-4 p-2">{formik.errors.street}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="branch" className="form-label">Enter branch</label>
                  <input type="text" 
                     value={formik.values.branch}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="branch"  
                     name="branch" 
                     placeholder="Enter branch" />
                  {formik.errors.branch && formik.touched.branch?<div className="alert alert-danger mt-4 p-2">{formik.errors.branch}</div> :""}
               </div>



               <div className="my-4">
                  <label htmlFor="patient_History" className="form-label">Enter patient_History</label>
                  <textarea value={formik.values.patient_History}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="patient_History"  
                     name="patient_History" 
                     placeholder="Enter patient_History"  rows={6}></textarea>
                  {formik.errors.patient_History && formik.touched.patient_History?<div className="alert alert-danger mt-4 p-2">{formik.errors.patient_History}</div> :""}
               </div>



               <div class="d-grid gap-2 col-6 mx-auto">
                  {loading? 
                     <button className="btn bg-main text-white btn-lg mt-2 w-50 m-auto"><i class="fa fa-spinner fa-spin text-white fa-1x"></i></button>
                     : 
                     <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-lg mt-2">Send Data</button>
                  }
               </div>
               
            </form>
         </div>    
      </Fragment>
   )
}
