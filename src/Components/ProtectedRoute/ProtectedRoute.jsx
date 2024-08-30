
import React from 'react' ;
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';




export default function ProtectedRoute(props) {

   if(localStorage.getItem('token') !== null){
         return props.children;
   }else{
      Swal.fire({
         title: "Not Authorization Entered" ,
         text: "Please Try Again Log in now",   
         icon: "error"
      });
      return <Navigate to={'/login'}/>
   }
}
