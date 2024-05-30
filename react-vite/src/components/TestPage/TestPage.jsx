import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";


function TestPage() {
    const dispatch = useDispatch()
    const characterSlice = useSelector((state) => state.use_inv)
    // const runSlice = useSelector((state) => state.run)
    const [loaded, setLoaded] = useState(false)
    console.log('characterSlice:', characterSlice)
    // const chars = Object.values(characterSlice)


    useEffect(() => {
        dispatch(thunkGetUse_inv())

            .then(() => setLoaded(true))
    }, [dispatch])

    return <>
        {loaded && <div id='characterList'>
            <h1>test page</h1>
            {characterSlice.use_item.potion}
            {/* {chars.map((char) => {
                return <p>{char.stats.name}</p>
            })} */}
        </div>
        }
    </>
}

export default TestPage
