import { useEffect, useState } from "react";
import { editAssignment, getAllAssignments, getAssignmentDetails } from "../../redux/assignments";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './UpdateAssignmentForm.css'
import { getAllClasses } from "../../redux/classes";
import AssignmentPDFViewer from "../AssignmentDetailsPage/AssignmentPDFViewer";


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
    const [newAssignmentContent, setNewAssignmentContent] = useState(null)
    const [dueDate, setDueDate] = useState("")
    const [selectedClasses, setSelectedClasses] = useState(assignmentToEdit?.AssignmentClasses)
    const [errors, setErrors] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const teacherClasses = useSelector(state => state?.classes?.allClasses)
    const currentDate = new Date().toISOString().split('T')[0]

    useEffect(() => {
        if (assignmentParsedId) {
            dispatch(getAllClasses()).then(() => dispatch(getAllAssignments())).then(() => dispatch(getAssignmentDetails(assignmentParsedId))).then(() => setIsLoaded(true))
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

    const [showUpload, setShowUpload] = useState(true);


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

        let assignment_content;
        if (newAssignmentContent) {
            assignment_content = newAssignmentContent
        } else {
            assignment_content = assignmentContent
        }
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewAssignmentContent(file);
    };

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
                {assignmentContent && assignmentContent.endsWith('.pdf') && (
                    <div className="existingAssignmentContent">
                        <h4>Existing Assignment Content:</h4>
                        <AssignmentPDFViewer url={assignmentContent} />
                    </div>
                )}
                {assignmentContent && assignmentContent.endsWith('.png') && (
                    <div className="existingAssignmentContent">
                        <h4>Existing Assignment Content:</h4>
                        <img src={assignmentContent} alt="Assignment Content file not available" />
                    </div>
                )}
                {assignmentContent && assignmentContent.endsWith('.jpg') && (
                    <div className="existingAssignmentContent">
                        <h4>Existing Assignment Content:</h4>
                        <img src={assignmentContent} alt="Assignment Content file not available" />
                    </div>
                )}
                {assignmentContent && assignmentContent.endsWith('.jpeg') && (
                    <div className="existingAssignmentContent">
                        <h4>Existing Assignment Content:</h4>
                        <img src={assignmentContent} alt="Assignment Content file not available" />
                    </div>
                )}
                {assignmentContent && !assignmentContent.endsWith('.pdf') && !assignmentContent.endsWith('.png') && !assignmentContent.endsWith('.jpg') && !assignmentContent.endsWith('.jpeg') && (
                    <div className="existingAssignmentContent">
                        <h4>Existing Assignment Content:</h4>
                        <p>{assignmentContent}</p>
                    </div>
                )}
                {showUpload && (
                    <label htmlFor='file-upload' className="fileUpload">
                        Assignment Content (choose a new file or skip to keep the exisitng assignment content):
                        <input
                            type="file"
                            id='file-upload'
                            accept=".pdf, .jpg, .png, .jpeg"
                            onChange={handleFileChange}
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
                        className="dueDateInput"
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
                        className="selectedOptions"
                    />
                </label>
                <div className="editAssignmentFormButtons">
                    <button type="submit" disabled={submitDisabled}>Update Assignment</button>
                    <button onClick={() => navigate(`/assignments/${assignmentParsedId}`)}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default UpdateAssignmentFormPage;
