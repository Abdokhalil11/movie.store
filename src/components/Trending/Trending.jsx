import { useState, useContext, useEffect } from "react";
import { apiContext } from "../../Api_Context";
import { RiFilmFill, RiStarFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import GetGenre from "../GetGenre/GetGenre";
import Wrapper from "../../Wrapper/Wrapper";
import useFetch from "../UseFetch/useFetch";
const Trending = () => {
  const [time, setTime] = useState("week");
  const { base_img } = useContext(apiContext);
  const { data: trendingMovie } = useFetch("/3/trending/all/" + time, time);

  const timeHandling = (e) => {
    setTime(e.target.value);
  };
  return (
    <div className="trending-movies" id="mostpopular">
      <div className="heading">
        <h3>Trending</h3>
      </div>
      <div className="toggle">
        <input type="radio" value={"week"} name="time" onInput={timeHandling} />
        <input type="radio" value={"day"} name="time" onInput={timeHandling} />
        <span></span>
      </div>
      <Wrapper controll={true}>
        {trendingMovie?.results.map((el) => (
          <Link to={"details/movie/" + el.id} className="trending-movie" key={el.id}>
            <div className="image">
              <img src={base_img + el.poster_path} alt="" />
            </div>
            <div className="details">
              <h4>{el.title || el.name}</h4>
              <div className="rate">
                <RiStarFill className="icon" />
                {el.vote_average}
              </div>
              <div className="genre">
                <GetGenre genre_ids={el.genre_ids}filmType={"movie"} />
              </div>
              <div className="media-type">
                <RiFilmFill className="icon" />
                {el.media_type}
              </div>
              <div className="original-lang">{el.original_language}</div>
            </div>
          </Link>
        ))}
      </Wrapper>
    </div>
  );
};

export default Trending;
