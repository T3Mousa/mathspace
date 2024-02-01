import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllUserLessons } from '../../redux/lessons';
import './LessonManagerPage.css'

const LessonManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const allUserLessons = useSelector(state => state?.lessons?.allUserLessons)
    console.log(allUserLessons)
    const allUserLessonClasses = allUserLessons?.map(lesson => lesson?.LessonClasses.map(cls => cls.className))
    console.log(allUserLessonClasses)


    useEffect(() => {
        dispatch(getAllUserLessons())
    }, [dispatch])


    return (
        <>
            <div className="manageLessonsHeader">
                {user && user.userRole === "teacher" &&
                    <h1>Manage Your Lessons</h1>
                }
                {user && user.userRole === "student" &&
                    <>
                        <h1>Your Lessons</h1>
                    </>
                }
            </div>
            <div className="teacherLessons">
                {user && user.userRole === "teacher" && allUserLessons &&
                    < div className='teacherLessonContainer'>
                        {allUserLessons?.map(lesson => (
                            // <div className='teacherLessonTile' key={lesson.id}>

                            <NavLink
                                className="teacherLessonLink"
                                to={`/lessons/${lesson.id}`}
                                key={lesson.id}
                            >
                                <div className='lessonImage'>
                                    <img src={lesson.lessonImg} alt={lesson.title} />
                                </div>
                                <div className='lessonTitleAuthor'>
                                    <p>Title: {lesson.title}</p>
                                    <p>By: You</p>
                                    <div>Classes Assigned To:
                                        <div>
                                            {lesson?.LessonClasses?.map((cls) => {
                                                <p key={cls.classId}>{cls.className}</p>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                            // </div>
                        )

                        )}
                    </div>
                }
            </div >
            {/* <div className="studentLessons">
                <div className="studentLessonTileContainer">
                    {user && user.userRole === "student" && allUserLessons && allUserLessons.map(lesson => {
                        return <StudentLessonTile
                            lesson={lesson}
                            className="lessonTile"
                            key={lesson.id}
                        />
                    })
                    }
                </div>
            </div> */}
        </>
    )


};

export default LessonManagerPage;
