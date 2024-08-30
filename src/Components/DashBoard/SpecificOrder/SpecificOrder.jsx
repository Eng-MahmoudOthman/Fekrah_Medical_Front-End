import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';



export default function SpecificOrder({socket}) {

   const{id} = useParams () ;
   const navigate = useNavigate() ;
   const[orderDetails , setOrderDetails] = useState({}) ;
   const[items , setItems] = useState([]) ;


   let header = {
      token:localStorage.getItem("token"),
   };


   async function getOrderDetails(){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/order/${id}`  ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setOrderDetails(response.data?.order);
         setItems(response.data?.order.orderItems)
      }
   }



   async function approvedOrder(id , action){
      let response =   await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/order/updateOrder/${id}?approved=${action}`  , {} ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         Swal.fire({
            position: "top-center",
            icon: "success",
            title: action ? "Approved Successfully" : "Cancel Approved Successfully" ,
            showConfirmButton: false,
            timer: 1000
         });
         window.location.reload() ;
      }
   }

   async function cancelOrder(id){
      const message = window.prompt()
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be Cancel this Order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
         }).then(async(result) => {
            if (result.isConfirmed) {
               let response =   await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/order/cancel/${id}`  , {message} ,  {headers:header} )
               .catch((error)=>{
                  Swal.fire({
                     title:error.response?.data.message  ,
                     text: "Please Try Again" ,   
                     icon: "error"
                     });
               })
               if(response?.data.message === "success"){
                  Swal.fire({
                     position: "top-center",
                     icon: "success",
                     title: response?.data.message ,
                     showConfirmButton: false,
                     timer: 1000
                  });
                  window.location.reload();
               }
            }
         });
   }



   async function rejectedOrder(id){
      const message = window.prompt()
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be Reject this Order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
         }).then(async(result) => {
            if (result.isConfirmed) {
               let response =   await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/order/rejected/${id}`  , {message} ,  {headers:header} )
               .catch((error)=>{
                  Swal.fire({
                     title:error.response?.data.message  ,
                     text: "Please Try Again" ,   
                     icon: "error"
                     });
               })
               if(response?.data.message === "success"){
                  Swal.fire({
                     position: "top-center",
                     icon: "success",
                     title: response?.data.message ,
                     showConfirmButton: false,
                     timer: 1000
                  });
                  window.location.reload();
               }
            }
         });
   }



   async function deletedOrder(id){
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be Delete this Order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
         }).then(async(result) => {
            if (result.isConfirmed) {
               let response =   await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/order/${id}` ,  {headers:header} )
               .catch((error)=>{
                  Swal.fire({
                     title:error.response?.data.message  ,
                     text: "Please Try Again" ,   
                     icon: "error"
                     });
               })
               if(response?.data.message === "success"){
                  Swal.fire({
                     position: "center-center",
                     icon: "success",
                     title: "Deleted Successfully" ,
                     showConfirmButton: false,
                     timer: 1000
                  });
                  navigate("/dashBoard")
               }
            }
         });
   }


   useEffect(() => {
      getOrderDetails()
   }, [])
   
   return (
      <Fragment>
         <div className="container">
            
            <h1 className='main-header'>Specific Order</h1>
            <div className='under-header'></div>


            <div className="row g-1">
            {
               orderDetails.is_Done && orderDetails.is_Paid && !orderDetails.is_Cancel? 
                  <span className='alert alert-secondary fw-bold text-center p-1 text-success'>تم سحب العينات <i class="fa-solid fa-thumbs-up ms-4"></i></span>
               : orderDetails.is_Cancel?
                  <span className='alert alert-danger  fw-bold text-center p-1'>تم ألغاء الاوردر <i class="fa-solid fa-ban ms-4"></i></span>
               : orderDetails.is_Paid_Invoice_V_Cash &&  !orderDetails.is_wrong_Invoice_V_Cash && !orderDetails.is_Paid ?
                  <span className='alert alert-primary fw-bold text-center p-1'>جارى الموافقة  <i class="fa-solid fa-spinner ms-4"></i></span>
               : orderDetails.is_Paid_Invoice_V_Cash &&  orderDetails.is_Paid  &&   !orderDetails.is_wrong_Invoice_V_Cash?
                  <span className='alert alert-success fw-bold text-center p-1'> تم الموافقة <i class="fa-solid fa-face-smile ms-4"></i></span>
               : orderDetails.is_Paid_Invoice_V_Cash && orderDetails.is_wrong_Invoice_V_Cash && !orderDetails.is_Paid ?
                  <span className='alert alert-primary fw-bold text-center p-1' >تم رفض الطلب <i class="fa-solid fa-ban ms-4"></i></span>
               : !orderDetails.is_Paid_Invoice_V_Cash && !orderDetails.is_Paid ?
                  <span className='alert alert-primary fw-bold text-center p-1' >  لم يتم الدفع وإرسال فاتورة الدفع بواسطة فودافون كاش <i class="fa-solid fa-ban ms-4"></i></span>
               :<span className='alert alert-primary fw-bold text-center p-1' >يوجد خطا <i class="fa-solid fa-exclamation ms-4"></i></span>
            }

               <div className="col-md-12 mb-4">
                  <h3 className='text-center'>Patient Information</h3>
                  <div className='border border-1 p-2 rounded-2'>
                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">Name :</th>
                              <td>{orderDetails.patient_Name}</td>
                           </tr>
                           <tr>
                              <th scope="row">Age :</th>
                              <td>{orderDetails.patient_Age}</td>
                           </tr>
                           <tr>
                              <th scope="row">Phone Number :</th>
                              <td>{orderDetails.patient_Phone}</td>
                           </tr>
                           <tr>
                              <th scope="row">Branch :</th>
                              <td>{orderDetails.branch_Area}</td>
                           </tr>
                           <tr>
                              <th scope="row">History :</th>
                              <td>{orderDetails.patient_History}</td>
                           </tr>
                           <tr>
                              <th scope="row">Street :</th>
                              <td>{orderDetails.shipping_Address?.street}</td>
                           </tr>
                           <tr>
                              <th scope="row">City :</th>
                              <td>{orderDetails.shipping_Address?.city}</td>
                           </tr>
                        </tbody>

                     </table>
                  </div>
               </div>

               <div className="col-md-12 mb-4">
                  <h3 className='text-center'>Order Information</h3>
                  <div className='border border-1 p-2 rounded-2'>
                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">total_Price :</th>
                              <td>{orderDetails.total_Price}  EGP</td>
                           </tr>
                           <tr>
                              <th scope="row">total_Price_After_Discount :</th>
                              <td>{orderDetails.total_Price_After_Discount}  EGP</td>
                           </tr>
                           <tr>
                              <th scope="row">Net_Amount :</th>
                              <td>{orderDetails.Net_Amount}  EGP</td>
                           </tr>
                           <tr>
                              <th scope="row">invoice Number :</th>
                              <td>{orderDetails.invoice_number}</td>
                           </tr>
                           <tr>
                              <th scope="row">is Paid :</th>
                              <td>{orderDetails.is_Paid ? <span className='text-success'>Yes <i class="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i class="fa-solid fa-xmark m-2"></i></span>}</td>
                           </tr>
                           <tr>
                              <th scope="row">is Cancel  :</th>
                              <td>{orderDetails.is_Cancel ? <span className='text-success'>Yes <i class="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i class="fa-solid fa-xmark m-2"></i></span>}</td>
                           </tr>
                           <tr>
                              <th scope="row">Send Invoice Vodafone Cash :</th>
                              <td>{orderDetails.is_Paid_Invoice_V_Cash ? <span className='text-success'>Yes <i class="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i class="fa-solid fa-xmark m-2"></i></span>}</td>
                           </tr>
                           <tr>
                              <th scope="row">wrong Invoice Vodafone Cash :</th>
                              <td>{orderDetails.is_wrong_Invoice_V_Cash ? <span className='text-success'>Yes <i class="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i class="fa-solid fa-xmark m-2"></i></span>}</td>
                           </tr>
                           <tr>
                              <th scope="row">is Done :</th>
                              <td>{orderDetails.is_Done ? <span className='text-success'>Yes <i class="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i class="fa-solid fa-xmark m-2"></i></span>}</td>
                           </tr>
                           <tr>
                              <th scope="row">Message :</th>
                              <td>{orderDetails.message ? orderDetails.message : <p>Not Found The Message Until Now !</p>}</td>
                           </tr>
                        </tbody>

                     </table>
                  </div>
               </div>

               <div className="col-md-6 mb-4">
                  <h3 className='text-center'>User Information</h3>
                  <div className='border border-1 p-2  rounded-2'>
                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">Name :</th>
                              <td>{orderDetails?.user?.name}</td>
                           </tr>
                           <tr>
                              <th scope="row">Age :</th>
                              <td>{orderDetails?.user?.age}</td>
                           </tr>
                           <tr>
                              <th scope="row">Phone Number :</th>
                              <td>{orderDetails?.user?.phone}</td>
                           </tr>

                           <tr>
                              <th scope="row">Email :</th>
                              <td>{orderDetails?.user?.email}</td>
                           </tr>
                        </tbody>

                     </table>
                  </div>
               </div>

               <div className="col-md-6 mb-4">
                  <h3 className='text-center'>Company Information</h3>
                  <div className='border border-1 p-2  rounded-2'>
                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">Name :</th>
                              <td>{orderDetails.company?.name}</td>
                           </tr>
                           <tr>
                              <th scope="row">Address :</th>
                              <td>{orderDetails.company?.address}</td>
                           </tr>
                           <tr>
                              <th scope="row">Phone Number :</th>
                              <td>{orderDetails.company?.phone}</td>
                           </tr>

                           <tr>
                              <th scope="row">Email :</th>
                              <td>{orderDetails.company?.email}</td>
                           </tr>

                           <tr>
                              <th scope="row">Logo :</th>
                              <td><img src={orderDetails.company?.logo} className='w-50' alt="" /></td>
                           </tr>
                        </tbody>

                     </table>
                  </div>
               </div>

               <div  className="col-md-12 mb-4   pt-4">
                  <h3 className='text-center  border-3 border-bottom py-5'>Order Information</h3>
                  <table class="table text-center  table-sm ">

                     <thead>
                        <tr>
                           <th>number</th>
                           <th>Test</th>
                           <th>Price</th>
                           <th>Price After Discount</th>
                           {/* <th>Discount</th> */}
                           <th>Final Amount</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           items.map((ele , index)=>{
                              return (
                                       <tr>
                                          <td>{index + 1}</td>
                                          <td>{ele.test?.name}</td>
                                          <td>{ele.price}</td>
                                          <td>{ele.priceAfterDiscount}</td>
                                          {/* <td>00000000</td> */}
                                          <td>{ele.final_amount}</td>
                                       </tr>
                              )
                           })
                        }
                        {/* <tr>
                           <td>1</td>
                           <td>Urine Analysis</td>
                           <td>1200</td>
                           <td>1050</td>
                           <td>20</td>
                           <td>700</td>
                        </tr> */}
                     </tbody>

                     <tfoot className='bg-light'>
                           <th colspan="2" className='py-1' >Total :</th>
                           <th className='py-1'>{orderDetails.total_Price}</th>
                           <th className='py-1'>{orderDetails.total_Price_After_Discount}</th>
                           {/* <th className='py-1'></th> */}
                           <th className='py-1'>{orderDetails.Net_Amount}</th>
                     </tfoot>

                  </table>
               </div>

               <div className='text-center'>
                  <a href={orderDetails.invoice_pdf}  className='btn btn-outline-dark btn-sm ' target='_blank' >Download Invoice <i class="fa-solid fa-print ms-4"></i></a>
                  <a href={orderDetails.transform_pdf} className='btn btn-dark btn-sm d-inline-block m-2' target='_blank'  >Download Translate <i class="fa-solid fa-print ms-4"></i></a>
                  {/* <a href={orderDetails.invoice_VodafoneCash?.secure_url} className='btn btn-dark btn-sm' target='_blank' >Download Vodafone Cash <i class="fa-solid fa-image ms-4"></i></a> */}
                  <a href={orderDetails.invoice_VodafoneCash} className='btn btn-dark btn-sm' target='_blank' >Download Vodafone Cash <i class="fa-solid fa-image ms-4"></i></a>
               </div>

               <div className="btn-group btn-group-sm w-75 m-auto mt-4" role="group" >
                  <button onClick={()=>{cancelOrder(orderDetails._id)}} disabled={orderDetails.is_Cancel} className="btn btn-outline-primary" >Cancel<i class="fa-solid fa-xmark ms-4"></i></button>
                  <button onClick={()=>{rejectedOrder(orderDetails._id)}} disabled={orderDetails.is_Cancel || orderDetails.is_wrong_Invoice_V_Cash} className="btn btn-outline-primary">Reject<i class="fa-solid fa-ban ms-4"></i></button>
                  <button onClick={()=>{deletedOrder(orderDetails._id)}} className="btn btn-outline-primary">Delete<i class="fa-regular fa-trash-can ms-4"></i></button>
               </div>

               <div className='text-center mt-2'>
                  <button onClick={()=>{approvedOrder(orderDetails._id , true)}} disabled={orderDetails.is_Paid || orderDetails.is_Cancel || orderDetails.is_wrong_Invoice_V_Cash} className='btn btn-success btn-sm  w-50' >Approved Order Now <i class="fa-solid fa-person-circle-check ms-4"></i> </button>
                  <button onClick={()=>{approvedOrder(orderDetails._id , false)}} disabled={!orderDetails.is_Paid || orderDetails.is_Cancel} className='btn btn-danger btn-sm my-2 ms-2 w-25' >Cancel Approved </button>
               </div>

            </div>

         </div>
      </Fragment>
   )
}
