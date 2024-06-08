import { useSelector } from "react-redux"
import { NavLink, Navigate } from "react-router-dom";
import ViewRuns from "../ViewRuns/ViewRuns";
import NewRunModal from "../NewRunModal/NewRunModal";
import OpenModalMenuItem from "./OpenModalMenuItem"
import { useModal } from "../../context/Modal";
import CharacterCreationModal from "../CharacterCreationModal/CharacterCreationModal";


// import './StartPage.css'


const StartPage = () => {
    const { closeModal } = useModal();

    const closeMenu = () => setShowMenu(false);

    return <div>
        <div className="Main_page_Container">
            <OpenModalMenuItem
                itemText="Create A New Character"
                onItemClick={closeMenu}
                modalComponent={<CharacterCreationModal />}
            />
            <OpenModalMenuItem
                itemText="New Run"
                onItemClick={closeMenu}
                modalComponent={<NewRunModal />}
            />
            <NavLink to={'/run'}>Continue</NavLink>
        </div>
    </div>
}

export default StartPage
