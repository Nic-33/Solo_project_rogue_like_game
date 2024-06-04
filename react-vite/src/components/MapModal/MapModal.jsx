import { useEffect } from "react";
import './MapModal.css'
import { floor_Data } from "../../BTSCode/data";
import { useModal } from '../../context/Modal';



function MapModal(props) {
    const { mon_1, mon_2, mon_3, seedData } = props.state
    const { setMon_1, setMon_2, setMon_3, setSeedData, setRoomClear } = props.setState
    const floor = Object.values(floor_Data[seedData[0]])
    console.log('floor', floor)
    const { closeModal } = useModal();


    const Enemy = (e) => {
        let enemies = e
        if (enemies[0]) {
            setMon_2(enemies[0])
        }
        if (enemies[1]) {
            setMon_1(enemies[1])
        }
        if (enemies[2]) {
            setMon_3(enemies[2])
        }
        let SeedTransData = seedData.slice(1)
        setSeedData(SeedTransData)
        setRoomClear('hidden')
        console.log('Emenies', enemies)
        closeModal()
    }


    return <>
        <div id='map'>
            <h1>Select Your Next Room</h1>
            <form>
                {floor.map((room) => {
                    if (room.roomType === 'enemy') {
                        console.log('room', room.enemy[0])
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
