import { Link } from "react-router-dom";
import { useContext } from "react";
import { apiContext } from "../../Api_Context";
import useFetch from "../UseFetch/useFetch";
const Categries = () => {
  const categriesImages = {
    Action: "ywI0yjDFKzY1bKahh0Z316a02Wt.jpg",
    Adventure: "bckxSN9ueOgm0gJpVJmPQrecWul.jpg",
    Animation: "4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    Comedy: "sDrYaCGIaTcXZvns04LjTtju0Vp.jpg",
    Crime: "sGGNrDPV8VFJzOTZOcsFiJ45Xp3.jpg",
    Documentary: "eca3tlO1vtnua8LUK70ISDMYcwF.jpg",
    Drama: "3IWpu6GaFuauuoXDJMtVfU2GgHK.jpg",
    Family: "dGvGymUeB8rW3holsqUwdRAVeIb.jpg",
    Fantasy: "yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    History: "f1AQhx6ZfGhPZFTVKgxG91PhEYc.jpg",
    Horror: "4woSOUD0equAYzvwhWBHIJDCM88.jpg",
    Music: "nV4nOG6ZCK8orRL7T5wXXgMdM0N.jpg",
    "Science Fiction": "q4aztOGdlXX2LTnTN3f4EegG9aB.jpg",
    War: "pBdQ4iorzRV2G38mdS6rzrmUfMA.jpg",
    Thriller: "oBIQDKcqNxKckjugtmzpIIOgoc4.jpg",
    Mystery: "8vTycw8CUbALmHSjQerJMKfUyQX.jpg",
    Romance: "nTPFkLUARmo1bYHfkfdNpRKgEOs.jpg",
    Western: "vRnioIL90Nt3IJAn5Sf1PqFyplV.jpg",
    "TV Movie": "wy3ItrIw4DmLFxvFK5LM6FPwdQw.jpg",
  };
  const { base_img } = useContext(apiContext);
  const { data: allGenre } = useFetch("/3/genre/" + "movie" + "/list");

  return (
    <div className="categries">
      {allGenre?.genres.map(({ name, id }) => (
        <Link to={"/lists/movie?genre=" + id} key={name} className="categrie">
          <img src={base_img + categriesImages[name]} />
          <span data-id={id}>{name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categries;
