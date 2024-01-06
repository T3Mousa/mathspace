import { deleteLesson } from "../../redux/lessons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './DeleteLesson.css'

function DeleteLessonModal({ lessonId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const confirmDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteLesson(lessonId))
            .then(navigate('/lessons'))
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
                <button className='deleteLessonButton' onClick={confirmDelete}>
                    Yes (Delete Lesson)
                </button>
                <button className='cancelDeleteLessonButton' onClick={cancelDelete}>
                    No (Keep Lesson)
                </button>
            </div>
        </div>
    )
}

export default DeleteLessonModal;
