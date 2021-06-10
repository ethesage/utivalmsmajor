import React from 'react';
import { Link } from 'react-router-dom';
import { weeks } from 'helpers';
import class_icon from 'assets/icons/class_icon.png';
import './style.scss';

function HeadSection({
  index,
  full,
  list_desc,
  cohortId,
  data,
  isTrainer,
  isAdmin,
  courseId,
  addAssignment,
  classResources,
}) {
  const { title } = data;

  const assignment = classResources[data?.title].assignments;

  return (
    <div className="cx_header hx-main flex-row j-space relative">
      <h2 className={`h_con flex-row j-start  ${full ? ' full' : ''}`}>
        <img src={class_icon} alt="class" />{' '}
        <div className="flex-row j-space img">
          <span>
            {Number(index + 1) ? `${list_desc} ${weeks[index + 1]} - ` : ''}{' '}
            {title}
          </span>
          {(isAdmin || isTrainer) && full ? (
            <div className="edit_btns">
              {isAdmin && (
                <Link
                  to={`/admin/courses/classroom/${courseId}/${cohortId}/${data.id}/edit`}
                  className="edit"
                >
                  Edit Class
                </Link>
              )}

              <Link
                to=""
                className="edit"
                onClick={(e) => {
                  e.preventDefault();
                  addAssignment();
                }}
              >
                {assignment?.length <= 0 ? 'Add Assignment' : 'Edit Assignment'}
              </Link>
            </div>
          ) : null}
        </div>
      </h2>
    </div>
  );
}
export default HeadSection;
