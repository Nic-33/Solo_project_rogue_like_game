import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal.jsx";
import OpenModalMenuItem from "./OpenModalMenuItem.jsx";
import logo from '../../Images/logo.png'
import "./LandingPage.css";


function LandingPage() {
    const sessionUser = useSelector((state) => state.session.user);


    if (sessionUser) return <Navigate to="/" replace={true} />;


    return (
        <>
            <div className="landingPage">
                <div id='landing_page_container'>
                    <div id='left'>
                        <div id='upper_left_side'>
                            <h3>Welcome to</h3>
                        </div>
                        <div id='middle'>
                            <img id='mainLogo' src={logo} alt='home' />
                        </div>
                        <div id='lower_left_side'>
                            <h3></h3>
                        </div>
                    </div>
                    <div id='right'>
                        <div id='upper_right_side'>
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                modalComponent={<SignupFormModal />} />
                        </div>
                        <div id="lower_right_side">
                            <OpenModalMenuItem
                                itemText="Log in"
                                modalComponent={<LoginFormModal />} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage
