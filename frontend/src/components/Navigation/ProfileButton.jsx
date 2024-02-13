import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
// import OpenModalMenuItem from "./OpenModalMenuItem";
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
            <div className="profilePic">
              {user.profileImg ?
                <img
                  src={user.profileImg}
                // style={{ height: "50px", width: '50px', borderRadius: "50%" }}
                /> :
                <img
                  src="../images/profile_image_placeholder.jpg"
                />
              }
            </div>
            <div className="fullName">
              {user.firstName} {user.lastName}
            </div>
            <span className="caretIcon"> <i className="fas fa-caret-down"> </i> </span>
          </button>
        )}
        {showMenu && (
          <div className={"profile-dropdown"} ref={ulRef}>
            {user && (
              <>
                <div>{user.firstName} {user.lastName}</div>
                <div>{user.email}</div>
                <div className="logOutButton" onClick={logout}>
                  Sign out
                </div>
              </>
            )
            }
          </div>
        )}
        {user &&
          <button className="worldGlobe" onClick={handleNonFunctioningLinks}>
            <i className="fa-solid fa-globe"></i>
          </button>
        }
      </div>

      {!user && (
        <div className="noUserNavBar">
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
            <button className="worldGlobe" onClick={handleNonFunctioningLinks}>
              <i className="fa-solid fa-globe"></i>
            </button>
          </>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
