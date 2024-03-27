import { csrfFetch } from "./csrf";

const GET_ASSIGNMENTS = "lessons/GET_ASSIGNMENTS"
const GET_USER_ASSIGNMENTS = "lessons/GET_USER_ASSIGNMENTS"
const GET_ASSIGNMENT_DETAILS = "lessons/GET_ASSIGNMENT_DETAILS"
const GET_CLASS_ASSIGNMENTS = "lessons/GET_CLASS_ASSIGNMENTS"
const CREATE_ASSIGNMENT = "lessons/CREATE_ASSIGNMENT"
const UPDATE_ASSIGNMENT = "lessons/UPDATE_ASSIGNMENT"
const REMOVE_ASSIGNMENT = "lessons/REMOVE_ASSIGNMENT"


const getAssignments = (assignments) => ({
    type: GET_ASSIGNMENTS,
    payload: assignments
})

// const getUserLessons = (userLessons) => ({
//     type: GET_USER_LESSONS,
//     payload: userLessons
// })

// const lessonDetails = (lessonData) => ({
//     type: GET_LESSON_DETAILS,
//     payload: lessonData
// })

// const getClassLessons = (classLessons) => ({
//     type: GET_CLASS_LESSONS,
//     payload: classLessons
// })

// const createLesson = (lessonInfo) => ({
//     type: CREATE_LESSON,
//     payload: lessonInfo
// })

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

// export const getAllUserLessons = () => async (dispatch) => {
//     const response = await csrfFetch('/api/lessons/current-user')

//     if (response.ok) {
//         const data = await response.json()
//         const userLessons = data.Lessons
//         dispatch(getUserLessons(userLessons))
//         return userLessons
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//     } else {
//         return { server: "Something went wrong. Please try again" }
//     }
// }

// export const getLessonDetails = (lessonId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/lessons/${+lessonId}`)
//     if (response.ok) {
//         const data = await response.json()
//         // console.log(data)
//         const lessonInformation = data.Lesson
//         // console.log(classInformation)
//         dispatch(lessonDetails(lessonInformation))
//         return lessonInformation
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//     } else {
//         return { server: "Something went wrong. Please try again" }
//     }
// }

// export const getAllClassLessons = (classId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/classes/${classId}/lessons`)

//     if (response.ok) {
//         const data = await response.json()
//         const classLessonList = data.Lessons
//         dispatch(getClassLessons(classLessonList))
//         return classLessonList
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//     } else {
//         return { server: "Something went wrong. Please try again" }
//     }
// }

// export const addNewLesson = (lessonInfo) => async (dispatch) => {
//     const response = await csrfFetch(`/api/lessons`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(lessonInfo),
//     })
//     if (response.ok) {
//         const newLessonData = await response.json()
//         dispatch(createLesson(newLessonData))
//         return newLessonData
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//     } else {
//         return { server: "Something went wrong. Please try again" }
//     }
// }

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
        // case GET_USER_LESSONS:
        //     // console.log(action.payload)
        //     if (action.payload) {
        //         const userLessonsById = {};
        //         action.payload.forEach((lesson) => {
        //             userLessonsById[lesson.id] = lesson;
        //         });
        //         newState = {
        //             allUserLessons: action.payload,
        //             allUserLessonsById: userLessonsById,
        //         };
        //         return newState;
        //     } else {
        //         newState = action.payload;
        //         return newState;
        //     }
        // case GET_LESSON_DETAILS:
        //     if (action.payload) {
        //         return {
        //             lessonDeets: action.payload
        //         }
        //     } else {
        //         return {
        //             ...state
        //         }
        //     }
        // case GET_CLASS_LESSONS:
        //     if (action.payload) {
        //         const classLessonsById = {};
        //         action.payload.forEach((lesson) => {
        //             classLessonsById[lesson.id] = lesson;
        //         });
        //         newState = {
        //             allClassLessons: action.payload,
        //             allClassLessonsById: classLessonsById,
        //         };
        //         return newState;
        //     } else {
        //         newState = action.payload;
        //         return newState;
        //     }
        // case CREATE_LESSON:
        //     if (action.payload) {
        //         if (!newState.allUserLessonsById) {
        //             newState.allUserLessonsById = {}
        //         }
        //         newState.allUserLessons = [...state.allUserLessons, action.payload]
        //         newState.allUserLessonsById[action.payload.id] = { ...action.payload }

        //         console.log(newState)
        //         return newState
        //     } else {
        //         return { ...state }
        //     }
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
