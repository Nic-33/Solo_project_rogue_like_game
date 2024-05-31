import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";

function ViewRuns() {
    const dispatch = useDispatch()
    const runSlice = useSelector((state) => state.run)
    const [loaded, setLoaded] = useState(false)
    const runs = Object.values(runSlice)


    useEffect(() => {
        dispatch(thunkGetRuns())
            .then(() => setLoaded(true))
    }, [dispatch])

    return <>
        {loaded && <div id='characterList'>
            <h1>Runs Page</h1>

            {runs.map((run) => {
                return (
                <NavLink >
                <p>{run.id}</p>
                </NavLink>
            )
            })}
        </div>
        }
    </>
}

export default ViewRuns
