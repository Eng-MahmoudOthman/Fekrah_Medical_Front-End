import { Fragment, useContext , useEffect , useState } from "react" ;
import { Link , NavLink, useNavigate } from "react-router-dom" ;
import logo from "../../Assets/images/fekrah_logo.jpg" ;
import avatar from "../../Assets/images/profile1.png"
import adminAvatar from "../../Assets/images/profile.webp"
import { UserContext } from "../../Context/UserContext.js";
import { CartContext } from "../../Context/CartContext.js";
import "./navbar.css"

export default function Navbar({socket}){

   const navigate = useNavigate() ;
   const [scroll , setScroll] = useState(0) ;
   const [click , setClick] = useState(true) ;
   const [notification , setNotification] = useState([])
   const {loggedUser , setLoggedUser , userToken , setUserToken , admin , setAdmin , moderator , setModerator } = useContext(UserContext);
   const {itemCount , setItemCount , getLoggedCart } = useContext(CartContext);


   //& Handle Scroll Display Navbar :
   window.onscroll = function (e){
      if(window.scrollY > scroll){
         e.target.getElementById("navbar").style.top = "-100px"
      }else{
         e.target.getElementById("navbar").style.top = "0px"
      }
      setScroll(window.scrollY)
   }

   const handleButtonDisplay = ()=>{
      setClick(!click)
   }

   let removeNotification = (count)=>{
      console.log(count);
      socket.emit("removeNotification" , count)
      
   }

console.log(notification);


   //& Handle Log Out :
   function logOut(){
      localStorage.clear() ;

      setLoggedUser({}) ;
      setUserToken("") ;
      setAdmin(false) ;
      setModerator(false)
      setItemCount(0)
      navigate("/")
   }



   socket.on("all-Notification" , (data)=>{
      setNotification(data)
      // setNotification((prev)=>[...prev , data])
   })


   useEffect(() => {
      socket.on("getNotification" , (data)=>{
         // setNotification((prev)=>[...prev , data])
         setNotification(data)
      })
   }, [socket])


   return (
      <Fragment>
         <nav className=" navbar navbar-expand p-0 main_navbar fixed-top mb-5 pt-1" id="navbar">
               <div className="container p-0">
                  <Link className="navbar-brand text-black div_logo" to="/"><img src={logo} alt="logo" className="w-100 h-100 logo" /></Link>

                  {userToken && loggedUser ? <>
                           {admin || moderator? <>
                                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto  mb-lg-0 ">
                                       <li className="nav-item">
                                          <NavLink className="nav-link" aria-current="page" to="/"><i className="fa-solid fa-house xxx"></i> <span >Home</span></NavLink>
                                       </li>
                                       

                                       <li className="nav-item">
                                          <NavLink className="nav-link" to="/dashBoard"><i className="fa-solid fa-address-card"></i><span >DashBoard</span></NavLink>
                                       </li>
                                    </ul>

                                    <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">
                                       <div className="d-inline-block position-relative div_imgCover">
                                          {notification.length ? <span className="position-absolute notification_admin p-1">{notification.length }</span> : ""} 
                                             <i onClick={()=>{handleButtonDisplay()}} class="fa-regular fa-bell fa-xl"></i>
                                             {/* <i onClick={()=>{handleButtonDisplay()}} class="fa-solid fa-bell fa-xl"></i> */}
                                             {/* <img className="imgCover" src={JSON.parse(localStorage.getItem("user")).imgCover || avatar} alt="imgCover" /> */}
                                       </div>

                                       <img  className="imgCover" src={adminAvatar} alt="imgCover" />
                                       <button onClick={()=>{logOut()}} className="btn btn_logOut me-1">LogOut</button>
                                    </ul>
                                 </div>
                           </> : <>
                                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto  mb-lg-0 ">
                                       <li className="nav-item">
                                          <NavLink className="nav-link" aria-current="page" to="/"><i className="fa-solid fa-house xxx"></i> <span >Home</span></NavLink>
                                       </li>
                                       
                                       <li className="nav-item">
                                          <NavLink className="nav-link" to="/price"><i className="fa-solid fa-layer-group"></i><span >price</span></NavLink>
                                       </li>

                                       <li className="nav-item">
                                          <NavLink className="nav-link" to="/allOrderLoggedUser"><i className="fa-solid fa-address-card"></i><span >Orders</span></NavLink>
                                       </li>
                                       <li className="nav-item">
                                          <NavLink className="nav-link" to="/contact"><i className="fa-solid fa-address-card"></i><span >Contact</span></NavLink>
                                       </li>
                                    </ul>

                                    <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">

                                       <li className="nav-item">
                                          <Link className="nav-link  position-relative " to="/cart">
                                          {itemCount ? <span className="notification_cart position-absolute text-black">{itemCount}</span> : ""}
                                             <i className="fa-solid fa-cart-shopping text-black"></i>
                                          </Link>
                                       </li>

                                       <div className="d-inline-block position-relative div_imgCover">
                                             <span className="position-absolute notification p-1">3</span>
                                          <Link to="/userProfile">
                                             {loggedUser?.imgCover ? <img src={loggedUser.imgCover} className="imgCover" alt="image"/> : <img className="imgCover" src={avatar} alt="imgCover" />}
                                          </Link>
                                       </div>

                                          <button onClick={()=>{logOut()}} className="btn btn_logOut me-1">LogOut</button>
                                    </ul>
                                 </div>
                           </>}
                     </> : <>
                           <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav ms-auto  mb-lg-0 ">
                                 <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/"><i className="fa-solid fa-house xxx"></i> <span >Home</span></NavLink>
                                 </li>
                                 <li className="nav-item">
                                    <NavLink className="nav-link" to="/price"><i className="fa-solid fa-layer-group"></i><span >price</span></NavLink>
                                 </li>

                                 <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact"><i className="fa-solid fa-address-card"></i><span >Contact</span></NavLink>
                                 </li>
                              </ul>

                              <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">
                                 <Link className="btn btn_log m-2" to="/login">Log in</Link>
                              </ul>
                           </div>
                     </>
                  }

               </div>

               {notification.length ? <>
                  <div className="notificationAdmin" style={{display:click ? 'none' : "block"}} >
                     <h4 className="p-1 bg-white rounded-1 text-center">Notification</h4>
                     <div className="p-1 bg-white rounded-2  notification-box">
                        {notification.map((ele)=>{
                           return (
                              // displayNotification(ele)
                              <p className="my-2  border-bottom border-2 pb-2">
                                 <span className="text-success mx-2">
                                    <i class="fa-solid fa-folder-plus"></i>
                                 </span> 
                                 {ele.type === "addOrder" ? `New Order is Added By ${ele.sender}` : ""} 
                                 <i onClick={()=>{removeNotification(ele.count)}} class="fa-solid fa-xmark text-danger  ms-4 exist_Notification"></i>
                              </p>
                           )
                        })}
                     </div>
                  </div>
               </> : <>
                  <div className="notificationAdmin" style={{display:click ? 'none' : "block"}} >
                     <h4 className="p-1 bg-white rounded-1 text-center">Notification</h4>
                     <div className="p-1 bg-white rounded-2">
                        <p className="text-center fw-bold text-danger">Not Found New Notification</p>
                     </div>
                  </div>
               </>}

         </nav> 
      </Fragment>
   )
}