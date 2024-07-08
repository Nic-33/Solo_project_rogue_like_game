import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react"
import { thunkDeleteRun, thunkUpdateRun } from "../../redux/run";
import OpenModalMenuItem from "./OpenModalMenuItem"
import MapModal from "../MapModal/MapModal";
import './BattlePageCharacter.css'

let moreSoon = () => alert("More coming soon")


function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function BattlePage(props) {
    const { eventLog, char_1, char_2, char_3, seedData } = props.state
    const { id } = props.props
    const { setEventLog, setChar_1, setChar_2, setChar_3, setSeedData } = props.setState
    let turn = []
    const [turnOrder, setTurnOrder] = useState('')
    const [charAlive1, setCharAlive1] = useState(false)
    const [charAlive2, setCharAlive2] = useState(false)
    const [charAlive3, setCharAlive3] = useState(false)
    const comingSoon = () => alert('Feature Coming Soon')

    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)

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
    if (!turnOrder) {
        setTurnOrder(turn)
    }

    const [roomClear, setRoomClear] = useState('visible')
    const [endRun, setEndRun] = useState('hidden')

    const [mon_1, setMon_1] = useState()
    const [monAlive1, setMonAlive1] = useState(false)
    const [mon_2, setMon_2] = useState()
    const [monAlive2, setMonAlive2] = useState(false)
    const [mon_3, setMon_3] = useState()
    const [monAlive3, setMonAlive3] = useState(false)



    const [targetSelect1, setTargetSelect1] = useState('hidden')
    const [targetSelect2, setTargetSelect2] = useState('hidden')
    const [targetSelect3, setTargetSelect3] = useState('hidden')


    const [hideMenuChar1, setHideMenuChar1] = useState('hidden')
    const [hideMenuChar2, setHideMenuChar2] = useState('hidden')
    const [hideMenuChar3, setHideMenuChar3] = useState('hidden')

    const [floorNumber, setFloorNumber] = useState()

    const [type, setType] = useState()

    const dispatch = useDispatch()

    function monsterAttack() {
        let targetAlive = false
        let damage
        let target_char
        let char
        let num
        let current = nextTurn()
        while (!targetAlive) {
            num = Math.floor(Math.random() * 3) + 1
            if (num === 1 && charAlive1) {
                // console.log(char_1)
                target_char = 'char_1'
                char = char_1
                targetAlive = true
            }
            if (num === 2 && charAlive2) {
                // console.log(char_2)
                target_char = 'char_2'
                char = char_2
                targetAlive = true
            }
            if (num === 3 && charAlive3) {
                // console.log(char_3)
                target_char = 'char_3'
                char = char_3
                targetAlive = true
            }
        }
        let monster
        if (current === 'mon_1') {
            monster = mon_1
        } else if (current === 'mon_2') {
            monster = mon_2
        } else if (current === "mon_3") {
            monster = mon_3
        }


        // console.log(`${monster.name} is attacking ${char.stats.name}`)
        if (monster.name === 'Goblin') {
            console.log('Goblin attacked')
            damage = monster.patk - char.stats.pdef + getRandomIntInclusive(1, 3)
        }
        if (monster.name === 'Slime') {
            console.log('Slime attacked')
            damage = monster.patk - char.stats.pdef + getRandomIntInclusive(3, 5)

        }
        if (damage <= 0) {
            damage = 0
        }
        char.curhp = char.curhp - damage
        if (target_char === 'char_1') setChar_1(char)
        if (target_char === 'char_2') setChar_2(char)
        if (target_char === 'char_3') setChar_3(char)
        let event = eventLog
        event.splice(1, 0, `${monster.name} attacked ${char.stats.name} doing ${damage} damage`)
        setEventLog(event)

        if (target_char === 'char_1') {
            if (char.curhp <= 0) {
                char.curhp = 0
                setCharAlive1(false)
                event = eventLog
                event.splice(1, 0, `${char.stats.name} died`)
                setEventLog(event)
            }
            setChar_1(char)
        } else if (target_char === 'char_2') {
            if (char.curhp <= 0) {
                char.curhp = 0
                setCharAlive2(false)
                event = eventLog
                event.splice(1, 0, `${char.stats.name} died`)
                setEventLog(event)
            }
            setChar_2(char)
        } else if (target_char === 'char_3') {
            if (char.curhp <= 0) {
                char.curhp = 0
                setCharAlive3(false)
                event = eventLog
                event.splice(1, 0, `${char.stats.name} died`)
                setEventLog(event)
            }
            setChar_3(char)
        }

        if ((turnOrder[0] === 'mon_1' && monAlive1) || (turnOrder[0] === 'mon_2' && monAlive2) || (turnOrder[0] === "mon_3" && monAlive3)) {
            battleOver()
            monsterAttack()
        } else if (turnOrder[0] === 'char_1' && charAlive1) {
            setHideMenuChar1('visible')
        } else if (turnOrder[0] === 'char_2' && charAlive2) {
            setHideMenuChar2('visible')
        } else if (turnOrder[0] === 'char_3' && charAlive3) {
            setHideMenuChar3('visible')
        }
        battleOver()

    }

    function nextTurn() {
        let turns = turnOrder
        console.log('before next turnOrder runs:', turns)
        let turnTrans = turns.shift()
        if (turnTrans === 'char_1' && !charAlive1) {
            turns.push(turnTrans)
            turnTrans = turns.shift()
        }
        if (turnTrans === 'char_2' && !charAlive2) {
            turns.push(turnTrans)
            turnTrans = turns.shift()
        }
        if (turnTrans === 'char_3' && !charAlive3) {
            turns.push(turnTrans)
            turnTrans = turns.shift()
        }
        if (turnTrans === 'mon_1' && !monAlive1) {
            turns.push(turnTrans)
            turnTrans = turns.shift()
        }
        if (turnTrans === 'mon_2' && !monAlive2) {
            turns.push(turnTrans)
            turnTrans = turns.shift()
        }
        if (turnTrans === 'mon_3' && !monAlive3) {
            turns.push(turnTrans)
            turnTrans = turns.shift()
        }
        if (turnTrans === 'char_1' && !charAlive1) {
            turns.push(turnTrans)
            turnTrans = turns.shift()
        }
        turns.push(turnTrans)
        // if (turnTrans === 'char_1'&& )
        // console.log('Turn Order:', turns)
        // console.log('TransTurn:', turnTrans)
        setTurnOrder(turns)
        return turnTrans
    }

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


    function target(char, mon, atkType, target_mon) {
        setTargetSelect1('hidden')
        setTargetSelect2('hidden')
        setTargetSelect3('hidden')
        // console.log('tar fun char:', char.stats.patk)
        // console.log('tar fun mon:', mon)
        // console.log('type:', atkType)
        let damage = char.stats.patk - mon.pdef + getRandomIntInclusive(1, 5)
        if (damage < 0) {
            damage = 0
        }

        // console.log('damage:', char.stats)
        mon.curhp = mon.curhp - damage
        // console.log("current hp:", mon.curhp)

        let event = eventLog
        event.splice(1, 0, `${char.stats.name} attacked ${mon.name} doing ${damage} damage`)
        setEventLog(event)

        if (mon.curhp <= 0) {
            console.log("Monster is dead!!!")
            if (target_mon === 'mon_1') {
                console.log('mon_1')
                setMonAlive1(false)
                event = eventLog
                event.splice(1, 0, `${mon.name} died`)
                setEventLog(event)
            } else if (target_mon === 'mon_2') {
                console.log('mon_2')
                event = eventLog
                event.splice(1, 0, `${mon.name} died`)
                setEventLog(event)
                setMonAlive2(false)
            } else if (target_mon === 'mon_3') {
                console.log('mon_3')
                event = eventLog
                event.splice(1, 0, `${mon.name} died`)
                setEventLog(event)
                setMonAlive3(false)
            }
        }
        battleOver()
        let current = nextTurn()
        console.log('current:', current)
        if (target_mon === 'mon_1') {
            // console.log('mon1', mon)
            setMon_1(mon)
            if (turnOrder[0] === 'mon_1' || turnOrder[0] === 'mon_2' || turnOrder[0] === "mon_3") {
                console.log('Monster Attacks')
                monsterAttack()
            } else if (current === 'char_1') {
                if (charAlive2) {
                    setHideMenuChar2('visible')
                } else if (charAlive3) {
                    setHideMenuChar3('visible')
                } else {
                    setHideMenuChar1('visible')
                }
            } else if (current === 'char_2') {
                if (charAlive3) {
                    setHideMenuChar3('visible')
                } else if (charAlive1) {
                    setHideMenuChar1('visible')
                } else {
                    setHideMenuChar2('visible')
                }
            } else if (current === 'char_3') {
                if (charAlive1) {
                    setHideMenuChar1('visible')
                } else if (charAlive2) {
                    setHideMenuChar2('visible')
                } else {
                    setHideMenuChar3('visible')
                }
            }
        } else if (target_mon === 'mon_2') {
            // console.log('mon2', mon)
            setMon_2(mon)
            if (turnOrder[0] === 'mon_1' || turnOrder[0] === 'mon_2' || turnOrder[0] === "mon_3") {
                console.log('Monster Attacks')
                monsterAttack()
            } else if (current === 'char_1') {
                if (charAlive2) {
                    setHideMenuChar2('visible')
                } else if (charAlive3) {
                    setHideMenuChar3('visible')
                } else {
                    setHideMenuChar1('visible')
                }
            } else if (current === 'char_2') {
                if (charAlive3) {
                    setHideMenuChar3('visible')
                } else if (charAlive1) {
                    setHideMenuChar1('visible')
                } else {
                    setHideMenuChar2('visible')
                }
            } else if (current === 'char_3') {
                if (charAlive1) {
                    setHideMenuChar1('visible')
                } else if (charAlive2) {
                    setHideMenuChar2('visible')
                } else {
                    setHideMenuChar3('visible')
                }
            }
        } else if (target_mon === 'mon_3') {
            // console.log('mon3', mon)
            setMon_3(mon)
            if (turnOrder[0] === 'mon_1' || turnOrder[0] === 'mon_2' || turnOrder[0] === "mon_3") {
                console.log('Monster Attacks')
                monsterAttack()
            } else if (current === 'char_1') {
                if (charAlive2) {
                    setHideMenuChar2('visible')
                } else if (charAlive3) {
                    setHideMenuChar3('visible')
                } else {
                    setHideMenuChar1('visible')
                }
            } else if (current === 'char_2') {
                if (charAlive3) {
                    setHideMenuChar3('visible')
                } else if (charAlive1) {
                    setHideMenuChar1('visible')
                } else {
                    setHideMenuChar2('visible')
                }
            } else if (current === 'char_3') {
                if (charAlive1) {
                    setHideMenuChar1('visible')
                } else if (charAlive2) {
                    setHideMenuChar2('visible')
                } else {
                    setHideMenuChar3('visible')
                }
            }
        }
    }

    function battleOver() {
        // console.log("battle over CAlled!!")
        // console.log('mon_1:', mon_1)
        // console.log('mon_2:', mon_2)
        // console.log('mon_3:', mon_3)
        if ((!monAlive1 || mon_1.curhp <= 0) && (!monAlive2 || mon_2.curhp <= 0) && (!monAlive3 || mon_3.curhp <= 0)) {
            console.log('Battle Over!!!, Player wins')
            setTargetSelect1('hidden')
            setTargetSelect2('hidden')
            setTargetSelect3('hidden')
            setHideMenuChar1('hidden')
            setHideMenuChar2('hidden')
            setHideMenuChar3('hidden')
            console.log(seedData.length)
            if (seedData.length > 0) {
                setRoomClear('visible')
                let char1 = JSON.stringify(char_1)
                let char2 = JSON.stringify(char_2)
                let char3 = JSON.stringify(char_3)
                let seed = JSON.stringify(seedData)
                let data = {
                    char_1: char1,
                    char_2: char2,
                    char_3: char3,
                    seed
                }
                // console.log('char1:', data)
                dispatch(thunkUpdateRun(data, id))
            } else {
                setEndRun('visible')
            }




        }
        if ((!charAlive1 || char_1.curhp <= 0) && (!charAlive2 || char_2.curhp <= 0) && (!charAlive3 || char_3.curhp <= 0)) {
            console.log('Game Over')
            setTargetSelect1('hidden')
            setTargetSelect2('hidden')
            setTargetSelect3('hidden')
            setHideMenuChar1('hidden')
            setHideMenuChar2('hidden')
            setHideMenuChar3('hidden')
            setRoomClear('visible')
            setLose(true)
        }
    }

    return (<>
        {!lose || !win ? <>
            <div className="battlePage">
                <div className="battleArea">
                    <div className="enemyBattleArea">
                        {floorNumber && <h2 className="floorNumber">Floor Number {floorNumber}</h2>}
                        <div className="enemy" id="enemy1">
                            {mon_1 && monAlive1 && <>
                                <div className="enemyPanel">
                                    <div className="enemyName" id="enemy1Name">{mon_1.name}</div>
                                    <div className="enemyImage" id="enemy1Image">
                                        {/* <img src="mon_1.image" alt="" /> */}
                                    </div>
                                    <div className="enemyHealth" id="enemy1Health">{mon_1.curhp}/{mon_1.hp}</div>
                                    {/* <EnemyPanel state={mon_1} setState={setMon_1} /> */}
                                    <button className="enemyTarget" id="enemy1Char1" style={{ visibility: targetSelect1 }} onClick={() => target(char_1, mon_1, type, 'mon_1')}>Target</button>
                                    <button className="enemyTarget" id='enemy1Char2' style={{ visibility: targetSelect2 }} onClick={() => target(char_2, mon_1, type, 'mon_1')}>Target</button>
                                    <button className='enemyTarget' id='enemy1Char3' style={{ visibility: targetSelect3 }} onClick={() => target(char_3, mon_1, type, 'mon_1')}>Target</button>
                                </div>
                            </>
                            }
                        </div>
                        <div className="enemy" id="enemy2">
                            {mon_2 && monAlive2 && <>
                                <div className="enemyPanel">
                                    <div className="enemyName" id='enemy2Name'>{mon_2.name}</div>
                                    <div className="enemyImage" id="enemy2Image">
                                        {/* <img src="mon_2.image" alt="" /> */}
                                    </div>
                                    <div className="enemyHealth" id='enemy2Health'>{mon_2.curhp}/{mon_2.hp}</div>
                                    {/* <EnemyPanel state={mon_2} setState={setMon_2} /> */}
                                    <button className="enemyTarget" id="enemy2Char1" style={{ visibility: targetSelect1 }} onClick={() => target(char_1, mon_2, type, 'mon_2')}>Target</button>
                                    <button className="enemyTarget" id='enemy2Char2' style={{ visibility: targetSelect2 }} onClick={() => target(char_2, mon_2, type, 'mon_2')}>Target</button>
                                    <button className='enemyTarget' id='enemy2Char3' style={{ visibility: targetSelect3 }} onClick={() => target(char_3, mon_2, type, 'mon_2')}>Target</button>
                                </div></>
                            }
                        </div>
                        <div className="enemy" id="enemy3">
                            {mon_3 && monAlive3 && <>
                                <div className="enemyPanel">
                                    <div className="enemyName" id='enemy3Name'>{mon_3.name}</div>
                                    <div className="enemyImage" id="enemy3Image">
                                        {/* <img src="mon_3.image" alt="" /> */}
                                    </div>
                                    <div className="enemyHealth" id='enemy3Health'>{mon_3.curhp}/{mon_3.hp}</div>
                                    {/* <EnemyPanel state={mon_3} setState={setMon_3} /> */}
                                    <button className="enemyTarget" id="enemy3Char1" style={{ visibility: targetSelect1 }} onClick={() => target(char_1, mon_3, type, 'mon_3')}>Target</button>
                                    <button className="enemyTarget" id='enemy3Char2' style={{ visibility: targetSelect2 }} onClick={() => target(char_2, mon_3, type, 'mon_3')}>Target</button>
                                    <button className='enemyTarget' id='enemy3Char3' style={{ visibility: targetSelect3 }} onClick={() => target(char_3, mon_3, type, 'mon_3')}>Target</button>
                                </div>
                            </>

                            }
                        </div>
                    </div>
                    <div className="heroBattleArea">
                        <div className="char_1">
                            {char_1 && <>
                                <div className="charInfo" id="char1Info">
                                    {char_1.stats.avatarUrl && <div className="charAvatar" id='char1Avatar'><img className="avatar" src={char_1.stats.avatarUrl} alt="avatar" /></div>}
                                    <div className="charName" id='char1Name' >{char_1.stats.name}</div>
                                    <div className="charHealth" id="char1Health">{char_1.curhp}/{char_1.stats.hp}</div>
                                </div>
                                {/* <CharacterPanel state={char_1} /> */}
                                <div className="charButtons" id="char1Buttons">
                                    <div className="hideMenu" style={{ visibility: hideMenuChar1 }}>
                                        <button className="charAtkButton" id='char1Atk' onClick={() => (
                                            attack('char1'),
                                            setType("patk")
                                        )}>Attack</button>
                                        <button className="charAblButton" id="char1ABT" onClick={() => {
                                            comingSoon()
                                        }}>Abilities</button>
                                        <button className="charMgcButton" id="char1Mgc" onClick={() => {
                                            comingSoon()
                                        }}>Magic</button>
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                        <div className="char_2">
                            {char_2 && <>
                                <div className="charInfo" id="char2Info">
                                    {char_2.stats.avatarUrl && <div className="charAvatar" id="char2Avatar"> <img className="avatar" src={char_2.stats.avatarUrl} alt='avatar' /></div>}
                                    <div className="charName" id='char2Name' >{char_2.stats.name}</div>
                                    <div className="charHealth" id="char2Health">{char_2.curhp}/{char_2.stats.hp}</div>
                                </div>
                                {/* <CharacterPanel state={char_2} /> */}
                                <div className="charButtons" id="char2Buttons">
                                    <div className="hideMenu" style={{ visibility: hideMenuChar2 }}>
                                        <button className="charAtkButton" id='char2Atk' onClick={() => (
                                            attack('char2'),
                                            setType("patk")
                                        )}>Attack</button>
                                        <button className="charAblButton" id="char2ABT" onClick={() => {
                                            comingSoon()
                                        }}>Abilities</button>
                                        <button className="charMgcButton" id="char2Mgc" onClick={() => {
                                            comingSoon()
                                        }}>Magic</button>
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                        <div className="char_3">
                            {char_3 && <>
                                <div className="charInfo" id="char3Info">
                                    {char_3.stats.avatarUrl && <div className="charAvatar" id='char3Avatar'><img className="avatar" src={char_3.stats.avatarUrl} alt='avatar' /></div>}
                                    <div className="charName" id='char2Name' >{char_3.stats.name}</div>
                                    <div className="charHealth" id="char3Health">{char_3.curhp}/{char_3.stats.hp}</div>
                                </div>
                                {/* <CharacterPanel state={char_3} /> */}
                                <div className="charButtons" id="char3Buttons">
                                    <div className="hideMenu" style={{ visibility: hideMenuChar3 }}>
                                        <button className="charAtkButton" id='char3Atk' onClick={() => (
                                            attack('char3'),
                                            setType("patk")
                                        )}>Attack</button>
                                        <button className="charAblButton" id="char3ABT" onClick={() => {
                                            comingSoon()
                                        }}>Abilities</button>
                                        <button className="charMgcButton" id="char3Mgc" onClick={() => {
                                            comingSoon()
                                        }}>Magic</button>
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div >
                <div className="eventLog">
                    <h2 className="eventLogTitle">Event Log</h2>
                    {eventLog && <>
                        {
                            eventLog.map((key) => {
                                return (<div key={key} className="eventLogInfo">{key}</div>)
                            })
                        }
                    </>}
                </div>
                <div className="nextFloorButton" style={{ visibility: roomClear }}>
                    <OpenModalMenuItem
                        itemText="Start"
                        modalComponent={<MapModal
                            state={{
                                char_1,
                                char_2,
                                char_3,
                                seedData,
                                turnOrder,
                                floorNumber
                            }}
                            setState={{
                                setMon_1,
                                setMon_2,
                                setMon_3,
                                setMonAlive1,
                                setMonAlive2,
                                setMonAlive3,
                                setCharAlive1,
                                setCharAlive2,
                                setCharAlive3,
                                setTurnOrder,
                                setFloorNumber,
                                setEventLog,
                                setSeedData,
                                setRoomClear,
                                setHideMenuChar1,
                                setHideMenuChar2,
                                setHideMenuChar3
                            }} />}
                    />
                </div>
                <div className="nextFloorButton" style={{ visibility: endRun }}>
                    <button onClick={moreSoon}>End Run</button>
                </div>
            </div>
        </> : <>
            <h1>Failure state</h1>
            <NavLink to={'/'}>Return Home</NavLink>

        </>}
    </>)
}

export default BattlePage
