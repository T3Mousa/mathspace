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
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const submitDisabled = (name.startsWith(" ") || description.startsWith(" "))

    //file url to send to aws
    const [classImg, setClassImg] = useState("")
    //telling us if we should show the image
    const [showUpload, setShowUpload] = useState(true);
    //img url we will load in react
    const [previewUrl, setPreviewUrl] = useState("");



    //function to get image from local
    const uploadClassImageFile = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setPreviewUrl(reader.result);
        }
        setClassImg(file);
        // setShowUpload(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const newClassInfo = {
            name,
            // classImg,
            description
        }

        const class_image = classImg
        const form = { class_image }
        const clsImg = class_image.name

        let errorsObj = {}
        if (!name) errorsObj.name = "Class name is required"
        if (name.startsWith(" ")) errorsObj.name = "Class name cannot begin with an empty space"
        if (!description) errorsObj.description = "Class description is required"
        if (description.startsWith(" ")) errorsObj.description = "Class description cannot begin with an empty space"
        if (clsImg && !clsImg.endsWith('.png') && !clsImg.endsWith('.jpg') && !clsImg.endsWith('.jpeg')) errorsObj.classImg = "Class image URL must end in .png, .jpg, .jpeg"


        if (Object.values(errorsObj).length) {
            setErrors(errorsObj)
        } else {
            let newClass = await dispatch(addNewClass(newClassInfo, form))
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
                {showUpload && (
                    <label htmlFor='file-upload'>
                        Class Image (optional):
                        <input
                            type="file"
                            id='file-upload'
                            onChange={uploadClassImageFile}
                        />
                    </label>
                )}
                {errors.classImg && <p className="errors">{errors.classImg}</p>}
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
                <div className="createClassModalButtons">
                    <button type="submit" disabled={submitDisabled}>Add Class</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default CreateNewClassModal;
