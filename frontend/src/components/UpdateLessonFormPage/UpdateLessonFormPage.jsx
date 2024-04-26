import { useEffect, useState } from "react";
import { editLesson, getAllLessons, getLessonDetails } from "../../redux/lessons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './UpdateLessonForm.css'
import { getAllClasses } from "../../redux/classes";
import LessonPDFViewer from "../LessonDetailsPage/LessonPDFViewer";


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
    const [newLessonContent, setNewLessonContent] = useState(null)
    const [errors, setErrors] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const teacherClasses = useSelector(state => state?.classes?.allClasses)

    useEffect(() => {
        if (lessonParsedId) {
            dispatch(getAllClasses()).then(() => dispatch(getAllLessons())).then(() => dispatch(getLessonDetails(lessonParsedId))).then(() => setIsLoaded(true))
        }
    }, [dispatch, lessonParsedId, isLoaded])

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || lessonImg.startsWith(" "))

    useEffect(() => {
        if (lessonToEdit) {
            setTitle(lessonToEdit.title || "")
            setLessonImg(lessonToEdit.lessonImg || "")
            setDescription(lessonToEdit.description || "")
            setLessonContent(lessonToEdit.lessonContent || "")
            setSelectedClasses(lessonToEdit.LessonClasses?.map(cls => ({ value: cls.classId, label: cls.className })) || "")
        }
    }, [lessonToEdit])

    //telling us if we should show the image
    const [showUpload, setShowUpload] = useState(true);
    //img url we will load in react
    // const [previewUrl, setPreviewUrl] = useState("");



    //function to get image from local

    // const uploadLessonContentFile = async (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = (e) => {
    //         setPreviewUrl(reader.result);
    //     }
    //     setLessonContent(file);
    //     // setShowUpload(false);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const lessonInfo = {
            title,
            lessonImg,
            description,
            // lessonContent,
            selectedClasses
        }

        let lesson_content;
        if (newLessonContent) {
            lesson_content = newLessonContent
        } else {
            lesson_content = lessonContent
        }
        const form = { lesson_content }
        const lessCont = lesson_content.name
        // console.log(lessCont)

        const errorsObject = {}
        if (!title) errorsObject.title = "Lesson title is required"
        if (title.startsWith(" ")) errorsObject.title = "Lesson title cannot begin with an empty space"
        if (!description) errorsObject.description = "Lesson description is required"
        if (description.startsWith(" ")) errorsObject.description = "Lesson description cannot begin with an empty space"
        // if (lessonImg && (!lessonImg.endsWith('.png') && !lessonImg.endsWith('.jpg') && !lessonImg.endsWith('.jpeg'))) errorsObject.lessonImg = "Lesson image URL must end in .png, .jpg, or .jpeg"
        // if (lessonImg.startsWith(" ")) errorsObject.lessonImg = "Lesson image URL cannot begin with an empty space"
        // if (lessonContent.startsWith(" ")) errorsObject.lessonContent = "Lesson content cannot begin with an empty space"
        if (lessCont && !lessCont.endsWith('.pdf') && !lessCont.endsWith('.png') && !lessCont.endsWith('.jpg') && !lessCont.endsWith('.jpeg')) errorsObject.lessonContent = "Lesson content URL must end in .pdf, .png, .jpg, .jpeg"

        if (Object.values(errorsObject).length) {
            setErrors(errorsObject)
        } else {

            const updatedLesson = await dispatch(editLesson(+lessonId, lessonInfo, form))
            // console.log(updatedLesson)
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewLessonContent(file);
    };

    return (
        <>
            <form className="editLessonForm" onSubmit={handleSubmit}>
                <h1>Edit Lesson</h1>
                <label>
                    Lesson Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.title && <p className='errors'>{errors.title}</p>}
                {title.startsWith(" ") && <p className='errors'>Lesson title cannot begin with an empty space</p>}
                {/* <label>
                    Lesson Image (optional)
                    <input
                        type="text"
                        value={lessonImg}
                        onChange={(e) => setLessonImg(e.target.value)}
                    />
                </label> */}
                {/* {errors.lessonImg && <p className='errors'>{errors.lessonImg}</p>} */}
                {/* {lessonImg.startsWith(" ") && <p className='errors'>Lesson image URL cannot begin with an empty space</p>} */}
                <label>
                    Lesson Description:
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p className='errors'>{errors.description}</p>}
                {description.startsWith(" ") && <p className='errors'>Lesson description cannot begin with an empty space</p>}
                {lessonContent && lessonContent.endsWith('.pdf') && (
                    <div className="existingLessonContent">
                        <h4>Existing Lesson Content:</h4>
                        <LessonPDFViewer url={lessonContent} />
                    </div>
                )}
                {lessonContent && lessonContent.endsWith('.png') && (
                    <div className="existingLessonContent">
                        <h4>Existing Lesson Content:</h4>
                        <img src={lessonContent} alt="Lesson Content file not available" />
                    </div>
                )}
                {lessonContent && lessonContent.endsWith('.jpg') && (
                    <div className="existingLessonContent">
                        <h4>Existing Lesson Content:</h4>
                        <img src={lessonContent} alt="Lesson Content file not available" />
                    </div>
                )}
                {lessonContent && lessonContent.endsWith('.jpeg') && (
                    <div className="existingLessonContent">
                        <h4>Existing Lesson Content:</h4>
                        <img src={lessonContent} alt="Lesson Content file not available" />
                    </div>
                )}
                {lessonContent && !lessonContent.endsWith('.pdf') && !lessonContent.endsWith('.png') && !lessonContent.endsWith('.jpg') && !lessonContent.endsWith('.jpeg') && (
                    <div className="existingLessonContent">
                        <h4>Existing Lesson Content:</h4>
                        <p>{lessonContent}</p>
                    </div>
                )}
                {showUpload && (
                    <label htmlFor='file-upload'>
                        Lesson Content (choose a new file or skip to keep the exisitng lesson content):
                        <input
                            type="file"
                            id='file-upload'
                            accept=".pdf, .jpg, .png, .jpeg"
                            onChange={handleFileChange}
                        />
                    </label>
                )}
                {errors.lessonContent && <p className="errors">{errors.lessonContent}</p>}
                <label>
                    Select Classes (to add the lesson to or to remove the lesson from):
                    <Select
                        value={selectedClasses ? selectedClasses?.map(cls => (cls.label !== undefined ? { key: cls.value, value: cls.value, label: cls.label } : null)) : null}
                        options={teacherClasses?.map(cls => ({ key: cls.id, value: cls.id, label: cls.name }))}
                        isMulti
                        isClearable={true}
                        onChange={handleClassSelectChange}
                        className="selectedOptions"
                    />
                </label>
                <div className="editLessonFormButtons">
                    <button type="submit" disabled={submitDisabled}>Update Lesson</button>
                    <button onClick={() => navigate(`/lessons/${lessonParsedId}`)}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default UpdateLessonFormPage;
