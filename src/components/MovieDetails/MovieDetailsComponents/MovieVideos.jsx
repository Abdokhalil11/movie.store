/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import YoutubePlayer from "./YoutubePlayer/YoutubePlayer";
import useFetch from "../../UseFetch/useFetch";
import Wrapper from "../../../Wrapper/Wrapper";
import VideoLoading from "../Loading/VideoLoading";

const MovieVideos = ({ movieId, filmType }) => {
  const { data: videos, isLoading } = useFetch(
    "/3/" + filmType + "/" + movieId + "/videos"
  );
  const [videotype, setVideoType] = useState({});
  const [type, setType] = useState("Trailer");

  useEffect(() => {
    setVideoType(videos?.results.filter((el) => el.type == type));
    console.log();
  }, [videos, type]);

  const videoTypeHadling = (e, type) => {
    setType(type);
  };

  if (isLoading) {
    return <VideoLoading />;
  }
  return (
    <div className="offical-tailer">
      <h4 className="title">Offical {type}</h4>
      <ul className="videoTypes">
        {[...new Set(videos?.results.map((el) => el.type))]
          .sort((a, b) => b.length - a.length)
          .map((el) => (
            <li
              key={el}
              className={el === type && "active"}
              onClick={(e) => videoTypeHadling(e, el)}
            >
              {el}
            </li>
          ))}
      </ul>
      {
        <Wrapper controll={true}>
          {videotype?.map((el) => (
            <div className="video" key={el.id}>
              <YoutubePlayer videoId={el.key} />
            </div>
          ))}
        </Wrapper>
      }
    </div>
  );
};

export default MovieVideos;
