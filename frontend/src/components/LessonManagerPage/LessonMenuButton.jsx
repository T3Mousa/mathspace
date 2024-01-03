import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

function LessonMenuButton({ lesson }) {
    // const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    // const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(thunkLogout());
    //     closeMenu();
    // };
    const ulClassName = "lesson-menu-dropdown" + (showMenu ? "" : " hidden");
    //   const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={toggleMenu} className='verticalDots'>
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>

                    <>
                        <OpenModalMenuItem
                            itemText="Edit Lesson"
                            onItemClick={closeMenu}
                            modalComponent={<UpdateLessonModal lesson={lesson} />}
                        />
                        <OpenModalMenuItem
                            itemText="Delete Lesson"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteLessonModal lessonId={lesson.id} />}
                        />
                    </>
                </ul>
            )}
        </>
    );
}

export default LessonMenuButton;
