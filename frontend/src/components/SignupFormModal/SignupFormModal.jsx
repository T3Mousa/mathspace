import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [profileImg, setProfileImg] = useState("")
  const [userRole, setUserRole] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const submitDisabled = (email.startsWith(" ") || firstName.startsWith(" ") || lastName.startsWith(" ") || password.startsWith(" ") || profileImg.startsWith(" "))


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors({})

      return dispatch(thunkSignup({
        email,
        firstName,
        lastName,
        profileImg,
        userRole,
        password,
      })
      )
        .then((serverResponse) => {
          if (serverResponse) {
            // console.log(serverResponse)
            if (serverResponse.errors) {
              setErrors(serverResponse.errors)
            } else {
              closeModal();
            }
          } else {
            closeModal()
          }
        })
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const handleNonFunctioningLinks = () => {
    alert("Student User Features Coming Soon...");
  };

  return (
    <>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {errors.server && <p className="errors">{errors.server}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        {email.startsWith(" ") && <p className="errors">Input fields cannot begin with an empty space</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        {firstName.startsWith(" ") && <p className="errors">Input fields cannot begin with an empty space</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        {lastName.startsWith(" ") && <p className="errors">Input fields cannot begin with an empty space</p>}
        {/* <label>
          Are you a teacher or a student?
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <option value="" disabled>Select...</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </label> */}
        <label>
          Profile Image (optional)
          <input
            type="text"
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </label>
        {profileImg.startsWith(" ") && <p className="errors">Input fields cannot begin with an empty space</p>}
        <div className="userRoleRadioButtons">
          Role:
          <label>

            <input
              type="radio"
              value="teacher"
              checked={userRole === 'teacher'}
              onChange={(e) => setUserRole(e.target.value)}
            />
            Teacher
          </label>
          <label>

            <input
              type="radio"
              value="student"
              checked={userRole === 'student'}
              onChange={handleNonFunctioningLinks}
            />
            Student
          </label>
          {errors.userRole && <p className="errors">{errors.userRole}</p>}
        </div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        {password.startsWith(" ") && <p className="errors">Input fields cannot begin with an empty space</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
        <button type="submit" disabled={submitDisabled}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
