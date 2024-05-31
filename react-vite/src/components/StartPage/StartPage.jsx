import { useSelector } from "react-redux"
import { NavLink, Navigate } from "react-router-dom";
import ViewRuns from "../ViewRuns/ViewRuns";
// import './MainPage.css'


const StartPage = () => {


    return <div>
        <div className="Main_page_Container">
            <NavLink to={'stuff'}>New Run</NavLink>
            <NavLink to={'/run'}>Continue Run</NavLink>

        </div>
    </div>
}

export default StartPage
