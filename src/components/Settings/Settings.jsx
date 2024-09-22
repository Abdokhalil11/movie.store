import { useContext } from "react";
import { apiContext } from "../../Api_Context";
const Settings = () => {
  const { hideOldContent, setHideOldContent } = useContext(apiContext);
  const hideOldContentHandler = () => {
    console.log(hideOldContent);
    setHideOldContent(!hideOldContent);
  };
  const lightModeHandler = (e) => {
    const body = document.querySelector("body");
    body.setAttribute("theme", e.target.checked ? "light" : "");
  };
  return (
    <div className="settings">
      <div className="container">
        <div className="heading">
          <h1>Settings</h1>
        </div>
        <div className="setting-header">
          <h3>General </h3>
        </div>
        <div className="setting">
          <div>
            <p>Switch Light Mode</p>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae rem commodi praesentium.
            </span>
          </div>
          <input type="checkbox" onChange={lightModeHandler} />
        </div>
        <div className="setting">
          <div>
            <p>Hide Adult Content</p>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae rem commodi praesentium.
            </span>
          </div>
          <input
            type="checkbox"
            name="hide old content"
            id=""
            onChange={hideOldContentHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
