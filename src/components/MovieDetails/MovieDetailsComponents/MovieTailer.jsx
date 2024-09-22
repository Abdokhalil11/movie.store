import { useContext } from "react";
import { RiBookmarkLine, RiStarFill } from "@remixicon/react";
import useFetch from "../../UseFetch/useFetch";
import { apiContext } from "../../../Api_Context";
import TailerLoading from "../Loading/TailerLoading";
import Wrapper from "../../../Wrapper/Wrapper";
const MovieTailer = ({ movieId, filmType }) => {
  const { base_backdrop, base_img } = useContext(apiContext);
  const { data: movieDetails, Isloading } = useFetch(
    "/3/" + filmType + "/" + movieId
  );
  if (Isloading) {
    return <TailerLoading />;
  }
  return (
    <>
      <div className="tailer-movie">
        <div className="image">
          <img src={base_backdrop + movieDetails?.backdrop_path} alt="" />
        </div>
        <div className="details">
          <h3>
            {movieDetails?.title ||
              movieDetails?.original_title ||
              movieDetails?.name}
          </h3>
          <div className="star-gene">
            <div className="star">
              <RiStarFill className="star-icon" />
              {movieDetails?.vote_average}
            </div>
            <div className="gene">
              {movieDetails?.genres?.map((el) => (
                <span key={el.id}>{el.name}</span>
              ))}
            </div>
          </div>
          <p className="description">{movieDetails?.overview}</p>
          <button>
            <RiBookmarkLine className="bookmark-icon" />
            BookMark
          </button>
        </div>
      </div>
      <div className="creation">
        <Wrapper>
          {movieDetails?.production_companies?.map((el) =>
            el.logo_path ? (
              <img src={base_img + el.logo_path} alt={el.name} />
            ) : (
              <div className="img">
                {el.name.split(" ").slice(0, -1).join(" ")}
              </div>
            )
          )}
        </Wrapper>
      </div>
    </>
  );
};

export default MovieTailer;
