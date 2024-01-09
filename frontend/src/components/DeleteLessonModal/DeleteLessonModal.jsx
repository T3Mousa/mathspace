import { deleteLesson } from "../../redux/lessons";
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
            .then(navigate(`/classes/${lesson.classId}`))
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
