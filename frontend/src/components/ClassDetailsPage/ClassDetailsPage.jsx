import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { getClassDetails } from '../../redux/classes';
import './ClassDetailsPage.css'
import { getAllClassLessons } from '../../redux/lessons';


const ClassDetailsPage = () => {
    const { classId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const cls = useSelector(state => state?.classes?.classDeets)
    const clsLessons = useSelector(state => state?.lessons?.allClassLessons)
    console.log(clsLessons)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getClassDetails(classId)).then(() => setIsLoaded(true))
    }, [dispatch, classId, isLoaded])

    useEffect(() => {
        dispatch(getAllClassLessons(classId))
    }, [dispatch, classId])

    const handleLessonSelection = (e) => {
        const lessonId = parseInt(e.target.value)
        console.log(lessonId)
        const selected = cls.Lessons.find((lesson) => lesson.id === lessonId)
        console.log(selected)
        // console.log(setSelectedLesson(selected))
        setSelectedLesson(selected)
        console.log(selectedLesson)
        // navigate(`/lessons/${lessonId}`)
    }

    return (
        <>
            {isLoaded && cls?.id &&
                <>
                    <div className='classDetailsHeading'>
                        <h2>{cls.classImg}</h2>
                        <h2>{cls.name}</h2>
                        <h3>{cls.description}</h3>
                    </div>
                    {user.userRole === "teacher" &&
                        <div className='classRoster'>
                            Class Roster: {cls.Students.length} students
                        </div>
                    }
                    <label>
                        Lessons:
                        <select
                            value={selectedLesson ? selectedLesson.id : ''}
                            onChange={handleLessonSelection}
                        >
                            <option value="" disabled>Select a lesson...</option>
                            {clsLessons?.map((lesson) => (
                                <option key={lesson.id} value={lesson.id}>
                                    {lesson.title}
                                </option>
                            )
                            )}
                        </select>
                    </label>
                    {user.userRole === "teacher" &&
                        <button>
                            Create New Lesson
                        </button>
                    }
                    {selectedLesson && <div>
                        <p>Title: {selectedLesson.title}</p>
                        <p>Description: {selectedLesson.description}</p>
                        <NavLink to={`/lessons/${selectedLesson.id}`}>
                            Go to lesson details page <i className="fa-solid fa-arrow-right"></i>
                        </NavLink>
                    </div>}

                </>
            }
        </>
    )
}

export default ClassDetailsPage
