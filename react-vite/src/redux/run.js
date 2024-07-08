const GET_ALL_RUN = 'run/getAllRun'
const GET_A_RUN = 'run/getARun'
const CREATE_RUN = 'run/createRun'
const UPDATE_RUN = 'run/updateRun'
const DELETE_RUN = 'run/deleteRun'

const getAllRun = (run) => ({
    type: GET_ALL_RUN,
    payload: run
});

const getARun = (run) => ({
    type: GET_A_RUN,
    payload: run
});

const createRun = (run) => ({
    type: CREATE_RUN,
    payload: run
});

const updateRun = (run) => ({
    type: UPDATE_RUN,
    payload: run
})

const deleteRun = (run_id) => ({
    type: DELETE_RUN,
    payload: run_id
})

export const thunkGetRuns = () => async (dispatch) => {
    const response = await fetch("/api/run/", {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        // console.log("data:", data)
        dispatch(getAllRun(data));
    }
}

export const thunkGetARun = (run_id) => async (dispatch) => {
    const response = await fetch(`/api/run/${run_id}`, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        data.character_1 = JSON.parse(data.character_1)
        if (data.character_2) {
            data.character_2 = JSON.parse(data.character_2)
        }
        if (data.character_3) {
            data.character_3 = JSON.parse(data.character_3)
        }
        data.seed = JSON.parse(data.seed)
        // console.log("data:", data)
        dispatch(getARun(data));
    }
}

export const thunkCreateRun = (payload) => async (dispatch) => {
    const response = await fetch(`/api/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const run = await response.json()
        if (run.errors) {
            console.log('Errors!!!!!!:', data.errors)
            return;
        }
        dispatch(createRun(run))
        return run
    }

}

export const thunkUpdateRun = (payload, run_id) => async (dispatch) => {
    const response = await fetch(`/api/run/${run_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log('response!!!!:', response)
    if (response.ok) {
        const run = await response.json()
        dispatch(updateRun(run))
    }
}



const initialState = {}
let obj = {}
function runReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RUN:
            obj = {}
            action.payload.run.forEach(element => {
                obj[element.id] = element;
            });
            return { ...obj }

        case GET_A_RUN:
            return { ...action.payload }

        case UPDATE_RUN: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }

        case CREATE_RUN: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }
        case DELETE_RUN: {
            obj = { ...state }
            delete obj[action.payload]
            return { ...obj }
        }

        default:
            return state;
    }
}

export const thunkDeleteRun = (run_id) => async (dispatch) => {
    const response = await fetch(`/api/run/${run_id}`, {
        method: 'DELETE'
    });
    dispatch(deleteRun(run_id));
    return response;
};

export default runReducer;
