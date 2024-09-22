import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../UseFetch/useFetch";
import {
  RiBarcodeLine,
  RiFileFill,
  RiFileLine,
  RiFilmFill,
  RiGroup2Line,
  RiHome6Line,
  RiPagesLine,
  RiStarFill,
  RiTicket2Line,
  RiUser3Line,
  RiUser4Fill,
  RiUser4Line,
  RiWalletLine,
} from "@remixicon/react";
import GetGenre from "../GetGenre/GetGenre";
import { apiContext } from "../../Api_Context";
import DiscoverPerson from "./DiscoverPerson";
import { useSearchParams } from "react-router-dom";
import Loader from "../InfiniteLoading/Loader";
const Discover = () => {
  const { listType } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [qureySearch, setQureySearch] = useSearchParams();
  const genre = qureySearch.get("genre");
  const { data } = useFetch(
    "/3/discover/" + listType,
    `page=${pageNumber}`,
    listType,
    pageNumber
  );
  const { url, key } = useContext(apiContext);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    fetch(`${url}/3/discover/${listType}?${key}`)
      .then((res) => res.json())
      .then((d) => setAllData(d.results));
  }, []);

  useEffect(() => {
    function scrollHandle() {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollHeight - clientHeight - 300 <= scrollTop) {
        setPageNumber(pageNumber + 1);
        setAllData([...allData, ...data?.results]);
        console.log(pageNumber);
      }
    }
    window.addEventListener("scroll", scrollHandle);
    return () => window.removeEventListener("scroll", scrollHandle);
  }, [, data, pageNumber]);
  const { base_img } = useContext(apiContext);
  return (
    <>
      <div className="discovers">
        {listType == "person" ? (
          <DiscoverPerson pageNumber={pageNumber} />
        ) : (
          allData
            ?.filter((el) => (genre ? el?.genre_ids.includes(+genre) : el))
            .map((el, i) => (
              <Link
                to={`/details/${listType}/` + el.id}
                className="discover"
                key={i}
              >
                <div className="image">
                  {el.poster_path ? (
                    <img src={base_img + el.poster_path} alt="" />
                  ) : (
                    <div className="img">
                      <RiFilmFill />
                    </div>
                  )}
                </div>
                <div className="details">
                  <h4>{el.title || el.name || el.original_name}</h4>
                  <div className="rate">
                    <RiStarFill className="icon" />
                    {el.vote_average}
                    {<GetGenre genre_ids={el.genre_ids} filmType={listType} />}
                  </div>
                </div>
              </Link>
            ))
        )}

        <Loader />
      </div>
      <div className="navBar">
        <div>
          <RiGroup2Line size={30} />
          <span>{allData?.length}</span>
        </div>
        <div>
          <RiPagesLine size={30} />
          <span>{pageNumber}</span>
        </div>
      </div>
    </>
  );
};

export default Discover;
