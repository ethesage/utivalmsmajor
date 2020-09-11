import React from 'react';
import DropDown from 'components/DropDown';
import user_icon from 'assets/user_icon.png';
import './style.scss';

export const UserTableRow = ({ r1, r2, r3, r4, r5, r6 }) => {
  return (
    <div className="turx">
      <span className="cell flex-row j-start">{r1}</span>
      <span className="cell flex-row j-start">{r2}</span>
      <span className="cell flex-row j-start">{r3}</span>
      <span className="cell flex-row j-start">{r4}</span>
      <span className="cell flex-row j-start">{r5}</span>
      <span className="cell flex-row j-start">{r6}</span>
    </div>
  );
};

export const UserRow = () => {
  return (
    <UserTableRow
      r1={
        <div className="user_sec flex-row">
          <img src={user_icon} alt="user" />
          <p className="clipped-text" style={{ '--number': 1 }}>
            Adekabi Rex
          </p>
        </div>
      }
      r2={
        <span className="clipped-text" style={{ '--number': 1 }}>
          <abbr title="Data Analytics">Data Analytics</abbr>
        </span>
      }
      r3={'12-August-2020'}
      r4={'Lagos'}
      r5={2}
      r6={
        <DropDown>
          <ul>
            <li>View</li>
            <li>Delete</li>
          </ul>
        </DropDown>
      }
    />
  );
};
