import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLessonDetails } from '../../redux/lessons';
import './LessonDetailsPage.css'
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import UpdateLessonModal from '../UpdateLessonModal';
import DeleteLessonModal from '../DeleteLessonModal';

const LessonDetailsPage = () => {
    const { lessonId } = useParams()
    // console.log(lessonId)
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const lesson = useSelector(state => state?.lessons?.lessonDeets)
    // console.log(lesson)
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

                        <h3>Lesson Description: </h3>
                        <p>{lesson.description}</p>
                    </div>
                    <div className='lessonContent'>
                        Lesson Content:
                        <p>{lesson.lessonContent}</p>
                    </div>
                    <div className='lessonDetailsButtons'>
                        {lesson.Class.Teacher.userId === user.id && (
                            <>
                                <div className='editLessonButton'>
                                    <OpenModalButton
                                        buttonText="Edit Lesson"
                                        className="editLessonButton"
                                        onButtonClick={closeMenu}
                                        modalComponent={<UpdateLessonModal lessonId={lesson.id} />}
                                    />
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
