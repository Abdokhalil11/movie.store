import {
  RiCloseCircleLine,
  RiAtLine,
  RiEyeLine,
  RiEyeCloseLine,
} from "@remixicon/react";
import { useRef, useReducer, useEffect, useState, useContext } from "react";
import { apiContext } from "../../Api_Context";
import faceBookIcon from "../images/facebook-icon.png";
import googleIcon from "../images/google-icon.png";
import twitterIcon from "../images/twitter-icon.png";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading/Loading";
import useFetch from "../UseFetch/useFetch";
const Sign = () => {
  const massege = useRef();
  const passwordFeild = useRef();
  const navigate = useNavigate();
  const { base_img, setCurrentUser, allUsers } = useContext(apiContext);
  const {data:backGroundMovies,isLoading} = useFetch("/3/movie/popular")

  const showPasswordFeild = () => {
    if (passwordFeild.current.type === "password") {
      passwordFeild.current.type = "text";
    } else {
      passwordFeild.current.type = "password";
    }
  };

  const initailState = {
    email: "",
    password: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "addAccount":
        return { ...state, [action.field]: action.value };
    }
  };
  const [state, dispatch] = useReducer(reducer, initailState);

  const changeHandling = (e) => {
    dispatch({
      type: "addAccount",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const submitHandling = (e) => {
    e.preventDefault();
    const findUserEmail = allUsers.find((el) => el.email == state.email);
    const findUserPassword = allUsers.find(
      (el) => el.password == state.password
    );
    if (!findUserEmail || !findUserPassword) {
      console.log("false");
      massege.current.classList.add("active");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(findUserEmail));
    setCurrentUser(findUserEmail);
    navigate("/");
  };

  return (
    <div className="sign">
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
          <h1>Sign in</h1>
          <p>
            Welcome, to Movie World.Enter Your Account For Continue experience
          </p>
        </div>

        <p className="title">Sign with your email</p>
        <div className="email">
          <label>
            <input
              type="email"
              name="email"
              placeholder=""
              onChange={changeHandling}
              required
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

        <input type="submit" value="Sign In" />

        <Link to={"/sign/restPassword"} className="restPassword">
          Rest Password
        </Link>
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
        <p className="toLogin">
          if You Not Have An Account
          <Link to="/login">Login </Link>
        </p>
      </form>
      <div className="massege" ref={massege}>
        <RiCloseCircleLine size={30} className="icon" />
        <span>The Email Or Password Are Not Correct</span>
      </div>
    </div>
  );
};

export default Sign;
