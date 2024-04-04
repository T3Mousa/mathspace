// import { deleteLesson } from "../../redux/lessons";
import { deleteAssignment, getAllUserAssignments } from "../../redux/assignments";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './DeleteAssignment.css'

function DeleteAssignmentModal({ assignment }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const confirmDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteAssignment(assignment.id))
            .then(dispatch(getAllUserAssignments()))
            .then(navigate('/my-assignments'))
            .then(closeModal)
    };

    const cancelDelete = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="deleteAssignmentForm">
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this assignment?</h3>
            <p>Deleting the assignment will remove the assignment from your account and remove it from all classes that it has been assigned to. This cannot be undone!</p>
            <p>If you would like to keep the assignment but remove it from some or all classes that it has been assigned to, go to the assignment details page and click &quot;Edit Assignment&quot;.</p>
            <div className='deleteAssignmentModalButtons'>
                <button className='deleteAssignmentModalButton' onClick={confirmDelete}>
                    Yes (Delete Assignment)
                </button>
                <button className='cancelDeleteAssignmentModalButton' onClick={cancelDelete}>
                    No (Keep Assignment)
                </button>
            </div>
        </div>
    )
}

export default DeleteAssignmentModal;
