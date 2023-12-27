import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassDetails } from '../../redux/classes';
import './ClassDetailsPage.css'


const ClassDetailsPage = () => {
    const { classId } = useParams()
    const dispatch = useDispatch()
    const cls = useSelector(state => state?.classes?.classDeets)
    // console.log(cls)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getClassDetails(classId)).then(() => setIsLoaded(true))
    }, [dispatch, classId, isLoaded])

    const handleLessonSelection = (e) => {
        const lessonId = parseInt(e.target.value)
        const selected = cls.Lessons.find((lesson) => lesson.id === lessonId)
        setSelectedLesson(selected)
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
                    <div className='classRoster'>
                        Class Roster: {cls.Students.length} students
                    </div>
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
                    <button>
                        Create New Lesson
                    </button>
                    {selectedLesson && (
                        <div>
                            <h3>{selectedLesson.lessonImg}</h3>
                            <h3>{selectedLesson.title}</h3>
                            <h4>{selectedLesson.description}</h4>
                            <h4>{selectedLesson.lesonContent}</h4>
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default ClassDetailsPage
