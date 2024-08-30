
import axios from "axios";
import { createContext, useState } from "react";
import Swal from 'sweetalert2'


export let CompanyContext = createContext();


export default function CompanyContextProvider(props){

   const [company , setCompany] = useState([]);
   const [allCompanyInfo , setAllCompanyInfo] = useState([]);
   const [companyId , setCompanyId] = useState("")
   const [error , setError] = useState(null) ;
   const [loading , setLoading] = useState(false)
   const [testCount , setTestCount] = useState(0)
   let header = {
      token:localStorage.getItem("token"),
   };


   //& Get All Prices in Specific Company :
   async function getCompany(id){
      setLoading(true)
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company/${id}` , {headers:header})
      .catch((error)=>{
         setError(error.response?.data.message);
         setLoading(false)
      })
      if(response?.data.message === "success"){
         setCompany(response?.data.company)
         setTestCount(response?.data.test_Count)
         setLoading(false)
      }
   }



   //& Get All  Company Information :
   async function getAllCompanyInfo(){
      setLoading(true)
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company` , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again Company Context" ,   
            icon: "error"
            });
      })
      if(response?.data.message === "success"){
         setAllCompanyInfo(response.data?.companies)
      }
   }


   return (
      <>
         <CompanyContext.Provider value={{company , setCompany , getCompany , error , setError ,  loading , setLoading  , companyId , setCompanyId , testCount , allCompanyInfo , setAllCompanyInfo , getAllCompanyInfo}}>
            {props.children}
         </CompanyContext.Provider>
      </>
   )
}