import React, { Fragment, useContext, useState } from 'react' ;
import { ProductContext } from '../../Context/ProductContext.js';


export default function PaginationHome() {

   const { getData } = useContext(ProductContext)


   return (
      <Fragment>
         <div className="container">
            <div className="row my-5">
               <nav aria-label="Page navigation example">
                  <ul class="pagination  justify-content-center">
                     <li class="page-item">
                        <button class="page-link" onClick={()=>getData(-1)}  aria-label="Previous">
                           <span aria-hidden="true">&laquo;</span>
                        </button>
                     </li>
                     <li class="page-item"><button onClick={()=>getData(1)} class="page-link">1</button></li>
                     <li class="page-item"><button onClick={()=>getData(2)} class="page-link">2</button></li>
                     <li class="page-item"><button onClick={()=>getData(3)} class="page-link">3</button></li>
                     <li class="page-item"><button onClick={()=>getData(4)} class="page-link">4</button></li>
                     <li class="page-item"><button onClick={()=>getData(5)} class="page-link">5</button></li>
                     <li class="page-item"><button onClick={()=>getData(6)} class="page-link">6</button></li>
                     <li class="page-item">
                        <button class="page-link" onClick={()=>getData(+1)}  aria-label="Next">
                           <span aria-hidden="true">&raquo;</span>
                        </button>
                     </li>
                  </ul>
               </nav>
            </div>
         </div> 


      </Fragment>
   )
}
