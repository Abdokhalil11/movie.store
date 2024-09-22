import { RiMovieFill, RiStarFill } from "@remixicon/react";
import { useState, useContext } from "react";
import Wrapper from "../../../Wrapper/Wrapper";
import useFetch from "../../UseFetch/useFetch";
import { apiContext } from "../../../Api_Context";
import { Link } from "react-router-dom";
const Episodes = ({ movieId, filmType, seasonNumber }) => {
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const { data } = useFetch(
    `/3/${filmType}/${movieId}/season/${seasonNumber}`,
    seasonNumber
  );
  const { data: episodeDetails } = useFetch(
    `/3/tv/${movieId}/season/${seasonNumber}/episode/${episodeNumber}`,
    seasonNumber,
    episodeNumber
  );
  const { base_img } = useContext(apiContext);
  return (
    <div className="episodes">
      <div className="title">
        Season {seasonNumber} Episodes {data?.episodes.length}
      </div>
      <Wrapper controll={true}>
        {data?.episodes.map((el, i) => (
          <div
            className="episode"
            onClick={() => setEpisodeNumber(el.episode_number)}
            key={i}
          >
            <div
              className="bg-gradient"
              onMouseMove={(e) =>
                (e.target.style.backgroundPosition = `${e.pageX}px ${e.pageY}px`)
              }
            ></div>
            <RiMovieFill className="icon" />
            <div className="details">
              <h4>{el.name}</h4>
            </div>
          </div>
        ))}
      </Wrapper>
      <div className="title">
        season{seasonNumber} Episode {episodeNumber}{" "}
      </div>
      <div className="episode-details">
        {episodeDetails?.still_path ? (
          <img src={base_img + episodeDetails?.still_path} alt="" />
        ) : (
          <div className="img">
            <div
              className="bg-gradient"
              onMouseMove={(e) =>
                (e.target.style.backgroundPosition = `${e.pageX}px ${e.pageY}px`)
              }
            ></div>
          </div>
        )}
        <div className="details">
          <h4>{episodeDetails?.name}</h4>
          <p>{episodeDetails?.overview}</p>
          <div className="rate">
            <RiStarFill className="icon" />
            {episodeDetails?.vote_average}
          </div>
          <div className="crews">
            <Wrapper >
              {episodeDetails?.guest_stars.map((el) => (
                <div className="crew" key={el}>
                  <Link to={"/person/" + el.id}>
                    <img src={base_img + el.profile_path} />
                  </Link>
                  <div>
                    <p>{el.name}</p>
                    <span>{el.character}</span>
                  </div>
                </div>
              ))}
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
