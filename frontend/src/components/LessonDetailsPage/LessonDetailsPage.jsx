import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
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
        <>
            {isLoaded &&
                <>
                    <div className='lessonDetailsHeading'>
                        <h2>Lesson Title: {lesson.title}</h2>
                        <p>
                            Lesson By: {lesson.LessonTeacherFirstName} {lesson.LessonTeacherLastName}
                        </p>
                        <p>Classes Assigned To:</p>
                        {lesson.LessonClasses ?
                            <div className='lessonClassList'>
                                <ul>
                                    {(() => {
                                        const lessonClassItems = []
                                        for (let i = 0; i < lesson?.LessonClasses?.length; i++) {
                                            const lessonClassItem = lesson?.LessonClasses[i]
                                            lessonClassItems.push(
                                                <li key={lessonClassItem.classId}>{lessonClassItem.className}</li>
                                            )
                                        }
                                        return lessonClassItems
                                    })()}
                                </ul>

                            </div> :
                            <div>
                                <ul>This lesson has not been assigned to any classes</ul>
                            </div>
                        }
                        {lesson.lessonImg ?
                            <img
                                src={lesson.lessonImg}
                                className='lessonImg'
                            /> :
                            <img
                                src="../images/placeholder.jpeg"
                                className="clsImg"
                            />
                        }

                        <h3>Lesson Description: <p>{lesson.description}</p></h3>


                        <h3>Lesson Description: </h3>
                        <p>{lesson.description}</p>
                    </div>
                    <div className='lessonContent'>
                        <p>Lesson Content: </p>
                        <p>{lesson.lessonContent}</p>
                    </div>
                    <div className='lessonDetailsButtons'>
                        {lesson.LessonTeacherUserId === user.id && (
                            <>
                                <div className='editLessonButton'>
                                    <button className="addLessonButton">
                                        <Link to={`/lessons/${lessonId}/edit`} className='editLessonLink'>Edit Lesson </Link>
                                    </button>
                                    {/* <OpenModalButton
                                        buttonText="Edit Lesson"
                                        className="editLessonButton"
                                        onButtonClick={closeMenu}
                                        modalComponent={<UpdateLessonModal lessonId={lesson.id} />}
                                    /> */}
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
                </>
            }
        </>
    )
}

export default LessonDetailsPage;
