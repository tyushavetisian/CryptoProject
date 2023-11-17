import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../../core/constants";
import './Table.css'
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "../pagination";

const totalPages = 5
const List = () => {
    const [currencies, setCurrencies] = useState([])  
    const [error, setError] = useState(null)  
    const [isLoading, setIsLoading] = useState(false)  
    // const [page, setPage] = useState(1)  

    const [currentQueryParameters, setSearchParams] = useSearchParams();
    
    const page = useMemo(()=>{
      return currentQueryParameters.get('page')
    }, [currentQueryParameters.get('page')])

    // const { search } = useLocation();  
console.log(page,'page');
  const  fetchCurrencies = () =>{
    const url = `${API_URL}&page=${page}&per_page=20`;
    setIsLoading(true)
    fetch(url).then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('error')
    }).then((result) => {
      setCurrencies(result)
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false);
      setError(err)
    }) 
  }

  useEffect(()=>{
    //window.location.search
    if(!page){
      currentQueryParameters.set('page', 1)
      setSearchParams(currentQueryParameters)
    }
  }, [])

  useEffect(()=>{
    fetchCurrencies()
  }, [page])

   const handleChangePagination = (isIncrement) =>{
    const page = +currentQueryParameters.get('page') + (isIncrement ? 1 : -1);
    currentQueryParameters.set('page', page);
    setSearchParams(currentQueryParameters)
  }
  
    if (isLoading) {
      return <div className="loading-container">
        <Loading />
      </div>
    }

    if (error) {
      return <div>Error</div>
    }
    return (
      <>     
      <Table 
      currencies={currencies}       
      />
      <Pagination
      page = { +page }
      handleChangePagination = { handleChangePagination }
      totalPages={totalPages}
      /> 
     </>
    )
  }
export default List