import { useEffect, useState } from "react";
import { editLesson, getLessonDetails } from "../../redux/lessons";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import './UpdateLesson.css'

function UpdateLessonModal({ lessonId }) {
    // const { lessonId } = useParams()
    // console.log(lessonId)
    const dispatch = useDispatch()
    const lessonToEdit = useSelector(state => state?.lessons?.lessonDeets)
    // console.log(lessonToEdit)
    const [title, setTitle] = useState("")
    const [lessonImg, setLessonImg] = useState("")
    const [description, setDescription] = useState("")
    const [lessonContent, setLessonContent] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getLessonDetails(lessonId))
    }, [dispatch, lessonId])

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || lessonImg.startsWith(" ") || lessonContent.startsWith(" "))

    useEffect(() => {
        if (lessonToEdit) {
            setTitle(lessonToEdit.title || "")
            setLessonImg(lessonToEdit.lessonImg || "")
            setDescription(lessonToEdit.description || "")
            setLessonContent(lessonToEdit.lessonContent || "")
        }
    }, [lessonToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const lessonInfo = {
            title,
            lessonImg,
            description,
            lessonContent
        }

        const errorsObject = {}
        if (!title) errorsObject.title = "Lesson title is required"
        if (title.startsWith(" ")) errorsObject.title = "Lesson title cannot begin with an empty space"
        if (!description) errorsObject.description = "Lesson description is required"
        if (description.startsWith(" ")) errorsObject.description = "Lesson description cannot begin with an empty space"
        // if (lessonImg && (!lessonImg.endsWith('.png') && !lessonImg.endsWith('.jpg') && !lessonImg.endsWith('.jpeg'))) errorsObject.lessonImg = "Lesson image URL must end in .png, .jpg, or .jpeg"
        if (lessonImg.startsWith(" ")) errorsObject.lessonImg = "Lesson image URL cannot begin with an empty space"
        if (lessonContent.startsWith(" ")) errorsObject.lessonContent = "Lesson content cannot begin with an empty space"

        if (Object.values(errorsObject).length) {
            setErrors(errorsObject)
        } else {

            await dispatch(editLesson(+lessonId, lessonInfo))
                .then(() => {
                    dispatch(getLessonDetails(+lessonId))
                    closeModal()
                })
        }
    };


    return (
        <>
            <form className="editLessonForm" onSubmit={handleSubmit}>
                <h1>Edit Lesson</h1>
                <label>
                    Lesson Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.title && <p className='errors'>{errors.title}</p>}
                {title.startsWith(" ") && <p className='errors'>Lesson title cannot begin with an empty space</p>}
                <label>
                    Lesson Image (optional)
                    <input
                        type="text"
                        value={lessonImg}
                        onChange={(e) => setLessonImg(e.target.value)}
                    />
                </label>
                {/* {errors.lessonImg && <p className='errors'>{errors.lessonImg}</p>} */}
                {lessonImg.startsWith(" ") && <p className='errors'>Lesson image URL cannot begin with an empty space</p>}
                <label>
                    Lesson Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p className='errors'>{errors.description}</p>}
                {description.startsWith(" ") && <p className='errors'>Lesson description cannot begin with an empty space</p>}
                <label>
                    Lesson Content (optional)
                    <textarea
                        type="text"
                        value={lessonContent}
                        onChange={(e) => setLessonContent(e.target.value)}
                    />
                </label>
                {errors.lessonContent && <p className='errors'>{errors.lessonContent}</p>}
                {lessonContent.startsWith(" ") && <p className='errors'>Lesson content cannot begin with an empty space</p>}
                <button type="submit" disabled={submitDisabled}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </>
    );
}

export default UpdateLessonModal;
