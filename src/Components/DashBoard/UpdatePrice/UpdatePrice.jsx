import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { PriceContext } from '../../../Context/PriceContext.js'
import { Fragment } from 'react'



export default function UpdatePrice() {
   const{priceId , testId} = useParams() ;
   const {priceDetails} = useContext(PriceContext) ;
   let navigate = useNavigate() ;

   let header = {
      token:localStorage.getItem("token"),
   };


   async function submitUpdatePrice(values){
      Swal.fire({
         title: "Do you want to save the changes?",
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: "Save",
         denyButtonText: `Don't save`
      }).then(async(result) => {
         if (result.isConfirmed) {
            let response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/price/${priceId}` , values , {headers:header})
            .catch((error)=>{
               Swal.fire({
                  title:error.response.data.message  ,
                  text: "Please Try Again" ,   
                  icon: "error"
                  });
            });
            if(response?.data.message === "success"){
               // Swal.fire({
               //    title:response?.data.message  ,
               //    text: "Success Added New Test" ,   
               //    icon: "success"
               // });
               navigate(`/dashBoard/SpecificTest/${testId}`)
            }
         Swal.fire("Saved! Success Updated Price", "", "success");
         } else if (result.isDenied) {
         Swal.fire("Changes are not saved", "", "info");
         }
      });

   }


   let validationSchema = Yup.object({
      price:Yup.number() ,
      discount:Yup.number() ,
      final_amount:Yup.number() ,
   })



   let formik = useFormik({
      initialValues:{
         price: priceDetails.price ||  0 ,
         discount:  priceDetails.discount ||  0 ,
         final_amount:  priceDetails.final_amount ||  0 ,
      } , validationSchema , 
      onSubmit:submitUpdatePrice
   })

   return (
      <Fragment>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Update Price</h1>
            <div className='under-header'></div>
            <form action="" onSubmit={formik.handleSubmit}>

               <div className="my-4">
                  <label htmlFor="price" className="form-label">Write Price</label>
                  <input type="number" 
                     value={formik.values.price}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="price"  
                     name="price" 
                     placeholder="Write Price" />
                  {formik.errors.price  && formik.touched.price?<div className="alert alert-danger mt-4 p-2">{formik.errors.price}</div> :""}
               </div>

               <div className="my-4">
                  <label htmlFor="discount" className="form-label">Write Discount  %</label>
                  <input type="number" 
                     value={formik.values.discount}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="discount"  
                     name="discount" 
                     placeholder="Write Discount" />
                  {formik.errors.discount  && formik.touched.discount?<div className="alert alert-danger mt-4 p-2">{formik.errors.discount}</div> :""}
               </div>

               <div className="my-4">
                  <label htmlFor="final_amount" className="form-label">Write Final Amount</label>
                  <input type="number" 
                     value={formik.values.final_amount}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="final_amount"  
                     name="final_amount" 
                     placeholder="Write final_amount" />
                  {formik.errors.final_amount  && formik.touched.final_amount?<div className="alert alert-danger mt-4 p-2">{formik.errors.final_amount}</div> :""}
               </div>


               <div className="d-grid gap-2 col-6 mx-auto my-5">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white btn-sm mt-2">Send Data</button>
               </div>


            </form>
         </div>
      </Fragment>
   )
}
