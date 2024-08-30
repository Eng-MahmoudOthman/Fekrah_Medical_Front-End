import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import imageOrder from "../../Assets/images/order section.jpg";
import Pagination from '../Pagination/Pagination.jsx';




export default function AllOrderLoggedUser() {
   const [orders , setOrders] = useState([]) ;
   let header = {
      token:localStorage.getItem("token")
   };


   const fetchData = async(currentPage)=>{
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/order/LoggedUserOrder?limit=10&page=${currentPage}`  ,  {headers:header})
      .then((response)=>{
         setOrders(response?.data.orders)
      })
      .catch((error)=>{
         Swal.fire({
            title:error.response?.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
   }

   const handlePageClick = (data)=>{
      fetchData(data?.selected + 1)
   }



   useEffect(() => {
      fetchData(1)
   }, [])
   
   return (
      <Fragment>

         <div className="container AllOrderLoggedUser mt-5 pt-5">
            <h1 className='main-header'>All Order</h1> 
            <div className='under-header'></div>

            <div className="row">
               <div className="col-md-4"> 
               <div className=''>
                  <img src={imageOrder} className='w-100' alt="order" />
               </div>
               </div>
               <div className="col-md-8">

                  {orders.length? 
                  
                     orders.reverse().map((ele)=>
                        <div className='position-relative overflow-hidden orderItem border-bottom '>
                           <div className=' d-flex justify-content-between align-items-center p-2 my-2' >

                              <div>
                                 <h6>Patient Name : {ele.patient_Name}</h6>
                                 <h6>Total Price : {ele.total_Price} EGP</h6>
                                 <h6>Total Price After Discount: {ele.total_Price_After_Discount} EGP</h6>
                                 <p>Created At: {ele.createdAt.slice(0 , 10)}</p>
                                 <p>Message : <span className='alert alert-warning p-1'> {ele.message ? ele.message : "Not Found The Message Until Now !"} </span></p>
                              </div>

                              <div>
                                 {ele.is_Paid && !ele.is_wrong_Invoice_V_Cash && ele.is_Paid_Invoice_V_Cash && !ele.is_Cancel ? 
                                       <button className='btn btn-success btn-sm'> <a href={ele.invoice_pdf} target="_black"> PDF Download</a> </button>
                                    : ele.is_Paid_Invoice_V_Cash && ele.is_wrong_Invoice_V_Cash && !ele.is_Cancel && !ele.is_Paid || !ele.is_Paid_Invoice_V_Cash ?
                                       <button className='btn btn-success btn-sm'><Link to={`/sendInvoice/${ele._id}`}>إعادة الدفع</Link> </button>
                                    :<></>
                                 }
                              </div>

                           </div>

                           {
                              ele.is_Done && ele.is_Paid && !ele.is_Cancel? 
                                 <p className='alert alert-secondary fw-bold text-center p-1 text-success'> تم    سحب   العينات    بنجاح </p>
                              : ele.is_Cancel ?
                                 <p className='alert alert-danger text-center p-1'>  تم    ألغاء   تسجيل   الاوردر </p>
                              : ele.is_Paid_Invoice_V_Cash &&  !ele.is_wrong_Invoice_V_Cash && !ele.is_Paid ?
                                 <p className='alert alert-primary fw-bold text-center p-1'>... جارى  الموافقة  على   تسجيل   الطلب </p>
                              : ele.is_Paid_Invoice_V_Cash &&  ele.is_Paid  &&   !ele.is_wrong_Invoice_V_Cash?
                                 <p className='alert alert-success fw-bold text-center p-1'> تمت الموافقة على الطلب يرجى  طباعة الفاتورة والتوجه لافرب فرع لسحب العينات</p>
                              : ele.is_Paid_Invoice_V_Cash && ele.is_wrong_Invoice_V_Cash && !ele.is_Paid?
                                 <p className='alert alert-primary fw-bold text-center p-1' > تم رفض  الطلب  يرجى مراجعة الفاتورة  يوجد خطا فى عملية الدفع  </p>
                              : !ele.is_Paid_Invoice_V_Cash && !ele.is_Paid?
                                 <p className='alert alert-primary fw-bold text-center p-1' > لم  يتم  الدفع  وإرسال  فاتورة  الدفع  بواسطة  فودافون  كاش  </p>
                              :<p className='alert alert-primary fw-bold text-center p-1' >  يوجد خطا فى عملية حجز الطلب   </p>
                           }
                        </div>
                        )
                     : <div className="alert alert-danger">Order Not Found</div>
                  
                  }
                  
               </div>
            </div>

            <div className='text-center'>
               <Link className='btn btn-primary w-75 my-4' to="/price"> عمل طلب جديد  </Link>
            </div>

            <Pagination handlePageClick={handlePageClick} />
         </div>

      </Fragment>
   )
}
