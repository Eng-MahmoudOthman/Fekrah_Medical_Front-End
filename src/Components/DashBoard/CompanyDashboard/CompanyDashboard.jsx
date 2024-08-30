import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagination from '../../Pagination/Pagination.jsx';

export default function CompanyDashboard() {

   const [companies , setCompanies] = useState([]) ;
   const [companyData , setCompanyData] = useState({}) ;
   const [filter , setFilter] = useState("") ;
   const [countItem , setCountItem] = useState(10) ;
   let header = {
      token:localStorage.getItem("token"),
   };



   async function getData (){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company/getCompanyCount`  ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setCompanyData(response.data?.Company_Data);
      }
   }

   async function getTypeCompany (item){
      setFilter(item)
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company?filter=${item}`  ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setCompanies(response.data.companies);
      }
   }


   const fetchData = async(currentPage)=>{
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company?filter=${filter}&page=${currentPage}`  ,  {headers:header})
      .then((response)=>{
         console.log(response);
         // setCompanies(response.data.companies)
      })
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
   }

   const handlePageClick = (data)=>{
      fetchData(data?.selected + 1)
   }


   useEffect(() => {
      getData() ;
      getTypeCompany()
   }, [])
   
   return (
      <Fragment>
         <div className="container-fluid homeDashboard">
            <h4 className='text-center border-2 border-bottom py-2'>Companies</h4>
            {/* <div className='under-header'></div> */}


            <div className="row g-2">

               <div className="col-md-4">
                  <div className=' rounded-2 bg-body-secondary py-1'>
                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-primary rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>All Company Count</h4>
                     </div>
                     <p className='h4 text-end px-2'><span className='h1'>{companyData.companies?.count}</span></p>
                  </div>
               </div>

               <div className="col-md-4">
                  <div className=' rounded-2 bg-body-secondary py-1'>
                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-primary rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>Blocked Companies</h4>
                     </div>
                     <p className='h4 text-end px-2'><span className='h1'>{companyData.blocked_company?.count}</span></p>
                  </div>
               </div>

               <div className="col-md-4">
                  <div className=' rounded-2 bg-body-secondary py-1'>
                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-primary rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>Active Companies</h4>
                     </div>
                     <p className='h4 text-end px-2'><span className='h1'>{companyData.active_company?.count}</span></p>
                  </div>
               </div>

            </div>

            <div className='my-4 link_home_dashboard'>
               <div className='d-flex justify-content-between align-items-center my-2'>
                  <h5 className='my-3'>Filter By <i class="fa-solid fa-filter ms-2"></i> :</h5>
                  <Link to="/dashboard/addCompany" className='btn btn-sm bg-main'>Add Company</Link>
               </div>
               <form >
               <label htmlFor="chooseCount" className='me-2'>Count in Page</label>
                  <select className="my-4 w-25" onClick={(e)=>{setCountItem(e.target.value)}}  name="" id="chooseCount">
                     <option value="10">10</option>
                     <option  value="20">20</option>
                     <option  value="40">40</option>
                  </select>
               </form>
               <button onClick={()=>{getTypeCompany()}} className='btn btn-dark mx-1 btn-sm'>All Companies</button>
               <button onClick={()=>{getTypeCompany("active")}} className='btn btn-outline-primary mx-1 btn-sm'>Active Companies</button>
               <button onClick={()=>{getTypeCompany("blocked ")}} className='btn btn-outline-primary mx-1 btn-sm'>Blocked Companies</button>
               {/* <button onClick={()=>{getTypeOrder("cancel")}} className='btn btn-outline-primary mx-1 btn-sm'>Cancel Orders</button>
               <button onClick={()=>{getTypeOrder("new")}} className='btn btn-outline-primary mx-1 btn-sm'>New Orders</button> */}
            </div>
         
            <div className="table">
               <table className='table table-sm text-center table-group-divider table-striped table-responsive-md '>
                  <thead>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone</th>
                     <th>Address</th>
                     <th>Start</th>
                     <th>State</th>
                  </thead>
                  <tbody>
                     {companies.length? 
                     <>
                        {companies.slice(0 , countItem).map((ele)=>
                           <tr key={ele._id}>
                              <td className='fullName'>{ele.name}</td>
                              <td>{ele.email}</td>
                              <td>{ele.phone}</td>
                              <td>{ele.address}</td>

                              <td>{ele.createdAt.slice(0 , 10)}</td>
                              {/* <td>{ele.createdAt.slice(0 , 10)} <br/> {ele.createdAt.slice(10 ,19 ).split("T")}</td> */}
                              <td>
                                 {
                                    ele.isActive? 
                                       <Link to={`/dashBoard/specificCompany/${ele._id}`} className='alert alert-secondary fw-bold text-center p-1 text-success btn-sm'>Active</Link>
                                    : <Link to={`/dashBoard/specificCompany/${ele._id}`} className='alert alert-danger text-danger fw-bold text-center p-1 text-danger btn-sm'>Not Active</Link>
                                 }
                              </td>
                           </tr>
                        )}
                     </> : <div className='alert alert-danger p-1'>Order Not Found</div>}
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
//       let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/order`  ,  {headers:header} )
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
//       let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/order/orderCount`  ,  {headers:header} )
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
//       await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/order?page=${currentPage}`  ,  {headers:header})
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
