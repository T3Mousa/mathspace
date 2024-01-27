import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllClassLessons, getAllLessons } from '../../redux/lessons';
import './LessonManagerPage.css'

const LessonManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const allLessons = useSelector(state => state?.lessons?.allLessons)
    console.log(allLessons)
    // const allLessonClassNames = allLessons?.map(subArr => subArr.ClassesInfo.map(cls => { cls.teacherUser.id === user.id }))
    // console.log(allLessonClassNames)
    const allUserLessons = allLessons?.map(lesson => lesson?.ClassesInfo.filter(cls => cls.teacherUserId === user.id))
    // const allUserLessons = allLessons?.ClassesInfo?.map(lesson => lesson.teacherUser.id === user.id)
    // const allUserLessons = allLessons?.map(subArray => subArray?.ClassLessons?.find(cls => cls?.Class.Teacher.userId === user.id))
    // lesson?.ClassLessons?.find(cls => cls.Class.Teacher.userId === user.id)
    console.log(allUserLessons)


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
                                    <p>Class: {allUserLessons.name}</p>
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
