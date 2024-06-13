import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BattlePage from "../BattlePage"
import { useParams } from "react-router-dom"
import { thunkGetRuns } from "../../redux/run"

function DataPage() {
    const { run_id } = useParams()
    const dispatch = useDispatch()
    let runSlice = useSelector((state) => state.run)
    runSlice = Object.values(runSlice)
    const run = runSlice.filter((info) => info.id == run_id).pop()
    // console.log('run:', run)
    const [loaded, setLoaded] = useState(false)
    const [eventLog, setEventLog] = useState(['Welcome To the Dungeon!!'])
    const [char_1, setChar_1] = useState()
    const [char_2, setChar_2] = useState()
    const [char_3, setChar_3] = useState()
    const [mon_1, setMon_1] = useState()
    const [mon_2, setMon_2] = useState()
    const [mon_3, setMon_3] = useState()
    const [seedData, setSeedData] = useState()


    useEffect(() => {
        dispatch(thunkGetRuns())
            .then(() => setLoaded(true))
    }, [dispatch])

    return <>
        {loaded && <div>
            <BattlePage props={run} state={{ eventLog, char_1, char_2, char_3, mon_1, mon_2, mon_3, seedData }} setState={{ setEventLog, setChar_1, setChar_2, setChar_3, setMon_1, setMon_2, setMon_3, setSeedData }} />
        </div>}
    </>
}
export default DataPage
