import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { useParams, useNavigate } from "react-router-dom";
import './RunPage.css'

function RunPage() {
    const dispatch = useDispatch()
    const navigate = useNaigate()
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
                    <h1 className="runsTitle">Runs</h1>
                    <div className="runs">
                        {runs.map((run) => {
                            console.log(run)
                            let char_1 = JSON.parse(run.character_1)
                            let floor = 6 - JSON.parse(run.seed).length
                            console.log('floor:', floor)
                            let char_2
                            let char_3
                            if (run.character_2) {
                                char_2 = JSON.parse(run.character_2)
                            }
                            if (run.character_3) {
                                char_3 = JSON.parse(run.character_3)
                            }
                            return (<>
                                <div className="run">
                                    <div className="floorNumber">Floor Number {floor}</div>
                                    <div className="char1">
                                        <p>{char_1.stats.name}</p>
                                        <img className="avatar" src={char_1.stats.avatarUrl} alt='avatar' />
                                        <p>{char_1.curhp}/{char_1.stats.hp}</p>

                                    </div>
                                    <div className="char2">
                                        {char_2 && <>
                                            <p>{char_2.stats.name}</p>
                                            <img className="avatar" src={char_2.stats.avatarUrl} alt='avatar' />
                                            <p>{char_2.curhp}/{char_2.stats.hp}</p>
                                        </>}
                                    </div>
                                    <div className="char3">
                                        {char_3 && <>
                                            <p>{char_3.stats.name}</p>
                                            <img className="avatar" src={char_3.stats.avatarUrl} alt='avatar' />
                                            <p>{char_3.curhp}/{char_3.stats.hp}</p>
                                        </>}
                                    </div>
                                    <div className='buttonArea'>
                                        <form onSubmit={selectedRun}>
                                            <button
                                                className="startButton"
                                                type="submit"
                                                onClick={() => {
                                                    setRun(run.id)
                                                }}
                                            >Continue</button >
                                        </form>
                                        <form onSubmit={deleteRun}>
                                            <button
                                                className="deleteButton"
                                                type="submit"
                                                onClick={() => {
                                                    setRun(run.id)
                                                }}
                                            >Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </>
                            )
                        })}
                    </div>

                </div>
            </>
        </div >}
    </>)
}

export default RunPage
