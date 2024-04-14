import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllLessons } from '../../redux/lessons';

const AllLessonsPage = () => {
    const dispatch = useDispatch()
    const allLessons = useSelector(state => state?.lessons?.allLessons)
    // console.log(allLessons)
    // const allLessonClasses = allLessons?.map(lesson => lesson?.LessonClasses)
    // console.log(allLessonClasses)
    // const allClassLessons = allLessonClasses?.map(cls => cls)
    // console.log(allClassLessons)
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
                                    {/* <img src={lesson.lessonImg ? lesson.lessonImg : "/images/placeholder.jpeg"} alt={`lesson ${lesson.id} image`} /> */}
                                    <img src="../images/lesson_image.png" alt="lesson image" />
                                </div>
                                <div className='lessonTileInfo'>
                                    <h4 className='lessonTitle'>{lesson.title} </h4>
                                    <h5>Created By: {lesson.LessonTeacherFirstName} {lesson.LessonTeacherLastName}</h5>
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
