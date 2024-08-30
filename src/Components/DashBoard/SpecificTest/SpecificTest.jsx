import axios from 'axios';
import React, { Fragment, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { TestContext } from '../../../Context/TestContext.js';
import { PriceContext } from '../../../Context/PriceContext.js';

export default function SpecificTest() {
   const {id} = useParams();
   const navigate = useNavigate() ;
   const {getSpecificPrice} = useContext(PriceContext) ;
   const {test ,  getSpecificTest} = useContext(TestContext) ;

   let header = {
      token:localStorage.getItem("token"),
   };



   async function getPrice (priceId){
      await getSpecificPrice(priceId)
      navigate(`/dashBoard/updatePrice/${id}/${priceId}`)
   }



   async function deleteTest (action){
      Swal.fire({
         title: "Do you want to save the changes?",
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: "Save",
         denyButtonText: `Don't save`
      }).then(async(result) => {
         if (result.isConfirmed) {
            let response =   await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/test/${id}`  , {headers:header} )
            .catch((error)=>{
               Swal.fire({
                  title:error.response?.data.message  ,
                  text: "Please Try Again" ,   
                  icon: "error"
                  });
            })
            if(response?.data.message === "success"){
               Swal.fire({
                  title:"Successfully"  ,
                  text: `Successfully Deleted Test ${response?.data?.test.name}` ,   
                  icon: "success"
                  });         
               }
            navigate("/dashBoard/testDashboard")
         Swal.fire("Saved! Success Deleted Test", "", "success");
         } else if (result.isDenied) {
         Swal.fire("Changes are not saved", "", "info");
         }
      });
   }



   async function deletePrice (priceId){
      Swal.fire({
         title: "Do you want to save the changes?",
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: "Save",
         denyButtonText: `Don't save`
      }).then(async(result) => {
         if (result.isConfirmed) {
            let response =   await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/price/${priceId}`  , {headers:header} )
            .catch((error)=>{
               Swal.fire({
                  title:error.response?.data.message  ,
                  text: "Please Try Again" ,   
                  icon: "error"
                  });
            })
            if(response?.data.message === "success"){
               Swal.fire({
                  title:"Successfully"  ,
                  text: `Successfully Deleted Test Price ${response?.data.price.testName}` ,   
                  icon: "success"
                  });         
               }
            window.location.reload()
         Swal.fire("Saved! Success Deleted Price", "", "success");
         } else if (result.isDenied) {
         Swal.fire("Changes are not saved", "", "info");
         }
      });
   }



   useEffect(() => {
      getSpecificTest(id)
   }, [])


   return (
      <Fragment>
         <div className="container mt-5 homeDashboard">
            <h1 className='main-header'>Specific Test</h1>
            <div className='under-header'></div>

            <div className="row ">
               <div className="col-md-12 mb-4">
                  <h4 className=''>Test Information :</h4>
                  <div className='border border-1 p-2 rounded-2'>
                     <table class="table table-sm table-striped">

                        <tbody>
                           <tr>
                              <th scope="row">Name :</th>
                              <td>{test.name}</td>
                           </tr>
                           <tr>
                              <th scope="row">Description :</th>
                              <td>{test.description}</td>
                           </tr>
                           <tr>
                              <th scope="row">Condition:</th>
                              <td>{test.condition}</td>
                           </tr>
                           <tr>
                              <th scope="row">Number Of Requests :</th>
                              <td>{test.count}</td>
                           </tr>
                           <tr>
                              <th scope="row">Stat :</th>
                              <td>{test.isActive? <p className='text-success'>Active Test</p>: <p className='text-danger'>Blocked Test</p>}</td>
                           </tr>
                        </tbody>

                     </table>

                     <div className='text-center'>
                        <Link to={`/dashBoard/UpdateTest/${id}`}  className='btn btn-sm btn-outline-primary mx-4 w-25'>Update Test</Link>
                        <button onClick={()=>{deleteTest()}}  className='btn btn-sm btn-outline-danger w-25'>Delete Test</button>
                        <Link to={`/dashBoard/addNewPrice/${id}`}  className='btn btn-sm btn-outline-primary mx-4 w-25'>Add New Price</Link>
                     </div>


                     <div className="table mt-5">
                        <h4>Prices this Test All Company :</h4>
                        <table className='table table-sm text-center table-group-divider table-striped table-responsive-md '>

                           <thead>
                              <th>Test Name</th>
                              <th>Company Name</th>
                              <th>Price</th>
                              <th>Price After Discount</th>
                              <th>Discount</th>
                              <th>Final Amount</th>
                              <th>Start</th>
                              <th>Action</th>
                           </thead>

                           <tbody>
                              {test ? <>
                                 {test.all_Prices?.map((ele)=>{
                                    return (
                                       <tr key={ele._id}>
                                          <td className='fullName'>{ele.testName}</td>
                                          <td>{ele.companyName}</td>
                                          <td>{ele.price}</td>
                                          <td>{ele.priceAfterDiscount}</td>
                                          <td>{ele.discount}</td>
                                          <td>{ele.final_amount}</td>
                                          <td>{ele.createdAt.slice(0 , 10)}</td>
                                          <td>
                                             <Link onClick={()=>{getPrice(ele._id)}}  className='alert alert-secondary fw-bold text-center p-1 text-success btn-sm'>Update</Link>
                                             <Link onClick={()=>{deletePrice(ele._id)}}  className='alert alert-secondary fw-bold text-center p-1 text-danger btn-sm'>Delete</Link>
                                          </td>
                                       </tr>
                                    )
                                 })}
                              </> : <></>}
                           </tbody>

                        </table>
                     </div>

                  </div>
               </div>
            </div>

         </div>
      </Fragment>
   )
}
