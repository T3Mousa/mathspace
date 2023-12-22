import { csrfFetch } from "./csrf";

const GET_CLASSES = "classes/GET_CLASSES"
const CREATE_CLASS = "classes/ADD_CLASS"


const getClasses = (classes) => ({
    type: GET_CLASSES,
    payload: classes
})

const addClass = (classInfo) => ({
    type: CREATE_CLASS,
    classInfo
})


export const getAllClasses = () => async (dispatch) => {
    const response = await csrfFetch('/api/classes/current-user')
    // console.log(response)
    if (response.ok) {
        const data = await response.json()
        const classes = data.Classes
        dispatch(getClasses(classes))
        return classes
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};


const initialState = {};

const classesReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_CLASSES:
            // console.log(action.payload)
            if (action.payload) {
                const classesById = {};
                action.payload.forEach((cls) => {
                    classesById[cls.id] = cls;
                });
                newState = {
                    allClasses: action.payload,
                    allClassesById: classesById,
                };
                return newState;
            } else {
                newState = action.payload;
                return newState;
            }
        default:
            return state;
    }
};

export default classesReducer;
