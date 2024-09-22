import { useContext, useEffect, useState, useRef, useReducer } from "react";
import {
  RiAlbumLine,
  RiArrowRightDoubleLine,
  RiCloseFill,
  RiFileCloseLine,
  RiFilmFill,
  RiFilmLine,
  RiMovie2Line,
  RiStarFill,
  RiUserLine,
} from "@remixicon/react";
import { Link, useSearchParams } from "react-router-dom";
import { apiContext } from "../../Api_Context";
import GetGenre from "../GetGenre/GetGenre";
import useFetch from "../UseFetch/useFetch";
const SearchDetails = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { url, key, base_img } = useContext(apiContext);
  const searchQurey = searchParam.get("q");
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState(data);
  const [isDragging, setIsDragging] = useState(false);
  const { data: allGenre } = useFetch("/3/genre/" + "movie" + "/list");
  const genders = {
    0: "not Known",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };
  const initialState = {
    type: "all",
    genres: [],
    rate: { rateOne: 0, rateTwo: 10 },
    dateRelease: { start: "", end: "" },
  };
  const [isCollapse, setIsCollapse] = useState(true);
  const types = ["person", "movie", "tv"];
  const reducer = (state, action) => {
    switch (action.type) {
      case "genresChange":
        const search = state.genres.findIndex((el) => el === action.payload);
        if (search !== -1) {
          const stateClone = [...state.genres];
          stateClone.splice(search, 1);
          return {
            ...state,
            genres: [...stateClone],
          };
        }
        return {
          ...state,
          genres: [...state.genres, action.payload],
        };
      case "typeChange":
        return { ...state, type: action.payload };
      case "rateChange":
        return { ...state, rate: { ...state.rate, ...action.payload } };
      case "dateChange":
        return {
          ...state,
          dateRelease: { ...state.dateRelease, ...action.payload },
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch(url + `/3/search/multi?query=${searchQurey}&` + key)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results), setDataFilter(data.results);
      });
  }, [searchQurey]);

  useEffect(() => {
    const dataClone = data;
    const typeRest = dataClone.filter((el) =>
      state.type == "all" ? el : el.media_type === state.type
    );
    const rateRest = typeRest.filter((el) =>
      state.rate.rateOne == initialState.rate.rateOne
        ? el
        : el.vote_average >= state.rate.rateOne
    );
    const dateRest = rateRest.filter((el) =>
      state.dateRelease.start == initialState.dateRelease.start
        ? el
        : (el.release_date > state.dateRelease.start &&
            el.release_date <= state.dateRelease.end) ||
          (el.first_air_date >= state.dateRelease.start &&
            el.first_air_date <= state.dateRelease.end)
    );
    const genresRest = dateRest.filter((el) =>
      state.genres.length === 0
        ? el
        : el.genre_ids?.some((el) => state.genres.includes(el))
    );
    setDataFilter(genresRest);
  }, [state]);

  const dateHandling = (e) => {
    dispatch({
      type: "dateChange",
      payload: { [e.target.dataset.date]: e.target.value },
    });
  };

  const genresHandling = (e) => {
    e.target.classList.toggle("active");
    const active = e.target.dataset.id;
    dispatch({ type: "genresChange", payload: +active });
  };

  const typeHandling = (e, el) => {
    dispatch({ type: "typeChange", payload: el });
  };

  const circleHandling = (e) => {
    const left = e.nativeEvent.offsetX;
    const top = e.nativeEvent.offsetY;
    e.target.style.setProperty("--x", left + "px");
    e.target.style.setProperty("--y", top + "px");
  };
  const collapse = () => {
    setIsCollapse(!isCollapse);
  };
  const filter = useRef();

  return (
    <>
      <div className="search-details">
        {dataFilter.length === 0 && (
          <div className="not-found">
            <RiFileCloseLine />
            <p>Not Found Result</p>
          </div>
        )}

        <div className="search-detail">
          <div className="search-details-movies">
            {dataFilter.map((el) =>
              el.media_type === "person" ? (
                <Link to={"/person/" + el.id} className="search-details-movie">
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
              ) : (
                <Link
                  to={`/details/${el.media_type}/` + el.id}
                  className="search-details-movie"
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
                    <h4>{el.title || el.name}</h4>
                    <div className="rate">
                      <RiStarFill className="icon" />
                      {el.vote_average}
                      {<GetGenre genre_ids={el.genre_ids} filmType={"movie"} />}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>

        <div className="filters" data-collapse={isCollapse} ref={filter}>
          <div className="filter-content">
            <h3>Filters</h3>
            <div className="types">
              <h4>Types</h4>
              <div className="types-group">
                {types.map((type) => (
                  <label onClick={(e) => typeHandling(e, type)}>
                    <input type="radio" name="type" />
                    <div className="type" date-type={type}>
                      {type == "person" ? (
                        <RiUserLine />
                      ) : type == "movie" ? (
                        <RiMovie2Line />
                      ) : (
                        <RiFilmLine />
                      )}
                      <span>
                        {data?.filter((el) => el.media_type === type).length}
                      </span>
                    </div>
                  </label>
                ))}
                <label onClick={(e) => typeHandling(e, "all")}>
                  <input type="radio" name="type" />
                  <div className="type">
                    <RiAlbumLine />
                    <span>{data?.length}</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="genres">
              <h4>GENRES</h4>
              <div className="genres-group" onMouseMove={circleHandling}>
                {allGenre?.genres.map(({ name, id }) => (
                  <span
                    key={name}
                    className="genre"
                    data-id={id}
                    onClick={genresHandling}
                    onMouseMove={circleHandling}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="rate">
              <h4>Rate</h4>
              <div className="rate-value">
                <span className="rate one">{state.rate.rateOne || 0}</span>
                <span className="rate two">10</span>
              </div>
              <div className="rate-group">
                <input
                  type="range"
                  max={10}
                  step={0.01}
                  onChange={(e) =>
                    dispatch({
                      type: "rateChange",
                      payload: { rateOne: +e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="date-release">
              <h4>Date Release</h4>
              <div className="date-release-group">
                <input
                  type="date"
                  name="dateRelease"
                  data-date={"start"}
                  onChange={dateHandling}
                />
                <RiArrowRightDoubleLine />
                <input
                  type="date"
                  name="dateRelease"
                  data-date={"end"}
                  onChange={dateHandling}
                />
              </div>
            </div>
            <button className="close" onClick={collapse}>
              <RiCloseFill />
            </button>
          </div>
        </div>
        <button
          className="open"
          onClick={() => setIsCollapse(!isCollapse)}
        ></button>
      </div>
    </>
  );
};

export default SearchDetails;
