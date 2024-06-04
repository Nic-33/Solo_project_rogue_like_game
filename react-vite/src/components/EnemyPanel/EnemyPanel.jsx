function EnemyPanel(props) {
    const mon = props.state
    // console.log(mon)
    return <>
        <div>monster panel</div>
        <div>{mon.name}</div>
        <div>{mon.curhp}/{mon.hp}</div>
    </>

}

export default EnemyPanel
