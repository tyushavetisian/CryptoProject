import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrencyURL } from "../../core/helpers";
import { HttpResponse, HttpResponseStatus } from "../../core/classes/httResponse";
import Loading from "../common/Loading";
import { renderChangePercent } from "../../core/helpers";
import './Details.css'
import Charter from "../charter";

const Details = () =>{
    const [currency, setCurrency] = useState(new HttpResponse({}));
    const [isShowCharter, setIsShowCharter] = useState(false)
    const { id } = useParams();

    useEffect(()=>{
        setCurrency(currency.fetching())
        const url = getCurrencyURL(id);
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            setCurrency(currency.fetched(data[0]))
        }).catch((err)=>{
            setCurrency(currency.failed(err))
        })
    }, [id])


    if(currency.status === HttpResponseStatus.PENDING){
        return <div className="loading-container"><Loading/></div>
    }
    if(currency.status === HttpResponseStatus.ERROR){
        return <div>Error....</div>
    }
        return (
              <>
              {
                isShowCharter && <Charter setIsShowCharter={setIsShowCharter}/>
              }
               <div className="Detail">
            <h1 className="Detail-heading">
                <img 
                src={currency.data.image} 
                alt=""  
                onClick={(e)=>{
                    e.stopPropagation();
                    setIsShowCharter(!isShowCharter)
                }}
                />
                {currency.data.name} ({currency.data.symbol})
            </h1>

            <div className="Detail-container">
                <div className="Detail-item">
                    Price
                    <span className="Detail-value">
                        $ {currency.data.current_price}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    Rank
                    <span className="Detail-value">
                        {currency.data.market_cap_rank}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    Price Change Percentage 24h
                    <span className="Detail-value">
                        {renderChangePercent(
                            currency.data.price_change_percentage_24h
                        )}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    24H Change
                    <span className="Detail-value">
                        $ {currency.data.price_change_24h}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    <span className="Detail-title">Market cap</span>
                    <span className="Detail-dollar">$</span>
                    {currency.data.market_cap}
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    <span className="Detail-title">Total supply</span>
                    {currency.data.total_supply}
                </div>
            </div>
        </div>
              </>
        )
}

export default Details