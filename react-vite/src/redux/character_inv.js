const GET_CHAR_INV = 'char_inv/getChar_inv'
const UPDATE_CHAR_INV = 'char_inv/updateChar_inv'

const getChar_inv = (char_inv) => ({
    type: GET_CHAR_INV,
    payload: char_inv
})

const updateChar_inv = (char_inv) => ({
    type: UPDATE_CHAR_INV,
    payload: char_inv
})


export const thunkGetChar_inv = () => async (dispatch) => {
    console.log('thunkGetChar_inv running')
    const response = await fetch(`/api/inv`);
    console.log('char_inv response:', response)
    if (response.ok) {
        const data = await response.json();
        console.log('char_inv data:', data)
        if (data.errors) {
            console.log('Errors!!!!!!:', data.errors)
            return;
        }
        console.log('No Errors!!!!!')
        dispatch(getChar_inv(data));
    }
    console.log('Char_inv Data Not OK!!!')
}

export const thunkUpdateChar_inv = (payload) => async (dispatch) => {
    const response = await fetch(`/api/inv`, {
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
        dispatch(updateChar_inv(data));
    }
}

const initialState = {}
// let obj = {}

function char_invReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHAR_INV: {
            return { ...action.payload }
        }
        case UPDATE_CHAR_INV: {
            return { ...action.payload }
        }
        default:
            return { ...state }
    }
}


export default char_invReducer;
