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
    const { run_id } = props.props
    const [char_1, setChar_1] = useState(props.props.char_1)
    const [char_2, setChar_2] = useState(props.props.char_2)
    const [char_3, setChar_3] = useState(props.props.char_3)

    const dispatch = useDispatch()

    useEffect(() => {

    }, [dispatch])

    return <>
        <h1>battle page</h1>
        {char_1 &&
            <CharacterPanel state={char_1} setState={setChar_1} />
        }
        {char_2 &&
            <CharacterPanel state={char_2} setState={setChar_2} />
        }
        {char_3 &&
            <CharacterPanel state={char_3} setState={setChar_3} />
        }
    </>
}

export default BattlePage
