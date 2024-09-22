import { useContext } from "react";
import { apiContext } from "../../Api_Context";
import { RiFilmFill, RiUserLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import Wrapper from "../../Wrapper/Wrapper";
import useFetch from "../UseFetch/useFetch";
const Persons = () => {
  const { base_img } = useContext(apiContext);
  const { data: trendingPerson } = useFetch("/3/person/popular");
  const genders = {
    0: "not Known",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };

  return (
    <div className="trending-persons">
      <div className="heading">
        <h3>Popular Persons</h3>
      </div>
      <Wrapper controll={true}>
        {trendingPerson?.results.map((el) => (
          <Link
            to={"/person/" + el.id}
            className="trending-person"
            key={el.id}
            title={el.name}
          >
            <div className="image">
              {el.profile_path ? (
                <img src={base_img + el.profile_path} alt="" />
              ) : (
                <div className="img"></div>
              )}
            </div>
            <div className="details">
              <h4>{el.name}</h4>
              <div className="rate">
                <RiUserLine className="icon" />
                {el.popularity}
              </div>
              <div className="genre"></div>
              <div className="media-type">
                <RiFilmFill className="icon" />
                {el.known_for_department}
              </div>
              <div className="original-lang">{genders[el.gender]}</div>
            </div>
          </Link>
        ))}
      </Wrapper>
    </div>
  );
};

export default Persons;
