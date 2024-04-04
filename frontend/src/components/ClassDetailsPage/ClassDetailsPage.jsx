import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getClassDetails } from '../../redux/classes';
import './ClassDetailsPage.css'
import { getAllClassLessons } from '../../redux/lessons';
import { getAllClassAssignments } from '../../redux/assignments';


const ClassDetailsPage = () => {
    const { classId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const cls = useSelector(state => state?.classes?.classDeets)
    const clsLessons = useSelector(state => state?.lessons?.allClassLessons)
    // console.log(clsLessons)
    const clsAssignments = useSelector(state => state?.assignments?.allClassAssignments)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [selectedAssignment, setSelectedAssignment] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        dispatch(getClassDetails(classId)).then(() => dispatch(getAllClassLessons(classId))).then(() => dispatch(getAllClassAssignments(classId))).then(() => setIsLoaded(true))
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

    const handleAssignmentSelection = (e) => {
        const assignmentId = parseInt(e.target.value)

        const selected = clsAssignments.find((assignment) => assignment.id === assignmentId)

        setSelectedAssignment(selected)
    }

    return (
        <>
            {isLoaded && cls?.id &&
                <>
                    <div className='classDetailsHeading'>
                        <div className='classNameRoster'>
                            <h2>{cls.name}</h2>
                            {user.userRole === "teacher" &&
                                <h3 className='classRoster'>
                                    Class Roster: {cls.Students.length} students
                                </h3>
                            }
                        </div>
                        <div className="classImageDesc">
                            {cls.classImg ?
                                <img
                                    src={cls.classImg}
                                    className="clsImg"
                                /> :
                                <img
                                    src="../images/placeholder.jpeg"
                                    className="clsImg"
                                />
                            }
                            <div>
                                <h4>Class Description:</h4>
                                <p>{cls.description}</p>
                            </div>
                        </div>
                    </div>

                    <p>
                        <div className='lessonDropDownList'>
                            <label>
                                Class Lessons:
                                <select
                                    value={selectedLesson ? selectedLesson.id : ''}
                                    onChange={handleLessonSelection}
                                >
                                    <option value="" disabled className='lessonOption'>Select a lesson...</option>
                                    {clsLessons?.map((lesson) => (
                                        <option key={lesson.id} value={lesson.id} className='lessonOption'>
                                            {lesson.title}
                                        </option>
                                    )
                                    )}
                                </select>
                            </label>
                        </div>
                    </p>
                    {selectedLesson &&
                        <div className='selectedLesson'>
                            <p>Title: {selectedLesson.title}</p>
                            <p>Description: {selectedLesson.description}</p>
                            <NavLink to={`/lessons/${selectedLesson.id}`} className="lessonLink">
                                Go to lesson details page <i className="fa-solid fa-arrow-right"></i>
                            </NavLink>
                        </div>}

                    <p>
                        <div className='assignmentDropDownList'>
                            <label>
                                Class Assignments:
                                <select
                                    value={selectedAssignment ? selectedAssignment.id : ''}
                                    onChange={handleAssignmentSelection}
                                >
                                    <option value="" disabled className='assignmentOption'>Select an assignment...</option>
                                    {clsAssignments?.map((assignment) => (
                                        <option key={assignment.id} value={assignment.id} className='assignmentOption'>
                                            {assignment.title}
                                        </option>
                                    )
                                    )}
                                </select>
                            </label>
                        </div>
                    </p>
                    {selectedAssignment &&
                        <div className='selectedAssignment'>
                            <p>Title: {selectedAssignment.title}</p>
                            <p>Description: {selectedAssignment.description}</p>
                            <NavLink to={`/assignments/${selectedAssignment.id}`} className="assignmentLink">
                                Go to assignment details page <i className="fa-solid fa-arrow-right"></i>
                            </NavLink>
                        </div>}

                </>
            }
        </>
    )
}

export default ClassDetailsPage
