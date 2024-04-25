import React, { useEffect, useState } from "react";
import { editAssignment, getAllAssignments, getAssignmentDetails } from "../../redux/assignments";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './UpdateAssignmentForm.css'
import { getAllClasses } from "../../redux/classes";


function UpdateAssignmentFormPage() {
    const { assignmentId } = useParams()
    const assignmentParsedId = +assignmentId

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const assignmentToEdit = useSelector(state => state?.assignments?.assignmentDeets)
    // console.log(lessonToEdit)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [assignmentContent, setAssignmentContent] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [selectedClasses, setSelectedClasses] = useState(assignmentToEdit?.AssignmentClasses)
    const [errors, setErrors] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const teacherClasses = useSelector(state => state?.classes?.allClasses)
    const currentDate = new Date().toISOString().split('T')[0]

    useEffect(() => {
        if (assignmentParsedId) {
            dispatch(getAllClasses()).then(() => getAllAssignments()).then(() => dispatch(getAssignmentDetails(assignmentParsedId))).then(() => setIsLoaded(true))
        }
    }, [dispatch, assignmentParsedId, isLoaded])

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" "))

    useEffect(() => {
        if (assignmentToEdit) {
            setTitle(assignmentToEdit.title || "")
            setDescription(assignmentToEdit.description || "")
            setAssignmentContent(assignmentToEdit.assignmentContent || "")
            setDueDate(assignmentToEdit.dueDate || "")
            setSelectedClasses(assignmentToEdit.AssignmentClasses?.map(cls => ({ value: cls.classId, label: cls.className })) || "")
        }
    }, [assignmentToEdit])

    //telling us if we should show the image
    const [showUpload, setShowUpload] = useState(true);
    //img url we will load in react
    const [previewUrl, setPreviewUrl] = useState("");



    //function to get image from local

    const uploadAssignmentContentFile = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setPreviewUrl(reader.result);
        }
        setAssignmentContent(file);
        // setShowUpload(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const assignmentInfo = {
            title,
            description,
            // assignmentContent,
            dueDate,
            selectedClasses
        }

        const assignment_content = assignmentContent
        const form = { assignment_content }
        const assignCont = assignment_content.name
        // console.log(assignCont)

        const errorsObject = {}
        if (!title) errorsObject.title = "Assignment title is required"
        if (title.startsWith(" ")) errorsObject.title = "Assignment title cannot begin with an empty space"
        if (!description) errorsObject.description = "Assignment description is required"
        if (description.startsWith(" ")) errorsObject.description = "Assignment description cannot begin with an empty space"
        if (!dueDate) errorsObject.dueDate = "Due date for assignment is required"
        if (assignCont && !assignCont.endsWith('.pdf') && !assignCont.endsWith('.png') && !assignCont.endsWith('.jpg') && !assignCont.endsWith('.jpeg')) errorsObject.assignmentContent = "Assignment content URL must end in .pdf, .png, .jpg, .jpeg"

        if (Object.values(errorsObject).length) {
            setErrors(errorsObject)
        } else {

            const updatedAssignment = await dispatch(editAssignment(+assignmentId, assignmentInfo, form))
            // console.log(updatedAssignment)
            if (updatedAssignment?.id) {
                await dispatch(getAssignmentDetails(updatedAssignment?.id))
                await navigate(`/assignments/${updatedAssignment?.id}`)
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
            <form className="editAssignmentForm" onSubmit={handleSubmit}>
                <h1>Edit Assignment</h1>
                <label>
                    Assignment Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.title && <p className='errors'>{errors.title}</p>}
                {title.startsWith(" ") && <p className='errors'>Assignment title cannot begin with an empty space</p>}
                <label>
                    Assignment Description:
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p className='errors'>{errors.description}</p>}
                {description.startsWith(" ") && <p className='errors'>Assignment description cannot begin with an empty space</p>}
                {showUpload && (
                    <label htmlFor='file-upload'>
                        Assignment Content
                        <input
                            type="file"
                            id='file-upload'
                            required
                            onChange={uploadAssignmentContentFile}
                        />
                    </label>
                )}
                {errors.assignmentContent && <p className="errors">{errors.assignmentContent}</p>}
                <label>
                    Due Date:
                    <input
                        type="date"
                        min={currentDate}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </label>
                {errors.dueDate && <p className="errors">{errors.dueDate}</p>}
                <label>
                    Select Classes (to add the assignment to or to remove the assignment from):
                    <Select
                        value={selectedClasses ? selectedClasses?.map(cls => (cls.label !== undefined ? { key: cls.value, value: cls.value, label: cls.label } : null)) : null}
                        options={teacherClasses?.map(cls => ({ key: cls.id, value: cls.id, label: cls.name }))}
                        isMulti
                        isClearable={true}
                        onChange={handleClassSelectChange}
                    />
                </label>

                <button type="submit" disabled={submitDisabled}>Update Assignment</button>
                <button onClick={() => navigate(`/assignments/${assignmentParsedId}`)}>Cancel</button>
            </form>
        </>
    );
}

export default UpdateAssignmentFormPage;
