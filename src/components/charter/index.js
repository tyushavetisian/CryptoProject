import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useParams } from "react-router-dom";

const Charter = ({setIsShowCharter}) =>{
    const [charterData, setCharterData] = useState({});
    const {id} = useParams()
    const ref = useRef()

    useEffect(()=>{
        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=3`)
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            setCharterData(data)
        })
    }, [])

    const handleToggleCharter = useCallback((e)=>{
        if(!ref.current.contains(e.target)){
            setIsShowCharter(false)
        }
    },[])

    useEffect(()=>{
        document.addEventListener('click', handleToggleCharter)
        return ()=>{
            document.removeEventListener('click', handleToggleCharter)
        }
    }, [handleToggleCharter])

    const options = useMemo(()=>{
        const data = charterData.prices?.map(el => el[1]) || []
        return {
            title: {
              text: 'Currency chart'
            },
            series: [{
              data
            }]
          }
    }, [charterData])

    return (
        <div ref={ref}>
            <HighchartsReact 
            highcharts={Highcharts}
            options = {options}
            />
        </div>
    )
}

export default Charter