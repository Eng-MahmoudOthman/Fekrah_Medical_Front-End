
import React , {Fragment , useState } from 'react';
import { Formik , Form , ErrorMessage, Field } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



export default function AddCompany() {

      const [selectedFile, setSelectedFile] = useState(null);
      const [isLoadingAdded, setIsLoadingAdded] = useState(false);
      const navigate = useNavigate() ;
      const token = localStorage.getItem("token")
      
      
      async function getData(file , values){
         setIsLoadingAdded(true)
         const formData = new FormData()
         let headers ={ 'enctype' :'multipart/form-data' , token} ;
         
      
         formData.append('name' , values.name);
         formData.append('description' , values.description);
         formData.append('address' , values.address);
         formData.append('phone' , values.phone);
         formData.append('email' , values.email);
         formData.append('password' , values.password);
      
      
         formData.append('file',file )
         axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/company` ,formData,{headers})
         .then((response)=>{
            setIsLoadingAdded(false)
            toast.success(response.data?.message);
            navigate('/dashBoard/companyDashboard')
         })
         .catch((error)=>{
            setIsLoadingAdded(false)
            Swal.fire({
               title:error.response.data.message  ,
               text: "Please Try Again" ,   
               icon: "error"
            });
            setTimeout(() => {
               window.location.reload()
            }, 4000);
         })
      }
      
      const validateForm = (values) => {
         const errors = {};
         //^ Validate name field :
         if (!values.name) {
            errors.name = 'Input name is required';
         }
      
         //^ Validate description field :
         if (!values.description) {
            errors.description = 'Input description is required';
         }
      
         //^ Validate address field :
         if (!values.address) {
            errors.address = 'Input address is required';
         }
      
         //^ Validate email field :
         if (!values.email) {
            errors.email = 'Input email is required';
         }
      
         //^ Validate phone field :
         if (!values.phone) {
            errors.phone = 'Input phone is required';
         }

         //^ Validate password field :
         if (!values.password) {
            errors.password = 'Input password is required';
         }
      
         //^ Validate image field :
         // if (!values.file) {
         //    errors.file = 'Input image is required';
         // }
         return errors;
      };

      return (
         <Fragment>
            <Formik
                  initialValues={{
                     file: null ,
                     name:"" ,
                     address :"" ,
                     phone:"" ,
                     description :"",
                     email:"" ,
                     password:"" ,
                  }} validate={validateForm}
                  onSubmit={(values) => {getData(selectedFile , values)}}>
                  {({ isSubmitting, setFieldValue }) => (
                     
                     <Form className='w-75 m-auto'>
                        <h1 className='main-header'>Add New Company</h1>
                        <div className='under-header'></div>


                        <div  className='mt-2'>
                              <label htmlFor="name" className="form-label">Add Company Name</label>
                              <Field type="text" className="form-control"  name="name" id="name" />
                              {/* {selectedFile && <p>name: {selectedFile.name}</p>} */}
                              <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="description" className="form-label">Add Description</label>
                              <Field type="text"  name="description" id="description" className="form-control"/>
                              {/* {selectedFile && <p>Description: {selectedFile.name}</p>} */}
                              <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="address" className="form-label">Add address</label>
                              <Field type="text"  name="address" id="address" className="form-control"/>
                              {/* {selectedFile && <p>address: {selectedFile.name}</p>} */}
                              <ErrorMessage name="address" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="phone" className="form-label">Add phone</label>
                              <Field type="text"  name="phone" id="phone" className="form-control"/>
                              {/* {selectedFile && <p>phone: {selectedFile.name}</p>} */}
                              <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="email" className="form-label">Add email</label>
                              <Field type="text"  name="email" id="email" className="form-control"/>
                              {/* {selectedFile && <p>email: {selectedFile.name}</p>} */}
                              <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="password" className="form-label">Add password</label>
                              <Field type="text"  name="password" id="password" className="form-control"/>
                              {/* {selectedFile && <p>password: {selectedFile.name}</p>} */}
                              <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>


                        <div className='mt-4'>
                              <label htmlFor="image" className="form-label">Upload Image:</label>
                              <input type="file" className="text-danger form-control" onChange={(event) => {setSelectedFile(event.target.files[0]);setFieldValue('file', event.target.files[0]);}}/>
                              {/* {selectedFile && <p>Selected File: {selectedFile.name}</p>} */}
                              <ErrorMessage name="file" component="div" className="text-danger" />
                        </div>

                        <div className='d-flex justify-content-center mt-4 '>
                           {isLoadingAdded? <>

                              <button className="btn bg-main w-50">
                                 <i className='fas fa-spinner fa-spin fs-4'/>
                              </button>

                           </> : <>
                              <button type="submit" disabled={isSubmitting} className="btn bg-main w-50">Add Company</button>
                           </>}
                        </div>

                     </Form>
                  )}
            </Formik>     
         </Fragment>
      )
}















