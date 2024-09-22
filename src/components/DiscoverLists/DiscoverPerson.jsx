import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../UseFetch/useFetch";
import { RiStarFill, RiUserLine } from "@remixicon/react";
import { apiContext } from "../../Api_Context";
const DiscoverPerson = ({pageNumber}) => {
  const { listType } = useParams();
  const [allData, setAllData] = useState([]);
  const genders = {
    0: "not Known",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };
  const { data } = useFetch(
    "/3/person/popular",
    `page=${pageNumber}`,
    pageNumber
  );

  useEffect(() => {
    setAllData((prev) => [prev, data?.results].flat(1));
  }, [data]);
  const { base_img } = useContext(apiContext);
  return (
    <>
      {allData
        .filter((el) => el)
        .map((el,i) => (
          <Link to={"/person/" + el.id} className="discover" key={i}>
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
              <h4>{el.name || el.original_name}</h4>
              <div className="rate">
                <RiStarFill className="icon" />
                {el.popularity}
                <div className="separator"></div>
                <p className="gender">{genders[el.gender]}</p>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default DiscoverPerson;
