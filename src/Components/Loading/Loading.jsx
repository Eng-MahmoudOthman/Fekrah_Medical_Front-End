import React, { Fragment } from 'react'
import { BallTriangle } from 'react-loader-spinner'

export default function Loading() {
   return (
      <Fragment>
         <div className='container d-flex justify-content-center align-items-center'>
            <BallTriangle
               height={100}
               width={100}
               radius={5}
               color="#4fa94d"
               ariaLabel="ball-triangle-loading"
               wrapperStyle={{}}
               wrapperClass=""
               visible={true}
            />
         </div>
      </Fragment>
   )
}
