import { Fragment } from "react";
import { Link , NavLink, useNavigate } from "react-router-dom" ;




export default function NavbarOnline(){
   const navigate = useNavigate() ;

   //& Handle Log Out :
   function logOut(){
      localStorage.removeItem("company")
      localStorage.removeItem("company_token")
      navigate("/onlineSystem")
   }

   return (
      <Fragment>
         <nav className=" navbar navbar-expand p-0 main_navbar fixed-top mb-5 pt-1" id="navbar">
               <div className="container p-0">
                  <Link className="navbar-brand text-white h1" to="#"><span className="navbar-brand text-white h1">Fekrah Medical Company</span></Link>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">

                     {localStorage.getItem("company_token") != null && localStorage.getItem("company") != null? 
                     <>

                        <ul className="navbar-nav ms-auto  mb-lg-0 ">
                           <li className="nav-item">
                              <NavLink className="nav-link" to="transportation"> <i className="fa-solid fa-house xxx"></i><span >Approved</span></NavLink>
                           </li>

                           <li className="nav-item">
                              <NavLink className="nav-link" aria-current="page" to="approvedSearch"> <i className="fa-solid fa-layer-group"></i> <span >All Approved</span></NavLink>
                           </li>
                        </ul>


                        <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">
                           <Link onClick={()=>{logOut()}} className="btn btn_log m-2" to="/onlineSystem">Log Out Now</Link>
                        </ul>
                     </> : <>
                        <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">
                           <Link className="navbar-brand text-white h1" to="#"><span className="navbar-brand text-white h1">Approval Online System The Fekrah Medical Company </span></Link>
                        </ul>
                     </>}

                  </div>

               </div>
         </nav> 
      </Fragment>
   )
}