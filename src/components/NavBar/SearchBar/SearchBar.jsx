import { RiSearchLine } from "@remixicon/react";
import { useContext, useEffect, useState } from "react";
import { apiContext } from "../../../Api_Context";
import SearchBodyFormat from "./SearchBodyFormat/SearchBodyFormat";
const SearchBar = ({ showSearchBar, setShowSearchBar }) => {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { url, key } = useContext(apiContext);

  useEffect(() => {
    fetch(url + `/3/search/multi?query=${searchKey}&` + key)
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, [searchKey]);

  const hideSearchBox = () => {
    setShowSearchBar(false);
  };
  return (
    <div
      className="search-bar"
      data-show={showSearchBar}
      onKeyDown={(e) => e.key === "Escape" && hideSearchBox()}
      onClick={(e) => e.target.dataset.show && hideSearchBox()}
    >
      <div className="search-content">
        <div className="search-input">
          <RiSearchLine className="icon" />
          <input
            type="search"
            placeholder="Search A SomeThing"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <div className="search-body">
          {!searchKey ? (
            "No Recent Search"
          ) : (
            <SearchBodyFormat data={data} searchKey={searchKey} />
          )}
        </div>
        <div className="search-footer">
          <div className="instruction">
            <div className="esc">
              <div className="icon">esc</div>
              <p>to close</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
