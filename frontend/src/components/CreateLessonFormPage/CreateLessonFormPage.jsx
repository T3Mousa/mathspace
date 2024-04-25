import React, { useEffect, useState } from "react";
import { addNewLesson, getAllUserLessons } from "../../redux/lessons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import './CreateLessonForm.css'
import { getAllClasses } from "../../redux/classes";

function CreateLessonFormPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [lessonImg, setLessonImg] = useState("")
    const [description, setDescription] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllClasses()).then(dispatch(getAllUserLessons())).then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    const teacherClasses = useSelector(state => state?.classes?.allClasses)

    // console.log(teacherClasses)

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || lessonImg.startsWith(" "))

    //file url to send to aws
    const [lessonContent, setLessonContent] = useState("");
    //telling us if we should show the image
    const [showUpload, setShowUpload] = useState(true);
    //img url we will load in react
    const [previewUrl, setPreviewUrl] = useState("");



    //function to get image from local

    const uploadLessonContentFile = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setPreviewUrl(reader.result);
        }
        setLessonContent(file);
        // setShowUpload(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})


        // const formData = new FormData();
        // console.log(formData)
        // formData.append('title', title);
        // console.log(formData)
        // formData.append('lessonImg', lessonImg);
        // formData.append('description', description);
        // formData.append('lessonContent', lessonContent);
        // formData.append('selectedClasses', JSON.stringify(selectedClasses))

        const newLessonInfo = {
            title,
            lessonImg,
            description,
            // lessonContent,
            selectedClasses
        }

        const lesson_content = lessonContent
        const form = { lesson_content }
        const lessCont = lesson_content.name
        // console.log(lessCont)

        let errorsObj = {}
        if (!title) errorsObj.title = "Lesson title is required"
        if (title.startsWith(" ")) errorsObj.name = "Lesson title cannot begin with an empty space"
        if (!description) errorsObj.description = "Lesson description is required"
        if (description.startsWith(" ")) errorsObj.description = "Lesson description cannot begin with an empty space"
        if (lessCont && !lessCont.endsWith('.pdf') && !lessCont.endsWith('.png') && !lessCont.endsWith('.jpg') && !lessCont.endsWith('.jpeg')) errorsObj.lessonContent = "Lesson content URL must end in .pdf, .png, .jpg, .jpeg"
        // if (lessonContent.startsWith(" ")) errorsObj.lessonContent = "Lesson content cannot begin with an empty space"


        if (Object.values(errorsObj).length) {
            setErrors(errorsObj)
        } else {
            const newLesson = await dispatch(addNewLesson(newLessonInfo, form))
            // console.log(newLesson)
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
                {/* <label>
                    Lesson Image (optional)
                    <input
                        type="text"
                        value={lessonImg}
                        onChange={(e) => setLessonImg(e.target.value)}
                        placeholder="Lesson image url"
                    />
                </label>
                {errors.lessonImg && <p className="errors">{errors.lessonImg}</p>}
                {lessonImg.startsWith(" ") && <p className="errors">Lesson image URL cannot begin with an empty space</p>} */}
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
                {showUpload && (
                    <label htmlFor='file-upload'>
                        Lesson Content
                        <input
                            type="file"
                            id='file-upload'
                            required
                            // name="img_url"
                            // value={lessonContent ? lessonContent : ""}
                            onChange={uploadLessonContentFile}
                        // placeholder="Lesson content"
                        />
                    </label>
                )}
                {/* {!showUpload && (
                    <div>
                        <img
                            src={previewUrl}
                            alt="preview"
                        />
                        <button>Change File</button>
                    </div>
                )} */}
                {errors.lessonContent && <p className="errors">{errors.lessonContent}</p>}
                {/* {lessonContent.startsWith(" ") && <p className="errors">Lesson content cannot begin with an empty space</p>} */}
                <label>
                    Select Classes (to add the lesson to)
                    <Select
                        className="selection"
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
                <div className="createLessonFormButtons">
                    <button type="submit" disabled={submitDisabled}>Add Lesson</button>
                    <button onClick={() => navigate('/my-lessons')}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default CreateLessonFormPage;
