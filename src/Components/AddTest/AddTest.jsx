import React, { Fragment, useContext, useEffect , useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext.js';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';
import { CompanyContext } from '../../Context/CompanyContext.js';
import Swal from 'sweetalert2';
import Pagination from '../Pagination/Pagination.jsx';




export default function AddTest() {
   const {id} = useParams();

   const { addTest , removeTest } = useContext(CartContext) ;
   const {company  , getCompany  ,  loading , setLoading , companyId , setCompanyId} = useContext(CompanyContext) ;
   const [price , setPrice] = useState([]);
   const [error , setError] = useState(null);

   let header = {
      token:localStorage.getItem("token"),
   };


   function searchInput (e){
      if(e.target.value === ""){
         setError(null)
         getData()
      }
      if(e.target.value.length >= 3){
         getData((e.target.value).toLowerCase())
      }
   }

   //& Get All test And Search On Test By Test Name :
   async function getData(search){
      setLoading(true)
      let limit = 30 ;
      let keyword = "";
      if(search){
         keyword = `keyword=${search}`
         limit = 0
      }

      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/price/getPriceCompany/${id}?${keyword}&limit=${limit}` , {headers:header})
      .catch((error)=>{
         setError(error.response?.data.message);
         setPrice([])
         setLoading(false)
      })
      if(response?.data.message === "success"){
         setError(null)
         setPrice(response?.data?.prices)
         setLoading(false)
      }
   }

   //& Get Test Data and Current Page :
   const fetchData = async(currentPage)=>{
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/price/getPriceCompany/${id}?page=${currentPage}`  ,  {headers:header})
      .then((response)=>{
         setPrice(response?.data?.prices)
      })
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      })
   }


   //& Handle page Count :
   const handlePageClick = (data)=>{
      fetchData(data?.selected + 1)
   }


   useEffect(() => {
      getData()
      getCompany(id)
      setCompanyId(id)
   }, [])
   

   return (
      <Fragment>
         <div className="container mt-5 pt-5 addTest">
            <div className="row">
               <h4 className='main-header'>Added Test Name in Order</h4>
               <div className='under-header'></div>


               <hr className='main-color'/>

               <div className='d-flex justify-content-between align-items-center '>
                  <h4 >Company is : <span className='main-color'>{company.name}</span>   </h4>
                  <div className='w-25 text-center'>
                     <img src={company.logo} alt={company.name} className='w-50' />
                  </div>
               </div>

            <div className="row my-5">
                  <div className="col-10 offset-1">
                     <form action="">
                        <input type="search" onChange={(e)=>{searchInput(e)}}  className='form-control w-100 m-auto my-2 ' placeholder='Search By Test Name'  name="search" />
                     </form>
                  </div>
               </div>   


               {error? <> <div className='alert alert-danger'>{error}</div></> : <></>}
                  {loading? <Loading/> :<>
                  
                     {price.map((ele)=>{
                        return (
                              <div className="col-md-6 g-2" key={ele._id}>
                                 <div className="price_card p-2 m-1">
                                    <div className='d-flex justify-content-between align-items-center'>
                                       <h6 className='main-color'><i class="fa-solid fa-flask-vial me-2"></i> {ele.testName.split(" ").map((ele)=>ele.charAt(0).toUpperCase() + ele.slice(1)).slice(0 , 6).join(" ")} </h6>
                                       <h6 className='main-color'><i class="fa-solid fa-building me-2"></i>{ele.companyName.charAt(0).toUpperCase() + ele.companyName.slice(1)}</h6>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                       <span className='d-inline-block text-success  line-count'> Price After Discount : {ele.priceAfterDiscount}</span>
                                       <span className='d-inline-block text-danger line-count'>Price : {ele.price}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center my-2'>
                                       <button disabled={false}  onClick={()=>{addTest(ele.test , ele.company)}}  className='btn bg-main w-25 btn-sm'> Add Test</button>
                                       <button disabled={false}  onClick={()=>{removeTest(ele.test)}} className='btn btn-danger w-25 btn-sm'>Remove</button>
                                    </div>
                                 </div>
                              </div>
                        )
                     })}
                  </>}
            </div>
            <Link to={`/cart`} className='btn bg-main w-50 text-center my-4 m-auto d-block' >Complete Order</Link>


            <Pagination handlePageClick={handlePageClick} />
         </div>
      </Fragment>
   )
}
