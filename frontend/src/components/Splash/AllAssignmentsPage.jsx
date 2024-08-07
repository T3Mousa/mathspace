import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllAssignments } from '../../redux/assignments';

const AllAssignmentsPage = () => {
    const dispatch = useDispatch()
    const allAssignments = useSelector(state => state?.assignments?.allAssignments)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllAssignments()).then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    return (
        <>
            {isLoaded &&
                <div className='allAssignmentsContainer'>
                    {allAssignments?.map(assignment => (
                        <div className='assignmentsTile' key={assignment.id}>
                            <NavLink className="assignmentTileLink" to={`/assignments/${assignment.id}`} key={assignment.id}>
                                <div className='assignmentTileImage'>
                                    <img src="../images/assignment_image.png" alt="assignment image" />
                                </div>
                                <div className='assignmentTileInfo'>
                                    <h4 className='assignmentTitle'>{assignment.title} </h4>
                                    <h5>Created By: {assignment.AssignmentTeacherFirstName} {assignment.AssignmentTeacherLastName}</h5>
                                    <p>{assignment.description}</p>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            }
        </>
    )
};

export default AllAssignmentsPage;
