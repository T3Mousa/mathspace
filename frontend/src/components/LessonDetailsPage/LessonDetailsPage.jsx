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
    console.log(lessonId)
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
                        <img src={lesson?.lessonImg} alt={lesson.title} />
                        <h2>{lesson.title}</h2>
                        <h3>{lesson.description}</h3>

                    </div>
                    <div className='lessonContent'>
                        {lesson.lessonContent.data.map((content, idx) => (
                            <div key={idx}>
                                {content}
                            </div>
                        ))}
                    </div>
                    {lesson.Class.Teacher.userId === user.id && (
                        <>
                            {/* <button>Edit Lesson</button> */}
                            <OpenModalButton
                                buttonText="Edit Lesson"
                                onButtonClick={closeMenu}
                                modalComponent={<UpdateLessonModal lessonId={lesson.id} />}
                            />
                            {/* <button>Delete Lesson</button> */}
                            <OpenModalButton
                                buttonText="Delete Lesson"
                                onButtonClick={closeMenu}
                                modalComponent={<DeleteLessonModal lessonId={lesson.id} />}
                            />
                        </>
                    )}
                </>
            }
        </>
    )
}

export default LessonDetailsPage;
