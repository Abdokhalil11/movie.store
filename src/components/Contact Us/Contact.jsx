import {
  RiArrowDownSLine,
  RiBarChartHorizontalLine,
  RiBubbleChartLine,
  RiChat1Line,
  RiChatSmile3Line,
  RiCoinsLine,
  RiDatabase2Line,
  RiInbox2Line,
  RiMailLine,
  RiMapPin2Line,
  RiMessage3Line,
  RiMoneyCnyBoxLine,
  RiPhoneLine,
  RiPlayCircleLine,
  RiUserSmileLine,
} from "@remixicon/react";

const Contact = () => {
  return (
    <div className="contact-us">
      <div className="contact">
        <div className="container">
          <div className="heading">
            <div className="logo">
              <RiBarChartHorizontalLine />
            </div>
            <h1>Contact Our Friend team</h1>
            <p>Let us know how we can help</p>
          </div>
        </div>
        <div className="contacting">
          <div>
            <div className="logo">
              <RiChatSmile3Line />
            </div>
            <div className="info">
              <p>Chat to feedback</p>
              <span>Speak to our team</span>
              <a href="#">feedback@ulitmate.com</a>
            </div>
          </div>
          <div>
            <div className="logo">
              <RiChat1Line />
            </div>
            <div className="info">
              <p>Chat to support</p>
              <span>Speak to our team</span>
              <a href="#">Support@ulitmate.com</a>
            </div>
          </div>
          <div>
            <div className="logo">
              <RiMapPin2Line />
            </div>
            <div className="info">
              <p>Visit Us</p>
              <span>visit in office HQ</span>
              <a href="#">view in google map</a>
            </div>
          </div>
          <div>
            <div className="logo">
              <RiPhoneLine />
            </div>
            <div className="info">
              <p>Call Us </p>
              <span>moi-fri from 8am-5pm</span>
              <a href="#">+0 (0000) 0000</a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="frequence-questions">
          <div className="heading">
            <div className="logo">
              <RiMessage3Line />
            </div>
            <h1>Frequence Asked Question</h1>
            <p>some questions that a some of people asked</p>
          </div>
          <div className="questions">
            <div className="question">
              <label className="question-header">
                <input type="checkbox" />
                <RiBubbleChartLine />
                <h3>Is there a free trial are available</h3>
                <RiArrowDownSLine />
              </label>
              <div className="question-content">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat exercitationem veniam, assumenda eos temporibus
                  tempore quis perspiciatis laudantium vitae quidem!
                </p>
              </div>
            </div>
            <div className="question">
              <label className="question-header">
                <input type="checkbox" />
                <RiDatabase2Line />
                <h3>can i change my plan later</h3>
                <RiArrowDownSLine />
              </label>
              <div className="question-content">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat exercitationem veniam, assumenda eos temporibus
                  tempore quis perspiciatis laudantium vitae quidem!
                </p>
              </div>
            </div>
            <div className="question">
              <label className="question-header">
                <input type="checkbox" />
                <RiMailLine />
                <h3>how can change my email address</h3>
                <RiArrowDownSLine />
              </label>
              <div className="question-content">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat exercitationem veniam, assumenda eos temporibus
                  tempore quis perspiciatis laudantium vitae quidem!
                </p>
              </div>
            </div>
            <div className="question">
              <label className="question-header">
                <input type="checkbox" />
                <RiCoinsLine />
                <h3>how does support work ? </h3>
                <RiArrowDownSLine />
              </label>
              <div className="question-content">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat exercitationem veniam, assumenda eos temporibus
                  tempore quis perspiciatis laudantium vitae quidem!
                </p>
              </div>
            </div>
            <div className="question">
              <label className="question-header">
                <input type="checkbox" />
                <RiPlayCircleLine />
                <h3>do you provide a tutorials</h3>
                <RiArrowDownSLine />
              </label>
              <div className="question-content">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat exercitationem veniam, assumenda eos temporibus
                  tempore quis perspiciatis laudantium vitae quidem!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form">
        <div className="container">
          <div className="heading">
            <div className="logo">
              <RiInbox2Line />
            </div>
            <h1>let's Get In Touch</h1>
            <p>send the feedback or any question</p>
          </div>
        </div>
        <form>
          <div className="name">
            <label htmlFor="">
              <span>firstName</span>
              <input
                type="text"
                name="firstName"
                placeholder="first Name"
                id=""
              />
            </label>
            <label htmlFor="">
              <span>LastName</span>
              <input
                type="text"
                name="lastName"
                placeholder="last Name"
                id=""
              />
            </label>
          </div>
          <label htmlFor="">
            <span>Email</span>
            <input type="email" name="Email" placeholder="Email" id="" />
          </label>
          <label htmlFor="">
            <span>Your Massage</span>
            <textarea name="message"></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
