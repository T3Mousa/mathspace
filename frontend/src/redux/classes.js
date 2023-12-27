import { csrfFetch } from "./csrf";

const GET_CLASSES = "classes/GET_CLASSES"
const GET_CLASS_DETAILS = "classes/GET_CLASS_DETAILS"
const CREATE_CLASS = "classes/CREATE_CLASS"
const UPDATE_CLASS = "classes/UPDATE_CLASS"
const REMOVE_CLASS = "classes/REMOVE_CLASS"


const getClasses = (classes) => ({
    type: GET_CLASSES,
    payload: classes
})

const classDetails = (classData) => ({
    type: GET_CLASS_DETAILS,
    payload: classData
})

const addClass = (classInfo) => ({
    type: CREATE_CLASS,
    payload: classInfo
})

const updateClass = (editedClass) => ({
    type: UPDATE_CLASS,
    payload: editedClass
})

const removeClass = (classId) => ({
    type: REMOVE_CLASS,
    payload: classId
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

export const getClassDetails = (classId) => async (dispatch) => {
    const response = await csrfFetch(`/api/classes/${classId}`)
    // console.log(response)
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        const classInformation = data.Class
        // console.log(classInformation)
        dispatch(classDetails(classInformation))
        return classInformation
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const addNewClass = (classInfo) => async (dispatch) => {
    const response = await csrfFetch('/api/classes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(classInfo)
    })
    if (response.ok) {
        const newClass = await response.json()
        dispatch(addClass(newClass))
        // dispatch(getAllClasses())
        return newClass
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const editClass = (classId, editedClassData) => async (dispatch) => {
    // console.log(editedClassData.id)
    const response = await csrfFetch(`/api/classes/${classId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedClassData)
    })
    // console.log(response)
    if (response.ok) {
        const edited = await response.json()
        dispatch(editClass(edited))
        return edited
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const deleteClass = (classId) => async (dispatch) => {
    const response = await csrfFetch(`/api/classes/${classId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        const deletedClass = await response.json()
        dispatch(removeClass(classId))
        dispatch(getAllClasses())
        return deletedClass
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}


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
        case GET_CLASS_DETAILS:
            if (action.payload) {
                // console.log(action.payload)
                return {
                    // ...state,
                    classDeets: action.payload
                }
            } else {
                return {
                    ...state
                }
            }
        case CREATE_CLASS:
            if (action.payload) {
                newState = {
                    ...state,
                    newClassAdded: action.payload
                }
                return newState
            } else {
                return {
                    ...state
                }
            }
        case UPDATE_CLASS:
            newState = { ...state }
            if (!newState.allClassesById) {
                newState.allClassesById = {}
            }
            newState.allClasses = newState?.allClasses?.map((cls) => {
                return cls.id === action.payload.id ? action.payload : cls
            })
            newState.editedClass = { ...action.payload }
            newState.allClassesById[action.payload.id] = { ...action.payload }
            console.log(newState)
            return newState
        case REMOVE_CLASS:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
};

export default classesReducer;
