import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import NewRunModal from "../NewRunModal/NewRunModal";
import OpenModalMenuItem from "./OpenModalMenuItem"
import CharacterCreationModal from "../CharacterCreationModal/CharacterCreationModal";
import RunPage from "../RunPage/RunPage";
import './MainPage.css'


const MainPage = () => {

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Navigate to="/landing" replace={true} />;

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

export default MainPage
