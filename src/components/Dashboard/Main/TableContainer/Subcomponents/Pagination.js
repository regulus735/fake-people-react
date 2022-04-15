import React from 'react'
import { Link } from 'react-router-dom';
import './Pagination.sass';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const PageLink = ({ pageNumber, pageName, currentPage }) => {
   return (
      <Link to={`/?page=${pageNumber}`} style={currentPage ? { color: '#1ec144' } : null}>
         {pageName ? pageName : pageNumber}
      </Link>
   )
}

const Pagination = ({ data }) => {
   // console.log(data.page)
   let pageNumbers = [];

   const maxToLeft = data.totalPages - data.page >= 2 ? 3 : 3 - (data.totalPages - data.page) + 2;

   for (let i = 0, j = data.page, k = data.page; i < 5; i++) {
      if (i < maxToLeft && j > 0) {
         pageNumbers.push(j--);
      }
      else if (k < data.totalPages) {
         pageNumbers.push(++k)
      }
   }

   pageNumbers = pageNumbers.sort((a, b) => a - b);
   // console.log(pageNumbers)

   const pageNumbersComponent = pageNumbers.map(pageNumber => <PageLink key={pageNumber} pageNumber={pageNumber} currentPage={pageNumber === data.page} />)

   return (
      <div className='pagination'>
         <PageLink pageName={'First'} pageNumber={1} />
         <Link to={`/?page=${data.prevPage ?? 1}`} className='arrow'><FontAwesomeIcon icon={faAngleLeft} /></Link>

         {pageNumbersComponent}

         <Link to={`/?page=${data.nextPage ?? data.totalPages}`} className='arrow'><FontAwesomeIcon icon={faAngleRight} /></Link>
         <PageLink pageName={'Last'} pageNumber={data.totalPages} />
      </div>
   )
}

export default Pagination