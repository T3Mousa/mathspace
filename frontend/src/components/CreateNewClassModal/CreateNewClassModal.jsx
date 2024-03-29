import { useState } from "react";
import { addNewClass, getAllClasses } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './CreateNewClass.css'

function CreateNewClassModal() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [classImg, setClassImg] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const submitDisabled = (name.startsWith(" ") || description.startsWith(" ") || classImg.startsWith(" "))

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const newClassInfo = {
            name,
            classImg,
            description
        }

        let errorsObj = {}
        if (!name) errorsObj.name = "Class name is required"
        if (name.startsWith(" ")) errorsObj.name = "Class name cannot begin with an empty space"
        if (!description) errorsObj.description = "Class description is required"
        if (description.startsWith(" ")) errorsObj.description = "Class description cannot begin with an empty space"
        if (classImg && !classImg.endsWith('.png') && !classImg.endsWith('.jpg') && !classImg.endsWith('.jpeg')) errorsObj.classImg = "Class image URL must end in .png, .jpg, .jpeg"


        if (Object.values(errorsObj).length) {
            setErrors(errorsObj)
        } else {
            let newClass = await dispatch(addNewClass(newClassInfo))
            if (newClass?.id) {
                await dispatch(getAllClasses())
                navigate('/my-classes')
            }
            closeModal()

        }
    };

    return (
        <>
            <form className="createClassForm" onSubmit={handleSubmit}>
                <h1>Create a Class</h1>
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
                {errors.name && <p className="errors">{errors.name}</p>}
                {name.startsWith(" ") && <p className="errors">Class name cannot begin with an empty space</p>}
                <label>
                    Class Image (optional)
                    <input
                        type="text"
                        value={classImg}
                        onChange={(e) => setClassImg(e.target.value)}
                        placeholder="Class image url"
                    />
                </label>
                {errors.classImg && <p className="errors">{errors.classImg}</p>}
                {classImg.startsWith(" ") && <p className="errors">Class image URL cannot begin with an empty space</p>}
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
                {errors.description && <p className="errors">{errors.description}</p>}
                {description.startsWith(" ") && <p className="errors">Class description cannot begin with an empty space</p>}
                <button onClick={closeModal}>Cancel</button>
                <button type="submit" disabled={submitDisabled}>Add Class</button>
            </form>
        </>
    );
}

export default CreateNewClassModal;
