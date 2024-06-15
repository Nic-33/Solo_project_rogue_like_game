



function CharacterPanel(props) {
    // console.log("props character panel", props.state)
    const { curhp, stats } = props.state



    // console.log(stats)



    return <>
        <div>
            <div>character panel</div>
            <div>{stats.name}</div>
            <div>{curhp}/{stats.hp}</div>
        </div>

    </>
}

export default CharacterPanel
