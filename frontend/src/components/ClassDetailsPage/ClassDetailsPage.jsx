import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getClassDetails } from '../../redux/classes';
import './ClassDetailsPage.css'


const ClassDetailsPage = () => {
    const { classId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const cls = useSelector(state => state?.classes?.classDeets)
    // console.log(cls)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getClassDetails(classId)).then(() => setIsLoaded(true))
    }, [dispatch, classId, isLoaded])

    const handleLessonSelection = (e) => {
        const lessonId = parseInt(e.target.value)
        console.log(lessonId)
        const selected = cls.Lessons.find((lesson) => lesson.id === lessonId)
        console.log(selected)
        // console.log(selectedLesson)
        // console.log(setSelectedLesson(selected))
        setSelectedLesson(selected)
        navigate(`/lessons/${lessonId}`)
    }

    return (
        <>
            {isLoaded &&
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
                            {cls.Lessons.map((lesson) => (
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
                    {/* {selectedLesson && (
                        <>
                            {selectedLesson.lessonImg}
                            {selectedLesson.title}
                            {selectedLesson.description}
                            {selectedLesson.lessonContent}
                        </>
                    )} */}
                </>
            }
        </>
    )
}

export default ClassDetailsPage
