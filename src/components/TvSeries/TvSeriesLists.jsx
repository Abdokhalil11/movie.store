import { useContext } from "react";
import { RiFilmFill, RiPlayCircleFill, RiStarFill } from "@remixicon/react";
import useFetch from "../UseFetch/useFetch";
import { apiContext } from "../../Api_Context";
import GetGenre from "../GetGenre/GetGenre";
import Wrapper from "../../Wrapper/Wrapper";
import { Link } from "react-router-dom";
const TvSeriesLists = ({ path, title }) => {
  const { data, isLoading, error } = useFetch(path);
  const { base_img } = useContext(apiContext);
  return (
    <div className="tvSeries-lists">
      <div className="title">
        <h4>{title}</h4>
      </div>
      <Wrapper controll={true}>
        {data?.results.map((el) => (
          <div className="tvSeries-list" key={el.id}>
            <div className="image">
              {el.backdrop_path ? (
                <img src={base_img + el.backdrop_path} alt="" />
              ) : (
                <div className="img">
                  <RiFilmFill />
                </div>
              )}
            </div>
            <div className="details">
              <h4>{el.title || el.name}</h4>
              <div className="rate">
                <RiStarFill className="icon" />
                {el.vote_average}
              </div>
              <div className="genre">
                <GetGenre genre_ids={el.genre_ids} filmType={"tv"} />
              </div>
              <Link to={"details/tv/" + el.id} className="play">
                <RiPlayCircleFill className="icon" />
                Play
              </Link>
              <div className="original-lang">{el.original_language}</div>
            </div>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default TvSeriesLists;
