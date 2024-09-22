import { Link, useParams } from "react-router-dom";
import useFetch from "../../UseFetch/useFetch";
import { useContext, useEffect, useState } from "react";
import { apiContext } from "../../../Api_Context";
import { RiImageLine, RiStarFill } from "@remixicon/react";
import GetGenre from "../../GetGenre/GetGenre";
const PersonMovies = () => {
  const { personId } = useParams();
  const { data } = useFetch(`/3/person/${personId}/movie_credits`);
  const { base_img, base_backdrop } = useContext(apiContext);
  return (
    <>
      <div className="person-movies">
      
        <div className="person-movie">
          {data?.cast.map((el, i) => (
            <Link to={"/details/movie/" + el.id} className="movie" key={i}>
              {el.poster_path ? (
                <img src={base_img + el.poster_path} alt="" />
              ) : (
                <div className="img">
                  <RiImageLine />
                </div>
              )}
              <div className="details">
                <h4>{el.title || el.name}</h4>
                <div className="rate">
                  <RiStarFill className="icon" />
                  {el.vote_average}
                  {<GetGenre genre_ids={el.genre_ids} filmType={"movie"} />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PersonMovies;
