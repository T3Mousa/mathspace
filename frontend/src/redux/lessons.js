import { csrfFetch } from "./csrf";

const GET_LESSONS = "lessons/GET_LESSONS"
const GET_LESSON_DETAILS = "lessons/GET_LESSON_DETAILS"
const CREATE_LESSON = "lessons/CREATE_LESSON"
const UPDATE_LESSON = "lessons/UPDATE_LESSON"
const REMOVE_LESSON = "lessons/REMOVE_LESSON"


const getLessons = (lessons) => ({
    type: GET_LESSONS,
    payload: lessons
})

const lessonDetails = (lessonData) => ({
    type: GET_LESSON_DETAILS,
    payload: lessonData
})

const addLesson = (lessonInfo) => ({
    type: CREATE_LESSON,
    payload: lessonInfo
})

const updateLesson = (editedLesson) => ({
    type: UPDATE_LESSON,
    payload: editedLesson
})

const removeLesson = (lessonId) => ({
    type: REMOVE_LESSON,
    payload: lessonId
})
