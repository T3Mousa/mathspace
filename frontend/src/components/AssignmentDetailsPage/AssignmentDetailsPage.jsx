import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAssignmentDetails } from '../../redux/assignments';
import './AssignmentDetailsPage.css'
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
// import UpdateLessonModal from '../UpdateLessonModal';
import DeleteLessonModal from '../DeleteLessonModal';

const AssignmentDetailsPage = () => {
    const { assignmentId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const assignment = useSelector(state => state?.assignments?.assignmentDeets)
    // console.log(assignment)
    const assignmentClasses = assignment?.AssignmentClasses
    // console.log(assignmentClasses)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        dispatch(getAssignmentDetails(assignmentId)).then(() => setIsLoaded(true))
    }, [dispatch, assignmentId, isLoaded])

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
        <div className='assignmentDetailsContainer'>
            {isLoaded &&
                <>
                    <div className='assignmentDetailsHeading'>
                        <img
                            src="../images/assignment_image.png"
                            className="assignmentImg"
                        />
                        <h2 className='assignmentTitle'>

                            Assignment Title: {assignment.title}
                        </h2>
                        <p>
                            Created By: {assignment.AssignmentTeacherFirstName} {assignment.AssignmentTeacherLastName}
                        </p>
                        <p>Classes Assigned To:</p>
                        {assignment?.AssignmentClasses ?
                            <div className='assignmentClassList'>
                                <ul>
                                    {(() => {
                                        const assignmentClassItems = []
                                        for (let i = 0; i < assignment?.AssignmentClasses?.length; i++) {
                                            const assignmentClassItem = assignment?.AssignmentClasses[i]
                                            assignmentClassItems.push(
                                                <li key={assignmentClassItem.classId}>{assignmentClassItem.className}</li>
                                            )
                                        }
                                        // console.log(assignmentClassItems)
                                        return assignmentClassItems
                                    })()}
                                </ul>

                            </div> :
                            <div>
                                <ul>This assignment has not been assigned to any classes</ul>
                            </div>
                        }


                        {/* <h3>Assignment Description: <p>{assignment.description}</p></h3> */}


                        <h3>Assignment Description: </h3>
                        <p>{assignment.description}</p>
                        <h3>Assignment Content: </h3>
                        <p>{assignment.assignmentContent}</p>
                    </div>
                    {/* <div className='assignmentContent'>
                    </div> */}
                    <div className='assignmentDetailsButtons'>
                        {assignment.AssignmentTeacherUserId === user.id && (
                            <>
                                <div className='editAssignmentButton'>
                                    <button className="editAssignmentButton">
                                        <Link to={`/assignments/${assignmentId}/edit`} className='editAssignmentLink'>Edit Assignment </Link>
                                    </button>
                                    {/* <OpenModalButton
                                        buttonText="Edit Lesson"
                                        className="editLessonButton"
                                        onButtonClick={closeMenu}
                                        modalComponent={<UpdateLessonModal lessonId={lesson.id} />}
                                    /> */}
                                </div>
                                <div className='deleteAssignmentButton'>
                                    <OpenModalButton
                                        buttonText="Delete Assignment"
                                        onButtonClick={closeMenu}
                                        modalComponent={<DeleteLessonModal assignment={assignment} />}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </>
            }
        </div>
    )
}

export default AssignmentDetailsPage;
