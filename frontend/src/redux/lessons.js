import { csrfFetch } from "./csrf";

const GET_LESSONS = "lessons/GET_LESSONS"
const GET_LESSON_DETAILS = "lessons/GET_LESSON_DETAILS"
// const CREATE_LESSON = "lessons/CREATE_LESSON"
// const UPDATE_LESSON = "lessons/UPDATE_LESSON"
// const REMOVE_LESSON = "lessons/REMOVE_LESSON"


const getLessons = (lessons) => ({
    type: GET_LESSONS,
    payload: lessons
})

const lessonDetails = (lessonData) => ({
    type: GET_LESSON_DETAILS,
    payload: lessonData
})

// const addLesson = (lessonInfo) => ({
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

export const getAllLessons = () => async (dispatch) => {
    const response = await csrfFetch('/api/lessons')

    if (response.ok) {
        const data = await response.json()
        const lessons = data.Lessons
        dispatch(getLessons(lessons))
        return lessons
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const getLessonDetails = (lessonId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lessons/${lessonId}`)
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        const lessonInformation = data.Lesson
        // console.log(classInformation)
        dispatch(lessonDetails(lessonInformation))
        return lessonInformation
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}


const initialState = {};

const lessonsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_LESSONS:
            // console.log(action.payload)
            if (action.payload) {
                const lessonsById = {};
                action.payload.forEach((lesson) => {
                    lessonsById[lesson.id] = lesson;
                });
                newState = {
                    allLessons: action.payload,
                    allLessonsById: lessonsById,
                };
                return newState;
            } else {
                newState = action.payload;
                return newState;
            }
        case GET_LESSON_DETAILS:
            if (action.payload) {
                return {
                    lessonDeets: action.payload
                }
            } else {
                return {
                    ...state
                }
            }
        default:
            return state;
    }
};

export default lessonsReducer;
