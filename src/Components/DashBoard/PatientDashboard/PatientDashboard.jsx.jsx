import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagination from '../../Pagination/Pagination.jsx';
import { Fragment } from 'react';

export default function PatientDashboard() {

   const [patients , setPatients] = useState([]) ;
   const [patientCount , setPatientCount] = useState(0) ;
   const [countItem , setCountItem] = useState(10) ;

   let header = {
      token:localStorage.getItem("token"),
   };


   //& Search Test By Test Name :
   function searchInput (e){
      if(e.target.value === ""){
         fetchData();
      }
      if(e.target.value.length >= 3){
         getSearchData((e.target.value).toLowerCase())
      }
   }


   //& Get All test And Search On Test By Test Name :
   async function getSearchData(search){
      let limit = 30 ;
      let keyword = "";
      if(search){
         keyword = `keyword=${search}`
         limit = 0
      }

      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/patient?${keyword}&limit=${limit}`)
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setPatients(response.data?.patients);
      }
   }



   //& Get Test Data and Current Page :
   const fetchData = async(currentPage)=>{
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/patient?page=${currentPage}`  ,  {headers:header})
      .then((response)=>{
         setPatients(response.data?.patients);
         setPatientCount(response.data);
      })
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
   }


   //& Handle page Count :
   const handlePageClick = (data)=>{
      fetchData(data?.selected + 1)
   }


   useEffect(() => {
      fetchData();
   }, [])
   
   return (
      <Fragment>
         <div className="container-fluid homeDashboard">
            <h4 className='text-center border-2 border-bottom py-2'>Patient Information</h4>

            <div className="row g-2">

               <div className="col-md-4">
                  <div className=' rounded-2 bg-body-secondary py-1'>
                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-primary rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>All Patient Count</h4>
                     </div>
                     <p className='h4 text-end px-2'><span className='h1'>{patientCount.results}</span></p>
                  </div>
               </div>

            </div>

            <div className='my-4 link_home_dashboard'>

               <div className='d-flex justify-content-between align-items-center my-2'>

                  <form className='w-50'>
                     <label htmlFor="chooseCount" className='me-2'>Count in Page</label>
                     <select className="my-4 w-25" onClick={(e)=>{setCountItem(e.target.value)}}  name="" id="chooseCount">
                        <option value="10">10</option>
                        <option  value="20">20</option>
                        <option  value="40">40</option>
                     </select>
                  </form>

                  <div className="w-50">
                     <form action="">
                        <input type="search" onChange={(e)=>{searchInput(e)}}  className='form-control' id='test_search' placeholder='Search By Patient Name Or Phone Patient'  name="search" />
                     </form>
                  </div>

               </div>
            </div>

               <div className="table mb-5">
                  <table className='table table-sm text-center table-group-divider table-striped table-responsive-md '>

                     <thead>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Birth Day</th>
                        <th>Created At</th>
                     </thead>

                     <tbody>
                        {patients.length? 
                        <>
                           {patients.slice(0 , countItem).map((ele)=>
                              <tr key={ele._id}>
                                 <td className='fullName'>{ele.patient_Name}</td>
                                 <td>{ele.patient_Age}</td>
                                 <td>{ele.patient_Phone}</td>
                                 <td>{ele.gender}</td>
                                 <td>{ele.birthDay.slice(0 , 10)}</td>

                                 <td>{ele.createdAt.slice(0 , 10)}</td>
                                 <td>
                                    <Link to={`/dashBoard/specificPatient/${ele._id}`} className='alert alert-secondary fw-bold text-center p-1 text-success btn-sm'>More</Link>
                                 </td>
                              </tr>
                           )}
                        </> : <div className='alert alert-danger p-1'>Tests Not Found</div>}
                     </tbody>

                  </table>
               </div>

            <Pagination handlePageClick={handlePageClick} />
         </div>
      </Fragment>
   )
}





































































// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import Pagination from '../../Pagination/Pagination.jsx';

// export default function HomeDashboard() {

//    const [orders , setOrders] = useState([]) ;
//    const [ordersData , setOrdersData] = useState({}) ;
//    let header = {
//       token:localStorage.getItem("token"),
//    };


//    async function getAllOrders (e){
//       // e.target.style.backgroundColor = "black"
//       let response =   await axios.get(`http://localhost:5000/api/v1/order`  ,  {headers:header} )
//       .catch((error)=>{
//          Swal.fire({
//             title:error.response.data.message  ,
//             text: "Please Try Again" ,   
//             icon: "error"
//             });
//       })
//       if(response?.data.message === "success"){
//          setOrders(response.data.orders)
//       }
//    }


