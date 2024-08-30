import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';
import "./featureHome.css"


export default function FeaturedHome() {
   const {admin , moderator } = useContext(UserContext);
   
   
   function addClick (e){
      e.target.parentElement.classList.toggle("toggle_move")
   }
   
   
   return (
      <Fragment>
         <div className="container-fluid mb-5 featuredHome position-relative ">

            <div>
               <div className="row my-5">
                  <div className="col-md-12 imageHome d-flex justify-content-center align-items-center text-white">
                     <h1 className='text-white z-3 text-center'>Welcome In Fekrah Medical Website</h1>
                  </div>
               </div>

               {admin || moderator ? 
                     <></> 
                  :
                     <div className='position-fixed addTestHome p-4 text-center bg-light z-3' >
                        <button className='btn btn-success position-absolute addTest' onClick={(e)=>{addClick(e)}}>البدء</button>
                        <div >
                           <Link to="/price">  عمل تحليل </Link>
                           <Link to="/price">  عمل اشعة </Link>
                           <Link to="#">   خدمات اخرى </Link>
                           {/* <a  href="https://api.whatsapp.com/send?text=Hello World!phone=01141636114">WhatsApp</a> */}
                           {/* <a href="whatsapp://send?abid=01141636114&text=Hello%2C%20World!">Send Message</a> */}
                           <a href="whatsapp:contact=01141636114@api.whatsapp.com&message=Hello I`m Happy to Visit Fekrah Website Good Day !">Send Message</a>
                           <Link to="/shareWebsite">Share Website</Link>
                           {/* <a href="whatsapp://send?text=Hello World!&phone=01141636114">Ping me on WhatsApp</a> */}
                        </div>
                        {/* <div>
                           <Link to="01126999142">WhatsApp</Link>
                        </div> */}
                     </div>
               }

            </div>


            <div className='row '>

               <div className="col-lg-4 mt-4">
                  <div className='cartHome text-center p-2 border border-3 position-relative'>
                     <h6 className='cartHeader text-success'>Make New Order</h6>
                     <h2 className='mt-4 fw-bold text-success'>طلب تسجيل تحاليل</h2>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, distinctio!</p>
                     <Link to="/price" className='btn btn-success rounded-0 w-50'>Learn More <i class="fa-solid fa-arrow-right ms-4"></i></Link>
                  </div>
               </div>

               <div className="col-lg-4 mt-4">
                  <div className='cartHome text-center p-2 border border-3 position-relative'>
                     <h6 className='cartHeader text-danger'>House Call</h6>
                     <h2 className='mt-4 fw-bold text-danger'>طلب زيارة منزلية</h2>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, distinctio!</p>
                     <Link to="/houseCall" className='btn btn-danger rounded-0 w-50'>Learn More <i class="fa-solid fa-arrow-right ms-4"></i></Link>
                  </div>
               </div>

               <div className="col-lg-4 mt-4">
                  <div className='cartHome text-center p-2 border border-3 position-relative'>
                     <h6 className='cartHeader text-primary'>Month Profile</h6>
                     <h2 className='mt-4 fw-bold text-primary'>الباقات الشهرية</h2>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, distinctio!</p>
                     <Link to="/monthProfile" className='btn btn-primary rounded-0 w-50'>Learn More <i class="fa-solid fa-arrow-right ms-4"></i></Link>
                  </div>
               </div>

               <div className="col-lg-4 mt-4">
                  <div className='cartHome text-center p-2 border border-3 position-relative'>
                     <h6 className='cartHeader text-secondary'>Analysis Profile</h6>
                     <h2 className='mt-4 fw-bold text-secondary'>باقات التحاليل</h2>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, distinctio!</p>
                     <Link to="/analysisProfile" className='btn btn-secondary rounded-0 w-50'>Learn More<i class="fa-solid fa-arrow-right ms-4"></i></Link>
                  </div>
               </div>

               <div className="col-lg-4 mt-4">
                  <div className='cartHome text-center p-2 border border-3 position-relative'>
                     <h6 className='cartHeader text-secondary'>Radiology Profile</h6>
                     <h2 className='mt-4 fw-bold text-secondary'>باقات الاشعه</h2>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, distinctio!</p>
                     <Link to="/radiologyProfile" className='btn btn-secondary rounded-0 w-50'>Learn More<i class="fa-solid fa-arrow-right ms-4"></i></Link>
                  </div>
               </div>

               <div className="col-lg-4 mt-4">
                  <div className='cartHome text-center p-2 border border-3 position-relative'>
                     <h6 className='cartHeader text-secondary'>Contact Me</h6>
                     <h2 className='mt-4 fw-bold text-secondary'>للإستفسار والتواصل معنا</h2>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, distinctio!</p>
                     <Link to="/contact" className='btn btn-secondary rounded-0 w-50'>Learn More<i class="fa-solid fa-arrow-right ms-4"></i></Link>
                  </div>
               </div>

            </div>

         </div>  
      </Fragment>
   )
}
