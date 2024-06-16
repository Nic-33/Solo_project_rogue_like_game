import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import NewRunModal from "../NewRunModal/NewRunModal";
import OpenModalMenuItem from "./OpenModalMenuItem"
import CharacterCreationModal from "../CharacterCreationModal/CharacterCreationModal";
import RunPage from "../RunPage/RunPage";
import logo from '../../Images/logo.png'
import './MainPage.css'


const MainPage = () => {

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Navigate to="/landing" replace={true} />;

    return <div>
        <div className="Main_page_Container">
            <div id='left'>
                <div id='upper_left_side'>
                    <h3></h3>
                </div>
                <div id='middle'>
                    <img id='mainLogo' src={logo} alt='' />
                </div>
                <div id='lower_left_side'>
                    <h3></h3>
                </div>
            </div>
            <div id='right'>
                <div id="createChar">
                    <OpenModalMenuItem
                        itemText="Create A New Character"
                        modalComponent={<CharacterCreationModal />}
                    />
                </div>
                <div id="newRun">
                    <OpenModalMenuItem
                        itemText="New Run"
                        modalComponent={<NewRunModal />}
                    />
                </div>
                <div id="conRun">
                    <OpenModalMenuItem
                        itemText="Continue A Run"
                        modalComponent={<RunPage />}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default MainPage
