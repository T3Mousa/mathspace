import React, { useState } from 'react';
import { updateUserThunk } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import AllLessonsPage from './AllLessonsPage';
import './Splash.css'

const Splash = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  //image url to send to aws
  const [imgUrl, setImgUrl] = useState("");
  //telling us if we should show the image
  const [showUpload, setShowUpload] = useState(true);
  //img url we will load in react
  const [previewUrl, setPreviewUrl] = useState("");



  //function to get image from local

  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPreviewUrl(reader.result);
    }
    setImgUrl(file);
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img_url = imgUrl;
    const form = { img_url };
    const updateUser = await dispatch(updateUserThunk(user.id, form))
  }



  return (
    <>
      <div>
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
      </div>
      <div className='splashPageLeftSideMenu'>
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
              Custom Lessons
            </NavLink>
          }
        </p>
        <div>
          {user &&
            <AllLessonsPage />
          }
        </div>
      </div>
    </>
  );
}

export default Splash;
