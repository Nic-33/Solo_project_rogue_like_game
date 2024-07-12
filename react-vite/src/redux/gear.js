const GET_GEAR = 'gear/getGear'
const UPDATE_GEAR = 'gear/updateGear'

const getGear = (gear) => ({
    type: GET_GEAR,
    payload: gear
})

const updateGear = (gear) => ({
    type: UPDATE_GEAR,
    payload: gear
})


export const thunkGetGear = (char_id) => async (dispatch) => {
    // console.log('thunkGetGear running')
    const response = await fetch(`/api/gear/${char_id}`);
    // console.log('gear response:', response)
    if (response.ok) {
        const data = await response.json();
        // console.log('gear data:', data)
        if (data.errors) {
            // console.log('Errors!!!!!!:', data.errors)
            return;
        }
        // console.log('No Errors!!!!!')
        dispatch(getGear(data));
    }
    // console.log('Gear Data Not OK!!!')
}

export const thunkUpdateGear = (payload,char_id) => async (dispatch) => {
    const response = await fetch(`/api/gear/${char_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(updateGear(data));
    }
}

const initialState = {}
// let obj = {}

function gearReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GEAR: {
            return { ...action.payload }
        }
        case UPDATE_GEAR: {
            return { ...action.payload }
        }
        default:
            return { ...state }
    }
}


export default gearReducer;
