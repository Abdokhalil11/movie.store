import { useContext, useState } from "react";
import Wrapper from "../../Wrapper/Wrapper";
import { apiContext } from "../../Api_Context";
import data from "./data.json";
const Companies = () => {
  const [companies] = useState([...data]);
  const { base_img } = useContext(apiContext);

  return (
    <div className="companies">
      <div className="heading">
        <h3>SPONSERS</h3>
      </div>
      <Wrapper controll={true}>
        {companies.map((el) => (
          <div key={el.id}>
            <img src={base_img + el.logo_path} alt={el.name} />
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default Companies;
