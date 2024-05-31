import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";
import CharacterPanel from "../CharacterPanel/CharacterPanel";

function BattlePage(props) {
    const { run_id, char_id } = props.props
    const dispatch = useDispatch()

    useEffect(() => {

    }, [dispatch])

    return <>
        <h1>battle page</h1>
        <CharacterPanel props={{ char_id: char_id }} />
    </>
}

export default BattlePage
