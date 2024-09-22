import { useContext } from "react";
import { apiContext } from "../../Api_Context";
import Wrapper from "../../Wrapper/Wrapper";
import Loading from "../loadingSection/Loading";
import { Link } from "react-router-dom";
import { RiStarFill } from "@remixicon/react";
import GetGenre from "../GetGenre/GetGenre";
import useFetch from "../UseFetch/useFetch";
const LastAdd = () => {
  const { base_img } = useContext(apiContext);
  const { data: lastMovies, isLoading } = useFetch("/3/movie/upcoming");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="lastAddMovies" id="lastupdate">
      <div className="heading">
        <h3>LAST ADD MOVIES</h3>
      </div>
      <div className="lastMovies">
        <Wrapper controll={true} autoSlider={false}>
          {lastMovies?.results.map((el) => (
            <Link to={"/details/movie/" + el.id} className="lastMovie" key={el.id}>
              <img src={base_img + el.poster_path} alt="" />
              <div className="details">
                <h4>{el.title || el.name}</h4>
                <div className="rate">
                  <RiStarFill className="icon" />
                  {el.vote_average}
                  {<GetGenre genre_ids={el.genre_ids} filmType={"movie"} />}
                </div>
              </div>
            </Link>
          ))}
        </Wrapper>
      </div>
    </section>
  );
};

export default LastAdd;
