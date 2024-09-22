import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RiStarFill } from "@remixicon/react";
import Wrapper from "../../../Wrapper/Wrapper";
import GetGenre from "../../GetGenre/GetGenre";
import { apiContext } from "../../../Api_Context";
import SimilarLoading from "../Loading/SimilarLoading";
import useFetch from "../../UseFetch/useFetch";
const SimilarMovie = ({ movieId, filmType }) => {
  const [path, setPath] = useState("similar");
  const { url, key } = useContext(apiContext);
  const { data: similarVideos,isLoading } = useFetch(
    `/3/${filmType}/${movieId}/${path}`,
    path
  );

  useEffect(() => {
    if (similarVideos?.results.length === 0) {
      setPath("recommendations");
    }
  }, [similarVideos]);
  const { base_img } = useContext(apiContext);

  if (isLoading) {
    return <SimilarLoading />;
  }
  return (
    <div className="similar-video">
      <h4 className="title">Similar Movies</h4>
      <Wrapper controll={true}>
        {similarVideos?.results?.map((el) => (
          <Link
            to={"/details/" + filmType + "/" + el.id}
            className="lastMovie"
            key={el.id}
          >
            <img src={base_img + el.poster_path} alt="" />
            <div className="details">
              <h4>{el.title || el.name}</h4>
              <div className="rate">
                <RiStarFill className="icon" />
                {el.vote_average}
                {<GetGenre genre_ids={el.genre_ids} filmType={filmType} />}
              </div>
            </div>
          </Link>
        ))}
      </Wrapper>
    </div>
  );
};

export default SimilarMovie;
