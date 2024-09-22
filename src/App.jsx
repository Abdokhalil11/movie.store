import NavBar from "./components/NavBar/NavBar";
import Sign from "./components/SignPage/Sign";
import Login from "./components/LoginPage/Login";
import UserPage from "./components/UserPage/UserPage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Footer from "./components/Footer/Footer";
import useFetch from "./components/UseFetch/useFetch";
import { apiContext } from "./Api_Context";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PersonDetails from "./components/PersonDetails/PersonDetails";
import PersonAbout from "./components/PersonDetails/PersonAbout/PersonAbout";
// import PersonImages from "./components/PersonDetails/PersonImage/PersonImage";
import HomePage from "./components/HomePage/HomePage";
import PersonMovies from "./components/PersonDetails/PersonMovies/PersonMovies";
import PersonImages from "./components/PersonDetails/PersonImage/PersonImages";
import PersonTvSeries from "./components/PersonDetails/PersonTvSeries/PersonTvSeries";
import SearchDetails from "./components/searchDetails/SearchDetails";
import Discover from "./components/DiscoverLists/Discover";
import Categries from "./components/Categries/Categries";
import About from "./components/AboutPage/About";
import Contact from "./components/Contact Us/Contact";
import Settings from "./components/Settings/Settings";
import Hero from "./components/HeroSection/Hero";

function App() {
  const url = "https://api.themoviedb.org",
    key = "api_key=98be2e4e025f78f09f2ccdbe23d660b9",
    base_img = "https://image.tmdb.org/t/p/w500/",
    base_backdrop = "https://image.tmdb.org/t/p/original/",
    [isLogin, setIsLogin] = useState(false),
    [currentUser, setCurrentUser] = useState({}),
    [allUsers, setAllUsers] = useState({});
  const { isLoading } = useFetch("/3/discover/movie");
  const [hideOldContent, setHideOldContent] = useState(true);
  const value = {
    url,
    key,
    base_img,
    base_backdrop,
    setIsLogin,
    isLogin,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
    hideOldContent,
    setHideOldContent,

  };
  useEffect(() => {
    if (localStorage.getItem("users")) {
      const arrOfUsers = JSON.parse(localStorage.getItem("users"));
      setAllUsers(arrOfUsers);
    }
    if (localStorage.getItem("currentUser")) {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      setIsLogin(true);
    }
    let imgs = document.querySelectorAll("img");
    imgs.forEach((el) => (el.loading = "lazy"));
  }, []);

  return (
    <>
      <apiContext.Provider value={value}>
        <NavBar />
        <div className="content">
          {
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="details/:type/:movieId" element={<MovieDetails />} />
              <Route path="person/:personId" element={<PersonDetails />}>
                <Route index element={<PersonAbout />} />
                <Route path="about" index element={<PersonAbout />} />
                <Route path="images" element={<PersonImages />} />
                <Route path="movies" element={<PersonMovies />} />
                <Route path="tvSeries" element={<PersonTvSeries />} />
              </Route>
              <Route path="search" element={<SearchDetails />} />
              <Route path="/sign" element={<Sign />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/userPage" element={<UserPage />} />
              <Route path="lists/:listType" element={<Discover />} />
              <Route path="categries" element={<Categries />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/hero" element={<Hero />} />

            </Routes>
          }
          <Footer />
        </div>
      </apiContext.Provider>
    </>
  );
}

export default App;
