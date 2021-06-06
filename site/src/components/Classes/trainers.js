import React from 'react';
import user_icon from 'assets/user_icon.png';
import './style.scss';

function ClassTrainers({ data }) {
  const handleImgError = (e) => {
    e.target.src = user_icon;
  };

  return (
    <div>
      {data?.CohortTrainers.length > 0 ? (
        data.CohortTrainers.map((trainer) => (
          <div className="mb-15 flex" key={trainer.id}>
            <img
              src={trainer.User?.profilePic || user_icon}
              alt="userimage"
              onError={handleImgError}
              className="flex-shrink-0 w-14 h-14 rounded-full mr-5 object-cover"
            />

            <div className="text-theme">
              <strong>
                <p>
                  {trainer.User.firstName} {trainer.User.lastName}
                </p>
              </strong>
              <small>{trainer.User.bio || trainer.User.occupation}</small>
            </div>
          </div>
        ))
      ) : (
        <p>No Trainer has been assigned to this class</p>
      )}
    </div>
  );
}

export default ClassTrainers;
