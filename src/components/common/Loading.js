import React from "react";
import './Loading.css'
    
const Loading = ({width = '32px', height = '32px'}) =>{
    return (
        <div 
        className="Loading"
        style={{width, height}}
        />
    )
}

// Loading.defaultProps = {
//     width : '32px',
//     height: '32px'
// }


export default Loading;
