import image from "./peakpx__1_-removebg-preview.png";
import background from "./background.svg";
import Wrapper from "../../Wrapper/Wrapper";
import testi from "./testimonial.json";
import statasImage from "./statsImage.jpg";
import { RiDoubleQuotesL, RiUserLine } from "@remixicon/react";

const About = () => {
  return (
    <div className="about">
      <div className="first">
        <img src={image} alt="" className="character" />
        <img src={background} alt="background" className="bg" />
        <h2>About Us</h2>
      </div>
      <div className="tell-us">
        <h3>i Will Tell about How We Are</h3>
        <p>
          Welcome to our innovative <span>self-coding</span> website, where
          we've combined the power of technology with the magic of movies! Dive
          into our virtual <span>movie database</span> movie database, which is
          Designed by a big community of People, and embark on a journey through
          the vast landscape of cinematic wonders.
        </p>
      </div>
      <div className="advantages">
        <h3>The Advantages</h3>
        <div className="advantage">
          <p>
            Explore an extensive collection of movie details, from plot
            summaries and cast information to trailers and reviews, all
            meticulously organized and accessible at your fingertips.
          </p>
          <p>
            Our self-coded platform ensures a seamless and user-friendly
            experience, allowing you to effortlessly navigate through the world
            of cinema.
          </p>
          <p>
            Looking for a specific movie? Our powerful search feature harnesses
            the capabilities of our self-coding algorithms to quickly locate any
            film in our database.
          </p>
          <p>
            Simply type in the title, genre, or even a keyword, and let our
            system do the rest.
          </p>
          <p>
            With our self-coded platform as the backdrop, the possibilities for
            exploration and discovery are endless. So come on in, fellow
            cinephiles, and immerse yourself in the world of movies like never
            before.
          </p>
        </div>
      </div>
      <div className="testimonials">
        <h3>What People Says About Us</h3>
        <div className="testi">
          <Wrapper>
            {testi.slice(0, 5).map((el) => (
              <div className="testimonial">
                <RiDoubleQuotesL />
                <div className="body">{el.body}</div>
                <div className="footer">
                  <div className="image">
                    <RiUserLine />
                  </div>
                  <div className="info">
                    <p>{el.name}</p>
                    <a target="_blanck" href={"mailto:" + el.email}>
                      {el.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Wrapper>
        </div>
        <div className="testi two">
          <Wrapper>
            {testi.slice(5).map((el) => (
              <div className="testimonial">
                <RiDoubleQuotesL />
                <div className="body">{el.body}</div>
                <div className="footer">
                  <div className="image">
                    <RiUserLine />
                  </div>
                  <div className="info">
                    <p>{el.name}</p>
                    <a target="_blanck" href={"mailto:" + el.email}>
                      {el.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Wrapper>
        </div>
      </div>
      <div className="states">
        <h3>Let's Show Some States</h3>
        <div className="state-group">
          <div className="image">
            <img src={statasImage} alt="" />
          </div>
          <div className="stats-cricle">
            <div className="state">
              <div>
                <p>10</p>
                <span>Years History</span>
              </div>
              <div>
                <p>452</p>
                <span>Customer</span>
              </div>
            </div>
            <div className="state">
              <div>
                <p>80</p>
                <span>Architect</span>
              </div>
            </div>
            <div className="state">
              <div>
                <p>550</p>
                <span>Projects</span>
              </div>
            </div>
            <div className="state">
              <div>
                <p>350</p>
                <span>constructions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
