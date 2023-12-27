// import { useEffect, useState } from "react";
import { deleteClass } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteClass.css'

function DeleteClassModal({ classId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const confirmDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteClass(classId))
            .then(closeModal)
    };

    const cancelDelete = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="deleteClassForm">
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this class?</h3>
            <div className='deleteClassModalButtons'>
                <button className='deleteClassButton' onClick={confirmDelete}>
                    Yes (Delete Class)
                </button>
                <button className='cancelDeleteClassButton' onClick={cancelDelete}>
                    No (Keep Class)
                </button>
            </div>
        </div>
    )
}

export default DeleteClassModal;
