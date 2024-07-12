import { useDispatch, useSelector } from "react-redux";
import "./InventoryModal.css";
import { rightData, leftData, chestData } from "../../BTSCode/data";
import { useEffect, useState } from "react";
import { thunkGetChar_inv, thunkUpdateChar_inv } from "../../redux/character_inv";
import OpenModalMenuItem from "./OpenModalMenuItem"
import GearModal from "../GearModal/GearModal";
import { thunkGetGear, thunkUpdateGear } from "../../redux/gear";
import { useNavigate } from "react-router-dom";


function InventoryModal(props) {
    let data
    const char_id = props.props[1]
    const navigate = useNavigate()
    const char = props.props[0]
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    console.log('char_id:', char_id)
    console.log('Inv props:', char)
    const invSlice = useSelector((state) => state.char_inv)
    const gearSlice = useSelector((state) => state.gear)
    const inv = invSlice.inventory

    const equip = async (e, item) => {
        e.preventDefault()
        setLoaded(false)
        console.log('equip:', item)
        console.log('gear:', gearSlice)
        const remove = gearSlice[props.tag]
        console.log('removing:', remove)
        gearSlice[props.tag] = item
        console.log('gear:', gearSlice)
        inv[props.tag].push(remove)
        const index = inv[props.tag].indexOf(item);
        if (index > -1) { // only splice array when item is found
            inv[props.tag].splice(index, 1); // 2nd parameter means remove one item only
        }
        const invData = {
            inv: JSON.stringify(inv)
        }
        console.log('inventory:', inv)
        await dispatch(thunkUpdateGear(gearSlice, char_id))
        await dispatch(thunkUpdateChar_inv(invData, char_id))
        await dispatch(thunkGetChar_inv(char_id))
        await dispatch(thunkGetGear(char_id))
        setLoaded(true)
        // navigate(<GearModal props={char} />)
    }

    useEffect(() => {
        dispatch(thunkGetChar_inv(char_id))
            .then(() => dispatch(thunkGetGear(char_id)))
            .then(() => setLoaded(true))
    }, [dispatch, char_id])

    console.log('test!!!:', invSlice)
    if (props.tag === 'chest') {
        data = chestData
        console.log(data)
    } else if (props.tag === 'left') {
        data = leftData
    } else if (props.tag === 'right') {
        data = rightData
    } else if (props.tag === 'head') {
        data = headData
    }
    return <>
        {loaded && <div className="inventoryCont">
            <h1 className="invTitle">{props.tag} Inventory</h1>
            {inv[props.tag].map((item) => {
                return <form onSubmit={(e) => equip(e, item)}>
                    <h2 key={data[item].name}>{data[item].name}</h2>
                    <button className="equipButton">Equip</button>
                </form>
            })}
            <div className="backButton">
                <OpenModalMenuItem
                    itemText='Back'
                    modalComponent={<GearModal props={char} />} />
            </div>
        </div>}
    </>
}

export default InventoryModal
