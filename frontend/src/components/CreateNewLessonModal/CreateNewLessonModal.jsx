import { useState } from "react";
import { addNewLesson } from "../../redux/lessons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './CreateNewLesson.css'

function CreateNewLessonModal({ classId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [lessonImg, setLessonImg] = useState("")
    const [description, setDescription] = useState("")
    const [lessonContent, setLessonContent] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || lessonImg.startsWith(" ") || lessonContent.startsWith(" "))

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const newLessonInfo = {
            title,
            lessonImg,
            description,
            lessonContent
        }

        let errorsObj = {}
        if (!title) errorsObj.title = "Lesson title is required"
        if (title.startsWith(" ")) errorsObj.name = "Lesson title cannot begin with an empty space"
        if (!description) errorsObj.description = "Lesson description is required"
        if (description.startsWith(" ")) errorsObj.description = "Lesson description cannot begin with an empty space"
        if (lessonImg && !lessonImg.endsWith('.png') && !lessonImg.endsWith('.jpg') && !lessonImg.endsWith('.jpeg')) errorsObj.lessonImg = "Lesson image URL must end in .png, .jpg, .jpeg"
        if (lessonContent.startsWith(" ")) errorsObj.lessonContent = "Lesson content cannot begin with an empty space"


        if (Object.values(errorsObj).length) {
            setErrors(errorsObj)
        } else {
            let newLesson = await dispatch(addNewLesson(classId, newLessonInfo))
            if (newLesson?.id) navigate(`/lessons/${newLesson.id}`)
            closeModal()

        }
    };

    return (
        <>
            <form className="createLessonForm" onSubmit={handleSubmit}>
                <h1>Create a New Lesson</h1>
                <label>
                    Lesson Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter lesson title"
                    />
                </label>
                {errors.title && <p>{errors.title}</p>}
                {title.startsWith(" ") && <p>Lesson title cannot begin with an empty space</p>}
                <label>
                    Lesson Image (optional)
                    <input
                        type="text"
                        value={lessonImg}
                        onChange={(e) => {
                            if (!e.target.value) {
                                setLessonImg("/images/placeholder.jpeg")
                            } else {
                                setLessonImg(e.target.value)
                            }
                        }
                        }
                        placeholder="Lesson image url"
                    />
                </label>
                {lessonImg.startsWith(" ") && <p>Lesson image URL cannot begin with an empty space</p>}
                <label>
                    Lesson Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Enter lesson description"
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                {description.startsWith(" ") && <p>Lesson description cannot begin with an empty space</p>}
                <label>
                    Lesson Content (optional)
                    <textarea
                        type="text"
                        value={lessonContent ? lessonContent : null}
                        onChange={(e) => setLessonContent(e.target.value)}
                        placeholder="Lesson content"
                    />
                </label>
                {lessonContent.startsWith(" ") && <p>Lesson content cannot begin with an empty space</p>}
                <button onClick={closeModal}>Cancel</button>
                <button type="submit" disabled={submitDisabled}>Add Lesson</button>
            </form>
        </>
    )
}

export default CreateNewLessonModal;
