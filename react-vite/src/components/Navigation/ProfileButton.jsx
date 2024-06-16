import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { CiBoxList } from "react-icons/ci";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      <button className='profileButton' onClick={toggleMenu}>
        <CiBoxList />
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div id='loggedIn'>
              <li>Hello, {user.username}</li>
              <li>{user.email}</li>

              <li id='button'>
                <button onClick={logout}>Log Out</button>
              </li>
            </div>
          </>
        ) : (
          <>
            <div id='loggedOut'>
              <li >
                <OpenModalMenuItem
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalMenuItem
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
