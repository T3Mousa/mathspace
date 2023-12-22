import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClasses } from '../../redux/classes';
import TeacherClassTile from './TeacherClassTile';
import StudentClassTile from './StudentClassTile';
import './ClassManagerPage.css'

const ClassManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const allUserClasses = useSelector(state => state?.classes?.allClasses)
    // console.log(allUserClasses)

    useEffect(() => {
        dispatch(getAllClasses())
    }, [dispatch])

    return (
        <>
            <div className="manageClassesHeader">
                {user && user.userRole === "teacher" &&
                    <>
                        <h1>Manage Classes</h1>
                        <button>
                            Add a Class
                        </button>
                    </>
                }
                {user && user.userRole === "student" &&
                    <>
                        <h1>Your Classes</h1>
                    </>
                }
            </div>
            <div className="teacherClasses">
                <div className="teacherClassTileContainer">
                    {user && user.userRole === "teacher" && allUserClasses && allUserClasses.map(cls => {
                        return <TeacherClassTile
                            cls={cls}
                            className="clsTile"
                            key={cls.id}
                        />
                    })
                    }
                </div>
            </div>
            <div className="studentClasses">
                <div className="studentClassTileContainer">
                    {user && user.userRole === "student" && allUserClasses && allUserClasses.map(cls => {
                        return <StudentClassTile
                            cls={cls}
                            className="clsTile"
                            key={cls.id}
                        />
                    })
                    }
                </div>
            </div>
        </>
    )


};

export default ClassManagerPage;
