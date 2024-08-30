import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import {useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function SpecificPatient() {
   const {id} = useParams();

   const [patient ,  setPatient] = useState({}) ;

   let header = {
      token:localStorage.getItem("token"),
   };


   async function getSpecificPatient (){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/patient/${id}`  , {headers:header} )
      .catch((error)=>{
         Swal({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setPatient(response?.data.patient)        
         }
   }



   useEffect(() => {
      getSpecificPatient()
   }, [])
   

   return (
      <Fragment>
         <div className="container mt-5 homeDashboard">
            <h1 className='main-header'>Specific Patient</h1>
            <div className='under-header'></div>

            <div className="row ">
               <div className="col-md-12 mb-4">
                  <h4 className=''>Test Information :</h4>
                  <div className='border border-1 p-2 rounded-2'>
                     
                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">patient_Name :</th>
                              <td className='text-center'>{patient.patient_Name}</td>
                           </tr>
                           <tr>
                              <th scope="row">patient_Age :</th>
                              <td className='text-center'>{patient.patient_Age}</td>
                           </tr>
                           <tr>
                              <th scope="row">gender:</th>
                              <td className='text-center'>{patient.gender}</td>
                           </tr>
                           <tr>
                              <th scope="row">patient_Phone:</th>
                              <td className='text-center'>{patient.patient_Phone}</td>
                           </tr>
                           <tr>
                              <th scope="row">birthDay:</th>
                              <td className='text-center'>{patient.birthDay?.slice(0 , 10)}</td>
                           </tr>
                           <tr>
                              <th scope="row">patient_History:</th>
                              <td className='text-center'>{patient.patient_History}</td>
                           </tr>

                        </tbody>

                     </table>

                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
}
