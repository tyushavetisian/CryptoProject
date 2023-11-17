import React from "react";
import './Pagination.css'

const Pagination = ({page,handleChangePagination, totalPages}) =>{
    return (
        <div className='Pagination'>
        <button 
        className = 'Pagination-button'
        disabled = {page === 1}
        onClick = {()=>handleChangePagination(false)}
        >
        &larr;
        </button>
        <span
        className = 'Pagination-info'
        >
         page <span>{page}</span> of <b>{totalPages}</b>   
        </span>
        <button
        className='Pagination-button'
        disabled = {page === totalPages}
        onClick = {()=>handleChangePagination(true)}
        >
         &rarr;
        </button>
    </div>
    )
}

export default Pagination