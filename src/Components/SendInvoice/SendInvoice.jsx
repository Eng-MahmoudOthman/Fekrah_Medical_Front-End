import React, { Fragment, useState } from 'react'

import { Formik , Form , ErrorMessage } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SendInvoice() {

   const navigate = useNavigate()
   const {id} = useParams()
   const [selectedFile, setSelectedFile] = useState(null);
   const [loading , setLoading] = useState(false)

   async function getData(image , values , orderId ){
      setLoading(true)
      let headers = {
         'enctype' :'multipart/form-data' , 
         token:localStorage.getItem("token"),
      };
      const formData = new FormData()
      formData.append('image',image ) ;

      axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/order/${orderId}` ,formData , {headers})
      .then((response)=>{
         // toast.success(response?.data.message);
         setLoading(false)
         navigate("/allOrderLoggedUser")
         Swal.fire({
            title: "Good job!",
            text: `عند الموافقة على طلبك 
            سيتم إرسال فاتورة الدفع يتم طباعتها وتقديمها لمقدم الخدمة لإكمال عملية  الدفع وسحب العينات 
            
            شكرا لاستخدامك فكرة ويب سايت`,
            icon: "success"
            });
      })
      .catch((error)=>{
         toast.error(error.response?.data?.message)
         setLoading(false)
      })
   }

   const validateForm = (values) => {
      const errors = {};
      //^ Validate image field :
      if (!values.file) {
         errors.image = 'Input image is required';
      }
      return errors;
   };

   return (
      <Fragment>
         <div className="container">
            <div className="send_invoice">
               <Formik
                     initialValues={{
                        image: null ,
                     }} validate={validateForm}
                     onSubmit={(values) => {getData(selectedFile , values , id)}}>
                     {({ isSubmitting, setFieldValue }) => (
                        
                        <Form className='w-75 m-auto mt-5 pt-5'>
                           <h1 className='main-header'>choose Sending Invoice</h1>
                           <div className='under-header'></div>

                           <div  className=' text-center h1'>
                              <h2 className='text-danger'>يرجى تحويل قيمة الفاتورة عن طريق خدمة فودافون كاش على هذا الرقم  ثم ارسال صورة إيصال الدفع لاتمام عملية التسجيل</h2>
                              <span className='text-primary fw-bold'>٠١٠٩٥٦٧٧٧٨٥</span>
                           </div>


                           <div className='mt-4'>
                                 <label htmlFor="image" className="form-label">Upload Image:</label>
                                 <input type="file" className="text-danger form-control" onChange={(event) => {setSelectedFile(event.target.files[0]);setFieldValue('file', event.target.files[0]);}}/>
                                 {/* {selectedFile && <p>Selected File: {selectedFile.name}</p>} */}
                                 <ErrorMessage name="image" component="div" className="text-danger" />
                           </div>
                           
                           <div className='text-center'>
                              {loading? 
                                 <button className="btn bg-main text-white btn-lg mt-2 w-50 m-auto"><i class="fa fa-spinner fa-spin text-white fa-1x"></i></button> 
                                 : 
                                 <button type="submit" className="btn bg-main w-50  mt-4">Send Invoice</button>
                                 // <button type="submit" disabled={isSubmitting} className="btn bg-main w-50  mt-4">Send Invoice</button>
                              }
                           </div>

                        </Form>
                     )}
               </Formik>
            </div>
         </div>
      
      
      </Fragment>
   )
}
