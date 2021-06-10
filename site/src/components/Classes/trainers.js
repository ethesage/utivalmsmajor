import React from 'react';
import user_icon from 'assets/user_icon.png';
import './style.scss';

function ClassTrainers({ data, isAdmin, full }) {
  const handleImgError = (e) => {
    e.target.src = user_icon;
  };

  return (
    isAdmin &&
    full && (
      <div>
        <h4 style={{ margin: '40px 0 10px' }} className="theme-color">
          Trainer{data?.CohortTrainers.length > 1 ? 's' : ''}
        </h4>

        {data?.CohortTrainers.length > 0 ? (
          data.CohortTrainers.map((trainer) => (
            <div className="trainer flex-row j-start" key={trainer.id}>
              <img
                src={trainer.User?.profilePic || user_icon}
                alt="userimage"
                onError={handleImgError}
              />
              <div>
                <strong>
                  <p>
                    {trainer.User.firstName} {trainer.User.lastName}
                  </p>
                </strong>
                <small>{trainer.User.occupation}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No Trainer has been assigned to this class</p>
        )}
      </div>
    )
  );
}

export default ClassTrainers;
