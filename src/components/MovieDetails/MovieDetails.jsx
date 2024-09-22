import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { apiContext } from "../../Api_Context";

import Reviews from "./MovieDetailsComponents/Reviews";
import MovieTailer from "./MovieDetailsComponents/MovieTailer";
import MovieVideos from "./MovieDetailsComponents/MovieVideos";
import ImageGallery from "./MovieDetailsComponents/ImageGallery";
import SimilarMovie from "./MovieDetailsComponents/SimilarMovie";
import TvSeasons from "./MovieDetailsComponents/TvSeasons";
import LastEpisode from "./MovieDetailsComponents/LastEpisode";
import useFetch from "../UseFetch/useFetch";
import Episodes from "./MovieDetailsComponents/Episodes";
const MovieDetails = () => {
  const { movieId, type } = useParams();
  const navigate = useNavigate();
  const { data } = useFetch(`/3/${type}/${movieId}`);
  const [seasonNumber, setSeasonNumber] = useState(1);
  return (
    <div className="movie-details">
      <MovieTailer movieId={movieId} filmType={type} />
      {type == "movie" && <MovieVideos movieId={movieId} filmType={type} />}
      {type == "tv" && (
        <LastEpisode data={data} setSeasonNumber={setSeasonNumber} />
      )}
      {type == "tv" && (
        <TvSeasons
          data={data}
          setSeasonNumber={setSeasonNumber}
          seasonNumber={seasonNumber}
        />
      )}
      {type == "tv" && (
        <Episodes
          seasonNumber={seasonNumber}
          movieId={movieId}
          filmType={type}
        />
      )}
      <ImageGallery movieId={movieId} filmType={type} />
      <Reviews movieId={movieId} filmType={type} />

      <SimilarMovie movieId={movieId} filmType={type} />
    </div>
  );
};

export default MovieDetails;
