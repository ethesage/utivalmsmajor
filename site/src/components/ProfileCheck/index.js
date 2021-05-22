import React from 'react';
import Button from '../Button';

const ProfileCheck = ({ user }) => {
  const link = user.role === 'admin' ? 'admin/settings' : 'settings';

  return (
    <>
      {!(user.bio && user.linkedin && user.profilePic) ? (
        <section className="flex mt-10 sm:flex-row justify-between items-center px-2 py-2 rounded-md flex-col bg-white">
          <p className="text-center sm:text-left">
            Your profile is incomplete. Please update your profile
          </p>

          <Button
            className="flex-row mt-3 sm:mt-0"
            link={link}
            text="Update Profile"
          />
        </section>
      ) : null}
    </>
  );
};

export default ProfileCheck;
