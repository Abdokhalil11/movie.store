import {
  RiSearch2Line,
  RiUserLine,
  RiMovieFill,
  RiEye2Line,
  RiHome4Line,
  RiFunctionLine,
  RiUploadCloudLine,
  RiSettings3Line,
  RiContactsLine,
  RiBook2Line,
  RiUserFill,
  RiUser2Line,
  RiMovie2Line,
  RiFilmLine,
} from "@remixicon/react";
import { useState, useContext } from "react";
import { apiContext } from "../../Api_Context";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
const NavBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const iconSize = 30;
  const { currentUser, isLogin } = useContext(apiContext);

  const showSearchBarHandling = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <SearchBar
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />
      <header>
        <div className="logo">
          {/* <RiMovieFill size={50}/> */}
          <h3>logo</h3>
        </div>
        <div className="cat">
          <span>Movies</span>
          <span></span>
        </div>
        <ul className="linkes">
          <li>
            <Link to={"/"}>
              <RiHome4Line className="icon" size={iconSize} />
              Home
            </Link>
          </li>
          <li>
            <Link to="categries">
              <RiFunctionLine className="icon" size={iconSize} />
              Categories
            </Link>
          </li>
          <div className="cat">
            <span>Lists</span>
            <span></span>
          </div>
          <li>
            <Link to={"/lists/movie"}>
              <RiFilmLine className="icon" size={iconSize} />
              Movies
            </Link>
          </li>
          <li>
            <Link to={"lists/tv"}>
              <RiMovie2Line className="icon" size={iconSize} />
              tv Series
            </Link>
          </li>
          <li>
            <Link to="/lists/person">
              <RiUser2Line className="icon" size={iconSize} />
              Persons
            </Link>
          </li>
          <div className="cat">
            <span>Other</span>
            <span></span>
          </div>

          <li>
            <Link to={"/about"}>
              <RiBook2Line className="icon" size={iconSize} />
              About Us
            </Link>
          </li>
          <li>
            <Link to={"/contact"}>
              <RiContactsLine className="icon" size={iconSize} />
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <RiSettings3Line className="icon" size={iconSize} />
              Setting
            </Link>
          </li>
        </ul>
        <div className="leftNavbar">
          <div className="cat">
            <span>User Info</span>
            <span></span>
          </div>
          <div onClick={showSearchBarHandling} className="search">
            <RiSearch2Line className="search-icon" size={iconSize} />
            Search
          </div>
          {isLogin ? (
            <Link className="user" to={"/user/userPage"}>
              <div className="user-icon">{currentUser?.firstName[0]}</div>
              {currentUser?.firstName}
            </Link>
          ) : (
            <Link to="/login" className="user">
              <RiUserLine size={iconSize} className="user-icon" />
              User
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
