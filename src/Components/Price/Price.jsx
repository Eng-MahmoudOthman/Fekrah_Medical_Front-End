import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading.jsx'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination/Pagination.jsx'
import Swal from 'sweetalert2';



export default function Price() {

   const [loading ,  setLoading] = useState(false)
   const [company , setCompany] = useState([]);
   let header = {
      token:localStorage.getItem("token"),
   };


      //& Get Test Data and Current Page :
      const fetchData = async(currentPage)=>{
         setLoading(true)
         await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company?page=${currentPage}`  ,  {headers:header})
         .then((response)=>{
            setCompany(response?.data.companies) ;
            setLoading(false)
         })
         .catch((error)=>{
            Swal.fire({
               title:error.response?.data.message  ,
               text: "Please Try Again" ,   
               icon: "error" ,
               width:"400px"
               });
            setLoading(false)
         })
      }
   
   
      //& Handle page Count :
      const handlePageClick = (data)=>{
         fetchData(data?.selected + 1)
      }


   useEffect(() => {
      fetchData()
   }, [])



   return (
      <Fragment>
         <div className="container price">
            <h2 className='main-header mt-5 pt-5'>Choose Company</h2>
            <div className='under-header'></div>

            <div className="row justify-content-evenly gap-1 mb-5">

               {loading? <Loading/> :<>
               
                  {company.map((ele)=>{
                     return (
                           <div className="col-3 col-md-2 card_item " key={ele._id}>
                              <Link to={`/addTest/${ele._id}`}>
                                    <div className="div_image text-center m-auto bg-light-subtle">
                                       <img src={ele.logo?.secure_url} alt="image" className='w-100 rounded-circle p-2'/>
                                       {/* <img src={ele.logo} alt="image" className='w-100 rounded-circle p-2'/> */}
                                    </div>
                                    <h6 className='fw-bold main-color text-center mt-2'>{ele.name}</h6>
                              </Link>
                           </div>
                     )
                  })}
               </>}

            </div>

            <Pagination handlePageClick={handlePageClick} />
         </div>
      </Fragment>
   )
}
