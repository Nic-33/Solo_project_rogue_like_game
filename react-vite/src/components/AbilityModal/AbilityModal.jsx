import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkGetChar_inv, thunkUpdateChar_inv } from "../../redux/character_inv";
import { thunkGetGear, thunkUpdateGear } from "../../redux/gear";
import { useModal } from "../../context/Modal";
import "./AbilityModal.css";

function AbilityModal(props) {
    const dispatch = useDispatch();
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

    return (
        <>
            <h1>Ability Menu</h1>
            <form onSubmit={handleSubmit}>

            </form>
        </>
    );
}

export default AbilityModal;
