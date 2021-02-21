import React from 'react';

const TrainerCardList = ({ data = [] }) => {
  return data.map((trainer, i) => (
    <TrainerCard trainer={trainer.User} key={`cohort_trainer_${i}`} />
  ));
};

const TrainerCard = ({ trainer }) => {
  return (
    <div className="flex mb-10">
      <img
        src={trainer.profilePic}
        alt=""
        className="w-20 h-20 rounded-full object-cover mr-10 flex-shrink-0"
      />
      <div>
        <h2 className="text-theme font-semibold mb-2 mt-3">{`${trainer.firstName} ${trainer.lastName}`}</h2>

        <p>{trainer.bio || ''}</p>
      </div>
    </div>
  );
};
export default TrainerCardList;
