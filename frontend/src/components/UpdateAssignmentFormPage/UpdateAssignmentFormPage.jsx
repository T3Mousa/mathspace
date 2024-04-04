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

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || assignmentContent.startsWith(" "))

    useEffect(() => {
        if (assignmentToEdit) {
            setTitle(assignmentToEdit.title || "")
            setDescription(assignmentToEdit.description || "")
            setAssignmentContent(assignmentToEdit.assignmentContent || "")
            setDueDate(assignmentToEdit.dueDate || "")
            setSelectedClasses(assignmentToEdit.AssignmentClasses?.map(cls => ({ value: cls.classId, label: cls.className })) || "")
        }
    }, [assignmentToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const assignmentInfo = {
            title,
            description,
            assignmentContent,
            dueDate,
            selectedClasses
        }

        const errorsObject = {}
        if (!title) errorsObject.title = "Assignment title is required"
        if (title.startsWith(" ")) errorsObject.title = "Assignment title cannot begin with an empty space"
        if (!description) errorsObject.description = "Assignment description is required"
        if (description.startsWith(" ")) errorsObject.description = "Assignment description cannot begin with an empty space"
        if (assignmentContent.startsWith(" ")) errorsObject.assignmentContent = "Assignment content cannot begin with an empty space"
        if (!dueDate) errorsObject.dueDate = "Due date for assignment is required"

        if (Object.values(errorsObject).length) {
            setErrors(errorsObject)
        } else {

            const updatedAssignment = await dispatch(editAssignment(+assignmentId, assignmentInfo))
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
                <label>
                    Assignment Content (optional):
                    <textarea
                        type="text"
                        value={assignmentContent}
                        onChange={(e) => setAssignmentContent(e.target.value)}
                    />
                </label>
                {errors.assignmentContent && <p className='errors'>{errors.assignmentContent}</p>}
                {assignmentContent.startsWith(" ") && <p className='errors'>Assignment content cannot begin with an empty space</p>}
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

                <button onClick={() => navigate(`/assignments/${assignmentParsedId}`)}>Cancel</button>
                <button type="submit" disabled={submitDisabled}>Update Assignment</button>
            </form>
        </>
    );
}

export default UpdateAssignmentFormPage;
