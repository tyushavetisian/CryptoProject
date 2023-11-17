import React, { useEffect, useState } from "react";
import Loading from './Loading'
import { API_URL } from "../../core/constants";
import './Search.css'
import { useNavigate } from "react-router-dom";

const Search = () =>{
    const [searchQuery, setSearchQuery] = useState('')
    const [currencies, setCurrencies] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowResult, setIsShowResult] = useState(true)
    const navigate = useNavigate()

    const handleChangeInput = (e) =>{
        const {value} = e.target
        setSearchQuery(value)

        if(!value){
            setSearchResult([]);
            return
        }
        setIsLoading(true)
        const searchQueryArr = searchQuery.split(''); // ['i','b','t']
        const result = currencies.filter(el => {
            return searchQueryArr.every(char => el.id.includes(char.toLocaleLowerCase()))
        });
        setTimeout(()=>{
            setSearchResult(result)
            setIsLoading(false)
        }, 1000)
    }

    const fetchCurrencies = () =>{
        const url = `${API_URL}`;
        fetch(url).then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('error')
        }).then((result) => {
          setCurrencies(result)
        })
    }

    const handleWindowClick = (e) =>{
        
    }

    useEffect(()=>{
        window.addEventListener('click', handleWindowClick)
        return ()=>{
            window.removeEventListener('click', handleChangeInput)
        }

    }, handleWindowClick)

    useEffect(()=>{
        fetchCurrencies()
    }, [])

    const handleRedirect = (id) =>{
        navigate(`currency/${id}`)
        setSearchQuery('')
    }

    const renderSearchResults = () =>{
        if(!searchQuery){
            return null
        }
        // setIsShowResult(true)
        if(searchResult.length){
            return (
                <>
                {
                    isShowResult &&
                <div className="Search-result-container">
                {searchResult.map(result =>
                  <div
                    key={result.id}
                    className="Search-result"
                    onClick={()=>handleRedirect(result.id)}
                  >
                    {result.name} ({result.symbol})
                  </div>
                )}
              </div>
                }
                </>
            )
        }
        if(!isLoading){
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                      No results found.
                    </div>
                  </div>
            )
        }
    }


    return (
        <div className='Search'>
        <div>
        <span className="Search-icon" />
        <input 
            type="text"
            className="Search-input"
            placeholder="Currency name"
            value={searchQuery}
            onChange={handleChangeInput}
        />
        {
                isLoading &&
                    <div className="Search-loading">
                    <Loading
                        width="12px"
                        height="12px"
                    />
                    </div>
        }
        </div>
        {
            renderSearchResults()
        }
    </div>
    )
};

export default Search


            