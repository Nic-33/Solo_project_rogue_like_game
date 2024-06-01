import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetChar_inv, thunkUpdateChar_inv } from "../../redux/character_inv";
import { thunkGetGear, thunkUpdateGear } from "../../redux/gear";
import { useModal } from "../../context/Modal";
import "./InventoryModal.css";

function InventoryModal(props) {
    const { char_id, gear_id, inv_id } = props.props
    const dispatch = useDispatch();
    const char_invSlice = useSelector((state) => state.char_inv)
    const gearSlice = useSelector((state) => state.gear)
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    console.log('char_inv:', char_invSlice)
    console.log('gear:', gearSlice)

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
        dispatch(thunkGetChar_inv(char_id))
        dispatch(thunkGetGear(char_id))
            .then(() => setLoaded(true))
    }, [dispatch])

    return (<>
        {loaded && <>
            <h1>Inventory</h1>
            <form onSubmit={handleSubmit}>

            </form>
        </>}
    </>
    );
}

export default InventoryModal;
