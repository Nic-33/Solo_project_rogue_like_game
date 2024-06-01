import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";
import OpenModalMenuItem from "./OpenModalMenuItem"
import InventoryModal from "../InventoryModal/InventoryModal";
import AbilityModal from "../AbilityModal";


function CharacterPanel(props) {
    console.log("props character panel", props.props.char)
    const { char_id, inv_id, gear_id, curhp, stats } = props.props.char
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    console.log(stats)

    useEffect(() => {
        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
    }, [dispatch])

    const closeMenu = () => setShowMenu(false);

    return <>
        <div>
            <div>character panel</div>
            <div>{stats.name}</div>
            <div>{curhp}/{stats.hp}</div>
            <button>attack</button>
            <OpenModalMenuItem
                itemText="Abilities"
                onItemClick={closeMenu}
                modalComponent={<AbilityModal props={{ char_id: char_id, gear_id: gear_id }} />}
            />
            <OpenModalMenuItem
                itemText="Inventory"
                onItemClick={closeMenu}
                modalComponent={<InventoryModal props={{ char_id: char_id, gear_id: gear_id, inv_id: inv_id }} />}
            />
        </div>

    </>
}

export default CharacterPanel