//    async function getData (){
//       let response =   await axios.get(`http://localhost:5000/api/v1/order/orderCount`  ,  {headers:header} )
//       .catch((error)=>{
//          Swal.fire({
//             title:error.response.data.message  ,
//             text: "Please Try Again" ,   
//             icon: "error"
//             });
//       })
//       if(response?.data.message === "success"){
//          setOrdersData(response.data.Order_Data);
//       }
//    }



//    function getOrdersDetails (action){
//       if(action == "received"){
//          setOrders(ordersData.received_Order?.receivedOrder)
//       }else if (action == "sampling"){
//          setOrders(ordersData.done_Order?.doneOrder)
//       }else if (action == "cancel"){
//          setOrders(ordersData.cancel_Order?.cancelOrder)
//       }else if (action == "new"){
//          setOrders(ordersData.new_Order?.newOrder)
//       }
//    }




//    const fetchData = async(currentPage)=>{
//       await axios.get(`http://localhost:5000/api/v1/order?page=${currentPage}`  ,  {headers:header})
//       .then((response)=>{
//          setOrders(response.data.orders)
//       })
//       .catch((error)=>{
//          Swal.fire({
//             title:error.response.data.message  ,
//             text: "Please Try Again" ,   
//             icon: "error"
//             });
//       })
//    }

//    const handlePageClick = (data)=>{
//       fetchData(data?.selected + 1)
//    }


//    useEffect(() => {
//       getAllOrders() ;
//       getData() ;
//    }, [])
   
//    return (
//       <>
//          <div className="container-fluid homeDashboard">
//             <h4 className='text-center border-2 border-bottom py-1'>Site Statistics Today</h4>

//             <div className="row g-2">

//                <div className="col-md-3">
//                   <div className='  rounded-2 bg-body-secondary py-1'>

//                      <div className='d-flex  align-items-center'>
//                         <div className='ms-1 bg-danger rounded-1 m-1'>
//                            <i className="fa-solid fa-house text-white fa-sm p-2"></i>
//                         </div>
//                         <h4 className='ms-2 m-0 p-0 h6'>Today's Profits</h4>
//                      </div>

//                      <p className='h4 text-end px-2'><span className='h1'>{ordersData.finish_Profits} </span> EGP</p>

//                   </div>
//                </div>

//                <div className="col-md-3">
//                   <div className=' rounded-2 bg-body-secondary py-1'>

//                      <div className='d-flex  align-items-center'>
//                         <div className='ms-1 bg-primary rounded-1 m-1'>
//                            <i className="fa-solid fa-house text-white fa-sm p-2"></i>
//                         </div>
//                         <h4 className='ms-2 m-0 p-0 h6'>All Count Orders</h4>
//                      </div>

//                      <p className='h4 text-end px-2'><span className='h1'>{orders.length}</span></p>

//                   </div>
//                </div>

//                <div className="col-md-3">
//                   <div className=' rounded-2 bg-body-secondary py-1'>

//                      <div className='d-flex  align-items-center'>
//                         <div className='ms-1 bg-primary rounded-1 m-1'>
//                            <i className="fa-solid fa-house text-white fa-sm p-2"></i>
//                         </div>
//                         <h4 className='ms-2 m-0 p-0 h6'>New Orders</h4>
//                      </div>

//                      <p className='h4 text-end px-2'><span className='h1'>{ordersData.new_Order?.count}</span></p>

//                   </div>
//                </div>

//                <div className="col-md-3">
//                   <div className=' rounded-2 bg-body-secondary py-1'>

//                      <div className='d-flex  align-items-center'>
//                         <div className='ms-1 bg-secondary rounded-1 m-1'>
//                            <i className="fa-solid fa-spinner text-white fa-sm p-2"></i>
//                         </div>
//                         <h4 className='ms-1 m-0 p-0 h6'>Orders Execute</h4>
//                      </div>

//                      <p className='h4 text-end px-2'><span className='h1'>{ordersData.executed_Order?.count}</span></p>

//                   </div>
//                </div>



//                <div className="col-md-4">
//                   <div className=' rounded-2 bg-body-secondary py-1'>
//                      <div className='d-flex  align-items-center'>
//                         <div className='ms-1 bg-primary rounded-1 m-1'>
//                            <i className="fa-solid fa-house text-white fa-sm p-2"></i>
//                         </div>
//                         <h4 className='ms-2 m-0 p-0 h6'>Cancel Orders</h4>
//                      </div>
//                      <p className='h4 text-end px-2'><span className='h1'>{ordersData.cancel_Order?.count}</span></p>
//                   </div>
//                </div>

