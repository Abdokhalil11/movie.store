import Wrapper from "../../Wrapper/Wrapper";
import { useState, useEffect, useContext } from "react";
import { apiContext } from "../../Api_Context";
import Loading from "../loadingSection/Loading";
import { Link } from "react-router-dom";
import { RiStarFill } from "@remixicon/react";
import GetGenre from "../GetGenre/GetGenre";
import useFetch from "../UseFetch/useFetch";
const MostView = () => {
  const { data: mostViewMovie, isLoading } = useFetch("/3/movie/now_playing");
  const {base_img} = useContext(apiContext)
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="mostViewMovies" id="mostview">
      <div className="heading">
        <h3>MOST VIEW MOVIES</h3>
      </div>
      <div className="mostMovies">
        <Wrapper controll={true} autoSlider={false}>
          {mostViewMovie?.results.map((el) => (
            <Link
              to={"details/movie/" + el.id}
              className="mostMovie"
              key={el.id}
            >
              <img src={base_img + el.poster_path} alt="" />
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
        </Wrapper>
      </div>
    </section>
  );
};

export default MostView;
