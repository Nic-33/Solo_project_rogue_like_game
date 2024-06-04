import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import OpenModalMenuItem from "./OpenModalMenuItem"
import GearModal from "../GearModal/GearModal";
import AbilityModal from "../AbilityModal";
import TargetModal from "../TargetModal";


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
        </div>

    </>
}

export default CharacterPanel
