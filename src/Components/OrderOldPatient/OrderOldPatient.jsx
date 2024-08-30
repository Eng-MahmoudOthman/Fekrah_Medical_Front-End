import React, { Fragment, useContext , useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PatientContext } from '../../Context/PatientContext.js';

export default function OrderOldPatient() {
   const [patientName , setPatientName] = useState([]) ;
   const {setPatient} = useContext(PatientContext) ;
   let navigate = useNavigate()

   let header = {
      token:localStorage.getItem("token"),
   };



   async function searchInput (e){
      if(e.target.value.length >= 8){
         searchPatientName(e.target.value)
         navigate('/order/oldPatient')
      }
      if(e.target.value.length == 0){
         setPatientName([])
      }
   }


   async function searchPatientName(phoneNumber){
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/patient?keyword=${phoneNumber}` , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title: "Not Found Patient This Number",
            text: error.response.data.message ,
            icon: "error"
         });
         setPatientName([])

      })
      if(response?.data.message === "success"){
         setPatientName(response.data.patients)
      }
   }


   async function getPatientData (id){
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/patient/${id}` , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title: "Not Found Patient",
            text: error.response.data.message ,
            icon: "error"
         });
      })
      if(response?.data.message === "success"){
         // console.log(response.data.patient);
         setPatient(response.data.patient) ;
         navigate(`updateOldPatient`) ;
         setPatientName([])
      }
   }

   return (
      <Fragment>

         <div className="w-75 p-2 m-auto mt-5 OrderLoggedUser">

            <div>
               <h1 className="main-header">Search in Old Patient</h1>
               <div className='under-header'></div>

               <div className='mb-4 border border-2 rounded-1 p-2 text-center'>
                  <form action="">
                     <label htmlFor="search" className='form-label'>أدخل رقم موبايل المريض المراد البحث عنة</label>
                     <input type="search" className='form-control' onChange={(e)=>{searchInput(e)}} id='search' placeholder='Enter Patient Phone' />
                  </form>
                  {patientName.length? <>
                  
                     {patientName.map((ele)=><div onClick={()=>{getPatientData(ele._id)}} className='d-flex justify-content-between align-items-center border border-2 rounded-2 m-2 px-2 py-1 cart_patient'>
                        <h6><i className="fa-solid fa-address-card me-4"></i> {ele.patient_Age} : السن </h6>
                        <h6>{ele.patient_Name} : اسم المريض  </h6>
                     </div>)}
                  </> : <div className='alert alert-danger my-4'>Not Found Patient This Phone Number</div>}
               </div>
            </div>

            <div>
               <Outlet></Outlet> 
            </div>
         </div>

      </Fragment>
   )
}

