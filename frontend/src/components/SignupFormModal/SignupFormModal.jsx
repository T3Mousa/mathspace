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
  const [userRole, setUserRole] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const submitDisabled = (email.startsWith(" ") || firstName.startsWith(" ") || lastName.startsWith(" ") || password.startsWith(" "))


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors({})

      return dispatch(thunkSignup({
        email,
        firstName,
        lastName,
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
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        {email.startsWith(" ") && <p>Input fields cannot begin with an empty space</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        {firstName.startsWith(" ") && <p>Input fields cannot begin with an empty space</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        {lastName.startsWith(" ") && <p>Input fields cannot begin with an empty space</p>}
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
          Role:
          Teacher
          <input
            type="radio"
            value="teacher"
            checked={userRole === 'teacher'}
            onChange={(e) => setUserRole(e.target.value)}
          />
        </label>
        <label>
          Student
          <input
            type="radio"
            value="student"
            checked={userRole === 'student'}
            onChange={handleNonFunctioningLinks}
          />
        </label>
        {errors.userRole && <p>{errors.userRole}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        {password.startsWith(" ") && <p>Input fields cannot begin with an empty space</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" disabled={submitDisabled}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
