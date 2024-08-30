import React , { Fragment, useEffect } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext.js'
import { CompanyContext } from '../../Context/CompanyContext.js';
import { Link } from 'react-router-dom';
import imgCart from '../../Assets/images/7835563.png' ;
import cart2 from '../../Assets/images/cart_2.jpg' ;
import cart3 from '../../Assets/images/cart_3.jpg' ;
import cart4 from '../../Assets/images/cart_4.jpg' ;


export default function Cart() {

   const {cart , getLoggedCart   , removeTest , clearCart , error , setError ,  itemCount} = useContext(CartContext) ;
   const {companyId} = useContext(CompanyContext) ;



   
   useEffect(() => {
      setError(null)
      getLoggedCart()
   }, [])

   return (
      <Fragment>
         <div className="container cart bg-body-tertiary rounded-4 p-2 mt-5">
            <h1 className='main-header'>Cart</h1>
            <div className='under-header'></div>


               {error? <div className='alert alert-danger w-75 p-1 m-auto text-center'>{error}</div> : <>
               
                  <div className="row border border-4 border-white m-2">
                     <div className="col-4 p-0">
                        <div className='border border-5 border-white text-center'>
                           {/* <img src={cart2}  alt="image" className='w-100 rounded-2' /> */}
                           <img src={cart2}  class="img-fluid" alt="image"></img>
                        </div>
                     </div>
                     <div className="col-4 p-0">
                        <div className='border border-5 border-white text-center'>
                           {/* <img src={cart3}  alt="image" className='w-100 rounded-2' /> */}
                           <img src={cart3}  class="img-fluid" alt="image"></img>
                        </div>
                     </div>
                     <div className="col-4 p-0">
                        <div className='border border-5 border-white text-center'>
                           {/* <img src={cart4}  alt="image" className='w-100 rounded-2' /> */}
                           <img src={cart4}  class="img-fluid" alt="image"></img>
                        </div>
                     </div>
                  </div>

                  <div className="row p-2">
                     {cart.cartItems?.map((ele)=>
                        <div className="col-lg-4 g-2" key={ele._id}>
                           <div className="item_cart bg-light-subtle py-1 px-4 rounded-3 border border-1">
                              <h6 className='text-center' >{`${ele.test.name}    Company:${ele.price.companyName}`}</h6>
                              <div className='d-flex justify-content-between align-items-center '>

                                 <div className=''>
                                    <i onClick={()=>{removeTest(ele.test._id)}} class="fa-solid fa-trash fa-2x text-danger" title="Remove Test From Cart"></i>
                                 </div>

                                 <div className=''>
                                    <p className='text-danger my-0'>  <del>قبل الخصم :   {ele.price.price} </del></p>
                                    <p className='text-success my-0'>بعد الخصم  :  {ele.price.priceAfterDiscount} </p>
                                    <p className='text-warning'> الخصم  : % {ele.price.discount}  </p>
                                 </div>

                              </div>

                              <div className=''>
                                 <details className='text-center'>
                                    <summary className='btn bg-main btn-sm w-50'>Test Condition</summary>
                                    <p>{ele.test.condition}</p>
                                 </details>
                              </div>

                           </div>
                        </div>                  
                     )}
                     <hr className='main-color my-4 w-75 m-auto'/>

                     <div className='cart_payment p-2'>
                        <div className='info_Cart'>
                           <p><i class="fa-solid fa-xmark text-danger fa-2x me-4"></i><p className='h6 d-inline text-black-50 fw-bold'>  Total Price Before Discount : </p><span className='h6 text-black-50 span_price'>{cart.total_Price}</span> EGP</p>
                           <p><i class="fa-solid fa-check text-success fa-2x me-4"></i><p className='h6 d-inline fw-bold'>  Total Price After Discount : </p> <span className='h6 fw-bold'>{cart.total_After_Discount}</span> EGP</p>
                           <p><i class="fa-regular fa-flag text-warning fa-2x  me-4"></i><p className='h6 d-inline me-4 fw-bold'>Test Count : </p> <span className='h6'>{itemCount}</span></p>
                        </div>
                        <div className='img_Cart text-center'>
                           <img src={imgCart} className='w-25'/>
                        </div>
                     </div>
                  </div>

                  <div>
                     <Link to="/order"  className='btn bg-main d-block m-auto w-75'>Check Out</Link>
                  </div>
               
               </>}

            <div className='d-flex justify-content-evenly align-items-center w-75 m-auto my-3'>
               <button onClick={()=>{clearCart()}} className='btn btn-outline-danger btn-sm d-block w-50 me-2'>Clear Cart</button>
               {error ? 
                  <><Link to={`/price`} className='btn bg-main btn-sm d-block w-50'>Continue Added Test</Link></> 
                  : 
                  <><Link to={`/addTest/${companyId}`} className='btn  bg-main btn-sm d-block w-50'>Continue Added Test</Link></>}
            </div>

         </div>

      </Fragment>
   )
}
