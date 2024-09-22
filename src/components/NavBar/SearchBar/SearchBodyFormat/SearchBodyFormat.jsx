import { useContext } from "react";
import { apiContext } from "../../../../Api_Context";
import {
  RiMovie2Line,
  RiMovieLine,
  RiStarFill,
  RiUserLine,
} from "@remixicon/react";
import GetGenre from "../../../GetGenre/GetGenre";
import { Link } from "react-router-dom";
const SearchBodyFormat = ({ data, searchKey }) => {
  const { base_img } = useContext(apiContext);
  const genders = {
    0: "not Known",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };
  return (
    <div className="search-body-format">
      <div className="media-type-person">
        <h4 className="title">Persons</h4>
        <div className="persons-search">
          {data.filter((el) => el.media_type === "person").length == 0 ? (
            <p>Not Persons Found</p>
          ) : (
            data
              .filter((el) => el.media_type === "person")
              .slice(0, 3)
              .map((el) => (
                <Link to={"/person/" + el.id} className="person-search">
                  <div className="image">
                    {el.profile_path ? (
                      <img src={base_img + el.profile_path} alt="" />
                    ) : (
                      <div className="img">
                        <RiUserLine />
                      </div>
                    )}
                  </div>
                  <div className="details">
                    <h5>{el.name || el.original_name}</h5>
                    <div className="info">
                      <p className="department">{el.known_for_department}</p>
                      <div className="separator"></div>
                      <p className="gender">{genders[el.gender]}</p>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>

      <div className="media-type-movie">
        <h4 className="title">moveies</h4>
        <div className="movies-search">
          {data.filter((el) => el.media_type === "person").length == 0 ? (
            <p>Not Movies Found</p>
          ) : (
            data
              .filter((el) => el.media_type === "movie")
              .slice(0, 3)
              .map((el) => (
                <Link to={"/details/movie/" + el.id} className="movie-search">
                  <div className="image">
                    {el.poster_path ? (
                      <img src={base_img + el.poster_path} alt="" />
                    ) : (
                      <div className="img">
                        <RiMovieLine />
                      </div>
                    )}
                  </div>
                  <div className="details">
                    <h5>{el.title || el.original_name}</h5>
                    <div className="info">
                      <p className="popularity">
                        <RiStarFill />
                        {el.vote_average}
                      </p>
                      <div className="separator"></div>
                      <p className="genre">
                        <GetGenre
                          genre_ids={el.genre_ids}
                          filmType={el.media_type}
                        />
                      </p>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
      <div className="media-type-tv">
        <h4 className="title">tv Series</h4>
        <div  className="tv-search">
          {data.filter((el) => el.media_type === "tv").length == 0 ? (
            <p>Not Tv Found</p>
          ) : (
            data
              .filter((el) => el.media_type === "tv")
              .slice(0, 2)
              .map((el) => (
                <Link to={"/details/tv/" + el.id} className="tv-search">
                  <div className="image">
                    {el.backdrop_path ? (
                      <img src={base_img + el.backdrop_path} alt="" />
                    ) : (
                      <div className="img">
                        <RiMovie2Line />
                      </div>
                    )}
                  </div>
                  <div className="details">
                    <h5>{el.title || el.original_name}</h5>
                    <div className="info">
                      <p className="popularity">
                        <RiStarFill />
                        {el.vote_average}
                      </p>
                      <div className="separator"></div>
                      <p className="genre">
                        <GetGenre
                          genre_ids={el.genre_ids}
                          filmType={el.media_type}
                        />
                      </p>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
      <Link to={"/search?q=" + searchKey}>ShowMore</Link>
    </div>
  );
};

export default SearchBodyFormat;
