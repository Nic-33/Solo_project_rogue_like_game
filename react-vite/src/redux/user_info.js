const GET_USER_INFO = 'user_info/getUser_info'
const UPDATE_USER_INFO = 'user_info/updateUser_info'

const getUser_info = (user_info) => ({
    type: GET_USER_INFO,
    payload: user_info
})

const updateUser_info = (user_info) => ({
    type: UPDATE_USER_INFO,
    payload: user_info
})


export const thunkGetUser_info = () => async (dispatch) => {
    console.log('thunkGetUser_info running')
    const response = await fetch(`/api/info`);
    console.log('user_info response:', response)
    if (response.ok) {
        const data = await response.json();
        console.log('user_info data:', data)
        if (data.errors) {
            console.log('Errors!!!!!!:', data.errors)
            return;
        }
        console.log('No Errors!!!!!')
        dispatch(getUser_info(data));
    }
    console.log('User_info Data Not OK!!!')
}

export const thunkUpdateUser_info = (payload) => async (dispatch) => {
    const response = await fetch(`/api/info`, {
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
        dispatch(updateUser_info(data));
    }
}

const initialState = {}
// let obj = {}

function user_infoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO: {
            return { ...action.payload }
        }
        case UPDATE_USER_INFO: {
            return { ...action.payload }
        }
        default:
            return { ...state }
    }
}


export default user_infoReducer;