//                <div className="col-md-4">
//                   <div className=' rounded-2 bg-body-secondary py-1'>
//                      <div className='d-flex  align-items-center'>
//                         <div className='ms-1 bg-primary rounded-1 m-1'>
//                            <i className="fa-solid fa-house text-white fa-sm p-2"></i>
//                         </div>
//                         <h4 className='ms-2 m-0 p-0 h6'>Orders Received</h4>
//                      </div>
//                      <p className='h4 text-end px-2'><span className='h1'>{ordersData.received_Order?.count}</span></p>
//                   </div>
//                </div>

//                <div className="col-md-4">
//                   <div className=' rounded-2 bg-body-secondary py-1'>
//                      <div className='d-flex  align-items-center'>
//                         <div className='ms-1 bg-primary rounded-1 m-1'>
//                            <i className="fa-solid fa-house text-white fa-sm p-2"></i>
//                         </div>
//                         <h4 className='ms-2 m-0 p-0 h6'>Sampling Orders</h4>
//                      </div>
//                      <p className='h4 text-end px-2'><span className='h1'>{ordersData.done_Order?.count}</span></p>
//                   </div>
//                </div>
//             </div>

//             <div className='my-4 link_home_dashboard'>
//             <h5 className='my-3'>Filter By :</h5>
//                <button onClick={(e)=>{getAllOrders(e)}} className='btn btn-dark mx-1 btn-sm'>All Orders</button>
//                <button onClick={()=>{getOrdersDetails("received")}} className='btn btn-outline-primary mx-1 btn-sm'>Received Orders</button>
//                <button onClick={()=>{getOrdersDetails("sampling")}} className='btn btn-outline-primary mx-1 btn-sm'>Sampling Orders</button>
//                <button onClick={()=>{getOrdersDetails("cancel")}} className='btn btn-outline-primary mx-1 btn-sm'>Cancel Orders</button>
//                <button onClick={()=>{getOrdersDetails("new")}} className='btn btn-outline-primary mx-1 btn-sm'>New Orders</button>
//             </div>

//             <div className="table">
//                <table className='table table-sm text-center table-group-divider table-striped table-responsive-md '>
//                   <thead>
//                      <th>Patient</th>
//                      <th>Company</th>
//                      <th>Price</th>
//                      <th>Net Amount</th>
//                      <th>State</th>
//                      <th>Date And Time</th>
//                      <th>Description</th>
//                   </thead>
//                   <tbody>
//                      {orders.length? 
//                      <>
//                         {orders.map((ele)=>
//                            <tr key={ele._id}>
//                               <td className='fullName'>{ele.patient_Name}</td>
//                               <td>{ele.company.name}</td>
//                               <td>{ele.total_Price_After_Discount}</td>
//                               <td>{ele.Net_Amount}</td>
//                               <td>
//                               {
//                                  ele.is_Done && ele.is_Paid && !ele.is_Cancel? 
//                                     <span className='alert alert-secondary fw-bold text-center p-1 text-success'>تم سحب العينات</span>
//                                  : ele.is_Cancel?
//                                     <span className='alert alert-danger  fw-bold text-center p-1'>ألغاء الاوردر</span>
//                                  : ele.is_Paid_Invoice_V_Cash &&  !ele.is_wrong_Invoice_V_Cash && !ele.is_Paid ?
//                                     <span className='alert alert-primary fw-bold text-center p-1'>جارى الموافقة</span>
//                                  : ele.is_Paid_Invoice_V_Cash &&  ele.is_Paid  &&   !ele.is_wrong_Invoice_V_Cash?
//                                     <span className='alert alert-success fw-bold text-center p-1'> تم الموافقة</span>
//                                  : ele.is_Paid_Invoice_V_Cash && ele.is_wrong_Invoice_V_Cash && !ele.is_Paid ?
//                                     <span className='alert alert-primary fw-bold text-center p-1' >تم رفض الطلب</span>
//                                  :<span className='alert alert-primary fw-bold text-center p-1' >يوجد خطا</span>
//                               }
//                               </td>
//                               <td>{ele.createdAt.slice(0 , 10)}</td>
//                               {/* <td>{ele.createdAt.slice(0 , 10)} <br/> {ele.createdAt.slice(10 ,19 ).split("T")}</td> */}
//                               <td> <Link to={`specificOrder/${ele._id}`} className='btn btn-primary btn-sm'>More</Link></td>
//                            </tr>
//                         )}
//                      </> : <div className='alert alert-danger p-1'>Order Not Found</div>}
//                   </tbody>
//                </table>
//             </div>


//             <Pagination handlePageClick={handlePageClick} />
//          </div>
//       </>
//    )
// }
