import React, { useState, useEffect, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-skeleton-loader';
import { gradeAssignment } from 'g_actions/member';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import Moment from 'react-moment';
import Back from 'assets/icons/back';
import Button from 'components/Button';
import Input from 'components/Input';
import { axiosInstance, validate } from 'helpers';
import user_icon from 'assets/user_icon.png';
import Files from 'components/Files';
import deleteIcon from 'assets/icons/delete.png';
import '../Classes/style.scss';
import './style.scss';

const ViewGrade = ({
  data,
  length,
  assignmentId,
  currentClass,
  goBack,
  name,
  prevPath,
}) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { addToast } = useToasts();
  const submitBtn = useRef();
  const { user, isStudent } = useSelector((state) => state.auth);
  const [assData] = useState(data);
  const [grade, setGrade] = useState(data.grade || 0);
  const dispatch = useDispatch();

  useBreadcrumbs(
    [
      {
        name: 'Assignments',
        link: prevPath,
      },
      {
        name: `${assData?.User?.firstName} ${assData?.User?.lastName}`,
        link: '#',
      },
    ],
    !!prevPath && !!assData
  );

  // get comment data
  useEffect(() => {
    if (comments) return;
    if (!assData) return;

    (async () => {
      const comments_ = await axiosInstance.get(
        `assignment/comment/${assignmentId}`
      );

      setComments(comments_.data.data);
    })();

    return () => {};
  }, [assignmentId, comments, assData]);

  const createComment = async () => {
    setLoading(true);
    const shouldSubmit = !validate(newComment, 'comment');

    if (shouldSubmit) {
      addToast('Please ensure the form is completely and Correctly filled', {
        appearance: 'error',
        autoDismiss: true,
      });

      setLoading(false);
      return;
    }

    try {
      const _comment = await axiosInstance.post(
        `/assignment/comment/${assignmentId}`,
        { comment: newComment }
      );

      if (_comment) setLoading(false);

      setNewComment('');
      setComments((comments) => [
        ...comments,
        { ..._comment.data.data, User: user },
      ]);
    } catch (err) {
      if (err.response.status === 401) {
        // disRef.current.showModal();
      }

      setLoading(false);
      return addToast('Network error please try again', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const deleteComment = async (current_comment) => {
    setLoading(true);

    try {
      const _comment = await axiosInstance.delete(
        `/assignment/comment/${current_comment.id}`
      );

      if (_comment) setLoading(false);

      setComments((comments) =>
        comments.filter((comment) => comment.id !== current_comment.id)
      );

      setLoading(false);
    } catch (err) {
      if (err.response.status === 401) {
        // disRef.current.showModal();
      }

      setLoading(false);
      return addToast('Network error please try again', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const handleChange = (event, error) => {
    const { value } = event.target;
    setNewComment(value);
  };

  const gradeAss = (event) => {
    const { value } = event.target;

    setGrade(value);
  };

  const handleGrade = async () => {
    try {
      submitBtn.current.children[0].innerHTML = 'grading...';
      submitBtn.current.classList.add('loader');

      await axiosInstance.patch('/assignment/grade', {
        classId: assData.classId,
        assignmentId: assData.id,
        grade,
      });

      dispatch(gradeAssignment(name, assData.id, grade));

      submitBtn.current.children[0].innerHTML = 'Grade';
      submitBtn.current.classList.remove('loader');
      addToast('Assignment has been graded', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      submitBtn.current.children[0].innerHTML = 'Grade';
      submitBtn.current.classList.remove('loader');

      addToast('An error occured', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <section className="cx_listnx_con vx_gax">
      {!isStudent && (
        <div className="back flex-row j-start" onClick={goBack}>
          <Back />
          <p>Go back</p>
        </div>
      )}
      {assData ? (
        <>
          <div className="info_sec">
            <div className="h_con full">
              <h2 className="cx_lis-header flex-row j-start">
                <span>{currentClass.title}</span>
              </h2>
            </div>
            <div className="cx_lis-content show full">
              <div className="inf_x">
                {isStudent ? (
                  <>
                    <div className="g_scx flex-row j-space">
                      <p>Graded by:</p>
                      <p>{assData.gradedBy}</p>
                    </div>
                    <div className="g_scx flex-row j-space">
                      <p>Date Graded:</p>
                      <p>
                        <Moment format="DD-MM-YYYY HH:mm A">
                          {assData.gradeDate}
                        </Moment>
                      </p>
                    </div>
                    <div className="g_scx flex-row j-space">
                      <p>Grade:</p>
                      <p>{assData.grade}%</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="g_scx flex-row j-space">
                      <p>Submitted By:</p>
                      <p>{`${assData.User.firstName} ${assData.User.lastName}`}</p>
                    </div>
                    <div className="g_scx flex-row j-space">
                      <p>Date Submitted:</p>
                      <p>
                        <Moment format="DD-MM-YYYY HH:mm A">
                          {assData.submitDate}
                        </Moment>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Files files={[data]} showdrag={false} />
          </div>

          {!isStudent && (
            <form
              className="g_input flex-col al-start"
              onSubmit={(e) => {
                e.preventDefault();
                handleGrade();
              }}
            >
              <p className="hx">Grade</p>
              <Input
                placeHolder="Grade"
                name="grade"
                value={grade}
                handleChange={gradeAss}
                error=""
              />

              <Button text="Grade" className="flex-row" btnRef={submitBtn} />
            </form>
          )}

          <div className="comments">
            <h3 className="title-sec">Comments</h3>
            <div>
              <div className="comment_con">
                {!comments ? (
                  <div className="mb-10">Loading... </div>
                ) : comments.length === 0 ? (
                  <p className="loading mb-10">No comments yet</p>
                ) : (
                  <>
                    {comments.map((comment, i) => (
                      <div
                        className="comment-sec flex-row j-start al-start"
                        key={`article_comment_${i}`}
                      >
                        <img
                          src={comment?.User?.profilePic || user_icon}
                          alt="profilePic"
                          className="logo cover"
                        />
                        <div className="text-sec">
                          {new Date() - new Date(comment.createdAt) < 300000 &&
                            comment.userId === user.id && (
                              <button
                                onClick={() => deleteComment(comment)}
                                className="del_btn"
                              >
                                <img src={deleteIcon} alt="delete" />
                              </button>
                            )}
                          <div className="u_name flex-row j-space">
                            <small className="name">
                              {comment?.User?.firstName}{' '}
                              {comment?.User?.lastName}
                            </small>
                            <div>
                              <small>
                                <Moment format="DD-MM-YYYY HH:mm A">
                                  {comment.createdAt}
                                </Moment>
                              </small>
                            </div>
                          </div>
                          <p className="desc">{comment.comment}</p>
                        </div>
                      </div>
                    ))}

                    <div
                      className="loading mb-10"
                      style={{ display: loading ? 'block' : 'none' }}
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

                <Button text="Submit" className="flex-row" />
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-col" style={{ width: '100%', height: '100%' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={`file_loader_${i}`}
              style={{
                height: i === 1 ? '50px' : '10px',
                width: '80%',
                marginBottom: '5px',
              }}
            >
              <Skeleton width="100%" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ViewGrade;
