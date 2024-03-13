import React, { useEffect, useState } from "react";
import { addNewLesson, getAllUserLessons } from "../../redux/lessons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import './CreateLessonForm.css'
import { getAllClasses } from "../../redux/classes";

function CreateLessonFormPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [lessonImg, setLessonImg] = useState("")
    const [description, setDescription] = useState("")
    const [lessonContent, setLessonContent] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllClasses()).then(dispatch(getAllUserLessons())).then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    const teacherClasses = useSelector(state => state?.classes?.allClasses)

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
            if (newLesson?.id) navigate('/my-lessons')
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
                        options={teacherClasses?.map(cls => ({ key: cls.id, value: cls.id, label: cls.name }))}
                        isMulti
                        onChange={(selectedOptions) => {
                            // console.log(selectedOptions)
                            setSelectedClasses(selectedOptions)
                        }
                        }
                    />
                </label>

                <button onClick={() => navigate('/my-lessons')}>Cancel</button>
                <button type="submit" disabled={submitDisabled}>Add Lesson</button>
            </form>
        </>
    )
}

export default CreateLessonFormPage;
