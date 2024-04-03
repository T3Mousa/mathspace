import { csrfFetch } from "./csrf";

const GET_ASSIGNMENTS = "assignments/GET_ASSIGNMENTS"
const GET_USER_ASSIGNMENTS = "assignments/GET_USER_ASSIGNMENTS"
const GET_ASSIGNMENT_DETAILS = "assignments/GET_ASSIGNMENT_DETAILS"
const GET_CLASS_ASSIGNMENTS = "assignments/GET_CLASS_ASSIGNMENTS"
const CREATE_ASSIGNMENT = "assignments/CREATE_ASSIGNMENT"
const UPDATE_ASSIGNMENT = "assignments/UPDATE_ASSIGNMENT"
const REMOVE_ASSIGNMENT = "assignments/REMOVE_ASSIGNMENT"


const getAssignments = (assignments) => ({
    type: GET_ASSIGNMENTS,
    payload: assignments
})

const getUserAssignments = (userAssignments) => ({
    type: GET_USER_ASSIGNMENTS,
    payload: userAssignments
})

const assignmentDetails = (assignmentData) => ({
    type: GET_ASSIGNMENT_DETAILS,
    payload: assignmentData
})

const getClassAssignments = (classAssignments) => ({
    type: GET_CLASS_ASSIGNMENTS,
    payload: classAssignments
})

const createAssignment = (assignmentInfo) => ({
    type: CREATE_ASSIGNMENT,
    payload: assignmentInfo
})

// const updateLesson = (editedLesson) => ({
//     type: UPDATE_LESSON,
//     payload: editedLesson
// })

// const removeLesson = (lessonId) => ({
//     type: REMOVE_LESSON,
//     payload: lessonId
// })

export const getAllAssignments = () => async (dispatch) => {
    const response = await csrfFetch('/api/assignments')

    if (response.ok) {
        const data = await response.json()
        const assignments = data.Assignments
        dispatch(getAssignments(assignments))
        return assignments
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const getAllUserAssignments = () => async (dispatch) => {
    const response = await csrfFetch('/api/assignments/current-user')

    if (response.ok) {
        const data = await response.json()
        const userAssignments = data.Assignments
        dispatch(getUserAssignments(userAssignments))
        return userAssignments
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const getAssignmentDetails = (assignmentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/assignments/${+assignmentId}`)
    // console.log(response)
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        const assignmentInformation = data.Assignment
        // console.log(assignmentInformation)
        dispatch(assignmentDetails(assignmentInformation))
        return assignmentInformation
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const getAllClassAssignments = (classId) => async (dispatch) => {
    const response = await csrfFetch(`/api/classes/${classId}/assignments`)

    if (response.ok) {
        const data = await response.json()
        const classAssignmentList = data.Assignments
        dispatch(getClassAssignments(classAssignmentList))
        return classAssignmentList
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const addNewAssignment = (assignmentInfo) => async (dispatch) => {
    const response = await csrfFetch(`/api/assignments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentInfo),
    })
    if (response.ok) {
        const newAssignmentData = await response.json()
        dispatch(createAssignment(newAssignmentData))
        return newAssignmentData
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

// export const editLesson = (lessonId, editedLessonData) => async (dispatch) => {
//     const response = await csrfFetch(`/api/lessons/${lessonId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editedLessonData)
//     })
//     if (response.ok) {
//         const edited = await response.json()
//         dispatch(updateLesson(edited))
//         return edited
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//     } else {
//         return { server: "Something went wrong. Please try again" }
//     }
// }

// export const deleteLesson = (lessonId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/lessons/${lessonId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" }
//     })
//     if (response.ok) {
//         const deletedLesson = await response.json()
//         dispatch(removeLesson(lessonId))
//         return deletedLesson
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//     } else {
//         return { server: "Something went wrong. Please try again" }
//     }
// }


const initialState = {};

const assignmentsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ASSIGNMENTS:
            // console.log(action.payload)
            if (action.payload) {
                const assignmentsById = {};
                action.payload.forEach((assignment) => {
                    assignmentsById[assignment.id] = assignment;
                });
                newState = {
                    allAssignments: action.payload,
                    allAssignmentsById: assignmentsById,
                };
                return newState;
            } else {
                newState = action.payload;
                return newState;
            }
        case GET_USER_ASSIGNMENTS:
            // console.log(action.payload)
            if (action.payload) {
                const userAssignmentsById = {};
                action.payload.forEach((assignment) => {
                    userAssignmentsById[assignment.id] = assignment;
                });
                newState = {
                    allUserAssignments: action.payload,
                    allUserAssignmentsById: userAssignmentsById,
                };
                return newState;
            } else {
                newState = action.payload;
                return newState;
            }
        case GET_ASSIGNMENT_DETAILS:
            if (action.payload) {
                return {
                    assignmentDeets: action.payload
                }
            } else {
                return {
                    ...state
                }
            }
        case GET_CLASS_ASSIGNMENTS:
            if (action.payload) {
                const classAssignmentsById = {};
                action.payload.forEach((assignment) => {
                    classAssignmentsById[assignment.id] = assignment;
                });
                newState = {
                    allClassAssignments: action.payload,
                    allClassAssignmentsById: classAssignmentsById,
                };
                return newState;
            } else {
                newState = action.payload;
                return newState;
            }
        case CREATE_ASSIGNMENT:
            if (action.payload) {
                if (!newState.allUserAssignmentsById) {
                    newState.allUserAssignmentsById = {}
                }
                newState.allUserAssignments = [...state.allUserAssignments, action.payload]
                newState.allUserAssignmentsById[action.payload.id] = { ...action.payload }

                // console.log(newState)
                return newState
            } else {
                return { ...state }
            }
        // case UPDATE_LESSON:
        //     newState = { ...state }
        //     if (!newState.allLessonsById) {
        //         newState.allLessonsById = {}
        //     }
        //     newState.allLessons = newState?.allLessons?.map((lesson) => {
        //         return lesson.id === action.payload.id ? action.payload : lesson
        //     })
        //     newState.editedLesson = { ...action.payload }
        //     newState.allLessonsById[action.payload.id] = { ...action.payload }
        //     // console.log(newState)
        //     return newState
        // case REMOVE_LESSON:
        //     newState = { ...state }
        //     delete newState[action.payload]
        //     return newState
        default:
            return state;
    }
};

export default assignmentsReducer;
