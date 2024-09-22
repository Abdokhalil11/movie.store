import { RiBookmarkLine, RiPlayCircleFill, RiStarFill } from "@remixicon/react";
import { useState, useEffect, useContext } from "react";
import useFetch from "../UseFetch/useFetch";
import { apiContext } from "../../Api_Context";
import Wrapper from "../../Wrapper/Wrapper";
import Loading from "./Loading/Loading";
import { Link } from "react-router-dom";
import GetGenre from "../GetGenre/GetGenre";
const Tailer = () => {
  const [tailer, setTailer] = useState({});
  const { base_img, base_backdrop } = useContext(apiContext);
  const { data: tailerMovies, isLoading } = useFetch("/3/movie/popular");
  let size = 30;

  useEffect(() => {
    setTailer(tailerMovies?.results[0]);
  }, [tailerMovies]);

  const tailerHandling = (el) => {
    setTailer(el);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="tailer">
        <div className="tailer-background" key={tailer?.id}>
          <img src={base_backdrop + tailer?.backdrop_path} alt=""/>
          <div className="tailer-info">
            <h3>{tailer?.title}</h3>
            <div className="date">
              {tailer?.release_date}
              <GetGenre genre_ids={tailer?.genre_ids} filmType={"movie"} />
            </div>
            <p>{tailer?.overview}</p>
            <div className="action">
              <Link to={"details/movie/" + tailer?.id}>
                <RiPlayCircleFill size={size} className="icon" />
                <span>Watch Now</span>
              </Link>
              <button>
                <RiBookmarkLine size={size} className="icon" />
                <span>Bookmark</span>
              </button>
            </div>
          </div>
        </div>
        <div className="tailerMovies">
          <Wrapper controll={true}>
            {tailerMovies?.results.map((el, i) => (
              <div
                className="tailer-movie"
                key={i}
                onClick={() => {
                  tailerHandling(el);
                }}
              >
                <img
                  src={base_img + el.poster_path}
                  alt={el.title}
                  className={el.id === tailer?.id ? "active" : ""}
                />
                <div className="detail">
                  <h4>{el.title}</h4>
                  <div className="rate">
                    <RiStarFill className="icon" />
                    {el.vote_average}
                    <GetGenre genre_ids={el.genre_ids.slice(0, 2)} filmType={"movie"} />
                  </div>
                </div>
              </div>
            ))}
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default Tailer;
