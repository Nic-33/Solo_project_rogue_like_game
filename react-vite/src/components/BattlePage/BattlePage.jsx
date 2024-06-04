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
import TargetModal from "../TargetModal";

function BattlePage(props) {
    const { char_1, char_2, char_3, seedData } = props.state
    const { setChar_1, setChar_2, setChar_3, setSeedData } = props.setState
    // console.log('battlepage mon_1:', seedData)
    // console.log('battlepage mon_2:', mon_2)
    // console.log('battlepage mon_3:', mon_3)
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

    const [roomClear, setRoomClear] = useState('visible')

    const [mon_1, setMon_1] = useState()
    const [mon_1_hp, setMon_1_hp] = useState(0)
    const [monAlive1, setMonAlive1] = useState(false)
    const [mon_2, setMon_2] = useState()
    const [mon_2_hp, setMon_2_hp] = useState(0)
    const [monAlive2, setMonAlive2] = useState(false)
    const [mon_3, setMon_3] = useState()
    const [mon_3_hp, setMon_3_hp] = useState(0)
    const [monAlive3, setMonAlive3] = useState(false)

    const [targetSelect1, setTargetSelect1] = useState('hidden')
    const [targetSelect2, setTargetSelect2] = useState('hidden')
    const [targetSelect3, setTargetSelect3] = useState('hidden')

    const [hideMenuChar1, setHideMenuChar1] = useState('hidden')
    const [hideMenuChar2, setHideMenuChar2] = useState('hidden')
    const [hideMenuChar3, setHideMenuChar3] = useState('hidden')
    const [monLoaded, setMonLoaded] = useState(false)

    const [type, setType] = useState()

    const dispatch = useDispatch()
    const closeMenu = () => setShowMenu(false);




    // useEffect(() => {
    //     if (mon_1) {
    //         if (mon_1.hp < 1) {
    //             setMon_1()
    //         }
    //         mon1hp = mon_1.hp
    //     } else { setMon_1() }
    //     if (mon_2) {
    //         if (mon_2.hp < 1) {
    //             setMon_2()
    //         }
    //         mon2hp = mon_2.hp
    //     } else { setMon_2() }
    //     if (mon_3) {
    //         if (mon_3.hp < 1) {
    //             setMon_3()
    //         }
    //         mon3hp = mon_3.hp

    //     } else { setMon_3() }

    //     if (!mon_1 && !mon_2 && !mon_3) {
    //         setRoomClear('visible')
    //     }


    //     console.log('mon1:', mon_1)
    //     console.log(mon_2)
    //     console.log(mon_3)
    //     setMonLoaded(true)
    // }, [])

    function attack(char) {
        if (char === "char1") {
            setTargetSelect1('visible')
            setHideMenuChar1('hidden')
        } else if (char === "char2") {
            setTargetSelect2('visible')
            setHideMenuChar2('hidden')
        } else if (char === "char3") {
            setTargetSelect3('visible')
            setHideMenuChar3('hidden')
        }
    }


    function target(char, mon, atkType, atkChar, target_mon) {
        setTargetSelect1('hidden')
        setTargetSelect2('hidden')
        setTargetSelect3('hidden')
        // console.log('tar fun char:', char.stats.patk)
        // console.log('tar fun mon:', mon)
        console.log('type:', atkType)
        let damage = char.stats.patk
        console.log('damage:', damage)
        mon.curhp = mon.curhp - 5
        console.log("current hp:", mon.curhp)
        if (mon.curhp <= 0) {
            console.log("Monster is dead!!!")
            if (target_mon === 'mon_1') {
                console.log('mon_1')
                setMonAlive1(false)
            } else if (target_mon === 'mon_2') {
                console.log('mon_2')
                setMonAlive2(false)
            } else if (target_mon === 'mon_3') {
                console.log('mon_3')
                setMonAlive3(false)
            }
        }
        if (target_mon === 'mon_1') {
            console.log('mon1', mon)
            setMon_1(mon)
            if (atkChar === 'char_1') {
                setHideMenuChar2('visible')
            } else if (atkChar === 'char_2') {
                setHideMenuChar3('visible')
            } else if (atkChar === 'char_3') {
                setHideMenuChar1('visible')
            }
        } else if (target_mon === 'mon_2') {
            console.log('mon2', mon)
            setMon_2(mon)
            if (atkChar === 'char_1') {
                setHideMenuChar2('visible')
            } else if (atkChar === 'char_2') {
                setHideMenuChar3('visible')
            } else if (atkChar === 'char_3') {
                setHideMenuChar1('visible')
            }
        } else if (target_mon === 'mon_3') {
            console.log('mon3', mon)
            setMon_3(mon)
            if (atkChar === 'char_1') {
                setHideMenuChar2('visible')
            } else if (atkChar === 'char_2') {
                setHideMenuChar3('visible')
            } else if (atkChar === 'char_3') {
                setHideMenuChar1('visible')
            }
        }
        console.log('hide targetmenu')
        battleOver()
    }

    function battleOver() {
        console.log("battle over CAlled!!")
        console.log('mon_1:', mon_1)
        console.log('mon_2:', mon_2)
        console.log('mon_3:', mon_3)
        if (!mon_1 || mon_1.curhp === 0 && !mon_2 || mon_2.curhp === 0 && !mon_3 || mon_3.curhp === 0) {
            console.log('BAttle Over!!!')
            setTargetSelect1('hidden')
            setTargetSelect2('hidden')
            setTargetSelect3('hidden')
            setHideMenuChar1('hidden')
            setHideMenuChar2('hidden')
            setHideMenuChar3('hidden')
            setRoomClear('visible')
        }
    }

    return <>
        <h1>battle page</h1>
        <div className="enemyBattleArea">
            <div className="mon_1">
                {mon_1 && monAlive1 && <>
                    <div>monster panel 1</div>
                    <div>{mon_1.name}</div>
                    <div>{mon_1.curhp}/{mon_1.hp}</div>
                    {/* <EnemyPanel state={mon_1} setState={setMon_1} /> */}
                    <button style={{ visibility: targetSelect1 }} onClick={() => target(char_1, mon_1, type, 'char_1', 'mon_1')}>Target</button>
                    <button style={{ visibility: targetSelect2 }} onClick={() => target(char_2, mon_1, type, 'char_2', 'mon_1')}>Target</button>
                    <button style={{ visibility: targetSelect3 }} onClick={() => target(char_3, mon_1, type, 'char_3', 'mon_1')}>Target</button>

                </>
                }
            </div>
            <div className="mon_2">
                {mon_2 && monAlive2 && <>
                    <div>monster panel 2</div>
                    <div>{mon_2.name}</div>
                    <div>{mon_2.curhp}/{mon_2.hp}</div>
                    {/* <EnemyPanel state={mon_2} setState={setMon_2} /> */}
                    <button style={{ visibility: targetSelect1 }} onClick={() => target(char_1, mon_2, type, 'char_1', 'mon_2')}>Target</button>
                    <button style={{ visibility: targetSelect2 }} onClick={() => target(char_2, mon_2, type, 'char_2', 'mon_2')}>Target</button>
                    <button style={{ visibility: targetSelect3 }} onClick={() => target(char_3, mon_2, type, 'char_3', 'mon_2')}>Target</button>
                </>
                }
            </div>
            <div className="mon_3">
                {mon_3 && monAlive3 && <>
                    <div>monster panel 3</div>
                    <div>{mon_3.name}</div>
                    <div>{mon_3.curhp}/{mon_3.hp}</div>
                    {/* <EnemyPanel state={mon_3} setState={setMon_3} /> */}
                    <button style={{ visibility: targetSelect1 }} onClick={() => target(char_1, mon_3, type, 'char_1', 'mon_3')}>Target</button>
                    <button style={{ visibility: targetSelect2 }} onClick={() => target(char_2, mon_3, type, 'char_2', 'mon_3')}>Target</button>
                    <button style={{ visibility: targetSelect3 }} onClick={() => target(char_3, mon_3, type, 'char_3', 'mon_3')}>Target</button>
                </>

                }
            </div>
        </div>
        <div className="heroBattleArea">
            <div className="char_1">
                {char_1 && <>
                    <CharacterPanel state={char_1} />
                    <div style={{ visibility: hideMenuChar1 }}>
                        <button onClick={() => (
                            attack('char1'),
                            setType("patk")
                        )}>Attack</button>
                    </div>
                </>
                }
            </div>
            <div className="char_2">
                {char_2 && <>
                    <CharacterPanel state={char_2} />
                    <div style={{ visibility: hideMenuChar2 }}>
                        <button onClick={() => (
                            attack('char2'),
                            setType("patk")
                        )}>Attack</button>
                    </div>
                </>
                }
            </div>
            <div className="char_3">
                {char_3 && <>
                    <CharacterPanel state={char_3} />
                    <div style={{ visibility: hideMenuChar3 }}>
                        <button onClick={() => (
                            attack('char3'),
                            setType("patk")
                        )}>Attack</button>
                    </div>
                </>
                }
            </div>
        </div>
        <div className="nextFloorButton" style={{ visibility: roomClear }}>
            <OpenModalMenuItem
                itemText="Next Floor"
                modalComponent={<MapModal
                    state={{
                        mon_1,
                        mon_2,
                        mon_3,
                        seedData
                    }}
                    setState={{
                        setMon_1,
                        setMon_2,
                        setMon_3,
                        setMon_1_hp,
                        setMon_2_hp,
                        setMon_3_hp,
                        setMonAlive1,
                        setMonAlive2,
                        setMonAlive3,
                        setSeedData,
                        setRoomClear,
                        setHideMenuChar1
                    }} />}
            />
        </div>
    </>
}

export default BattlePage
