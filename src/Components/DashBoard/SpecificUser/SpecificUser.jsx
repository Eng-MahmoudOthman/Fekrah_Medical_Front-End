import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function SpecificUser() {
   const {id} = useParams();
   const navigate = useNavigate() ;

   const[user , setUser] = useState({}) ;
   let header = {
      token:localStorage.getItem("token"),
   };


   async function getSpecificUser (id){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}`  ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setUser(response.data.user);
      }
   }


   async function statUser (action){
      if(action == "delete"){
         let response =   await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}`  , {headers:header} )
         .catch((error)=>{
            Swal.fire({
               title:error.response.data.message  ,
               text: "Please Try Again" ,   
               icon: "error"
               });
         })
         if(response?.data.message === "success"){
            Swal.fire({
               title:"Successfully"  ,
               text: "Successfully Deleted User" ,   
               icon: "success"
               });         
            }
            navigate("/dashBoard/userDashboard")
      }else{
         let response =   await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}?block=${action}`  , {} ,   {headers:header} )
         .catch((error)=>{
            Swal.fire({
               title:error.response.data.message  ,
               text: "Please Try Again" ,   
               icon: "error"
               });
         })
         if(response?.data.message === "success"){
            Swal.fire({
               title:"Successfully"  ,
               text: action?  "Successfully Blocked User":  "Successfully Active User" ,   
               icon: "success"
            });
            setUser(response?.data.user)
         }
      }
   }



   useEffect(() => {
      getSpecificUser(id)
   }, [])
   

   return (
      <Fragment>
         <div className="container mt-5">
            <h1 className='main-header'>Specific User</h1>
            <div className='under-header'></div>

            <div className="row ">
               <div className="col-md-12 mb-4">
                  <h3 className='text-center'>User Information</h3>
                  <div className='border border-1 p-2 rounded-2'>
                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">Name :</th>
                              <td>{user.name}</td>
                           </tr>
                           <tr>
                              <th scope="row">Age :</th>
                              <td>{user.age}</td>
                           </tr>
                           <tr>
                              <th scope="row">Phone Number :</th>
                              <td>{user.phone}</td>
                           </tr>
                           <tr>
                              <th scope="row">Email :</th>
                              <td>{user.email}</td>
                           </tr>
                           <tr>
                              <th scope="row">Role :</th>
                              <td>{user.role}</td>
                           </tr>
                           <tr>
                              <th scope="row">BirthDay :</th>
                              <td>{user.birthDay}</td>
                           </tr>
                           <tr>
                              <th scope="row">Stat :</th>
                              <td>{user.isBlocked? <p className='text-danger'>Blocked User</p>: <p className='text-success'>Active User</p>}</td>
                           </tr>
                           <tr>
                              <th scope="row">Confirm Email:</th>
                              <td>{user.confirmedEmail? <p className='text-success p-0 m-0'>Already Confirmed</p>: <p className='text-danger p-0 m-0'>Not Confirmed Please Confirmed Now</p>}</td>
                           </tr>
                        </tbody>
                     </table>
                     <div className='text-center'>
                        <button onClick={()=>{statUser(true)}} className='btn btn-sm btn-outline-primary'>Block User</button>
                        <button onClick={()=>{statUser(false)}}  className='btn btn-sm btn-outline-primary mx-2'>Active User</button>
                        <button onClick={()=>{statUser("delete")}}  className='btn btn-sm btn-outline-danger'>Delete User</button>
                        <Link to={`/dashboard/updateUserRole/${id}`} className='btn btn-sm btn-outline-success ms-2'>Update User Role</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
}
