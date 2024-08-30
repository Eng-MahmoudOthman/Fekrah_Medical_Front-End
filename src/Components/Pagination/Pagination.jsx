import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination({handlePageClick}) {
   return (
      <div className=''>
         <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={false}
            pageCount={25}
            marginPagesDisplayed={0}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={"page-item "}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item "}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item "}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item "}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
         />
      </div>
   )
}
