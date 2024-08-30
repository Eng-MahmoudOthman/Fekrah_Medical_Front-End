import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CompanyContext } from "../../../Context/CompanyContext.js";
import { Fragment } from "react";


export default function ReportDashboard() {
   const [companyId ,setCompanyId] = useState("") ;
   const [from , setFrom] = useState("") ;
   const [to , setTo] = useState("") ;
   const [patient , setPatient] = useState("") ;

   const {allCompanyInfo , getAllCompanyInfo} = useContext(CompanyContext)

   let header = {
      token:localStorage.getItem("token"),
   };


   async function allOrders(){
      if(companyId){
         Swal.fire({
            icon: "error",
            title: "Order Not Available",
            text: "The Order is Not Available Please Check The Button !",
         });
         return ;
      }
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/report?&start=${from}&end=${to}` , {headers:header})
      .then((response)=>{
         if(response.data.message === "success"){
               let timerInterval;
               Swal.fire({
               title: "Please Wait Seconds",
               html: "Creating The PDF File After <b></b> milliseconds.",
               timer: 3000,
               timerProgressBar: true ,
               didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  timerInterval = setInterval(() => {
                     timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
               },
               });

            setTimeout( () => {
               window.open(response.data.pathFile, '_blank');
            }, 3000); 
         }
      })
      .catch((error)=>{
         console.log("error" , from , to);
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
         });
      });
   }





   async function specificCompanyOrder(){
      if(!companyId){
         Swal.fire({
            icon: "error",
            title: " Please Choose Any Company ",
            text: "Please Choose Any Company !",
         });
         return ;
      }
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/report?company_id=${companyId}&start=${from}&end=${to}` , {headers:header})
      .then((response)=>{
         if(response.data.message === "success"){
               let timerInterval;
               Swal.fire({
               title: "Please Wait Seconds",
               html: "Creating The PDF File After <b></b> milliseconds.",
               timer: 3000,
               timerProgressBar: true ,
               didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  timerInterval = setInterval(() => {
                     timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
               },
               });

            setTimeout( () => {
               window.open(response.data.pathFile, '_blank');
            }, 3000); 
         }
      })
      .catch((error)=>{
         console.log(error);
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
         });
      });
   }



   async function specificPatientOrder(){
      if(!patient){
         Swal.fire({
            icon: "error",
            title: " Please Enter Patient Information ",
            text: "Please Enter Patient Name Or patient Phone !",
         });
         return ;
      }
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/report/orderPatient?patient=${patient}&company_id=${companyId}&start=${from}&end=${to}` , {headers:header})
      .then((response)=>{
         if(response.data.message === "success"){
               let timerInterval;
               Swal.fire({
               title: "Please Wait Seconds",
               html: "Creating The PDF File After <b></b> milliseconds.",
               timer: 3000,
               timerProgressBar: true ,
               didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  timerInterval = setInterval(() => {
                     timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
               },
               });

            setTimeout( () => {
               window.open(response.data.pathFile, '_blank');
            }, 3000); 
         }
      })
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
         });
      });
   }

   async function specificMonthOrder(){
      console.log("specificMonthOrder");
   }

   async function specificDayOrder(){
      console.log("specificDayOrder");
   }

   async function morePriceLastMonth(){
      console.log("morePriceLastMonth");
   }


   useEffect(() => {
      getAllCompanyInfo()
   }, [])
   
   return (
      <Fragment>
         <div className="container">
               <form action="" className="form-control mt-5" >
                  <div className="row justify-content-around align-items-center">
                     <div className="row my-2 col-md-3  ">
                        <div className="col-auto m-0">
                           <label htmlFor="company" className="col-form-label">Choose Company</label>
                        </div>

                        <div className="col-auto m-0" 
                           onChange={(e)=>{setCompanyId(e.target.value)}} 
                        >
                           <select name="company" id="company" className='form-control' aria-describedby="passwordHelpInline" >
                           <option selected value="">Select Company</option>
                           {allCompanyInfo.length ? allCompanyInfo.map((ele)=>{
                              return(
                                 <option value={ele._id}>{ele.name}</option>
                              )
                           }) : ""}
                        </select>
                        </div>
                     </div>

                     <div className="row my-2 col-md-3  ">

                        <div className="col-auto m-0">
                           <label htmlFor="from" className="col-form-label">From</label>
                        </div>

                        <div className="col-auto m-0">
                           <input type="date" id="from" defaultValue={""}  className="form-control"  
                              onChange={(e)=>{setFrom(e.target.value)}} 
                           />
                        </div>
                     </div>

                     <div className="row my-2 col-md-3  ">

                        <div className="col-auto m-0">
                           <label htmlFor="to" className="col-form-label">To</label>
                        </div>

                        <div className="col-auto m-0">
                           <input type="date" id="to" defaultValue={""}  className="form-control" 
                              onChange={(e)=>{setTo(e.target.value)}} 
                           />
                        </div>
                     </div>

                     <div className="row my-2 col-md-3 ">

                        <div className="col-auto m-0">
                           <label htmlFor="patient" className="col-form-label">Patient</label>
                        </div>

                        <div className="col-auto m-0">
                           <input type="text" id="patient" className="form-control" placeholder="Phone Or Name"  aria-describedby="passwordHelpInline" 
                              onChange={(e)=>{setPatient(e.target.value)}} 
                           />
                        </div>
                     </div>
                  </div>
               </form>

               <div className="row mt-5 ">
                  <p className="text-success">* When Choose Orders By Date Attention Please : Not include The End Day !</p>

                  <div className="col-md-4 p-0 ">
                     <div className="p-1">
                        <button onClick={()=>{allOrders()}} className="btn btn-primary w-100 py-3  text-center "><i class="fa-solid fa-print ms-4"></i> <br/> طباعة كل الاوردرات    </button>
                     </div>
                  </div>



                  
                  <div className="col-md-4 p-0 ">
                     <div className="p-1">
                        <button onClick={()=>{specificCompanyOrder()}} className="btn btn-info w-100 py-3  text-center "><i class="fa-solid fa-file-pdf ms-4"></i>  <br/>   طباعة اوردرات شركة معينة </button>
                     </div>
                  </div>



                  
                  <div className="col-md-4 p-0 ">
                     <div className="p-1">
                        <button  onClick={()=>{specificPatientOrder()}} className="btn btn-primary w-100 py-3  text-center "><i class="fa-solid fa-print ms-4"></i>  <br/>    طباعة كل الاوردرات لمريض معين  </button>
                     </div>
                  </div>


                  
                  <div className="col-md-4 p-0 ">
                     <div className="p-1">
                        <button  onClick={()=>{specificMonthOrder()}} className="btn btn-info w-100 py-3  text-center "><i class="fa-solid fa-print ms-4"></i>  <br/>     طباعة كل الاوردرات خلال شهر معين</button>
                     </div>
                  </div>


                  
                  <div className="col-md-4 p-0 ">
                     <div className="p-1">
                        <button  onClick={()=>{specificDayOrder()}} className="btn btn-primary w-100 py-3  text-center "><i class="fa-solid fa-print ms-4"></i>  <br/>   طباعة كل الاوردرات خلال يوم معين </button>
                     </div>
                  </div>


                  
                  <div className="col-md-4 p-0 ">
                     <div className="p-1">
                        <button  onClick={()=>{morePriceLastMonth()}} className="btn btn-info w-100 py-3  text-center "><i class="fa-solid fa-print ms-4"></i>  <br/>   طباعة التحاليل الأكثر استخداما خلال آخر شهر </button>
                     </div>
                  </div>

               </div>
         </div>

      </Fragment>
   )
}

























   // return (
   //    <>
   //       <div className="container">
   //             <form action="" className="form-control mt-5" onSubmit={formik.handleSubmit}>

   //                <div className="row align-items-center">
   //                   <div className="row m-0 col-md-3  ">
   //                      <div className="col-auto m-0">
   //                         <label htmlFor="company" className="col-form-label">Choose Company</label>
   //                      </div>

   //                      <div className="col-auto m-0"
   //                            onChange={formik.handleChange} 
   //                            onBlur={formik.handleBlur}>
   //                         <select name="company" id="company" className='form-control' aria-describedby="passwordHelpInline" >
   //                         <option selected value="">Select Company</option>
   //                         <option value="66465142f454308978737c60">Mokhtabar</option>
   //                         <option value="66465142f454308978737c60">Mokhtabar</option>
   //                         <option value="66465142f454308978737c60">Mokhtabar</option>
   //                      </select>
   //                      </div>
   //                   </div>

   //                   <div className="row m-0 col-md-3 mb-1 ">

   //                      <div className="col-auto m-0">
   //                         <label htmlFor="from" className="col-form-label">From</label>
   //                      </div>

   //                      <div className="col-auto m-0">
   //                         <input type="date" id="from" className="form-control" aria-describedby="passwordHelpInline" 
   //                            value={formik.values.from}
   //                            onChange={formik.handleChange} 
   //                            onBlur={formik.handleBlur}
   //                            name="from" 
   //                         />
   //                      </div>
   //                      {formik.errors.from && formik.touched.from?<div className="alert alert-danger mt-4 p-2">{formik.errors.from}</div> :""}
   //                   </div>

   //                   <div className="row m-0 col-md-3 mb-1 ">

   //                      <div className="col-auto m-0">
   //                         <label htmlFor="to" className="col-form-label">To</label>
   //                      </div>

   //                      <div className="col-auto m-0">
   //                         <input type="date" id="to" className="form-control" aria-describedby="passwordHelpInline" 
   //                               value={formik.values.to}
   //                               onChange={formik.handleChange} 
   //                               onBlur={formik.handleBlur}
   //                               name="to" 
   //                               />
   //                      </div>
   //                      {formik.errors.to && formik.touched.to?<div className="alert alert-danger mt-4 p-2">{formik.errors.to}</div> :""}
   //                   </div>

   //                   <div className="row m-0 col-md-3 ">
   //                      <label>
   //                         <input type="checkbox"onChange={(e)=>{checkedInput(e)}} />
   //                         Checked Patient
   //                      </label>

   //                      <div className="col-auto m-0">
   //                         <label htmlFor="patient" className="col-form-label">Enter Phone Or Name Patient</label>
   //                      </div>

   //                      <div className="col-auto m-0">
   //                         <input type="text" id="patient" className="form-control" disabled={check} aria-describedby="passwordHelpInline" 
   //                               value={formik.values.patient}
   //                               onChange={formik.handleChange} 
   //                               onBlur={formik.handleBlur}
   //                               name="patient" 
   //                               />
   //                      </div>
   //                      {formik.errors.patient && formik.touched.patient?<div className="alert alert-danger mt-4 p-2">{formik.errors.patient}</div> :""}
   //                   </div>

   //                   <div className="row w-50 m-auto">
   //                      <button type="submit" className="btn bg-main text-white btn-sm mt-2">Send Date</button>
   //                   </div>

   //                   <div className="row w-50 m-auto">
   //                      <button type="submit" className="btn bg-main text-white btn-sm mt-2">Send Date</button>
   //                   </div>
                     
   //                </div>
   //             </form>



   //             <input type="text" onChange={(e)=>{setOne(e.target.value)}} />
   //             <input type="text" onChange={(e)=>{setTwo(e.target.value)}} />
   //             <input type="text" onChange={(e)=>{setThree(e.target.value)}} />
   //             {console.log("one" , One)}
   //             {console.log("Two" , Two)}
   //             {console.log("three" , Three)}
   //       </div>
   //    </>
   // )