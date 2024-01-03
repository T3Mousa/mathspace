import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllLessons } from '../../redux/lessons';

const AllLessonsPage = () => {
    const dispatch = useDispatch()
    const allLessons = useSelector(state => state?.lessons?.allLessons)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllLessons()).then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    return (
        <>
            {isLoaded &&
                <div className='allLessonsContainer'>
                    {allLessons?.map(lesson => (
                        <div className='lessonTile' key={lesson.id}>
                            <NavLink className="lessonTileLink" to={`/lessons/${lesson.id}`} key={lesson.id}>
                                <div className='lessonTileImage'>
                                    <img src={lesson.lessonImg ? lesson.lessonImg : "/images/placeholder.jpeg"} alt={`lesson ${lesson.id} image`} />
                                </div>
                                <div className='lessonTileInfo'>
                                    <p className='lessonTitle'>{lesson.title} </p>
                                    <p>By: {lesson.Teacher.firstName} {lesson.Teacher.lastName}</p>
                                    <p>{lesson.description}</p>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            }
        </>
    )
};

export default AllLessonsPage;
