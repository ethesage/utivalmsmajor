import React from "react";
import Button from "../Button";
import "./style.scss";

const ProfileCheck = ({ user }) => {
  const link = user.role === "admin" ? "admin/settings" : "settings";

  return (
    <>
      {!(user.bio && user.linkedin && user.profilePic) ? (
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
