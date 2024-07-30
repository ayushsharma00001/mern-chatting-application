import React from "react"
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import "./HomePage.css"

const HomePage = ()=>{
    return(
        <div className="homepage-outer-div">
            <Sidebar/>
            <MessageContainer/>
        </div>
    )
}

export default HomePage;