import { useEffect, useState } from "react";
import { editClass, getAllClasses } from "../../redux/classes";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './UpdateClass.css'

function UpdateClassModal({ classId }) {
    const dispatch = useDispatch()
    const classToEdit = useSelector(state => state?.classes?.allClassesById[+classId])
    // console.log(classToEdit)
    const [name, setName] = useState("")
    const [classImg, setClassImg] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const submitDisabled = (name.startsWith(" ") || description.startsWith(" ") || classImg.startsWith(" "))

    useEffect(() => {
        if (classToEdit) {
            setName(classToEdit.name || "")
            setClassImg(classToEdit.classImg || "")
            setDescription(classToEdit.description || "")
        }
    }, [classToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const classInfo = {
            name,
            classImg,
            description
        }

        const errorsObject = {}
        if (!name) errorsObject.name = "Class name is required"
        if (name.startsWith(" ")) errorsObject.name = "Class name cannot begin with an empty space"
        if (!description) errorsObject.description = "Class description is required"
        if (description.startsWith(" ")) errorsObject.description = "Class description cannot begin with an empty space"
        // if (classImg && (!classImg.endsWith('.png') && !classImg.endsWith('.jpg') && !classImg.endsWith('.jpeg'))) errorsObject.classImg = "Class image URL must end in .png, .jpg, or .jpeg"

        if (Object.values(errorsObject).length) {
            setErrors(errorsObject)
        } else {

            await dispatch(editClass(+classId, classInfo))
                .then(() => {

                    dispatch(getAllClasses())
                    closeModal()
                })
        }
    };


    return (
        <>
            <form className="editClassForm" onSubmit={handleSubmit}>
                <h1>Edit Class</h1>
                <label>
                    Class Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p className='errors'>{errors.name}</p>}
                {name.startsWith(" ") && <p className='errors'>Class name cannot begin with an empty space</p>}
                <label>
                    Class Image
                    <input
                        type="text"
                        value={classImg}
                        onChange={(e) => setClassImg(e.target.value)}
                    />
                </label>
                {/* {errors.classImg && <p className='errors'>{errors.classImg}</p>} */}
                {classImg.startsWith(" ") && <p className='errors'>Class image URL cannot begin with an empty space</p>}
                <label>
                    Class Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p className='errors'>{errors.description}</p>}
                {description.startsWith(" ") && <p className='errors'>Class description cannot begin with an empty space</p>}
                <button type="submit" disabled={submitDisabled}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </>
    );
}

export default UpdateClassModal;
