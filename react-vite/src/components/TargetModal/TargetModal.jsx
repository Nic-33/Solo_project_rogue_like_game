import React from "react"

function TargetModal(props) {
    const { mon_1, mon_2, mon_3 } = props.monState
    const { setMon_1, setMon_2, setMon_3 } = props.monSetState
    const state = props.state
    const setState = props.setState
    console.log(mon_2)

    const Button1 = React.memo(() => {
        console.log("Button Rendered!");
        window.alert("Button Rendered");
        return <button onClick={() => target(mon_1, setMon_1)}>{props.tag}</button>;
    });

    const Button2 = React.memo(() => {
        console.log("Button Rendered!");
        window.alert("Button Rendered");
        return <button onClick={() => target(mon_2, setMon_2)}>{props.tag}</button>;
    });

    const Button3 = React.memo(() => {
        console.log("Button Rendered!");
        window.alert("Button Rendered");
        return <button onClick={() => target(mon_3, setMon_3)}>{props.tag}</button>;
    });

    function target(state, setState) {
        state.curhp = state.curhp - 1

        setState(state)

    }

    return <>
        <h1>Pick A Target</h1>
        <div className="targetModal">
            <form action="">
                <div className="target_mon_1">
                    {mon_1 && <>
                        <div>{mon_1.name}</div>
                        <div>{mon_1.curhp}/{mon_1.hp}</div>
                        <Button1 />
                    </>
                    }
                </div>
                <div className="target_mon_2">
                    {mon_2 && <>
                        <div>{mon_2.name}</div>
                        <div>{mon_2.curhp}/{mon_2.hp}</div>
                        <Button2 />
                    </>
                    }
                </div>
                <div className="target_mon_3">
                    {mon_3 && <>
                        <div>{mon_3.name}</div>
                        <div>{mon_3.curhp}/{mon_3.hp}</div>
                        <Button3 />
                    </>
                    }
                </div>
            </form>
        </div>
    </>
}

export default TargetModal
