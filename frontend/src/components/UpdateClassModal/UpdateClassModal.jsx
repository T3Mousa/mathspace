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
    const [newClassImg, setNewClassImg] = useState(null)
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const submitDisabled = (name.startsWith(" ") || description.startsWith(" "))

    useEffect(() => {
        if (classToEdit) {
            setName(classToEdit.name || "")
            setClassImg(classToEdit.classImg || "")
            setDescription(classToEdit.description || "")
        }
    }, [classToEdit])

    const [showUpload, setShowUpload] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const classInfo = {
            name,
            // classImg,
            description
        }

        let class_image;
        if (newClassImg) {
            class_image = newClassImg
        } else {
            class_image = classImg
        }
        const form = { class_image }
        const clsImg = class_image.name

        const errorsObject = {}
        if (!name) errorsObject.name = "Class name is required"
        if (name.startsWith(" ")) errorsObject.name = "Class name cannot begin with an empty space"
        if (!description) errorsObject.description = "Class description is required"
        if (description.startsWith(" ")) errorsObject.description = "Class description cannot begin with an empty space"
        if (clsImg && (!clsImg.endsWith('.png') && !clsImg.endsWith('.jpg') && !clsImg.endsWith('.jpeg'))) errorsObject.classImg = "Class image URL must end in .png, .jpg, or .jpeg"

        if (Object.values(errorsObject).length) {
            setErrors(errorsObject)
        } else {

            await dispatch(editClass(+classId, classInfo, form))
                .then(() => {

                    dispatch(getAllClasses())
                    closeModal()
                })
        }
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        setNewClassImg(file);
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
                {classImg && classImg.endsWith('.png') && (
                    <div className="existingClassImage">
                        <h4>Existing Class Image:</h4>
                        <img src={classImg} alt="Class image file not available" />
                    </div>
                )}
                {classImg && classImg.endsWith('.jpg') && (
                    <div className="existingClassImage">
                        <h4>Existing Class Image:</h4>
                        <img src={classImg} alt="Class image file not available" />
                    </div>
                )}
                {classImg && classImg.endsWith('.jpeg') && (
                    <div className="existingClassImage">
                        <h4>Existing Class Image:</h4>
                        <img src={classImg} alt="Class image file not available" />
                    </div>
                )}
                {showUpload && (
                    <label htmlFor='file-upload'>
                        Class Image (choose a new image or skip to keep the exisitng class image):
                        <input
                            type="file"
                            id='file-upload'
                            accept=".jpg, .png, .jpeg"
                            onChange={handleImageFileChange}
                        />
                    </label>
                )}
                {errors.classImg && <p className='errors'>{errors.classImg}</p>}

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
                <div className="editClassModalButtons">
                    <button type="submit" disabled={submitDisabled}>Save</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default UpdateClassModal;
