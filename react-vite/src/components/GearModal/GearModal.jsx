import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetGear } from "../../redux/gear";
import { useModal } from "../../context/Modal";
import "./GearModal.css";
import { rightData, leftData, chestData } from "../../BTSCode/data";
import OpenModalMenuItem from "./OpenModalMenuItem"
import InventoryModal from "../InventoryModal/InventoryModal";
import NewRunModal from "../NewRunModal/NewRunModal";

function GearModal(props) {
    const char_id = props.props.id
    const dispatch = useDispatch();
    const gearSlice = useSelector((state) => state.gear)
    const [gearLoaded, setGearLoaded] = useState(false)
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();



    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(

        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    useEffect(() => {
        dispatch(thunkGetGear(char_id))
        dispatch(thunkGetChar_inv(char_id))
            .then(() => setGearLoaded(true))
        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
    }, [dispatch, char_id])

    const closeMenu = () => setShowMenu(false);

    return (<>
        {gearLoaded && <div className="gearCont">
            <h1 className="gearTitle">Gear</h1>
            <form className="gearForm" onSubmit={handleSubmit}>
                <div className="chest">
                    <h2>Chest Armor</h2>
                    <h3>Equipped: {chestData[gearSlice.chest].name}</h3>
                    <OpenModalMenuItem
                        itemText="change equipped item"
                        onItemClick={closeMenu}
                        modalComponent={<InventoryModal props={[props.props, char_id]} tag={'chest'} currentEquip={chestData[gearSlice.chest]} />}
                    />
                </div>
                <div className="leftHand">
                    <h2>left Hand</h2>
                    <h3>Equipped: {leftData[gearSlice.left].name}</h3>
                    <OpenModalMenuItem
                        itemText="change equipped item"
                        onItemClick={closeMenu}
                        modalComponent={<InventoryModal props={[props.props, char_id]} tag={'left'} currentEquip={leftData[gearSlice.left]} />}
                    />
                </div>
                <div className="rightHand">
                    <h2>Right Hand</h2>
                    <h3>Equipped: {rightData[gearSlice.right].name}</h3>
                    <OpenModalMenuItem
                        itemText="change equipped item"
                        onItemClick={closeMenu}
                        modalComponent={<InventoryModal props={[props.props, char_id]} tag={'right'} currentEquip={rightData[gearSlice.right]} />}
                    />
                </div>
            </form>
            <div className="backButton">
                <OpenModalMenuItem
                    itemText='Back'
                    modalComponent={<NewRunModal />} />
            </div>
        </div>}
    </>
    );
}

export default GearModal;
