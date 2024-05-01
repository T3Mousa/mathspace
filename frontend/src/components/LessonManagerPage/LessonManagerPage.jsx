import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import { getAllUserLessons } from '../../redux/lessons';
import './LessonManagerPage.css'
import { getAllClasses } from '../../redux/classes';

const LessonManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const allUserLessons = useSelector(state => state?.lessons?.allUserLessons)
    // console.log(allUserLessons)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }


    useEffect(() => {
        dispatch(getAllUserLessons()).then(() => dispatch(getAllClasses())).then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => {
        setShowMenu(false)
    }


    return (
        <>
            {isLoaded &&
                <>
                    <div className="manageLessonsHeader">
                        {user && user.userRole === "teacher" &&
                            <>
                                <h1>Manage Your Lessons</h1>
                                <button className="addLessonButton">
                                    <Link to='/create-new-lesson' className='createLessonLink'>Create a New Lesson </Link>
                                </button>
                            </>
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
                                    <div className='teacherLessonTile' key={lesson.id}>

                                        <NavLink
                                            className="teacherLessonLink"
                                            to={`/lessons/${lesson.id}`}
                                            key={lesson.id}
                                        >
                                            <div className='lessonImage'>
                                                {/* <img src={lesson.lessonImg} alt={lesson.title} /> */}
                                                <img src="../images/lesson_image.png" alt="lesson image" />
                                            </div>
                                            <div className='lessonTitleAuthor'>
                                                <p>Title: {lesson.title}</p>
                                                <p>Created By: You</p>
                                                <p className='classesAssignedTo'>Classes Assigned To:</p>
                                                {lesson.LessonClasses.length ?
                                                    <ul>
                                                        {(() => {
                                                            const lessonClassItems = []
                                                            for (let i = 0; i < lesson?.LessonClasses?.length; i++) {
                                                                const lessonClassItem = lesson?.LessonClasses[i]
                                                                lessonClassItems.push(
                                                                    <li key={lessonClassItem.classId} className='classesAssignedTo'>{lessonClassItem.className}</li>
                                                                )
                                                            }
                                                            return lessonClassItems
                                                        })()}
                                                    </ul> :
                                                    <ul>This lesson has not been assigned to any classes</ul>
                                                }
                                            </div>
                                        </NavLink>
                                    </div>
                                )

                                )}
                            </div>
                        }
                    </div >
                </>
            }
        </>
    )


};

export default LessonManagerPage;
