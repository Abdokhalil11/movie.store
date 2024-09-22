import { useContext } from "react";
import { apiContext } from "../../Api_Context";
import {
  RiEarthLine,
  RiFacebookBoxLine,
  RiFacebookCircleLine,
  RiFacebookLine,
  RiHeart2Fill,
  RiImageCircleLine,
  RiInstagramFill,
  RiInstagramLine,
  RiTiktokLine,
  RiTwitterLine,
  RiUserLine,
  RiYoutubeLine,
} from "@remixicon/react";
import imdbIcon from "./imdbIcon.svg";
const PersonContent = ({ data, social }) => {
  const { base_backdrop, base_img } = useContext(apiContext);
  const addToFavorite = (e) => {
    e.target.classList.toggle("active");
  };
  const genders = {
    0: "not Known",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };
  return (
    <div className="person-content">
      <div className="image-poster">
        {data?.profile_path ? (
          <img src={base_img + data?.profile_path} alt="" />
        ) : (
          <div className="img">
            <RiImageCircleLine />
          </div>
        )}
      </div>
      <div className="person-info">
        <div className="person-image">
          {data?.profile_path ? (
            <img src={base_img + data?.profile_path} alt="" />
          ) : (
            <div className="img">
              <RiUserLine />
            </div>
          )}
        </div>
        <div className="details">
          <h4>{data?.name}</h4>
          <div className="info">
            <div className="popularity">
              <RiUserLine className="icon" />
              <p>{data?.popularity} K</p>
            </div>
            <div className="sparator"></div>
            <p className="role">{data?.known_for_department}</p>
            <div className="sparator"></div>
            <p className="gender">{genders[data?.gender]}</p>
          </div>
          <div className="links">
            {social?.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${social?.imdb_id}/`}
                target="_blank"
              >
                <img src={imdbIcon} alt="" />
              </a>
            )}
            {social?.instagram_id && (
              <a
                href={`https://www.instagram.com/${social?.instagram_id}`}
                target="_blank"
              >
                <RiInstagramLine />
              </a>
            )}
            {social?.tiktok_id && (
              <a
                href={`https://www.tiktok.com/@${social?.tiktok_id}`}
                target="_blank"
              >
                <RiTiktokLine />
              </a>
            )}
            {social?.twitter_id && (
              <a
                href={`https://twitter.com/${social?.twitter_id}`}
                target="_blank"
              >
                <RiTwitterLine />
              </a>
            )}
            {social?.youtube_id && (
              <a
                href={`https://www.tiktok.com/@${social?.tiktok_id}`}
                target="_blank"
              >
                <RiYoutubeLine />
              </a>
            )}
            {social?.facebook_id && (
              <a
                href={`https://www.facebook.com/${social?.tiktok_id}`}
                target="_blank"
              >
                <RiFacebookCircleLine />
              </a>
            )}
            {data?.homepage && (
              <a href={data?.homepage}>
                <RiEarthLine />
              </a>
            )}
          </div>
          <button onClick={addToFavorite}>
            <RiHeart2Fill className="icon" />
            <span>Favorite</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonContent;
