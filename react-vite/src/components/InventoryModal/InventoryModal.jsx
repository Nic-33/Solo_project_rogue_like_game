import { useDispatch, useSelector } from "react-redux";
import "./InventoryModal.css";
import { rightData, leftData, chestData, right_ability_data, left_ability_data } from "../../BTSCode/data";
import { useEffect, useState } from "react";
import { thunkGetChar_inv } from "../../redux/character_inv";
import OpenModalMenuItem from "./OpenModalMenuItem"
import GearModal from "../GearModal/GearModal";

function InventoryModal(props) {
    const char_id = props.props[1]
    const char = props.props[0]
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    console.log('char_id:', char_id)
    console.log('Inv props:', char)
    const invSlice = useSelector((state) => state.char_inv)
    const inv = invSlice.inventory

    useEffect(() => {
        dispatch(thunkGetChar_inv(char_id))
            .then(() => setLoaded(true))
    }, [dispatch, char_id])

    let data
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
        {loaded && <div>
            <h1>{props.tag} menu</h1>
            {inv[props.tag].map((item) => {
                return <h2 key={data[item].name}>{data[item].name}</h2>
            })}
            <OpenModalMenuItem
                itemText='Back'
                modalComponent={<GearModal props={char} />} />
        </div>}
    </>
}

export default InventoryModal
