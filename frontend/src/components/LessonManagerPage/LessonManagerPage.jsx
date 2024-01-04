import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllLessons } from '../../redux/lessons';
import './LessonManagerPage.css'
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import LessonMenuButton from './LessonMenuButton';

const LessonManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const allLessons = useSelector(state => state?.lessons?.allLessons)
    // console.log(allLessons)
    const allUserLessons = allLessons?.filter(lesson => lesson.Teacher.userId === user.id)
    // console.log(allUserLessons)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        dispatch(getAllLessons())
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
            <div className="manageLessonsHeader">
                {user && user.userRole === "teacher" &&
                    <>
                        <h1>Manage Your Lessons</h1>
                        <button className="addLessonButton">
                            {/* <OpenModalButton
                                buttonText='Create A New Lesson'
                                className="addLessonButtonModal"
                                onButtonClick={closeMenu}
                                modalComponent={<CreateNewLessonModal />}
                            /> */}
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
                                        <img src={lesson.lessonImg} alt={lesson.title} />
                                    </div>
                                    <div className='lessonTitleAuthor'>
                                        <p>Title: {lesson.title}</p>
                                        <p>Class: {lesson.ClassInfo.name}</p>
                                        <p>By: You</p>
                                    </div>
                                </NavLink>
                                <div className='lessonMenuButton'>
                                    <LessonMenuButton lesson={lesson} />
                                </div>
                            </div>
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
