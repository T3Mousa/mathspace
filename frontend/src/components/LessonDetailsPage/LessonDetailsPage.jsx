import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, NavLink } from 'react-router-dom';
import { getLessonDetails } from '../../redux/lessons';
import './LessonDetailsPage.css'
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
// import UpdateLessonModal from '../UpdateLessonModal';
import DeleteLessonModal from '../DeleteLessonModal';

const LessonDetailsPage = () => {
    const { lessonId } = useParams()
    // console.log(lessonId)
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const lesson = useSelector(state => state?.lessons?.lessonDeets)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        dispatch(getLessonDetails(lessonId)).then(() => setIsLoaded(true))
    }, [dispatch, lessonId, isLoaded])

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
        <div className='lessonDetailsContainer'>
            {isLoaded &&
                <>
                    <div className='lessonDetailsHeading'>
                        <img
                            src="../images/lesson_image.png"
                            alt="lesson image"
                        />
                        <div className='lessonDetailsButtons'>
                            {lesson?.LessonTeacherUserId === user.id && (
                                <>
                                    <div className='editLessonButton'>
                                        <button className="editLessonButton">
                                            <Link to={`/lessons/${lessonId}/edit`} className='editLessonLink'>Edit Lesson </Link>
                                        </button>
                                    </div>
                                    <div className='deleteLessonButton'>
                                        <OpenModalButton
                                            buttonText="Delete Lesson"
                                            onButtonClick={closeMenu}
                                            modalComponent={<DeleteLessonModal lesson={lesson} />}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='lessonDetails'>
                        <div className='lessonTitle'>
                            <p className='lessonDetailsLabel'>
                                <span>Lesson Title: </span> {lesson.title}
                            </p>
                        </div>
                        <div className='lessonSubheading'>
                            <p className='lessonDetailsLabel'>
                                <span>Created By: </span> {lesson.LessonTeacherFirstName} {lesson.LessonTeacherLastName}
                            </p>
                            {lesson?.LessonTeacherUserId === user.id &&
                                <div className='lessonDetailsLabel'>
                                    <p className='lessonDetailsLabel'>
                                        <span>Classes Assigned To:</span>
                                        {lesson?.LessonClasses ?
                                            <ul className='lessonClassList'>
                                                {(() => {
                                                    const lessonClassItems = []
                                                    for (let i = 0; i < lesson?.LessonClasses?.length; i++) {
                                                        const lessonClassItem = lesson?.LessonClasses[i]
                                                        lessonClassItems.push(
                                                            <li key={lessonClassItem.classId}>
                                                                <NavLink to={`/classes/${lessonClassItem.classId}`} className="lessonClassLink">
                                                                    {lessonClassItem.className}
                                                                </NavLink>
                                                            </li>
                                                        )
                                                    }
                                                    return lessonClassItems
                                                })()}
                                            </ul> :
                                            <ul className='lessonClassList'>This lesson has not been assigned to any classes</ul>
                                        }
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='lessonDetailsContent'>
                        <h3>Lesson Description: </h3>
                        <p>{lesson.description}</p>
                        <h3>Lesson Content: </h3>
                        <p>{lesson.lessonContent}</p>
                    </div>

                </>
            }
        </div>
    )
}

export default LessonDetailsPage;
