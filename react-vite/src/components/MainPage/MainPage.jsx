import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import StartPage from "../StartPage";

import './MainPage.css'


const MainPage = () => {

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Navigate to="/landing" replace={true} />;

    return <div>
        <div className="Main_page_Container">
            <div className="startPage"><StartPage/></div>

        </div>
    </div>
}

export default MainPage
