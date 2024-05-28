const GET_USE_INV = 'use_inv/getUse_inv'
const UPDATE_USE_INV = 'use_inv/updateUse_inv'

const getUse_inv = (use_inv) => ({
    type: GET_USE_INV,
    payload: use_inv
})

const updateUse_inv = (use_inv) => ({
    type: UPDATE_USE_INV,
    payload: use_inv
})


export const thunkGetUse_inv = () => async (dispatch) => {
    console.log('thunkGetUse_inv running')
    const response = await fetch(`/api/use_inv`);
    console.log('use_inv response:', response)
    if (response.ok) {
        const data = await response.json();
        console.log('use_inv data:', data)
        if (data.errors) {
            console.log('Errors!!!!!!:', data.errors)
            return;
        }
        console.log('No Errors!!!!!')
        dispatch(getUse_inv(data));
    }
    console.log('Use_inv Data Not OK!!!')
}

export const thunkUpdateUse_inv = (payload) => async (dispatch) => {
    const response = await fetch(`/api/use_inv`, {
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
        dispatch(updateUse_inv(data));
    }
}

const initialState = {}
// let obj = {}

function use_invReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USE_INV: {
            return { ...action.payload }
        }
        case UPDATE_USE_INV: {
            return { ...action.payload }
        }
        default:
            return { ...state }
    }
}


export default use_invReducer;
