import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getClassDetails } from '../../redux/classes';
import './ClassDetailsPage.css'
import { getAllClassLessons } from '../../redux/lessons';
import CreateNewLessonModal from '../CreateNewLessonModal/CreateNewLessonModal';
import OpenModalButton from '../OpenModalButton/OpenModalButtton';


const ClassDetailsPage = () => {
    const { classId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const cls = useSelector(state => state?.classes?.classDeets)
    const clsLessons = useSelector(state => state?.lessons?.allClassLessons)
    // console.log(clsLessons)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        dispatch(getClassDetails(classId)).then(() => dispatch(getAllClassLessons(classId))).then(() => setIsLoaded(true))
    }, [dispatch, classId, isLoaded])

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

    const handleLessonSelection = (e) => {
        const lessonId = parseInt(e.target.value)
        // console.log(lessonId)
        const selected = clsLessons.find((lesson) => lesson.id === lessonId)

        setSelectedLesson(selected)
    }

    return (
        <>
            {isLoaded && cls?.id &&
                <>
                    <div className='classDetailsHeading'>
                        <h2>{cls.classImg}</h2>
                        <h2>{cls.name}</h2>
                        {user.userRole === "teacher" &&
                            <p className='classRoster'>
                                Class Roster: {cls.Students.length} students
                            </p>
                        }
                        <h3>{cls.description}</h3>
                    </div>
                    <p>
                        {user.userRole === "teacher" &&
                            <>
                                {/* <button>
                                    Create New Lesson
                                </button> */}
                                <div className="createLessonButton">
                                    <OpenModalButton
                                        buttonText='Create a New Lesson'
                                        onButtonClick={closeMenu}
                                        modalComponent={<CreateNewLessonModal classId={cls.id} />}
                                    />
                                </div>
                            </>
                        }
                    </p>
                    <p>
                        <label>
                            Class Lessons:
                            <select
                                value={selectedLesson ? selectedLesson.id : ''}
                                onChange={handleLessonSelection}
                            >
                                <option value="" disabled>Select a lesson...</option>
                                {clsLessons?.map((lesson) => (
                                    <option key={lesson.id} value={lesson.id}>
                                        {lesson.title}
                                    </option>
                                )
                                )}
                            </select>
                        </label>
                    </p>
                    {selectedLesson &&
                        <div>
                            <p>Title: {selectedLesson.title}</p>
                            <p>Description: {selectedLesson.description}</p>
                            <NavLink to={`/lessons/${selectedLesson.id}`}>
                                Go to lesson details page <i className="fa-solid fa-arrow-right"></i>
                            </NavLink>
                        </div>}

                </>
            }
        </>
    )
}

export default ClassDetailsPage
