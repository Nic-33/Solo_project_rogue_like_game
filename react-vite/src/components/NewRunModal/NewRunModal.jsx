import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./NewRunModal.css";
import { thunkDeleteChar, thunkGetChars } from "../../redux/character";
import { thunkCreateRun } from "../../redux/run";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from './OpenModalMenuItem'
import UpdateCharacterModal from "../UpdateCharacterModal/UpdateCharacterModal";


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
    const [selChar, setSelChar] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [charDel, setCharDel] = useState('')
    const [char_1, setChar_1] = useState("")
    const [char_2, setChar_2] = useState('')
    const [char_3, setChar_3] = useState('')

    const deleteCharacter = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteChar(charDel))
        setCharDel('')
    }

    const selectCharacter = async (e) => {
        e.preventDefault()
        console.log(selChar)
        let char = { char_id: selChar.id, inv_id: selChar.inventory_id, gear_id: selChar.gear_id, curhp: selChar.stats.hp, stats: selChar.stats }
        if (!char_1) {
            setChar_1(char)
            setSelChar('')
        } else if (!char_2) {
            setChar_2(char)
            setSelChar('')
        } else if (!char_3) {
            setChar_3(char)
            setSelChar('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const char = []
        let seed = getRandomSeed()
        seed = JSON.stringify(seed)
        // console.log('seed:', seed)
        if (char_1) {
            char.push(JSON.stringify(char_1))
        }
        if (char_2) {
            char.push(JSON.stringify(char_2))
        }
        if (char_3) {
            char.push(JSON.stringify(char_3))
        }
        // console.log('char:', char)
        const data = {
            char_1: char[0],
            char_2: char[1],
            char_3: char[2],
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
            <h1>character select</h1>
            <h3>select up to 3 characters</h3>
            {chars.map((char) => {
                let display = true
                console.log(char)
                let stats = char.stats
                if (char.id === char_1.char_id || char.id === char_2.char_id || char.id === char_3.char_id) {
                    display = false
                }
                return (<>
                    {display && <div>
                        <div>{stats.name}</div>
                        {stats.avatarUrl && <img className="avatar" src={stats.avatarUrl} alt='avatar' />}
                        <form onSubmit={selectCharacter}>
                            <button type="submit" onClick={() => {
                                setSelChar(char)
                            }}>select</button>
                        </form>
                        <OpenModalMenuItem
                            itemText="Edit"
                            modalComponent={<UpdateCharacterModal props={char} />} />
                        <form onSubmit={deleteCharacter}>
                            <button type="submit" onClick={() => {
                                setCharDel(char.id)
                            }}>delete character</button>
                        </form>
                    </div>}</>)
            })}

            <div className="Selected Characters">
                <h3>Selected Characters</h3>
                {char_1 && <>
                    <div>{char_1.stats.name}</div>
                    {char_1.stats.avatarUrl && <img className="avatar" src={char_1.stats.avatarUrl} alt='avatar' />}
                    <button onClick={() => setChar_1('')}>Unselect</button>
                </>}
                {char_2 && <>
                    <div>{char_2.stats.name}</div>
                    {char_2.stats.avatarUrl && <img className="avatar" src={char_2.stats.avatarUrl} alt='avatar' />}
                    <button onClick={() => setChar_2('')}>Unselect</button>

                </>}
                {char_3 && <>
                    <div>{char_3.stats.name}</div>
                    {char_3.stats.avatarUrl && <img className="avatar" src={char_3.stats.avatarUrl} alt='avatar' />}
                    <button onClick={() => setChar_3('')}>Unselect</button>
                </>}
            </div>
            <form className="startRun" onSubmit={handleSubmit}>
                <button onClick={(e) => handleSubmit(e)}>Start Run</button>
            </form>
        </div>}
    </>)

}

export default NewRunModal
