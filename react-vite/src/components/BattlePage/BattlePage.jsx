import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";
import OpenModalMenuItem from "./OpenModalMenuItem"
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import EnemyPanel from "../EnemyPanel/EnemyPanel";
import MapModal from "../MapModal/MapModal";

function BattlePage(props) {
    const { char_1, char_2, char_3, mon_1, mon_2, mon_3, seedData } = props.state
    const { setChar_1, setChar_2, setChar_3, setMon_1, setMon_2, setMon_3, setSeedData } = props.setState
    console.log('battlepage mon_1:', seedData)
    console.log('battlepage mon_2:', mon_2)
    console.log('battlepage mon_3:', mon_3)

    const data = props.props
    if (!char_1 && data.character_1) {
        setChar_1(JSON.parse(data.character_1))
    }
    if (!char_2 && data.character_2) {
        setChar_2(JSON.parse(data.character_2))
    }
    if (!char_3 && data.character_3) {
        setChar_3(JSON.parse(data.character_3))
    }
    if (!seedData) {
        setSeedData(JSON.parse(data.seed))
    }
    const [roomClear, setRoomClear] = useState('hidden')
    const dispatch = useDispatch()
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        if (mon_1) {
            if (mon_1.hp < 1) {
                setMon_1()
            }
        } else { setMon_1() }
        if (mon_2) {
            if (mon_2.hp < 1) {
                setMon_2()
            }
        } else { setMon_2() }
        if (mon_3) {
            if (mon_3.hp < 1) {
                setMon_3()
            }
        } else { setMon_3() }

        if (!mon_1 && !mon_2 && !mon_3) {
            setRoomClear('visible')
        }
        return
    }, [])

    return <>
        <h1>battle page</h1>
        <div className="enemyBattleArea">
            <div className="mon_1">
                {mon_1 &&
                    <EnemyPanel state={mon_1} setState={setMon_1} />
                }
            </div>
            <div className="mon_2">
                {mon_2 &&
                    <EnemyPanel state={mon_2} setState={setMon_2} />
                }
            </div>
            <div className="mon_3">
                {mon_3 &&
                    <EnemyPanel state={mon_3} setState={setMon_3} />
                }
            </div>
        </div>
        <div className="heroBattleArea">
            <div className="char_1">
                {char_1 &&
                    <CharacterPanel state={char_1} setState={setChar_1} />
                }
            </div>
            <div className="char_2">
                {char_2 &&
                    <CharacterPanel state={char_2} setState={setChar_2} />
                }
            </div>
            <div className="char_3">
                {char_3 &&
                    <CharacterPanel state={char_3} setState={setChar_3} />
                }
            </div>
        </div>
        <div className="nextFloorButton" style={{ visibility: roomClear }}>
            <OpenModalMenuItem
                itemText="Next Floor"
                modalComponent={<MapModal state={{ mon_1, mon_2, mon_3, seedData }} setState={{ setMon_1, setMon_2, setMon_3, setSeedData, setRoomClear }} />}
            />
        </div>
    </>
}

export default BattlePage
