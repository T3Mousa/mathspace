import React, { useEffect, useState } from "react";
import { addNewAssignment, getAllUserAssignments } from "../../redux/assignments";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import './CreateAssignmentForm.css'
import { getAllClasses } from "../../redux/classes";

function CreateAssignmentFormPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({})
    const currentDate = new Date().toISOString().split('T')[0]
    // console.log(currentDate)

    useEffect(() => {
        dispatch(getAllClasses()).then(dispatch(getAllUserAssignments())).then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    const teacherClasses = useSelector(state => state?.classes?.allClasses)

    // console.log(teacherClasses)

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" "))

    //file url to send to aws
    const [assignmentContent, setAssignmentContent] = useState("");
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

        const newAssignmentInfo = {
            title,
            description,
            // assignmentContent,
            dueDate,
            selectedClasses
        }

        const assignment_content = assignmentContent
        const form = { assignment_content }
        const assignCont = assignment_content.name

        let errorsObj = {}
        if (!title) errorsObj.title = "Assignment title is required"
        if (title.startsWith(" ")) errorsObj.name = "Assignment title cannot begin with an empty space"
        if (!description) errorsObj.description = "Assignment description is required"
        if (description.startsWith(" ")) errorsObj.description = "Assignment description cannot begin with an empty space"
        // if (assignmentContent.startsWith(" ")) errorsObj.assignmentContent = "Assignment content cannot begin with an empty space"
        if (!dueDate) errorsObj.dueDate = "Due date for the assignment is required"
        if (assignCont && !assignCont.endsWith('.pdf') && !assignCont.endsWith('.png') && !assignCont.endsWith('.jpg') && !assignCont.endsWith('.jpeg')) errorsObj.assignmentContent = "Assignment content URL must end in .pdf, .png, .jpg, .jpeg"

        if (Object.values(errorsObj).length) {
            setErrors(errorsObj)
        } else {
            const newAssignment = await dispatch(addNewAssignment(newAssignmentInfo, form))
            await dispatch(getAllClasses())
            await dispatch(getAllUserAssignments())
            if (newAssignment?.id) navigate('/my-assignments')
        }
    };

    return (
        <>
            <form className="createAssignmentForm" onSubmit={handleSubmit}>
                <h1>Create a New Assignment</h1>
                <label>
                    Assignment Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter assignment title"
                    />
                </label>
                {errors.title && <p className="errors">{errors.title}</p>}
                {title.startsWith(" ") && <p className="errors">Assignment title cannot begin with an empty space</p>}
                <label>
                    Assignment Description:
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Enter assignment description"
                    />
                </label>
                {errors.description && <p className="errors">{errors.description}</p>}
                {description.startsWith(" ") && <p className="errors">Assignment description cannot begin with an empty space</p>}
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
                {/* {!showUpload && (
                    <div>
                        <img
                            src={previewUrl}
                            alt="preview"
                        />
                        <button>Change File</button>
                    </div>
                )} */}
                {errors.assignmentContent && <p className="errors">{errors.assignmentContent}</p>}
                <label>
                    Due Date:
                    <input
                        type="date"
                        min={currentDate}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        placeholder="Select a due date"
                    />
                </label>
                {errors.dueDate && <p className="errors">{errors.dueDate}</p>}
                <label>
                    Select Classes (to add the assignment to):
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

                <button type="submit" disabled={submitDisabled}>Add Assignment</button>
                <button onClick={() => navigate('/my-assignments')}>Cancel</button>
            </form>
        </>
    )
}

export default CreateAssignmentFormPage;
