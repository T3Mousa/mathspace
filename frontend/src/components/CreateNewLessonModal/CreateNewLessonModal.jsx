import React, { useState } from "react";
import { addNewLesson, getAllUserLessons } from "../../redux/lessons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import Select from "react-select";
import './CreateNewLesson.css'
import { getAllClasses } from "../../redux/classes";
// import { getAllClasses } from "../../redux/classes";

function CreateNewLessonModal({ teacherClasses }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [lessonImg, setLessonImg] = useState("")
    const [description, setDescription] = useState("")
    const [lessonContent, setLessonContent] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([])
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    // console.log(teacherClasses)

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || lessonImg.startsWith(" ") || lessonContent.startsWith(" "))

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const newLessonInfo = {
            title,
            lessonImg,
            description,
            lessonContent,
            selectedClasses
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
            const newLesson = await dispatch(addNewLesson(newLessonInfo))
            await dispatch(getAllClasses())
            await dispatch(getAllUserLessons())
            if (newLesson?.id) await navigate(`/my-lessons`)
            await closeModal()

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
                {errors.title && <p className="errors">{errors.title}</p>}
                {title.startsWith(" ") && <p className="errors">Lesson title cannot begin with an empty space</p>}
                <label>
                    Lesson Image (optional)
                    <input
                        type="text"
                        value={lessonImg}
                        onChange={(e) => setLessonImg(e.target.value)}
                        placeholder="Lesson image url"
                    />
                </label>
                {errors.lessonImg && <p className="errors">{errors.lessonImg}</p>}
                {lessonImg.startsWith(" ") && <p className="errors">Lesson image URL cannot begin with an empty space</p>}
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
                {errors.description && <p className="errors">{errors.description}</p>}
                {description.startsWith(" ") && <p className="errors">Lesson description cannot begin with an empty space</p>}
                <label>
                    Lesson Content (optional)
                    <textarea
                        type="text"
                        value={lessonContent ? lessonContent : ""}
                        onChange={(e) => setLessonContent(e.target.value)}
                        placeholder="Lesson content"
                    />
                </label>
                {errors.lessonContent && <p className="errors">{errors.lessonContent}</p>}
                {lessonContent.startsWith(" ") && <p className="errors">Lesson content cannot begin with an empty space</p>}
                <label>
                    Select Classes (to add the lesson to):
                    <Select
                        value={selectedClasses}
                        options={teacherClasses.map(cls => ({ key: cls.id, value: cls.id, label: cls.name }))}
                        isMulti
                        onChange={(selectedOptions) => {
                            // console.log(selectedOptions)
                            setSelectedClasses(selectedOptions)
                        }
                        }
                    />
                    {/* <option value="" className="classOptions">Select classes to add the lesson to...</option> */}


                    {/* </select> */}
                </label>

                <button onClick={closeModal}>Cancel</button>
                <button type="submit" disabled={submitDisabled}>Add Lesson</button>
            </form>
        </>
    )
}

export default CreateNewLessonModal;
