import { useState, useRef, useEffect } from 'react';
// import { updateUserThunk } from '../../redux/session';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
// import { getAllLessons } from '../../redux/lessons';
import AllLessonsPage from './AllLessonsPage';
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import SignupFormModal from '../SignupFormModal';
import './Splash.css'

const Splash = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user)
  const [showMenu, setShowMenu] = useState(false);
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

  // //image url to send to aws
  // const [imgUrl, setImgUrl] = useState("");
  // //telling us if we should show the image
  // const [showUpload, setShowUpload] = useState(true);
  // //img url we will load in react
  // const [previewUrl, setPreviewUrl] = useState("");



  // //function to get image from local

  // const updateImage = async (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (e) => {
  //     setPreviewUrl(reader.result);
  //   }
  //   setImgUrl(file);
  //   setShowUpload(false);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const img_url = imgUrl;
  //   const form = { img_url };
  //   const updateUser = await dispatch(updateUserThunk(user.id, form))
  // }



  return (
    <>
      {/* <div>
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit}>
        <div>
        {showUpload && (
          <label htmlFor='file-upload'> Select From Computer
          <input
          type='file'
          id='file-upload'
          name="img_url"
          onChange={updateImage}
          accept='.jpg, .jpeg, .png, .gif'
          />
          </label>
          )}
          {!showUpload && (
            <div>
            <img
            src={previewUrl}
            alt="preview"
            />
            <button>Change Profile</button>
            </div>
            )}
            </div>
            </form>
          </div> */}
      {!user &&
        <>
          <div className='noUserDiv'>
            <h2>
              Welcome to Mathspace!
            </h2>
            <img
              src="../images/class_image.jpg"
              className='noUserImage'
            />
          </div>
          <div className='noUserDiv2'>
            <div className='noUserButton'>
              <OpenModalButton
                buttonText="Create your free account today!"
                className="noUserButtonModal"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        </>
      }
      <div className='splashPageContainer'>
        <div className='splashPageLeftSide'>
          {user &&
            <p>YOUR STUFF</p>
          }
          <p>
            {user &&
              <NavLink
                to="/classes"
                className="userClasses"
              >
                Classes
              </NavLink>
            }
          </p>
          <p>
            {user &&
              <NavLink
                to="/lessons"
                className="userLessons"
              >
                Lessons
              </NavLink>
            }
          </p>
        </div>
        {/* <div className='spalshPageRightSide'>
        <div className='allLessonsContainer'>
          {user && allLessons?.map(lesson => (
            <div className='lessonTile' key={lesson.id}>
              <NavLink className="lessonTileLink" to={`/lessons/${lesson.id}`} key={lesson.id}>
                <div className='lessonTileImage'>
                  <img src={lesson.lessonImg ? lesson.lessonImg : "/images/placeholder.jpeg"} alt={`lesson ${lesson.id} image`} />
                </div>
                <div className='lessonTileInfo'>
                  <p className='lessonTitle'>{lesson.title} </p>
                  <p>By: {lesson.Teacher.firstName} {lesson.Teacher.lastName}</p>
                  <p>{lesson.description}</p>
                </div>
              </NavLink>
            </div>
          ))}
        </div> */}
        <div className='splashPageRightSide'>
          {user &&
            <AllLessonsPage />
          }
        </div>
        {/* </div> */}
      </div >
    </>

  );
}

export default Splash;
