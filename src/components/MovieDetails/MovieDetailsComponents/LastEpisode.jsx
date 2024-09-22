import { useContext } from "react";
import { apiContext } from "../../../Api_Context";
import { RiPlayCircleFill } from "@remixicon/react";

const LastEpisode = ({ data, setSeasonNumber }) => {
  const { base_img, base_backdrop } = useContext(apiContext);
  // console.log(data);
  const showEpisode = () => {
    window.scrollTo(0, 1800);
    setSeasonNumber(data.last_episode_to_air.season_number);
  };
  return (
    <div className="last-episode">
      <div className="title">Current Episode</div>
      <div className="episode">
        <img src={base_backdrop + data?.backdrop_path} alt="" className="bg" />
        <div className="image">
          <img src={base_img + data?.poster_path} alt="" />
        </div>
        <div className="details">
          <h4>{data?.last_episode_to_air.name}</h4>
          <p className="overview">{data?.last_episode_to_air.overview}</p>
          <div className="watch" onClick={showEpisode}>
            <RiPlayCircleFill className="icon" />
            Watch
          </div>
          <p className="date">{data?.last_episode_to_air.air_date}</p>
        </div>
      </div>
    </div>
  );
};

export default LastEpisode;
