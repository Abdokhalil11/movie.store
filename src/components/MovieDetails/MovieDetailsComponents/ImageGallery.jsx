/* eslint-disable react/prop-types */
import { RiImage2Line, RiStarFill } from "@remixicon/react";
import useFetch from "../../UseFetch/useFetch";
import { apiContext } from "../../../Api_Context";
import { useContext, useState } from "react";
import Wrapper from "../../../Wrapper/Wrapper";
import GalleryLoading from "../Loading/GalleryLoading";
const ImageGallery = ({ movieId, filmType }) => {
  const { data: images, isLoading } = useFetch(
    "/3/" + filmType + "/" + movieId + "/images"
  );
  const [media, setMedia] = useState("backdrops");
  const gallery = ["backdrops", "posters", "logos"];
  const { base_img } = useContext(apiContext);
  if (isLoading) {
    return <GalleryLoading />;
  }
  const fn = (e, el) => {
    setMedia(el);
  };
  return (
    <div className="image-gallery">
      <h4 className="title">{media} </h4>
      <div className="images-poster">
        <ul className="list">
          {gallery.map((el) => (
            <li onClick={(e) => fn(e, el)} className={media == el && "active"}>
              {el} <span>{images?.[el].length}</span>
            </li>
          ))}
        </ul>
        <Wrapper controll={true}>
          {images?.[media].length === 0 ? (
            <>
              <div className="not-found">Not Found An Image</div>
            </>
          ) : (
            images?.[media].map((el, i) => (
              <div key={i} className="medias">
                <img src={base_img + el.file_path} alt="" className={media} />
                <div className="details">
                  <div className="star">
                    <RiStarFill className="star-icon" />
                    {el.vote_average}
                    <span>{el.iso_639_1}</span>
                  </div>
                  <div className="progress">
                    Vote Count
                    <span
                      style={{
                        backgroundImage: `conic-gradient(#6f5ed5 ${
                          el.vote_count * 3.6 * 2
                        }deg,#fff 0deg)`,
                      }}
                      data-progress={el.vote_count + "%"}
                    ></span>
                  </div>
                </div>
              </div>
            ))
          )}
        </Wrapper>
      </div>
    </div>
  );
};

export default ImageGallery;
