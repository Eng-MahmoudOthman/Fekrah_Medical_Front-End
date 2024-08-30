import React, { Fragment, useContext, useState } from 'react'

import { Formik , Form , ErrorMessage } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { CompanyContext } from '../../../Context/CompanyContext.js';

export default function ChangeImageCompany() {
   const{ company } = useContext(CompanyContext)
   
   const [selectedFile, setSelectedFile] = useState(null);
   const [loading , setLoading] = useState(false)
   const navigate = useNavigate()

   async function getData(image , values , id ){
      setLoading(true)
      let headers = {
         'enctype' :'multipart/form-data' , 
         token:localStorage.getItem("token"),
      };
      const formData = new FormData()
      formData.append('image',image ) ;

      axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/company/${id}` ,formData , {headers})
      .then((response)=>{
         setLoading(false)
         navigate("/dashboard/companyDashboard")
         toast.success("Successfully Update Image");
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
                     onSubmit={(values) => {getData(selectedFile , values , company._id)}}>
                     {({ isSubmitting, setFieldValue }) => (
                        
                        <Form className='w-75 m-auto mt-5 pt-5'>
                           <h1 className='main-header'>choose Logo Image</h1>
                           <div className='under-header'></div>

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
                                 <button type="submit" disabled={isSubmitting} className="btn bg-main w-50  mt-4">Change Image</button>
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
