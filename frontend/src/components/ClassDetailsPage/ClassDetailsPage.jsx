import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getClassDetails } from '../../redux/classes';
import './ClassDetailsPage.css'
import { getAllClassLessons } from '../../redux/lessons';
import { getAllClassAssignments } from '../../redux/assignments';


const ClassDetailsPage = () => {
    const { classId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const cls = useSelector(state => state?.classes?.classDeets)
    const clsLessons = useSelector(state => state?.lessons?.allClassLessons)
    // console.log(clsLessons)
    const clsAssignments = useSelector(state => state?.assignments?.allClassAssignments)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [selectedAssignment, setSelectedAssignment] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    // console.log(selectedStudent)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        dispatch(getClassDetails(classId)).then(() => dispatch(getAllClassLessons(classId))).then(() => dispatch(getAllClassAssignments(classId))).then(() => setIsLoaded(true))
    }, [dispatch, classId, isLoaded])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => {
        setShowMenu(false)
    }

    const handleLessonSelection = (e) => {
        const lessonId = parseInt(e.target.value)
        // console.log(lessonId)
        const selected = clsLessons.find((lesson) => lesson.id === lessonId)

        setSelectedLesson(selected)
    }

    const handleAssignmentSelection = (e) => {
        const assignmentId = parseInt(e.target.value)

        const selected = clsAssignments.find((assignment) => assignment.id === assignmentId)

        setSelectedAssignment(selected)
    }

    const handleStudentSelection = (e) => {
        const studentId = parseInt(e.target.value)

        const selected = cls.Students.find((student) => student.studentId === studentId)

        setSelectedStudent(selected)
    }

    const getAssignmentStatusForStudent = (grades, studentId) => {
        const studentGrades = grades?.filter(grade => grade.studentId === studentId);
        if (studentGrades.length === 0) {
            return 'Not Assigned';
        }
        const isCompleted = studentGrades.every(grade => grade.isCompleted);
        return isCompleted ? 'Turned In' : 'Pending';
    };

    const getAssignmentGradeForStudent = (grades, studentId) => {
        // console.log(grades)
        // console.log(studentId)
        const studentGrades = grades?.filter(grade => grade.studentId === studentId);
        if (studentGrades.length > 0) {
            const totalGrade = studentGrades.reduce((acc, curr) => acc + parseFloat(curr.grade), 0);
            return totalGrade / studentGrades.length;
        }
        return null;
    }

    const getAverageGradeForStudent = (grades) => {
        // console.log(grades)
        const validGrades = grades?.filter(grade => grade?.grade !== null && grade?.grade !== undefined);
        // console.log(validGrades)
        const parseIntGrades = validGrades.map(grade => parseFloat(grade?.grade).toFixed(2))
        // console.log(parseIntGrades)
        if (validGrades.length > 0) {
            const sumGrades = parseIntGrades.reduce((total, grade) => total + parseFloat(grade), 0);
            return (sumGrades / validGrades.length).toFixed(1);
        }
        return null;
    };

    return (
        <>
            {isLoaded && cls?.id &&
                <>
                    <div className='classDetailsHeading'>
                        <div className='classNameRoster'>
                            <h2>{cls.name}</h2>
                            {user.userRole === "teacher" &&
                                <p className='classEnrollment'>
                                    Number of Students Enrolled: <span> {cls.Students.length}</span>
                                </p>
                            }
                        </div>
                        <div className="classImageDesc">
                            {cls.classImg ?
                                <img
                                    src={cls.classImg}
                                    className="clsImg"
                                /> :
                                <img
                                    src="../images/placeholder.jpeg"
                                    className="clsImg"
                                />
                            }
                            <div>
                                <h4>Class Description:</h4>
                                <p>{cls.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className='lessonDropDownList'>
                        <p className='lessonDropDownList'>
                            <label>
                                Class Lessons:
                                <select
                                    value={selectedLesson ? selectedLesson.id : ''}
                                    onChange={handleLessonSelection}
                                >
                                    <option value="" disabled className='lessonOption'>Select a lesson...</option>
                                    {clsLessons?.map((lesson) => (
                                        <option key={lesson.id} value={lesson.id} className='lessonOption'>
                                            {lesson.title}
                                        </option>
                                    )
                                    )}
                                </select>
                            </label>
                        </p>
                    </div>
                    {selectedLesson &&
                        <div className='selectedLesson'>
                            <p className='selectedLessonPar'>Title: {selectedLesson.title}</p>
                            <p className='selectedLessonPar'>Description: {selectedLesson.description}</p>
                            <NavLink to={`/lessons/${selectedLesson.id}`} className="lessonLink">
                                Go to lesson details page <i className="fa-solid fa-arrow-right"></i>
                            </NavLink>
                        </div>}

                    <div className='assignmentDropDownList'>
                        <p className='assignmentDropDownList'>
                            <label>
                                Class Assignments:
                                <select
                                    value={selectedAssignment ? selectedAssignment.id : ''}
                                    onChange={handleAssignmentSelection}
                                >
                                    <option value="" disabled className='assignmentOption'>Select an assignment...</option>
                                    {clsAssignments?.map((assignment) => (
                                        <option key={assignment.id} value={assignment.id} className='assignmentOption'>
                                            {assignment.title}
                                        </option>
                                    )
                                    )}
                                </select>
                            </label>
                        </p>
                    </div>
                    {selectedAssignment &&
                        <div className='selectedAssignment'>
                            <p className='selectedAssignmentPar'>Title: {selectedAssignment.title}</p>
                            <p className='selectedAssignmentPar'>Description: {selectedAssignment.description}</p>
                            <NavLink to={`/assignments/${selectedAssignment.id}`} className="assignmentLink">
                                Go to assignment details page <i className="fa-solid fa-arrow-right"></i>
                            </NavLink>
                        </div>}

                    <div className='studentDropDownList'>
                        <p className='studentDropDownList'>
                            <label>
                                Class Student Roster:
                                <select
                                    value={selectedStudent ? selectedStudent.studentId : ''}
                                    onChange={handleStudentSelection}
                                >
                                    <option value="" disabled className='studentOption'>Select a student...</option>
                                    {cls?.Students?.flatMap((student) => (
                                        <option key={student.studentId} value={student.studentId} className='studentOption'>
                                            {student.firstName} {student.lastName}
                                        </option>
                                    )
                                    )}
                                </select>
                            </label>
                        </p>
                    </div>

                    {selectedStudent &&
                        <div className='selectedStudent'>
                            {/* <h4>Assignments</h4> */}
                            <table className='studentAssignmentTable'>
                                <thead>
                                    <tr>
                                        <th className='studentAssignmentTitle'>Assignment Title</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cls?.ClassAssignments?.map((assignment) => (
                                        <tr className='studentAssignment' key={assignment.assignmentId}>
                                            <td className='studentAssignmentTitle'>
                                                <NavLink to={`/assignments/${assignment.assignmentId}`} className="studentAssignmentTitle">
                                                    {assignment.Assignment.title}
                                                </NavLink></td>
                                            <td>{assignment.Assignment.dueDate}</td>
                                            <td>{getAssignmentStatusForStudent(assignment?.Assignment?.Grades, selectedStudent.studentId)}</td>
                                            <td>{getAssignmentGradeForStudent(assignment?.Assignment?.Grades, selectedStudent.studentId) || 'Not Graded'}</td>
                                        </tr>
                                    ))}

                                    <tr className='averageGrade'>
                                        <td className='averageGrade' colSpan="4">
                                            Average Assignment Grade: <span>{getAverageGradeForStudent(cls?.ClassAssignments?.map(assignment => assignment.Assignment?.Grades?.find(grade => grade.studentId === selectedStudent.studentId)))}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>}

                </>
            }
        </>
    )
}

export default ClassDetailsPage
