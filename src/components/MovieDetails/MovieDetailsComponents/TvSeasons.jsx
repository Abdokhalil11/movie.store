import { apiContext } from "../../../Api_Context";
import Wrapper from "../../../Wrapper/Wrapper";
import useFetch from "../../UseFetch/useFetch";
import { useContext } from "react";
const TvSeasons = ({ data: seasons, setSeasonNumber, seasonNumber }) => {
  const { base_img } = useContext(apiContext);
  return (
    <div className="seasons">
      <div className="title">Seasons</div>
      <Wrapper controll={true}>
        {seasons?.seasons.map((el) => (
          <div
            className={
              el.season_number == seasonNumber ? "season active" : "season"
            }
            onClick={() => setSeasonNumber(el.season_number)}
          >
            {el.poster_path ? (
              <img src={base_img + el.poster_path}  />
            ) : (
              <img src={base_img + seasons?.poster_path} alt="" />
            )}
            <div className="details">
              <h4>{el.name}</h4>
              <p className="episode-count">Episodes : {el.episode_count}</p>
            </div>
            <span className="season-number">{el.season_number}</span>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default TvSeasons;
