

import {
    GET_ALL_TASKS,
    GET_COMPLETED_TASKS,
    GET_INCOMPLETED_TASKS,
    LOG_OUT_USER,
    SAVE_USER,
} from "./actions"

const initialState = {
    allTasks: [],
    completedTasks: [],
    incompletedTasks: [],
    user: {},
}

const setLocalStorageUser = (user) => {
    try {
        window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.log(error.message);
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER:
            setLocalStorageUser(action.payload);
            return {
                ...state,
                user: action.payload
            }
        case LOG_OUT_USER:
            setLocalStorageUser({});
            return {
                ...state,
                user: {}
            }
        case GET_ALL_TASKS:
            return {
                ...state,
                allTasks: action.payload
            }
        case GET_COMPLETED_TASKS:
            return {
                ...state,
                completedTasks: action.payload
            }
        case GET_INCOMPLETED_TASKS:
            return {
                ...state,
                incompletedTasks: action.payload
            }

        default: return { ...state }
    }
}