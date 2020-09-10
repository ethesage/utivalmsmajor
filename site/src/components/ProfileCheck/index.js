import React from 'react';
import Button from '../Button';
import './style.scss';

const ProfileCheck = ({ user, admin }) => {
  const link = admin ? '/admin/settings' : 'settings';

  return (
    <>
      {!user.profilePic || user.profilePic === '' ? (
        <div className="com-profile flex-row j-space">
          <p>Your profile is incomplete. Please update your profile</p>

          <Button
            className="p_btn short flex-row"
            link={link}
            text="Update Profile"
          />
        </div>
      ) : null}
    </>
  );
};

export default ProfileCheck;
