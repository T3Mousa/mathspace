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
    const [assignmentContent, setAssignmentContent] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllClasses()).then(dispatch(getAllUserAssignments())).then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    const teacherClasses = useSelector(state => state?.classes?.allClasses)

    // console.log(teacherClasses)

    const submitDisabled = (title.startsWith(" ") || description.startsWith(" ") || assignmentContent.startsWith(" "))

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const newAssignmentInfo = {
            title,
            description,
            assignmentContent,
            dueDate,
            selectedClasses
        }

        let errorsObj = {}
        if (!title) errorsObj.title = "Assignment title is required"
        if (title.startsWith(" ")) errorsObj.name = "Assignment title cannot begin with an empty space"
        if (!description) errorsObj.description = "Assignment description is required"
        if (description.startsWith(" ")) errorsObj.description = "Assignment description cannot begin with an empty space"
        if (assignmentContent.startsWith(" ")) errorsObj.assignmentContent = "Assignment content cannot begin with an empty space"


        if (Object.values(errorsObj).length) {
            setErrors(errorsObj)
        } else {
            const newAssignment = await dispatch(addNewAssignment(newAssignmentInfo))
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
                <label>
                    Assignment Content (optional):
                    <textarea
                        type="text"
                        value={assignmentContent ? assignmentContent : ""}
                        onChange={(e) => setAssignmentContent(e.target.value)}
                        placeholder="Assignment content"
                    />
                </label>
                {errors.assignmentContent && <p className="errors">{errors.assignmentContent}</p>}
                {assignmentContent.startsWith(" ") && <p className="errors">Assignment content cannot begin with an empty space</p>}
                <label>
                    Due Date:
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        placeholder="Select a due date"
                    />
                </label>
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

                <button onClick={() => navigate('/my-assignments')}>Cancel</button>
                <button type="submit" disabled={submitDisabled}>Add Assignment</button>
            </form>
        </>
    )
}

export default CreateAssignmentFormPage;
