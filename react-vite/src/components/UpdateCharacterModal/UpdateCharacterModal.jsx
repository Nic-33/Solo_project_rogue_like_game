import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { AvatarData } from "./AvatarData";
import { thunkUpdateChar, thunkGetAChar } from "../../redux/character";

function UpdateCharacterModal(props) {

    const parseQueryValues = (route) => {
        console.log('route in:', route)
        const obj = {}
        const eyeBrowsIndex = route.indexOf("eyebrows=")
        const eyesIndex = route.indexOf("eyes=")
        const mouthIndex = route.indexOf("mouth=")
        const hairIndex = route.indexOf("hair=")
        const hairColorIndex = route.indexOf("hairColor=")
        const skinIndex = route.indexOf("skinColor=")
        const eyeBrows = route.slice(eyeBrowsIndex + 9, (eyesIndex - 1))
        const eyes = route.slice(eyesIndex + 5, (mouthIndex - 1))
        const mouth = route.slice(mouthIndex + 6, (hairIndex - 1))
        const hair = route.slice(hairIndex + 5, (hairColorIndex - 1))
        const hairColor = route.slice(hairColorIndex + 10, (skinIndex - 1))
        const skin = route.slice(skinIndex + 10)
        obj["eyeBrows"] = eyeBrows
        obj["eyes"] = eyes
        obj["mouth"] = mouth
        obj['hair'] = hair
        obj['hairColor'] = hairColor
        obj['skinColor'] = skin
        console.log('route out:', obj)
        return obj
    }

    console.log(props.props)
    const { id, stats } = props.props

    const dispatch = useDispatch()
    const char = useSelector((state) => state.char)
    // console.log(char)
    const avatarValues = parseQueryValues(stats.avatarUrl)
    console.log(avatarValues)
    const [loaded, setLoaded] = useState(false)
    const [name, setName] = useState(stats.name)
    const [eyes, setEyes] = useState(AvatarData.eyesIndex(AvatarData, avatarValues['eyes']))
    const [mouth, setMouth] = useState(AvatarData.mouthIndex(AvatarData, avatarValues['mouth']))
    const [eyeBrows, setEyeBrows] = useState(AvatarData.eyeBrowsIndex(AvatarData, avatarValues['eyeBrows']))
    const [hair, setHair] = useState(AvatarData.hairIndex(AvatarData, avatarValues['hair']))
    const [hairColor, setHairColor] = useState(AvatarData.hairColorIndex(AvatarData, avatarValues['hairColor']))
    const [skinColor, setSkinColor] = useState(AvatarData.skinColorIndex(AvatarData, avatarValues['skinColor']))

    const { closeModal } = useModal();
    // console.table(avatar)
    const updateName = (e) => setName(e.target.value)

    const createAvatarRoute = (eyeBrows, eyes, mouth, hairColor, skinColor, hair) => {
        let route = 'https://api.dicebear.com/8.x/adventurer/svg?eyebrows=%eyebrows%&eyes=%eyes%&mouth=%mouth%&hair=%hair%&hairColor=%haircolor%&skinColor=%skincolor%'
        route = route.replace('%eyebrows%', eyeBrows)
        route = route.replace('%eyes%', eyes)
        route = route.replace('%mouth%', mouth)
        route = route.replace('%hair%', hair)
        route = route.replace('%haircolor%', hairColor)
        route = route.replace('%skincolor%', skinColor)
        console.log(route)
        return route
    }

    useEffect(() => {
        dispatch(thunkGetAChar(id))
            .then(() => setLoaded(true))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const avatar_url = createAvatarRoute(AvatarData['eyeBrows'][eyeBrows], AvatarData['eyes'][eyes], AvatarData['mouth'][mouth], AvatarData['hairColor'][hairColor], AvatarData['skinColor'][skinColor], AvatarData['hair'][hair])
        console.log('avatar url:', avatar_url)
        const CharacterData = {
            stats: `{"name":${JSON.stringify(name)},"hp":100,"patk":10,"matk":10,"pdef":10,"mdef":10,"agl":10, "avatarUrl":${JSON.stringify(avatar_url)}}`
        }
        await dispatch(thunkUpdateChar(CharacterData, id))
        closeModal()
    }




    const selectHair = (num) => {
        let index = hair + num
        if (index < 0) {
            index = AvatarData.hair.length - 1
        }
        if (index >= AvatarData.hair.length) {
            index = 0;
        }
        index = parseInt(index)
        setHair(index)
        console.log("hair:", index)

    }

    const selectEyes = (num) => {
        let index = eyes + num
        if (index < 0) {
            index = AvatarData.eyes.length - 1
        }
        if (index >= AvatarData.eyes.length) {
            index = 0;
        }
        index = parseInt(index)
        setEyes(index)
        console.log("eyes:", index)

    }

    const selectMouth = (num) => {
        let index = mouth + num
        if (index < 0) {
            index = AvatarData.mouth.length - 1
        }
        if (index >= AvatarData.mouth.length) {
            index = 0;
        }
        index = parseInt(index)
        setMouth(index)
        console.log("mouth:", index)
    }

    const selectEyebrows = (num) => {
        let index = eyeBrows + num
        if (index < 0) {
            index = AvatarData.eyeBrows.length - 1
        }
        if (index >= AvatarData.eyeBrows.length) {
            index = 0;
        }
        index = parseInt(index)
        setEyeBrows(index)
        console.log("eyebrows:", index)
    }
    const selectHairColor = (num) => {
        let index = hairColor + num
        if (index < 0) {
            index = AvatarData.hairColor.length - 1
        }
        if (index >= AvatarData.hairColor.length) {
            index = 0;
        }
        index = parseInt(index)
        setHairColor(index)
        console.log("hair Color:", AvatarData.hairColor[index])
    }
    const selectSkinColor = (num) => {
        let index = skinColor + num
        if (index < 0) {
            index = AvatarData.skinColor.length - 1
        }
        if (index >= AvatarData.skinColor.length) {
            index = 0;
        }
        index = parseInt(index)
        setSkinColor(index)
        console.log("skinColor:", index)
    }
    return (
        <>
            <div>
                <img className="avatar"
                    src={`https://api.dicebear.com/8.x/adventurer/svg?eyebrows=${AvatarData.eyeBrows[eyeBrows]}&eyes=${AvatarData.eyes[eyes]}&mouth=${AvatarData.mouth[mouth]}&hair=${AvatarData.hair[hair]}&haircolor=${AvatarData.hairColor[hairColor]}&skinColor=${AvatarData.skinColor[skinColor]}`}
                    alt="avatar" />
                <h2>Skin Color</h2>
                <button onClick={() => selectSkinColor(-1)}>- </button>
                <button onClick={() => selectSkinColor(1)}> +</button>
                <h2>Eyes</h2>
                <button onClick={() => selectEyes(-1)}>- </button>
                <button onClick={() => selectEyes(1)}> +</button>
                <h2>Mouth</h2>
                <button onClick={() => selectMouth(-1)}>- </button>
                <button onClick={() => selectMouth(1)}> +</button>
                <h2>Hair</h2>
                <button onClick={() => selectHair(-1)}>- </button>
                <button onClick={() => selectHair(1)}> +</button>
                <h2>Hair Color</h2>
                <button onClick={() => selectHairColor(-1)}>- </button>
                <button onClick={() => selectHairColor(1)}> +</button>
                <h2>Eyebrows</h2>
                <button onClick={() => selectEyebrows(-1)}>- </button>
                <button onClick={() => selectEyebrows(1)}> +</button>
                <h2>Character Name</h2>
                <form className="create Character Form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Character Name"
                        value={name}
                        onChange={updateName} />
                    <h2></h2>

                    <h2>Save</h2>
                    <button type="submit">save </button>
                </form>
            </div>
        </>
    )
}

export default UpdateCharacterModal
