import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";



function CharacterPanel(props) {
    const char_id = props.props.char_id
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [char, setChar] = useState(char_id)
    const characterSlice = useSelector((state) => state.character)
    const stats = characterSlice.stats
    console.log(stats)

    useEffect(() => {
        dispatch(thunkGetAChar(char))
            .then(() => setLoaded(true))
    }, [dispatch])

    return <>
        {loaded && <div>
            <div>character panel</div>
            <div>{stats.name}</div>
            <div>{stats.hp}</div>
            <button>attack</button>
            <button>ability</button>
            <button>inventory</button>
        </div>
        }
    </>
}

export default CharacterPanel
