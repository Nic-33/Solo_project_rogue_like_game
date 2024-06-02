import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetGear } from "../../redux/gear";
import { thunkGetAChar } from "../../redux/character";
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";
import OpenModalMenuItem from "./OpenModalMenuItem"
import GearModal from "../GearModal/GearModal";
import AbilityModal from "../AbilityModal";


function CharacterPanel(props) {
    console.log("props character panel", props.state)
    const setState = props.setState
    const { char_id, curhp, stats } = props.state
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [gear, setGear] = useState()
    const [inv, setInv] = useState()

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
                modalComponent={<GearModal state_char={props.state} setState_char={props.setState} state_gear={gear} setState_gear={setGear} state_inv={inv} setState_inv={setInv} />}
            />
            <OpenModalMenuItem
                itemText="Inventory"
                onItemClick={closeMenu}
                modalComponent={<GearModal state_char={props.state} setState_char={props.setState} state_gear={gear} />}
            />
        </div>

    </>
}

export default CharacterPanel
