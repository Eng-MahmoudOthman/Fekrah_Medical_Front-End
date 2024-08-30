
import React from 'react' ;
// import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';




export default function ProtectedOnline(props) {

   if(localStorage.getItem('token_online') !== null){
         return props.children;
   }else{
      Swal.fire({
         title: "Not Authorization Entered" ,
         text: "Please Try Again Log in now",   
         icon: "error"
      });
      return <Navigate to={'/onlineSystem'}/>
   }
}
