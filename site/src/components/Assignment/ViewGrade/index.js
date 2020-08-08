import React, { useState, useEffect } from "react";
import ResourceBtn from "../../ResourceButton";
import assignment from "../../../assets/icons/course/assignment.png";
import Input from "../../Input";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import { axiosInstance, validate } from "../../../helpers";
import user_icon from "../../../assets/user_icon.png";
import Moment from "react-moment";
import "../../Classroom/Classes/style.scss";
import "./style.scss";

const ViewGrade = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const { addToast } = useToasts();
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const createComment = async () => {
    setLoading(true);
    const shouldSubmit = !validate(newComment, "comment");

    if (shouldSubmit) {
      addToast("Please ensure the form is completely and Correctly filled", {
        appearance: "error",
        autoDismiss: true,
      });

      setLoading(false);
      return;
    }

    const _comment = {
      // articleId: data.id,
      desc: newComment,
      user: user,
    };

    console.log(_comment);

    try {
      // await axiosInstance.post("/article/comment-create", _comment);

      setLoading(false);

      setNewComment("");
      setComments((comments) => [...comments, { ..._comment }]);
    } catch (err) {
      if (err.response.status === 401) {
        // disRef.current.showModal();
      }
      setLoading(false);
      return;
    }

    // return addToast("Network error please try again", {
    //   appearance: "error",
    //   autoDismiss: true,
    // });
  };

  const handleChange = (event, error) => {
    const { value } = event.target;
    setNewComment(value);
  };

  const getComments = async () => {
    if (comments) return;
    const _comments = await axiosInstance.get(`/article/comments/${data.id}`);
    setComments(_comments.data.comments);
  };

  useEffect(() => {
    setComments([
      {
        desc:
          "You need to indicate the key indices so as to ascertain the correctvalues",
        createdAt:
          "Sat Aug 08 2020 13:34:22 GMT+0100 (West Africa Standard Time)",
        user: {
          firstName: "Eyitayo",
          lastName: "Ogunmola",
          profilePic: "",
        },
      },
      {
        desc: "All noted sir",
        createdAt:
          "Sat Aug 08 2020 13:34:22 GMT+0100 (West Africa Standard Time)",
        user: {
          firstName: "Adekanbi",
          lastName: "Rex",
          profilePic: "",
        },
      },
    ]);

    return () => {};
  }, []);

  return (
    <section className="cx_listnx_con vx_gax">
      <div className="info_sec">
        <h2 className="cx_lis-header flex-row j-start full">
          <span>Week one - SQL For Data</span>
        </h2>
        <div className="cx_lis-content show full">
          <div className="inf_x">
            <h3>How to Query Data</h3>
            <div className="g_scx flex-row j-space">
              <p>Graded by:</p>
              <p>Eyitayo Ogunmola</p>
            </div>
            <div className="g_scx flex-row j-space">
              <p>Date Graded:</p>
              <p>10-june-2020</p>
            </div>
            <div className="g_scx flex-row j-space">
              <p>Grade:</p>
              <p>30%</p>
            </div>
          </div>
        </div>
        <div className="btn_sec_con flex-row j-start">
          <div className="btn_sec">
            <ResourceBtn
              img={assignment}
              text="View Assignment"
              color="off"
              link=""
              handleClick={(e) => {
                e.preventDefault();
                console.log("clicked");
              }}
            />
          </div>
        </div>
      </div>

      <div className="comments">
        <h3 className="title-sec">Comments</h3>
        <div>
          <div className="comment_con">
            {!comments ? (
              <div>Loading... </div>
            ) : comments.length === 0 ? (
              <p className="loading">No comments yet</p>
            ) : (
              <>
                {comments.map((comment, i) => (
                  <div
                    className="comment-sec flex-row j-start al-start"
                    key={`article_comment_${i}`}
                  >
                    <img
                      src={comment.user.profilePic || user_icon}
                      alt="profilePic"
                      className="logo cover"
                    />
                    <div className="text-sec">
                      <div className="u_name flex-row j-space">
                        <small className="name">
                          {comment.user.firstName} {comment.user.lastName}
                        </small>
                        <div>
                          <small>
                            <Moment format="YYYY/MM/DD HH:mm">
                              {comment.createdAt}
                            </Moment>
                          </small>
                        </div>
                      </div>
                      <p className="desc">{comment.desc}</p>
                    </div>
                  </div>
                ))}

                <div
                  className="loading"
                  style={{ display: loading ? "block" : "none" }}
                >
                  Loading...
                </div>
              </>
            )}
          </div>
          <form
            className="c_input flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              createComment();
            }}
          >
            <Input
              type="textarea"
              placeHolder="New Comment"
              name="comment"
              value={newComment}
              handleChange={handleChange}
              error="Comment should be at least 2 characters long and not more than 255 characters"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewGrade;
