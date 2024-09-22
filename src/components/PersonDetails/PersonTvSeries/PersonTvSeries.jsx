import { Link, useParams } from "react-router-dom";
import useFetch from "../../UseFetch/useFetch";
import { useContext } from "react";
import { apiContext } from "../../../Api_Context";
import {
  RiFilmFill,
  RiImageLine,
  RiPlayCircleFill,
  RiStarFill,
} from "@remixicon/react";
import GetGenre from "../../GetGenre/GetGenre";
const PersonTvSeries = () => {
  const { personId } = useParams();
  const { data } = useFetch(`/3/person/${personId}/tv_credits`);
  const { base_img, base_backdrop } = useContext(apiContext);
  console.log(data);
  return (
    <div className="person-tvSeries">
      {data?.cast.map((el) => (
        <div className="tvSeries" key={el.id}>
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
            <Link to={"/details/tv/" + el.id} className="play">
              <RiPlayCircleFill className="icon" />
              Play
            </Link>
            <div className="original-lang">{el.original_language}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonTvSeries;
