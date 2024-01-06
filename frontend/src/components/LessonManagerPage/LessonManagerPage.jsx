import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllLessons } from '../../redux/lessons';
import './LessonManagerPage.css'

const LessonManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const allLessons = useSelector(state => state?.lessons?.allLessons)
    // console.log(allLessons)
    const allUserLessons = allLessons?.filter(lesson => lesson.Teacher.userId === user.id)
    // console.log(allUserLessons)

    useEffect(() => {
        dispatch(getAllLessons())
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
                                    <p>Class: {lesson.ClassInfo.name}</p>
                                    <p>By: You</p>
                                </div>
                            </NavLink>
                            // </div>
                        )
                        )
                        }
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
