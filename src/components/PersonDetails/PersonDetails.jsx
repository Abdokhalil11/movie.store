import PersonContent from "./PersonContent";
import Toggle from "./Toggle";
import useFetch from "../UseFetch/useFetch";
import { Outlet, useParams } from "react-router-dom";
const PersonDetails = () => {
  const { personId } = useParams();
  const { data } = useFetch(`/3/person/${personId}`);
  const { data: social } = useFetch(`/3/person/${personId}/external_ids`);
  return (
    <div className="person-details">
      <div className="container">
        <PersonContent data={data} social={social} />
        <Toggle />
        <Outlet />
      </div>
    </div>
  );
};

export default PersonDetails;
