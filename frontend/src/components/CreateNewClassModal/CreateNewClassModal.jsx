import { useState } from "react";
import { addNewClass, getAllClasses } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './CreateNewClass.css'

function CreateNewClassModal() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [classImg, setClassImg] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault();

        const newClassInfo = {
            name,
            classImg,
            description
        }

        dispatch(addNewClass(newClassInfo))
            .then((res) => {
                // console.log(res)
                if (res.message) {
                    setErrors({ message: res.message })
                } else {
                    closeModal()
                    dispatch(getAllClasses())
                }
            })
    };

    return (
        <>
            <h1>Create a Class</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Class Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter class name"
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <label>
                    Class Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Enter class description"
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <button onClick={closeModal}>Cancel</button>
                <button type="submit">Add Class</button>
            </form>
        </>
    );
}

export default CreateNewClassModal;
