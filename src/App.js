import React from "react";
// import Header from "./components/common/Header";
// import List from "./components/list";
import { Header , List, Details, NotFound} from "./components";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () =>{
    return (
        <BrowserRouter>
            <>
            <Header/>
            <Routes>
            <Route path={'/'} exact element={<List/>}/>
            <Route path={'/currency/:id'} element={<Details/>}/>
            <Route path={'*'} element={<NotFound/>}/>
            </Routes>            
            </>
        </BrowserRouter>
        
    )
}
export default App
