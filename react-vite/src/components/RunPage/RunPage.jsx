import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { useParams, useNavigate } from "react-router-dom";

function RunPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { run_id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [runSelect, setRunSelect] = useState(false)
    const [run, setRun] = useState()
    const runSlice = useSelector((state) => state.run)
    const runs = Object.values(runSlice)
    // console.log('runSlice in runpage:', runSlice)

    const deleteRun = async () => {
        dispatch(thunkDeleteRun(run))
        setRunSelect(false)
    }

    const selectedRun = async (e) => {
        e.preventDefault()
        await dispatch(thunkGetARun(run))
        navigate(`/data/${run}`)
    }


    useEffect(() => {
        if (run_id) {
            dispatch(thunkGetARun(run_id))
                .then(() => setLoaded(true))
        } else {
            dispatch(thunkGetRuns())
                .then(() => setLoaded(true))
        }
    }, [dispatch, run_id])

    return (<>
        {loaded && <div>
            <>
                <div id='runList'>
                    <h1>Runs Page</h1>

                    {runs.map((run) => {
                        return (<>
                            <p>{run.id}</p>
                            <form onSubmit={selectedRun}>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        setRun(run.id)
                                    }}
                                >Continue</button >
                            </form>
                            <form onSubmit={deleteRun}>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        setRun(run.id)
                                    }}
                                >Delete</button>
                            </form>
                        </>
                        )
                    })}

                </div>
            </>
        </div >}
    </>)
}

export default RunPage
