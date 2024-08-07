import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, NavLink } from 'react-router-dom';
// import { format } from 'date-fns';
import { getAssignmentDetails } from '../../redux/assignments';
import './AssignmentDetailsPage.css'
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import DeleteAssignmentModal from '../DeleteAssignmentModal';
import AssignmentPDFViewer from './AssignmentPDFViewer';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

const AssignmentDetailsPage = () => {
    const { assignmentId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
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
    // console.log(formattedDueDate)
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

    // Function to check if a string is a valid image URL
    const isAssignmentContentImage = (url) => {
        // Regex to match common image file extensions
        const imageExtensions = /\.(jpeg|jpg|gif|png|bmp)$/i;
        return imageExtensions.test(url);
    };

    const isAssignmentContentFile = (url) => {
        // Regex to match common image file extensions
        const fileExtensions = /\.(pdf)$/i;
        return fileExtensions.test(url);
    };

    return (
        <div className='assignmentDetailsContainer'>
            {isLoaded &&
                <>
                    <div className='assignmentDetailsHeading'>
                        <img
                            src="../images/assignment_image.png"
                            className="assignment image"
                        />
                        <div className='assignmentDetailsButtons'>
                            {assignment?.AssignmentTeacherUserId === user.id && (
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
                                <span>Assignment Title: </span> {assignment?.title}
                            </p>
                        </div>
                        <div className='subHeading'>
                            <p className='assignmentDetailsLabel'>
                                <span>Created By:</span> {assignment?.AssignmentTeacherFirstName} {assignment?.AssignmentTeacherLastName}
                            </p>
                            {assignment?.AssignmentTeacherUserId === user.id &&
                                <div className='assignmentDetailsLabel'>
                                    <p className='assignmentDetailsLabel'>
                                        <span>Classes Assigned To:</span>
                                    </p>
                                    {assignment?.AssignmentClasses ?
                                        <ul className='assignmentClassList'>
                                            {assignment?.AssignmentClasses.map(assignmentClassItem => (
                                                <li key={assignmentClassItem.classId}>
                                                    <NavLink to={`/classes/${assignmentClassItem.classId}`} className="classLink">{assignmentClassItem.className}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                        :
                                        <ul className='assignmentClassList'>This assignment has not been assigned to any classes</ul>
                                    }
                                </div>
                            }
                            {assignment?.AssignmentTeacherUserId === user.id &&
                                <p className='assignmentDetailsLabel'>
                                    <span>Due:</span>  {formattedDueDate}
                                </p>
                            }
                        </div>
                    </div>

                    <div className='assignmentDetailsContent'>
                        <h3>Assignment Description: </h3>
                        <p>{assignment?.description}</p>
                        <h3>Assignment Content: </h3>
                        {/* <p>{assignment.assignmentContent}</p> */}
                        {isAssignmentContentImage(assignment?.assignmentContent) &&
                            <div className='imageViewer'>
                                <a className="assignmentContentLink" href={assignment?.assignmentContent}>Download Assignment Content</a>
                                <img
                                    src={assignment?.assignmentContent}
                                    alt="Assignment content is not available"
                                />
                            </div>
                        }

                        {isAssignmentContentFile(assignment?.assignmentContent) &&
                            <div className='pdfViewer'>
                                <a className="assignmentContentLink" href={assignment?.assignmentContent}>Download Assignment Content</a>
                                <AssignmentPDFViewer url={assignment?.assignmentContent} />
                            </div>
                        }
                        {!isAssignmentContentImage(assignment?.assignmentContent) && !isAssignmentContentFile(assignment?.assignmentContent) &&
                            <p>{assignment?.assignmentContent}</p>
                        }
                    </div>

                </>
            }
        </div >
    )
}

export default AssignmentDetailsPage;
