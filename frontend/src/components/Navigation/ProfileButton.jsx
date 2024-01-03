import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { Navigate, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state?.session?.user);
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/")
  };

  const handleNonFunctioningLinks = () => {
    alert("Feature Coming Soon...");
  };

  return (
    <>
      <div className="withUserNavBar">
        {user && (
          <button className="profileNameButton" onClick={toggleMenu}>
            {user.firstName} {user.lastName}
            <span className="caretIcon"> <i className="fas fa-caret-down"> </i> </span>
          </button>
        )}
        {showMenu && (
          <ul className={"profile-dropdown"} ref={ulRef}>
            {user && (
              <>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                  <button onClick={logout}>Log Out</button>
                </li>
              </>
            )
            }
          </ul>
        )}
      </div>

      <div className="noUserNavBar">
        {!user && (
          <>
            <div className="signUpButton">
              <OpenModalButton
                buttonText="Create Account"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <span className="orWord"> or </span>
            <div className="signInLink">
              <OpenModalButton
                buttonText="Sign In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </div>
      <button className="worldGlobe" onClick={handleNonFunctioningLinks}>
        <i className="fa-solid fa-globe"></i>
      </button>
    </>
  );
}

export default ProfileButton;
