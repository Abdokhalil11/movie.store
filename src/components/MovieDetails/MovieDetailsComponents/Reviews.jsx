import { useContext, useState } from "react";
import useFetch from "../../UseFetch/useFetch";
import { apiContext } from "../../../Api_Context";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "@remixicon/react";
import ReviewLoading from "../Loading/ReviewLoading";
const Reviews = ({ movieId, filmType }) => {
  const { data: reviews, isLoading } = useFetch(
    `/3/${filmType}/${movieId}/reviews`
  );
  const [userReview, setUserReview] = useState("");
  const { base_backdrop, isLogin, currentUser } = useContext(apiContext);
  const [showFullReview, setShowFullReview] = useState(false);
  const [reviewSection, setReviewSection] = useState("reviewSection");
  const submitHandling = (e) => {
    if (isLogin) {
      fetch(url + "/3/" + type + "/" + movieId + "/rating" + key, {
        method: "POST",
        header: "Content-Type:application/json",
        body: JSON.stringify(userReview),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      navigate("/sign");
    }
    e.preventDefault();
  };
  console.log(reviews);
  if (isLoading) {
    return <ReviewLoading />;
  }
  return (
    <div className="reviews-section">
      <h4 className="title">Reviwes</h4>
      <ul className="list">
        <li
          className={reviewSection === "reviewSection" && "active"}
          onClick={() => setReviewSection("reviewSection")}
        >
          All Reviews
        </li>
        <li
          className={reviewSection !== "reviewSection" && "active"}
          onClick={() => setReviewSection("addReview")}
        >
          Add Review
        </li>
      </ul>
      {reviewSection == "reviewSection" ? (
        <div className="reviews">
          {reviews?.results?.length > 0 ? (
            reviews?.results.map((el) => (
              <div className="review" key={el.id}>
                <div className="rate">
                  <span>
                    <RiArrowDropUpLine />
                  </span>
                  <span>{el.author_details.rating}</span>
                  <span>
                    <RiArrowDropDownLine />
                  </span>
                </div>
                <div className="content">
                  <div className="user">
                    {el.author_details.avatar_path ? (
                      <img
                        src={base_backdrop + el.author_details.avatar_path}
                        alt=""
                      />
                    ) : (
                      <div className="img">{el.author_details.username[0]}</div>
                    )}
                    <p>{el.author_details.username}</p>
                    <div className="date">
                      <span>{el.created_at.split("T")[0]}</span>
                    </div>
                  </div>
                  <div className={"desciption"}>
                    <p>{el.content}</p>
                    <span
                      onClick={(e) =>
                        e.target.parentElement.classList.toggle("active")
                      }
                    >
                      ...Show More
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="not-found">
              No Review Found{" "}
              <span onClick={() => setReviewSection("addReview")}>
                Add Review
              </span>
            </p>
          )}
        </div>
      ) : (
        <div className="add-review">
          <div className="user">
            <div className="img">
              {isLogin ? currentUser.firstName[0] : "G"}
            </div>
          </div>
          <div className="user-review">
            <form onSubmit={submitHandling}>
              <textarea
                placeholder="Add Your Review"
                name="userReview"
                onInput={(e) => setUserReview(e.target.value)}
              ></textarea>
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
