
import axios from "axios";
import { createContext , useState } from "react";
import Swal from "sweetalert2";




export let TestContext = createContext();


export default function TestContextProvider(props){

   const[test , setTest] = useState({})
   const[tests , setTests] = useState([])

   let header = {
      token:localStorage.getItem("token"),
   };


   //& Get Specific Test By Id :
   async function getSpecificTest(id){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/test/${id}`  , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      });

      if(response?.data.message === "success"){
         setTest(response?.data.test)
      }
   }



   //& Get All Test :
   async function getAllTests(){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/test`  , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again Test Context" ,   
            icon: "error"
            });
      });

      if(response?.data.message === "success"){
         setTests(response?.data.tests)
      }
   }

   return (
      <>
         <TestContext.Provider 
         value={{
               getSpecificTest ,
               test ,
               getAllTests ,
               tests , 
            }}>
            {props.children}
         </TestContext.Provider>
      </>
   )
}