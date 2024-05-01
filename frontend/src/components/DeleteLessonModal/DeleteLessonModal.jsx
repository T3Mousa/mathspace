import { deleteLesson, getAllUserLessons } from "../../redux/lessons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './DeleteLesson.css'

function DeleteLessonModal({ lesson }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const confirmDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteLesson(lesson.id))
            .then(dispatch(getAllUserLessons()))
            .then(navigate('/my-lessons'))
            .then(closeModal)
    };

    const cancelDelete = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="deleteLessonForm">
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this lesson?</h3>
            <p>Deleting the lesson will remove the lesson from your account and all classes that it has been assigned to.</p> <p style={{ fontWeight: 'bold' }}>This cannot be undone!</p>
            <p style={{ marginLeft: '40px', marginRight: '40px' }}>If you would like to keep the lesson but delete it from some or all classes it has been assigned to, go to the lesson details page and click &quot;Edit Lesson&quot;.</p>
            <div className='deleteLessonModalButtons'>
                <button className='deleteLessonModalButton' onClick={confirmDelete}>
                    Yes (Delete Lesson)
                </button>
                <button className='cancelDeleteLessonModalButton' onClick={cancelDelete}>
                    No (Keep Lesson)
                </button>
            </div>
        </div>
    )
}

export default DeleteLessonModal;
