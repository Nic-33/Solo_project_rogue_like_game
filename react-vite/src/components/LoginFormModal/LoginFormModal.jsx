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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')
    let errorHolder = []
    let error = {}
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );
    if (!serverResponse) {
      closeModal();
    } else {
      errorHolder = serverResponse.errors
      console.log(errorHolder)
      errorHolder.forEach(ele => {
        let key = Object.keys(ele)
        let value = Object.values(ele)
        error[key[0]] = value[0]
      });
      setErrors(error);
    }
  };

  return (
    <>
      <div id='loginForm'>
        <h1>Log In</h1>
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
          <button type="submit">Log In</button>
          <button type="submit" onClick={() => {
            setEmail('demo@aa.io')
            setPassword('password')
          }}>Demo Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
