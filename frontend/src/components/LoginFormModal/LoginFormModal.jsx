import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const submitDisabled = (email.startsWith(" ") || password.startsWith(" "))

  const demoSignIn = () => {
    // e.preventDefault()
    // setErrors({});
    // setEmail('demo_teacher@user.io')
    // setPassword('password')
    return dispatch(thunkLogin({
      email: 'demo_teacher@user.io',
      password: 'password'
    }))
      .then(closeModal)
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse.errors) {
      // console.log(serverResponse)
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <form className="logInForm" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {errors.message && <p className='errors'>{errors.message}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='errors'>{errors.email}</p>}
        {email.startsWith(" ") && <p className='errors'>Input fields cannot begin with an empty space</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='errors'>{errors.password}</p>}
        {password.startsWith(" ") && <p className='errors'>Input fields cannot begin with an empty space</p>}
        <div className='logInFormButton'>
          <button type="submit" disabled={submitDisabled}>Log In</button>
        </div>
        <div className="demoUserButton">
          <button className="demoUserButton" onClick={(e) => demoSignIn(e)}>Demo Teacher User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
