import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, NavLink } from 'react-router-dom';
// import { format } from 'date-fns';
import { getAssignmentDetails } from '../../redux/assignments';
import './AssignmentDetailsPage.css'
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import DeleteAssignmentModal from '../DeleteAssignmentModal';

const AssignmentDetailsPage = () => {
    const { assignmentId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const assignment = useSelector(state => state?.assignments?.assignmentDeets)
    // console.log(assignment)
    const dueDate = new Date(assignment?.dueDate);
    // console.log(dueDate)
    const formattedDueDate = dueDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        weekday: 'short',
        timeZone: 'UTC'
    });
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
                        <div className='assignmentDetailsButtons'>
                            {assignment.AssignmentTeacherUserId === user.id && (
                                <>
                                    <div className='editAssignmentButton'>
                                        <button className="editAssignmentButton">
                                            <Link to={`/assignments/${assignmentId}/edit`} className='editAssignmentLink'>Edit Assignment </Link>
                                        </button>
                                    </div>
                                    <div className='deleteAssignmentButton'>
                                        <OpenModalButton
                                            buttonText="Delete Assignment"
                                            onButtonClick={closeMenu}
                                            modalComponent={<DeleteAssignmentModal assignment={assignment} />}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='assignmentDetails'>
                        <div className='assignmentTitle'>
                            <p className='assignmentDetailsLabel'>
                                <span>Assignment Title: </span> {assignment.title}
                            </p>
                        </div>
                        <div className='subHeading'>
                            <p className='assignmentDetailsLabel'>
                                <span>Created By:</span> {assignment.AssignmentTeacherFirstName} {assignment.AssignmentTeacherLastName}
                            </p>
                            {assignment.AssignmentTeacherUserId === user.id &&
                                <div className='assignmentDetailsLabel'>
                                    <p className='assignmentDetailsLabel'>
                                        <span>Classes Assigned To:</span>
                                    </p>
                                    {assignment?.AssignmentClasses ?
                                        <ul className='assignmentClassList'>
                                            {(() => {
                                                const assignmentClassItems = []
                                                for (let i = 0; i < assignment?.AssignmentClasses?.length; i++) {
                                                    const assignmentClassItem = assignment?.AssignmentClasses[i]
                                                    assignmentClassItems.push(
                                                        <li key={assignmentClassItem.classId}>
                                                            <NavLink to={`/classes/${assignmentClassItem.classId}`} className="classLink">{assignmentClassItem.className}</NavLink>
                                                        </li>
                                                    )
                                                }
                                                return assignmentClassItems
                                            })()}
                                        </ul> :
                                        <ul className='assignmentClassList'>This assignment has not been assigned to any classes</ul>
                                    }
                                </div>
                            }
                            {assignment.AssignmentTeacherUserId === user.id &&
                                <p className='assignmentDetailsLabel'>
                                    <span>Due:</span>  {formattedDueDate}
                                </p>
                            }
                        </div>
                    </div>

                    <div className='assignmentDetailsContent'>
                        <h3>Assignment Description: </h3>
                        <p>{assignment.description}</p>
                        <h3>Assignment Content: </h3>
                        <p>{assignment.assignmentContent}</p>

                    </div>

                </>
            }
        </div >
    )
}

export default AssignmentDetailsPage;
