import { useEffect } from "react";
import './MapModal.css'
import { floor_Data } from "../../BTSCode/data";
import { useModal } from '../../context/Modal';

var difference = function (a, b) { return Math.abs(a - b); }

function MapModal(props) {
    const { char_1, char_2, char_3, seedData } = props.state
    const { setCharAlive1, setCharAlive2, setCharAlive3, setFloorNumber, setTurnOrder, setMon_1, setMon_2, setMon_3, setMonAlive1, setMonAlive2, setMonAlive3, setSeedData, setRoomClear, setHideMenuChar1 } = props.setState
    const floor = Object.values(floor_Data[seedData[0]])
    console.log('seedData:', seedData.length)
    console.log('floor', floor)
    const { closeModal } = useModal();

    useEffect(() => {
        setMon_1()
        setMonAlive1(false)
        setMon_2()
        setMonAlive2(false)
        setMon_3()
        setMonAlive3(false)
    }, [])


    const Enemy = (e) => {
        let turn = []
        if (char_1 && char_1.curhp > 0) {
            setCharAlive1(true)
            turn.push('char_1')

        }
        if (char_2 && char_2.curhp > 0) {
            setCharAlive2(true)
            turn.push('char_2')
        }
        if (char_3 && char_3.curhp > 0) {
            setCharAlive3(true)
            turn.push('char_3')
        }
        let enemies = e
        if (enemies[1]) {
            setMon_1(enemies[1])
            setMonAlive1(true)
            turn.push('mon_1')
        }
        if (enemies[0]) {
            setMon_2(enemies[0])
            setMonAlive2(true)
            turn.push('mon_2')
        }
        if (enemies[2]) {
            setMon_3(enemies[2])
            setMonAlive3(true)
            turn.push('mon_3')
        }
        let SeedTransData = seedData.slice(1)
        // console.log("turn after mon:", turn)
        // let turnTrans = turn.shift()
        // turn.push(turnTrans)
        console.log("turn after mon:", turn)
        setTurnOrder(turn)
        setSeedData(SeedTransData)
        setRoomClear('hidden')
        setHideMenuChar1('visible')
        setFloorNumber(6 - SeedTransData.length)
        // console.log('Emenies', enemies)
        closeModal()
    }


    return <>
        <div id='map'>
            <h1>Select Your Next Room</h1>
            <form>
                {floor.map((room) => {
                    if (room.roomType === 'enemy') {
                        // console.log('room', room.enemy[0])
                        return <button onClick={() => Enemy(room.enemy)}>{room.roomType}</button>
                    } else if (room.roomType === 'shop') {
                        return <button onClick={() => Shop(room)}>{room.roomType}</button>
                    } else if (room.roomType === 'boss') {
                        return <button onClick={() => Boss(room)}>{room.roomType}</button>
                    }
                })}
            </form>
        </div>
    </>
}

export default MapModal
