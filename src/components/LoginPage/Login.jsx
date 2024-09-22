import {
  RiCloseCircleLine,
  RiAtLine,
  RiEyeLine,
  RiEyeCloseLine,
} from "@remixicon/react";
import { useState, useEffect, useContext, useReducer, useRef } from "react";
import { apiContext } from "../../Api_Context";
import { Link, useNavigate } from "react-router-dom";
import faceBookIcon from "../images/facebook-icon.png";
import googleIcon from "../images/google-icon.png";
import twitterIcon from "../images/twitter-icon.png";
import Loading from "./Loading/Loading";
import useFetch from "../UseFetch/useFetch";
const Login = () => {
  const { base_img, setIsLogin, setCurrentUser } = useContext(apiContext);
  const navigate = useNavigate();
  const massege = useRef();
  const passwordFeild = useRef();
  const confirmPasswordFeild = useRef();
  const initailState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [users, setUsers] = useState([]);
  const { data: backGroundMovies, isLoading } = useFetch("/3/discover/movie");

  useEffect(() => {
    if (localStorage.users) {
      setUsers(JSON.parse(localStorage.users));
    }
  }, []);

  console.log(backGroundMovies)
  // functions
  const showPasswordFeild = () => {
    if (passwordFeild.current.type === "password") {
      passwordFeild.current.type = "text";
    } else {
      passwordFeild.current.type = "password";
    }
  };

  const showConfirmPasswordFeild = () => {
    if (confirmPasswordFeild.current.type === "password") {
      confirmPasswordFeild.current.type = "text";
    } else {
      confirmPasswordFeild.current.type = "password";
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "addAccount":
        return { ...state, [action.field]: action.value };
    }
  };
  const [state, dispatch] = useReducer(reducer, initailState);

  const submitHandling = (e) => {
    e.preventDefault();
    // check if the password is the same of confirm password
    if (state.password !== state.confirmPassword || state.password == "") {
      massege.current.classList.add("active");
      return;
    } else {
      massege.current.classList.remove("active");
    }
    // check if email is login or not
    const findEmail = users?.find((el) => el.email == state.email);
    if (findEmail) {
      massege.current.children[1].innerHTML = "You Can't Login With This Email";
      massege.current.classList.add("active");
      return;
    } else {
      massege.current.classList.remove("active");
    }
    // check the strong of password
    if (state.password.length < 7) {
      massege.current.children[1].innerHTML = "Enter A Stronge Password ";
      massege.current.classList.add("active");
      return;
    } else {
      massege.current.classList.remove("active");
    }
    setUsers((prev) => [...prev, state]);
    localStorage.setItem("users", JSON.stringify([...users, state]));
    localStorage.setItem("currentUser", JSON.stringify(state));
    setCurrentUser(state);
    setIsLogin(true);
    // change the direction to home page
    navigate("/");
  };

  const changeHandling = (e) => {
    dispatch({
      type: "addAccount",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <div className="login">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="background-login">
          <div className="line1">
            {backGroundMovies?.results.slice(0, 6).map((el) => (
              <img src={base_img + el.poster_path} alt="" key={el.id} />
            ))}
          </div>
          <div className="line2">
            {backGroundMovies?.results.slice(6, 12).map((el) => (
              <img src={base_img + el.poster_path} alt="" key={el.id} />
            ))}
          </div>
          <div className="line3">
            {backGroundMovies?.results.slice(12, 18).map((el) => (
              <img src={base_img + el.poster_path} alt="" key={el.id} />
            ))}
          </div>
        </div>
      )}
      <form onSubmit={submitHandling}>
        <div className="heading">
          <h1>Login</h1>
          <p>Welcome, to Movie World. Create An Account For Full experience</p>
        </div>
        <div className="login-with">
          <p className="title">or can login with : </p>
          <div className="google">
            <img src={googleIcon} alt="facebook-icon" />
            <p>Login With Google</p>
          </div>
          <div className="facebook">
            <img src={faceBookIcon} alt="facebook-icon" />
            <p>Login With Facebook</p>
          </div>
          <div className="twitter">
            <img src={twitterIcon} alt="facebook-icon" />
            <p>Login With Twitter</p>
          </div>
        </div>
        <p className="title">Or with your email</p>
        <div className="name">
          <label>
            <input
              type="text"
              name="firstName"
              placeholder=""
              onChange={changeHandling}
              required
            />
            <span>Frist Name</span>
          </label>
          <label>
            <input
              type="text"
              name="lastName"
              placeholder=""
              onChange={changeHandling}
              required
            />
            <span>Last Name</span>
          </label>
        </div>
        <div className="email">
          <label>
            <input
              type="email"
              name="email"
              placeholder=""
              onChange={changeHandling}
            />
            <span>Email</span>
          </label>
          <div className="icon">
            <RiAtLine className="icon" />
          </div>
        </div>
        <div className="password">
          <label>
            <input
              type="password"
              name="password"
              placeholder=""
              onChange={changeHandling}
              ref={passwordFeild}
              required
            />
            <span>Password</span>
          </label>
          <div className="icon" onClick={showPasswordFeild}>
            <RiEyeCloseLine className="hide" />
            <RiEyeLine className="show" />
          </div>
        </div>
        <div className="confirm-password">
          <label>
            <input
              type="password"
              name="confirmPassword"
              placeholder=""
              onChange={changeHandling}
              ref={confirmPasswordFeild}
            />
            <span>Confirm Password</span>
          </label>
          <div className="icon" onClick={showConfirmPasswordFeild}>
            <RiEyeCloseLine className="hide" />
            <RiEyeLine className="show" />
          </div>
        </div>
        <input type="submit" />
        <div className="toSign">
          if You have An Account <Link to={"/sign"}>Sign In</Link>
        </div>
      </form>
      <div className="massege" ref={massege}>
        <RiCloseCircleLine size={30} className="icon" />
        <span>Confirm Password Are Not Correct</span>
      </div>
    </div>
  );
};

export default Login;
