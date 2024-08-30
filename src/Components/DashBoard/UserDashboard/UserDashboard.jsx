
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Pagination from "../../Pagination/Pagination.jsx";
import { Fragment } from "react";



export default function UserDashboard () {

   const navigate = useNavigate() ;
   const [users , setUsers] = useState([]) ;
   const [userData , setUserData] = useState({}) ;
   const [addNewUser , setAddNewUser] = useState({}) ;
   const [filter , setFilter] = useState("") ;
   const [countItem , setCountItem] = useState(10) ;

   let header = {
      token:localStorage.getItem("token"),
   };



   async function getDataCount (){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/userCount`  ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setUserData(response.data.user_Data);
         setAddNewUser(response.data.user_Data.NewUsers)
         setUsers(response.data.user_Data.NewUsers)
      }
   }

   async function getTypeUsers (item){
      setFilter(item)
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users?filter=${item}`  ,  {headers:header} )
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setUsers(response.data.users);
         // console.log(response.data.users);
      }
   }

   async function searchUserName (search){
      if(search.length >= 3){
         let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users?keyword=${search}`  ,  {headers:header} )
         .catch((error)=>{
            Swal.fire({
               title:error.response.data.message  ,
               text: "Please Try Again" ,   
               icon: "error"
               });
         })
         if(response?.data.message === "success"){
            setUsers(response.data.users);
         }
      }
   }




   const fetchData = async(currentPage)=>{
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users?filter=${filter}&page=${currentPage}`  ,  {headers:header})
      .then((response)=>{
         setUsers(response.data.users)
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


   const getNewUser = ()=>{
      setUsers(addNewUser)
   }


   useEffect(() => {
      // getDataCount() ; new User
      getTypeUsers() ;   // all User
   }, [])
   
   return (
      <Fragment>
         <div className="container-fluid userDashboard">
            <h4 className='text-center border-2 border-bottom py-2'>Users</h4>

            <div className="row g-2">

               

               <div className="col-md-4">
                  <div className=' rounded-2 bg-body-secondary py-1'>

                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-primary rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>Today`s Added Users</h4>
                     </div>

                     <p className='h4 text-end px-2'><span className='h1'>{userData.todayNewUsers}</span></p>

                  </div>
               </div>

               <div className="col-md-4">
                  <div className='  rounded-2 bg-body-secondary py-1'>

                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-danger rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>All Users</h4>
                     </div>

                     <p className='h4 text-end px-2'><span className='h1'>{userData.users}</span></p>

                  </div>
               </div>


               <div className="col-md-4">
                  <div className=' rounded-2 bg-body-secondary py-1'>

                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-primary rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>Active Users</h4>
                     </div>

                     <p className='h4 text-end px-2'><span className='h1'>{userData.activeUser}</span></p>

                  </div>
               </div>


               <div className="col-md-4">
                  <div className=' rounded-2 bg-body-secondary py-1'>

                     <div className='d-flex  align-items-center'>
                        <div className='ms-1 bg-primary rounded-1 m-1'>
                           <i className="fa-solid fa-house text-white fa-sm p-2"></i>
                        </div>
                        <h4 className='ms-2 m-0 p-0 h6'>Blocked Users</h4>
                     </div>

                     <p className='h4 text-end px-2'><span className='h1'>{userData.blockedUser}</span></p>

                  </div>
               </div>

            </div>

            <div className='my-4 link_home_dashboard'>

               <div className='d-flex justify-content-between align-items-center my-2'>
                  <h5 className='my-3'>Filter By <i class="fa-solid fa-filter ms-2"></i> :</h5>
                  <Link to="/dashboard/addUserAdmin" className='btn btn-sm bg-main'>Add New User</Link>
               </div>

               <form >
               <label htmlFor="chooseCount" className='me-2'>Count in Page</label>
                  <select className="my-4 w-25" onClick={(e)=>{setCountItem(e.target.value)}} id="chooseCount">
                     <option value="10">10</option>
                     <option  value="20">20</option>
                     <option  value="40">40</option>
                  </select>
               </form>


               <button onClick={()=>{getTypeUsers()}} className='btn btn-dark mx-1 btn-sm'>All Users</button>
               <button onClick={()=>{getTypeUsers("blocked")}} className='btn btn-outline-primary mx-1 btn-sm'>Blocked Users</button>
               <button onClick={()=>{getTypeUsers("active")}} className='btn btn-outline-primary mx-1 btn-sm'>Active Users</button>
               <button onClick={()=>{getNewUser()}} className='btn btn-outline-primary mx-1 btn-sm'>New Users</button>
            </div>

            <form className="my-4" >
               <label htmlFor="search">Search By User Name Or User Phone</label>
               <input type="search"  onInput={(e)=>{searchUserName(e.target.value)}} name="search" id="search" className="form-control w-50 my-2 form-control-sm"/>
            </form>
         
            <div className="table">
               <table className='table table-sm text-center table-group-divider table-striped table-responsive-md '>

                  <thead>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Age</th>
                     <th>BirthDay</th>
                     <th>State</th>
                  </thead>

                  <tbody>
                     {users?.length? 
                     <>
                        {users.slice(0 , countItem).map((ele)=>
                           <tr key={ele._id}>
                              <td className='fullName'>{ele.name}</td>
                              <td>{ele.email}</td>
                              <td>{ele.age}</td>
                              <td>{ele.birthDay.slice(0 , 10)}</td>
                              <td>
                              {
                                 ele.isBlocked ? 
                                    <span onClick={()=>{navigate(`/dashBoard/specificUser/${ele._id}`)}} className='alert alert-danger fw-bold text-center p-1 text-danger'>User Blocked</span>
                                 :<span onClick={()=>{navigate(`/dashBoard/specificUser/${ele._id}`)}} className='alert alert-success fw-bold text-center p-1 text-success' >User Active</span>
                              }
                              </td>
                              {/* <td> <Link to={`specificOrder/${ele._id}`} className='btn btn-primary btn-sm'>More</Link></td> */}
                           </tr>
                        )}
                     </> : <div className='alert alert-danger p-1 w-100'>Users Not Found</div>}
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
