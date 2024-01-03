import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLessonDetails } from '../../redux/lessons';
import './LessonDetailsPage.css'

const LessonDetailsPage = () => {
    const { lessonId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const lesson = useSelector(state => state?.lessons?.lessonDeets)
    // console.log(lesson)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getLessonDetails(lessonId)).then(() => setIsLoaded(true))
    }, [dispatch, lessonId, isLoaded])

    return (
        <>
            {isLoaded &&
                <>
                    <div className='lessonDetailsHeading'>
                        <img src={lesson.lessonImg} alt={lesson.title} />
                        <h2>{lesson.title}</h2>
                        <h3>{lesson.description}</h3>

                    </div>
                    <div className='lessonContent'>
                        {lesson.lessonContent.data.map((content, idx) => (
                            <div key={idx}>
                                {content}
                            </div>
                        ))}
                    </div>
                    {lesson.Class.Teacher.userId === user.id && (
                        <>
                            <button>Edit Lesson</button>
                            <button>Delete Lesson</button>
                        </>
                    )}
                </>
            }
        </>
    )
}

export default LessonDetailsPage;
