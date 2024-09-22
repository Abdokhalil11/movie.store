import { useParams } from "react-router-dom";
import useFetch from "../../UseFetch/useFetch";
import { useContext } from "react";
import { apiContext } from "../../../Api_Context";
import { RiHeartFill, RiShape2Fill } from "@remixicon/react";
const PersonImages = () => {
  const { personId } = useParams();
  const { data, isLoading } = useFetch(`/3/person/${personId}/images`);
  const { base_img, base_backdrop } = useContext(apiContext);
  return (
    <div className="person-images">
      {data?.profiles ? (
        data?.profiles.map((el, i) => (
          <div className="image" key={i}>
            {el.file_path && <img src={base_img + el.file_path} />}
            <div className="other">
              <div className="like">
                <label>
                  <input type="checkbox" />
                  <RiHeartFill />
                </label>
                <span>{el.vote_average}</span>
              </div>
              <p>
                <RiShape2Fill className="icon" />
                <a href={base_backdrop + el.file_path} target="_blank">
                  {el.width} X {el.height}
                </a>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="not-found">Not Images Found</p>
      )}
    </div>
  );
};

export default PersonImages;
