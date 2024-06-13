const GET_ALL_CHAR = 'char/getAllChar'
const GET_A_CHAR = 'char/getAChar'
const CREATE_CHAR = 'char/createChar'
const UPDATE_CHAR = 'char/updateChar'
const DELETE_CHAR = 'char/deleteChar'

const getAllChar = (char) => ({
    type: GET_ALL_CHAR,
    payload: char
});

const getAChar = (char) => ({
    type: GET_A_CHAR,
    payload: char
});

const createChar = (char) => ({
    type: CREATE_CHAR,
    payload: char
});

const updateChar = (char) => ({
    type: UPDATE_CHAR,
    payload: char
})

const deleteChar = (char_id) => ({
    type: DELETE_CHAR,
    payload: char_id
})

export const thunkGetChars = () => async (dispatch) => {
    const response = await fetch("/api/char/", {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        for (const [key, value] of Object.entries(data.char)) {
            // console.log(typeof value.stats)
            if (typeof value.stats === 'string') {
                let stats = JSON.parse(value.stats);
                value.stats = stats
            }
        }
        // console.log("data:", data)
        dispatch(getAllChar(data));
    }
}

export const thunkGetAChar = (char_id) => async (dispatch) => {
    const response = await fetch(`/api/char/${char_id}`, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        if (typeof data.stats === 'string') {
            data.stats = JSON.parse(data.stats)
        }
        console.log("data:", data)
        dispatch(getAChar(data));
    }
}

export const thunkCreateChar = (payload) => async (dispatch) => {
    const response = await fetch(`/api/char`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const char = await response.json()
        dispatch(createChar(char))
    }

}

export const thunkUpdateChar = (payload, char_id) => async (dispatch) => {
    console.log(char_id)
    const response = await fetch(`api/char/${char_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log('response!!!!:', response)
    if (response.ok) {
        const char = await response.json()
        dispatch(updateChar(char))
    }
}



const initialState = {}
let obj = {}
function charReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CHAR:
            obj = {}
            action.payload.char.forEach(element => {
                obj[element.id] = element;
            });
            return { ...obj }

        case GET_A_CHAR:
            return { ...action.payload }

        case UPDATE_CHAR: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }

        case CREATE_CHAR: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }
        case DELETE_CHAR: {
            obj = { ...state }
            delete obj[action.payload]
            return { ...obj }
        }

        default:
            return state;
    }
}

export const thunkDeleteChar = (char_id) => async (dispatch) => {
    const response = await fetch(`/api/char/${char_id}`, {
        method: 'DELETE'
    });
    dispatch(deleteChar(char_id));
    return response;
};

export default charReducer;
