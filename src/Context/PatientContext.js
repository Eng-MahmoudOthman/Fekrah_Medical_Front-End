import React from 'react' ;
import { createContext , useState } from "react";



export let PatientContext = createContext();



export default function PatientContextProvider(props){

   const [patient , setPatient] = useState({}) ;


   return (
      <>
         <PatientContext.Provider value={{patient , setPatient}}>
            {props.children}
         </PatientContext.Provider>
      </>
   )
}

