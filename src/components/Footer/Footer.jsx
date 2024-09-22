import { RiFacebookFill, RiGithubFill, RiLinkedinFill } from "@remixicon/react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer id="about">
      <div className="text">
        <p>Finally, We Pleasure You Are Enjoyed</p>
        <span> discover / watch / rating </span>
      </div>
      <div className="social">
        <Link>
          <RiFacebookFill className="icon" />
        </Link>
        <Link>
          <RiLinkedinFill className="icon" />
        </Link>
        <Link>
          <RiGithubFill className="icon" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
