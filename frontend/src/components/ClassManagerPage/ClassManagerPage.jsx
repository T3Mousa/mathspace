import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAllClasses } from '../../redux/classes';
import StudentClassTile from './StudentClassTile';
import CreateNewClassModal from '../CreateNewClassModal';
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import ClassMenuButton from './ClassMenuButton';
import './ClassManagerPage.css'


const ClassManagerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allUserClasses = useSelector(state => state?.classes?.allClasses)
    // console.log(allUserClasses)
    const [showMenu, setShowMenu] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        dispatch(getAllClasses()).then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

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

    return (
        <>
            {isLoaded &&
                <div className='manageClassesContainer'>
                    <div className="manageClassesHeader">
                        {user && user.userRole === "teacher" &&
                            <>
                                <h1>Manage Your Classes</h1>
                                <div className="addClassButton">
                                    <OpenModalButton
                                        buttonText='Add New Class'
                                        className="addClassButtonModal"
                                        onButtonClick={closeMenu}
                                        modalComponent={<CreateNewClassModal />}
                                    />
                                </div>
                            </>
                        }
                        {user && user.userRole === "student" &&
                            <>
                                <h1>Your Classes</h1>
                            </>
                        }
                    </div>
                    <div className="teacherClasses">
                        {user && user.userRole === "teacher" && allUserClasses && (
                            <table className="teacherClassesTable">
                                <thead>
                                    <tr>
                                        <th>Class Name</th>
                                        <th>Class Roster</th>
                                    </tr>
                                    <tr className="rowBorderBottom"></tr>
                                </thead>
                                <tbody>
                                    {allUserClasses?.map((cls) => (
                                        <tr key={cls.id} className="tableRows">
                                            <td>
                                                <NavLink
                                                    className="classNameTile"
                                                    to={`/classes/${cls.id}`}
                                                    key={cls.id}
                                                >
                                                    <div className="classRowPart1">
                                                        <div className="classImage">
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
                                                        </div>
                                                        <div className="className">
                                                            <p>{cls.name}</p>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </td>
                                            <td>
                                                <div className="classRowPart2">
                                                    <div className="studentCount">
                                                        <p>{cls.studentCount} students</p>
                                                    </div>
                                                    <div className="classMenuButton">
                                                        <ClassMenuButton cls={cls} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="studentClasses">
                        <div className="studentClassTileContainer">
                            {user && user.userRole === "student" && allUserClasses && allUserClasses?.map(cls => {
                                return <StudentClassTile
                                    cls={cls}
                                    className="clsTile"
                                    key={cls.id}
                                />
                            })
                            }
                        </div>
                    </div>
                </div >
            }
        </>
    )


};

export default ClassManagerPage;
