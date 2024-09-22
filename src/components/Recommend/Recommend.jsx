import { useState, useEffect, useContext } from "react";
import { apiContext } from "../../Api_Context";
import {
  RiEyeLine,
  RiCalendar2Line,
  RiStarFill,
  RiPlayCircleFill,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import GetGenre from "../GetGenre/GetGenre";
import useFetch from "../UseFetch/useFetch";
const Recommend = () => {
  const { base_img, base_backdrop } = useContext(apiContext);
  const { data: recommendMovies, isLoading } = useFetch("/3/movie/popular");

  return (
    <div className="recommendMovie">
      <img
        className="bg"
        src={base_backdrop + recommendMovies?.results[0].backdrop_path}
        alt=""
      />
      <div className="image">
        <img
          src={base_img + recommendMovies?.results[0].poster_path}
          alt=""
        />
      </div>
      <div className="details">
        <h4 className="movieName">{recommendMovies?.results[0].title}</h4>
        <p className="movieDescripition">
          {recommendMovies?.results[0].overview}
        </p>
        <div className="star">
          <RiStarFill className="icon" />
          {recommendMovies?.results[0].vote_average}
          <GetGenre
            genre_ids={recommendMovies?.results[0].genre_ids}
            filmType={"movie"}
          />
        </div>
        <Link to={"details/movie/" + recommendMovies?.results[0].id}>
          <RiPlayCircleFill className="icon" />
          Watch Now
        </Link>
        <div className="other-details">
          <span className="watched">
            <RiEyeLine className="icon" />
            {recommendMovies?.results[0].popularity}
          </span>
          <span className="date">
            <RiCalendar2Line className="icon" />
            {recommendMovies?.results[0].release_date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
