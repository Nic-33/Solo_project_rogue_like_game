import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./NewRunModal.css";
import { thunkGetChars } from "../../redux/character";
import { thunkCreateRun } from "../../redux/run";
import { useNavigate } from "react-router-dom";


function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
function getRandomSeed() {
    let seedArray = [
        getRandomIntInclusive(0, 1),
        getRandomIntInclusive(0, 3),
        getRandomIntInclusive(1, 4),
        getRandomIntInclusive(2, 4),
        getRandomIntInclusive(3, 5),
        6
    ]
    return seedArray
}

function NewRunModal() {
    const { closeModal } = useModal();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const characterSlice = useSelector((state) => state.character)
    const chars = Object.values(characterSlice)
    // console.log('Chars:', chars)
    const [errors, setErrors] = useState({});
    const [loaded, setLoaded] = useState(false)
    const [char_1, setChar_1] = useState("")
    const [char_2, setChar_2] = useState('')
    const [char_3, setChar_3] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        let seed = getRandomSeed()
        seed = JSON.stringify(seed)
        console.log('seed:', seed)
        const data = {
            char_1,
            char_2,
            char_3,
            seed
        }
        // console.log(data)
        // console.log('char1:', char_1)
        // console.log('char2:', char_2)
        // console.log('char3:', char_3)
        const serverResponse = await dispatch(
            thunkCreateRun(data)
        );
        // console.log(serverResponse)
        navigate(`/data/${serverResponse.id}`)
        closeModal()
    };

    useEffect(() => {
        dispatch(thunkGetChars())
            .then(() => setLoaded(true))
    }, [dispatch])

    return (<>
        {loaded && <div>
            {!char_1 ? <>
                <h1>character select</h1>
                <h3>select up to 3 characters</h3>
                <form className="characters" onSubmit={handleSubmit}>
                    {chars.map((char) => {
                        let stats = char.stats
                        return (<div>
                            <input type="checkbox" id={stats.name} value={JSON.stringify({ char_id: char.id, inv_id: char.inventory_id, gear_id: char.gear_id, curhp: char.stats.hp, stats: char.stats })} onChange={(e) => setChar_1(e.target.value)} />
                            <label for={stats.name}>{stats.name}</label>
                        </div>)
                    })}
                    <button onClick={(e) => handleSubmit(e)}>Start Run</button>
                </form>
            </> : !char_2 ? <>
                <h1>character select</h1>
                <h3>select up to 3 characters</h3>
                <form className="characters" onSubmit={handleSubmit}>
                    {chars.map((char) => {
                        let stats = char.stats
                        return (<div>
                            <input type="checkbox" id={stats.name} value={JSON.stringify({ char_id: char.id, inv_id: char.inventory_id, gear_id: char.gear_id, curhp: char.stats.hp, stats: char.stats })} onChange={(e) => setChar_2(e.target.value)} />
                            <label for={stats.name}>{stats.name}</label>
                        </div>)
                    })}
                    <button onClick={(e) => handleSubmit(e)}>Start Run</button>
                </form>
            </> : <>
                <h1>character select</h1>
                <h3>select up to 3 characters</h3>
                <form className="characters" onSubmit={handleSubmit}>
                    {chars.map((char) => {
                        let stats = char.stats
                        return (<div>
                            <input type="checkbox" id={stats.name} value={JSON.stringify({ char_id: char.id, inv_id: char.inventory_id, gear_id: char.gear_id, curhp: char.stats.hp, stats: char.stats })} onChange={(e) => setChar_3(e.target.value)} />
                            <label for={stats.name}>{stats.name}</label>
                        </div>)
                    })}
                    <button onClick={(e) => handleSubmit(e)}>Start Run</button>
                </form>
            </>
            }
        </div>}
    </>)

}

export default NewRunModal
