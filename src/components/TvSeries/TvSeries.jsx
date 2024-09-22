import { useContext } from "react";
import { apiContext } from "../../Api_Context";
import { RiBookmarkLine, RiFilmFill, RiPlayCircleFill, RiStarFill } from "@remixicon/react";
import GetGenre from "../GetGenre/GetGenre";
import { Link } from "react-router-dom";
import TvSeriesLists from "./TvSeriesLists";
import useFetch from "../UseFetch/useFetch";
const TvSeries = () => {
  const { base_backdrop, base_img } = useContext(apiContext);
  const { data } = useFetch("/3/tv/popular");
  return (
    <section className="tvSeries-movies">
      <div className="heading">
        <h3>TV SERIES MOVIES</h3>
      </div>
      <div className="all-tv-series">
        <div className="tvSeries-Movie" key={data?.results[0]}>
          <div className="image">
            {
              data?.results[0].backdrop_path ?
              <img src={base_backdrop + data?.results[0].backdrop_path} alt="" />
                :
                <div className="img">
                  <RiFilmFill />
                </div>
            }
          </div>
          <div className="details">
            <h4>{data?.results[0].title || data?.results[0].name}</h4>
            <div className="overview">{data?.results[0].overview}</div>
            <div className="rate">
              <RiStarFill className="icon" />
              {data?.results[0].vote_average}
              <div className="genres">
                <GetGenre
                  genre_ids={data?.results[0].genre_ids}
                  filmType={"tv"}
                />
              </div>
            </div>
            <div className="actions">
              <Link to={"/details/tv/" + data?.results[0].id}>
                <RiPlayCircleFill className="icon" />
                Watch
              </Link>
              <Link className="bookmark">
                <RiBookmarkLine />
                <span>Bookmark</span>
              </Link>
            </div>
          </div>
        </div>

        <TvSeriesLists path={"/3/tv/airing_today"} title={"Airing Today"} />
        <TvSeriesLists path={"/3/tv/on_the_air"} title={"On The Today"} />
      </div>
    </section>
  );
};

export default TvSeries;
