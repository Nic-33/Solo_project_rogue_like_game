import { NavLink } from "react-router-dom";
import NewRunModal from "../NewRunModal/NewRunModal";
import OpenModalMenuItem from "./OpenModalMenuItem"
import CharacterCreationModal from "../CharacterCreationModal/CharacterCreationModal";
import RunPage from "../RunPage/RunPage";


// import './StartPage.css'


const StartPage = () => {

    return <div>
        <div className="Main_page_Container">
            <OpenModalMenuItem
                itemText="Create A New Character"
                modalComponent={<CharacterCreationModal />}
            />
            <OpenModalMenuItem
                itemText="New Run"
                modalComponent={<NewRunModal />}
            />
            <OpenModalMenuItem
                itemText="Continue A Run"
                modalComponent={<RunPage />}
            />
        </div>
    </div>
}

export default StartPage
