import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { CompanyContext } from '../../../Context/CompanyContext.js';



export default function SpecificCompany() {

   const{id} = useParams () ;
   const{getCompany , company , testCount } = useContext(CompanyContext)
   const navigate = useNavigate()


   let header = {
      token:localStorage.getItem("token"),
   };


   async function deleteCompany(){
      let response =   await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/company/${id}`  ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         toast.success("Successfully Deleted Company");
         navigate("/dashboard/companyDashboard")
      }
   }


   useEffect(() => {
      getCompany(id)
   }, [])
   
   return (
      <Fragment>
         <div className="container mt-5">
            <h1 className='main-header'>Specific Company</h1>
            <div className='under-header'></div>

            <div className="row ">
               <div className="col-md-12 mb-4">
                  <h4 className='fw-bold'>Company Information :</h4>
                  <div className='border border-1 p-2 rounded-2'>

                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">Name :</th>
                              <td>{company.name}</td>
                           </tr>
                           <tr>
                              <th scope="row">Phone:</th>
                              <td>{company.phone}</td>
                           </tr>
                           <tr>
                              <th scope="row">Email:</th>
                              <td>{company.email}</td>
                           </tr>
                           <tr>
                              <th scope="row">Description:</th>
                              <td>{company.description}</td>
                           </tr>
                           <tr>
                              <th scope="row">State:</th>
                              <td>{company.isActive? <p className='text-success'>Active Company</p> : <p className='text-danger'>Not Active Company</p>}</td>
                           </tr>

                           <tr>
                              <th scope="row">Test Count:</th>
                              <td>{testCount}</td>
                           </tr>

                           <tr>
                              <th scope="row">Logo:</th>

                              <td className='text-center'>
                                 <img src={company.logo?.secure_url} className='w-50' alt={company.name} />
                              </td>
                           </tr>

                        </tbody>
                     </table>

                     <div className='text-center'>
                        <Link to="/dashboard/updateCompany"  className='btn btn-sm btn-outline-primary'>Update Company</Link>
                        <Link to="/dashboard/changeImageCompany"   className='btn btn-sm btn-outline-primary m-2'>Change Image</Link>
                        <button onClick={()=>{deleteCompany()}}  className='btn btn-sm btn-outline-danger'>Delete Company</button>
                     </div>
                     
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
}
