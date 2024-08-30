import React, { Fragment, useState } from 'react'
import { Link , Outlet } from 'react-router-dom'

export default function DashBoard() {
   // const [exist , setExist] = useState(true)
   const [click , setClick] = useState(true)

   function addClick (e){
      e.target.parentElement.classList.toggle("toggle_move_dashboard") ;
      setClick(!click)
   }
   // function addClick (e){
   //    e.target.parentElement.classList.toggle("toggle_move_dashboard")
   //    if(exist){
   //       setExist(false)
   //    }else{
   //       setExist(true)
   //    }
   // }

   return (
      <Fragment>
         <div className='container-fluid  position-relative pt-2 mt-5 dashBoard'>
            <div className="row">

               <div className='nav_dashboard bg-body-tertiary position-fixed'>
                  {click ? 
                     <button onClick={(e)=>{addClick(e)}} className='btn btn-primary btn-sm position-absolute btn_Control'>Control</button>
                     :
                     <button onClick={(e)=>{addClick(e)}} className='btn btn-primary btn-sm position-absolute btn_Control'>Exist</button>
                  }
                  <h1 className=" h6 text-center my-1 border-2 border-bottom py-2" >Dashboard</h1>

                  

                  <div className='p-2'>
                     <ul className="links">
                  
                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-house-circle-check main-color"></i></span>
                           <Link className="text-body-secondary" to="">Home <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-users main-color"></i></span>
                           <Link className=" text-body-secondary  "  to="userDashboard">Users <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-list main-color"></i></span>
                           <Link className=" text-body-secondary  "  to="companyDashboard">Company <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-list main-color"></i></span>
                           <Link className=" text-body-secondary  "  to="testDashboard">Test <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative ">
                           <span className="m-4"><i class="fa-solid fa-folder-open main-color"></i></span>
                           <Link className=" text-body-secondary   "   to="#">Orders <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-bed main-color"></i></span>
                           <Link className=" text-body-secondary  "  to="patientDashboard">Patients <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-copy main-color"></i></span>
                           <Link className=" text-body-secondary  "  to="reportDashboard">Reports <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-comments main-color"></i></span>
                           <Link className=" text-body-secondary  "  to="#">Notification <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                        <li className="bg-white  fw-bold position-relative">
                           <span className="m-4"><i class="fa-solid fa-gear main-color"></i></span>
                           <Link className=" text-body-secondary  "  to="#">Setting <span className="arrow position-absolute"><i class="fa-solid fa-chevron-right"></i></span></Link>
                        </li>

                     </ul>
                  </div>

               </div>

               <div className="col-md-12">
                  <Outlet></Outlet>
               </div>

            </div>
         </div>
      </Fragment>
   )

   
}
