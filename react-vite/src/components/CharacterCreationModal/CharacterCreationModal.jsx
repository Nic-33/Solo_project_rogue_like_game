import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { AvatarData } from "./AvatarData";
import { thunkCreateChar } from "../../redux/character";
import './CharacterCreationModal.css'

function CharacterCreationModal() {

    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [eyes, setEyes] = useState(0)
    const [mouth, setMouth] = useState(0)
    const [eyeBrows, setEyeBrows] = useState(0)
    const [hair, setHair] = useState(0)
    const [hairColor, setHairColor] = useState(0)
    const [skinColor, setSkinColor] = useState(0)
    const [nameError, setNameError] = useState('hidden')

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


    const handleSubmit = async (e) => {
        e.preventDefault()

        setNameError('hidden')
        let error = true;
        if (!name) {
            setNameError('visible')
            error = false
        }

        if (error) {
            const avatar_url = createAvatarRoute(AvatarData['eyeBrows'][eyeBrows], AvatarData['eyes'][eyes], AvatarData['mouth'][mouth], AvatarData['hairColor'][hairColor], AvatarData['skinColor'][skinColor], AvatarData['hair'][hair])
            // console.log('avatar url:', avatar_url)
            const CharacterData = {
                stats: `{"name":${JSON.stringify(name)},"hp":100,"patk":10,"matk":10,"pdef":10,"mdef":10,"agl":10, "avatarUrl":${JSON.stringify(avatar_url)}}`
            }
            await dispatch(thunkCreateChar(CharacterData))
            closeModal()
        } else {
            return
        }
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
            <div className="characterCreator">
                <div className="avatarImage">
                    <img className="avatar"
                        src={`https://api.dicebear.com/8.x/adventurer/svg?eyebrows=${AvatarData.eyeBrows[eyeBrows]}&eyes=${AvatarData.eyes[eyes]}&mouth=${AvatarData.mouth[mouth]}&hair=${AvatarData.hair[hair]}&haircolor=${AvatarData.hairColor[hairColor]}&skinColor=${AvatarData.skinColor[skinColor]}`}
                        alt="avatar" />
                </div>
                <div className="skinColor">
                    <h2>Skin Color</h2>
                    <div className="selectors">
                        <button onClick={() => selectSkinColor(-1)}>- </button>
                        <button onClick={() => selectSkinColor(1)}> +</button>
                    </div>
                </div>
                <div className="eyes">
                    <h2>Eyes</h2>
                    <div className="selectors">
                        <button onClick={() => selectEyes(-1)}>- </button>
                        <button onClick={() => selectEyes(1)}> +</button>
                    </div>
                </div>
                <div className="mouth">
                    <h2>Mouth</h2>
                    <div className="selectors">
                        <button onClick={() => selectMouth(-1)}>- </button>
                        <button onClick={() => selectMouth(1)}> +</button>
                    </div>
                </div>
                <div className="hair">
                    <h2>Hair</h2>
                    <div className="selectors">
                        <button onClick={() => selectHair(-1)}>- </button>
                        <button onClick={() => selectHair(1)}> +</button>
                    </div>
                </div>
                <div className="hairColor">
                    <h2>Hair Color</h2>
                    <div className="selectors">
                        <button onClick={() => selectHairColor(-1)}>- </button>
                        <button onClick={() => selectHairColor(1)}> +</button>
                    </div>
                </div>
                <div className="eyeBrows">
                    <h2>Eyebrows</h2>
                    <div className="selectors">
                        <button onClick={() => selectEyebrows(-1)}>- </button>
                        <button onClick={() => selectEyebrows(1)}> +</button>
                    </div>
                </div>
                <div className="name">
                    <h2>Character Name</h2>
                    <input
                        type="text"
                        placeholder="Character Name"
                        value={name}
                        onChange={updateName} />
                    <div className="error" style={{ visibility: nameError }}>Please add a name to your character</div>
                </div>
                <form className="save" onSubmit={handleSubmit}>
                    <button type="submit">save </button>
                </form>
            </div >
        </>
    )
}

export default CharacterCreationModal
