import React, { useEffect, useState } from "react";
import { editLesson, getAllLessons, getLessonDetails } from "../../redux/lessons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import Select from "react-select";
import './UpdateLessonForm.css'
import { getAllClasses } from "../../redux/classes";


function UpdateLessonFormPage() {
    const { lessonId } = useParams()
    const lessonParsedId = +lessonId

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lessonToEdit = useSelector(state => state?.lessons?.lessonDeets)
    // console.log(lessonToEdit)
    const [title, setTitle] = useState("")
    const [lessonImg, setLessonImg] = useState("")
    const [description, setDescription] = useState("")
    const [selectedClasses, setSelectedClasses] = useState(lessonToEdit?.LessonClasses)
    const [lessonContent, setLessonContent] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const teacherClasses = useSelector(state => state?.classes?.allClasses)
    // console.log(teacherClasses)
    // const associatedClasses = lessonToEdit?.LessonClasses
    // console.log(selectedClasses)
    // console.log(associatedClasses)

    useEffect(() => {
        if (lessonParsedId) {
            dispatch(getAllClasses()).then(() => getAllLessons()).then(() => dispatch(getLessonDetails(lessonParsedId))).then(() => setIsLoaded(true))
        }
    }, [dispatch, lessonParsedId, isLoaded])

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || lessonImg.startsWith(" ") || lessonContent.startsWith(" "))

    useEffect(() => {
        if (lessonToEdit) {
            setTitle(lessonToEdit.title || "")
            setLessonImg(lessonToEdit.lessonImg || "")
            setDescription(lessonToEdit.description || "")
            setLessonContent(lessonToEdit.lessonContent || "")
            setSelectedClasses(lessonToEdit.LessonClasses?.map(cls => ({ value: cls.classId, label: cls.className })) || "")
        }
    }, [lessonToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const lessonInfo = {
            title,
            lessonImg,
            description,
            lessonContent,
            selectedClasses
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

            const updatedLesson = await dispatch(editLesson(+lessonId, lessonInfo))
            console.log(updatedLesson)
            if (updatedLesson?.id) {
                await dispatch(getLessonDetails(updatedLesson?.id))
                await navigate(`/lessons/${updatedLesson?.id}`)
            }
        }
    };

    const handleClassSelectChange = (selectedOptions, actionMeta) => {
        // console.log(selectedOptions)
        // console.log(actionMeta)
        if (actionMeta.action === 'select-option') {
            setSelectedClasses(prevSelectedClasses => {
                if (prevSelectedClasses.length) {
                    return [...prevSelectedClasses, actionMeta.option]
                } else {
                    // console.log(selectedOptions)
                    return selectedOptions
                }
            })
        }
        if (actionMeta.action === 'remove-value') {
            setSelectedClasses(prevSelectedClasses => {
                if (prevSelectedClasses.length) {
                    // console.log(prevSelectedClasses)
                    return prevSelectedClasses.filter(option => option.value !== actionMeta.removedValue.value)
                } else {
                    return selectedOptions
                }
            })
        }
    }

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
                <label>
                    Select Classes (to add the lesson to or to remove the lesson from):
                    <Select
                        value={selectedClasses ? selectedClasses?.map(cls => (cls.label !== undefined ? { key: cls.value, value: cls.value, label: cls.label } : null)) : null}
                        options={teacherClasses?.map(cls => ({ key: cls.id, value: cls.id, label: cls.name }))}
                        isMulti
                        isClearable={true}
                        onChange={handleClassSelectChange}
                    />
                </label>

                <button onClick={() => navigate(`/lessons/${lessonParsedId}`)}>Cancel</button>
                <button type="submit" disabled={submitDisabled}>Save Update</button>
            </form>
        </>
    );
}

export default UpdateLessonFormPage;
