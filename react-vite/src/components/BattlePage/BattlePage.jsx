import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";
import CharacterPanel from "../CharacterPanel/CharacterPanel";

function BattlePage(props) {
    console.log('props on battlepage', props.props)
    const { run_id, char_1, char_2, char_3 } = props.props
    const dispatch = useDispatch()

    useEffect(() => {

    }, [dispatch])

    return <>
        <h1>battle page</h1>
        {char_1 &&
            <CharacterPanel props={{ char: char_1 }} />
        }
        {char_2 &&
            <CharacterPanel props={{ char: char_2 }} />
        }
        {char_3 &&
            <CharacterPanel props={{ char: char_3 }} />
        }
    </>
}

export default BattlePage
