
import axios from "axios";
//const URL_BASE="http://localhost:3001";



export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const GET_COMPLETED_TASKS = "GET_COMPLETED_TASKS";
export const GET_INCOMPLETED_TASKS = "GET_INCOMPLETED_TASKS";

export const SAVE_USER = "SAVE_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";


export const getAllTasks = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/task/search_all/?id_user=${id}`);
            dispatch({ type: GET_ALL_TASKS, payload: data.data });
        } catch (error) {

            dispatch({ type: GET_ALL_TASKS, payload: [] });
        }

    }
}

export const getCompletedTasks = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/task/search_completed/?id_user=${id}`);
            dispatch({ type: GET_COMPLETED_TASKS, payload: data.data });
        } catch (error) {

            dispatch({ type: GET_COMPLETED_TASKS, payload: [] });
        }

    }
}

export const getIncompletedTasks = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/task/search_incompleted/?id_user=${id}`);
            dispatch({ type: GET_INCOMPLETED_TASKS, payload: data.data });
        } catch (error) {

            dispatch({ type: GET_INCOMPLETED_TASKS, payload: [] });
        }

    }
}


export const saveUser = (user) => {
    return ({ type: SAVE_USER, payload: user })
}

export const logOutUser = () => {
    return { type: LOG_OUT_USER }
}
