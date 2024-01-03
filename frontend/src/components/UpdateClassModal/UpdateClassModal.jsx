import { useEffect, useState } from "react";
import { editClass, getAllClasses } from "../../redux/classes";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './UpdateClass.css'

function UpdateClassModal({ classId }) {
    // const { classId } = useParams()
    // console.log(classId)
    // const classId = cls.id
    // console.log(+classId)
    const dispatch = useDispatch()
    const classToEdit = useSelector(state => state?.classes?.allClassesById[+classId])
    console.log(classToEdit)
    const [name, setName] = useState("")
    const [classImg, setClassImg] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)
    const { closeModal } = useModal()

    const errorsObject = {}
    useEffect(() => {
        if (!name) errorsObject.name = "Class name is required"
        if (!description) errorsObject.description = "Class description is required"
        if (classImg && (!classImg.endsWith('.png') && !classImg.endsWith('.jpg') && !classImg.endsWith('.jpeg'))) errorsObject.classImg = "Class image URL must end in .png, .jpg, or .jpeg"

        setErrors(errorsObject)
        setIsFormValid(Object.keys(errorsObject.length === 0))
    }, [name, description, classImg])

    useEffect(() => {
        if (classToEdit) {
            setName(classToEdit.name || "")
            setClassImg(classToEdit.classImg || "")
            setDescription(classToEdit.description || "")
        }
    }, [classToEdit])

    // const validateForm = () => {
    //     const errorsObject = {}
    //     if (!name) errorsObject.name = "Class name is required"
    //     if (!description) errorsObject.description = "Class description is required"
    //     if (classImg && (!classImg.endsWith('.png') && !classImg.endsWith('.jpg') && !classImg.endsWith('.jpeg'))) errorsObject.classImg = "Class image URL must end in .png, .jpg, or .jpeg"

    //     setErrors(errorsObject)
    //     setIsFormValid(Object.keys(errorsObject.length === 0))
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const classInfo = {
            name,
            classImg,
            description
        }

        await dispatch(editClass(+classId, classInfo))
            .then(() => {

                closeModal()
                dispatch(getAllClasses())
            })
    };


    return (
        <>
            <h1>Edit Class</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Class Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <label>
                    Class Image
                    <input
                        type="text"
                        value={classImg}
                        onChange={(e) => setClassImg(e.target.value)}
                    />
                </label>
                {errors.classImg && <p>{errors.classImg}</p>}
                <label>
                    Class Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <button onClick={closeModal}>Cancel</button>
                <button type="submit" disabled={!isFormValid}>Save</button>
            </form>
        </>
    );
}

export default UpdateClassModal;
