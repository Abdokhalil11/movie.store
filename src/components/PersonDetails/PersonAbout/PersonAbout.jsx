import { useParams } from "react-router-dom";
import useFetch from "../../UseFetch/useFetch";
import { useRef } from "react";

const PersonAbout = () => {
  const { personId } = useParams();
  const { data } = useFetch(`/3/person/${personId}`);
  const { data: social } = useFetch(`/3/person/${personId}/external_ids`);
  const age =
    (new Date() - new Date(data?.birthday)) / (1000 * 60 * 60 * 24 * 365);

  return (
    <div className="person-about">
      <div className="separator">
        <span></span>
        <span></span>
      </div>
      <aside>
        <h4>Personal About : </h4>
        <div className="know-as">
          <h5>Know As </h5>
          {data?.also_known_as.map((el) => (
            <p key={el}>{el}</p>
          ))}
        </div>
        <div className="brithday">
          <h5>BrithDay</h5>
          <p>{data?.birthday}</p>
        </div>
        <div className="current-age">
          <h5>CurrentAge</h5>
          <p>{age.toFixed(0)} Year</p>
        </div>
        <div className="brithplace">
          <h5>BrithPlace</h5>
          <p>{data?.place_of_birth}</p>
        </div>
      </aside>
      <div className="biograph">
        <h5>Biography : </h5>
        {data?.biography.split(". ").map((el) => (
          <p>{el}</p>
        ))}
      </div>
    </div>
  );
};

export default PersonAbout;
