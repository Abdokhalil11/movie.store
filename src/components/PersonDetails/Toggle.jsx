import { NavLink } from "react-router-dom";
const Toggle = () => {
  return (
    <div className="toggle">
      <div className="tricker"></div>
      <NavLink to="about">About</NavLink>
      <NavLink to="images">Images</NavLink>
      <NavLink to="movies">Movies</NavLink>
      <NavLink to="tvSeries">Tv Series</NavLink>
    </div>
  );
};

export default Toggle;
