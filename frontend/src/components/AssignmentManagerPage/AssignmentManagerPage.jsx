import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import { getAllUserAssignments } from '../../redux/assignments';
// import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import './AssignmentManagerPage.css'
// import CreateNewLessonModal from '../CreateNewLessonModal/CreateNewLessonModal';
import { getAllClasses } from '../../redux/classes';

const AssignmentManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const allUserAssignments = useSelector(state => state?.assignments?.allUserAssignments)

    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }


    useEffect(() => {
        dispatch(getAllUserAssignments()).then(() => dispatch(getAllClasses())).then(() => setIsLoaded(true))
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
                    <div className="manageAssignmentsHeader">
                        {user && user.userRole === "teacher" &&
                            <>
                                <h1>Manage Your Assignments</h1>
                                {/* <div className="addLessonButton">
                                    <OpenModalButton
                                        buttonText='Create a New Lesson'
                                        className="addClassButtonModal"
                                        onButtonClick={closeMenu}
                                        modalComponent={<CreateNewLessonModal teacherClasses={allTeacherClasses} />}
                                    />
                                </div> */}
                                <button className="addAssignmentButton">
                                    <Link to='/create-new-assignment' className='createAssignmentLink'>Create a New Assignment </Link>
                                </button>
                            </>
                        }
                        {user && user.userRole === "student" &&
                            <>
                                <h1>Your Assignments</h1>
                            </>
                        }
                    </div>
                    <div className="teacherAssignments">
                        {user && user.userRole === "teacher" && allUserAssignments &&
                            < div className='teacherAssignmentContainer'>
                                {allUserAssignments?.map(assignment => (
                                    <div className='teacherAssignmentTile' key={assignment.id}>

                                        <NavLink
                                            className="teacherAssignmentLink"
                                            to={`/assignments/${assignment.id}`}
                                            key={assignment.id}
                                        >
                                            <div className='assignmentImage'>
                                                <img src="../images/assignment_image.png" alt="assignment image" />
                                            </div>
                                            <div className='assignmentTitleAuthor'>
                                                <p>Title: {assignment.title}</p>
                                                <p>Created By: You</p>
                                                <p>Classes Assigned To:</p>
                                                {assignment.AssignmentClasses.length ?
                                                    <ul>
                                                        {(() => {
                                                            const assignmentClassItems = []
                                                            for (let i = 0; i < assignment?.AssignmentClasses?.length; i++) {
                                                                const assignmentClassItem = assignment?.AssignmentClasses[i]
                                                                assignmentClassItems.push(
                                                                    <li key={assignmentClassItem.classId}>{assignmentClassItem.className}</li>
                                                                )
                                                            }
                                                            return assignmentClassItems
                                                        })()}
                                                    </ul> :
                                                    <ul>This assignment has not been assigned to any classes</ul>
                                                }
                                                <p className='assignmentDueDate'>Due Date:
                                                    {assignment.dueDate ?
                                                        <span>
                                                            {(() => {
                                                                const assignmentDueDate = new Date(assignment.dueDate);
                                                                const formattedDueDate = assignmentDueDate.toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                    timeZone: 'UTC'
                                                                })
                                                                // console.log(formattedDueDate)
                                                                return formattedDueDate
                                                            })()}
                                                        </span> :
                                                        <span>{null}</span>
                                                    }</p>
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

export default AssignmentManagerPage;
