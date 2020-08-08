import React, { useState } from "react";
import ResourceBtn from "../../ResourceButton";
import assignment from "../../../assets/icons/course/assignment.png";
import Input from "../../Input";
import { axiosInstance } from "../../../helpers";
import "../../Classroom/Classes/style.scss";

const ViewGrade = ({data}) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const createComment = () => {};

  const handleChange = (event, error) => {
    const { value } = event.target;
    setNewComment(value);
  };

  const getComments = async () => {
    if (comments) return;
    const _comments = await axiosInstance.get(`/article/comments/${data.id}`);
    setComments(_comments.data.comments);
  };

  return (
    <section className="asx cx_listnx_con vx_gax">
      <div className="info_sec">
        <h2 className="cx_lis-header flex-row j-start full">
          <span>Week one - SQL For Data</span>
        </h2>
        <div className="cx_lis-content show full">
          <div className="inf_x">
            <h3>How to Query Data</h3>
            <div>
              <p>Graded by:</p>
              <p>Eyitayo Ogunmola</p>
            </div>
            <div>
              <p>Date Graded:</p>
              <p>10-june-2020</p>
            </div>
            <div>
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
        <div className="title-sec flex-row">
          <h2>Comments</h2>
        </div>
        <div>
          <div className="comment_con">
            {!comments ? (
              <div>Loading... </div>
            ) : comments.length === 0 ? (
              <p className="loading">
                No comments yet, be the first to add a comment
              </p>
            ) : (
              <>
                {comments.map((comment, i) => (
                  <div
                    className="comment-sec flex-row"
                    key={`article_comment_${i}`}
                  >
                    <div className="logo">
                      <div
                        className="rounded flex-row"
                      >
                        <p>{comment.username[0].toUpperCase()}</p>
                      </div>
                      <small className="name">{comment.username}</small>
                    </div>
                    <p>{comment.body}</p>
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
          <form className="c_input flex-col">
            <Input
              type="textarea"
              placeHolder="New Comment"
              name="comment"
              required={true}
              value={newComment}
              handleChange={handleChange}
              error="Comment should be at least 2 characters long and not more than 255 characters"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                createComment();
              }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewGrade;
