import { useSelector } from "react-redux";
import "./InventoryModal.css";
import { rightData, leftData, chestData, right_ability_data, left_ability_data } from "../../BTSCode/data";

function InventoryModal(props) {

    console.log(props)
    const invSlice = useSelector((state) => state.char_inv)
    const inv = invSlice.inventory
    let data
    console.log(inv[props.tag])
    if (props.tag === 'chest') {
        data = chestData
    } else if (props.tag === 'left') {
        data = leftData
    } else if (props.tag === 'right') {
        data = rightData
    } else if (props.tag === 'head') {
        data = headData
    }
    return <>
        <h1>{props.tag} menu</h1>
        {inv[props.tag].map((item) => {
            return <h2>{data[item].name}</h2>
        })}
    </>
}

export default InventoryModal
