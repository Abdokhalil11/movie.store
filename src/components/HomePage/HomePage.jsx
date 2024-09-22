import Companies from "../Companies/Companies";
import LastAdd from "../LastAdd/LastAdd";
import MostView from "../MostView/MostView";
import Persons from "../Persons/Persons";
import Recommend from "../Recommend/Recommend";
import Tailer from "../Tailer/Tailer";
import Trending from "../Trending/Trending";
import TvSeries from "../TvSeries/TvSeries";

const HomePage = () => {
  return (
    <>
      <Tailer />
      <LastAdd />
      <MostView />
      <TvSeries />
      <Companies />
      <Recommend />
      <Persons />
      <Trending />
    </>
  );
};

export default HomePage;
