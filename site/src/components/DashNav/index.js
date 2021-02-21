import React from 'react';
import { useSelector } from 'react-redux';
import hamburger from 'assets/icons/hambuger.png';
import notifyIcon from 'assets/bell.png';
import user_icon from 'assets/user_icon.png';
// import { log_out } from 'g_actions/user';

const NavBar = ({ open, grow }) => {
  const { user } = useSelector((state) => state.auth);

  // const logout = async () => {
  //   dispatch(log_out());
  //   history.push('/signin');
  // };

  return (
    <div className="header flex flex-row items-end justify-center fixed top-0 left-0 z-20 h-20 w-full px-5 lg:px-16">
      <aside
        className={`dh-aside h-full ${grow ? ' open' : ''}`}
        style={{ zIndex: '-20px' }}
      ></aside>
      <nav className="dash-nav flex flex-col xl:container mx-auto justify-center items-start h-full flex-grow overflow-hidden relative bg-v_light">
        <div className="nav-contents flex justify-between items-center h-full w-full">
          <div className="nav-icons flex-center">
            <img
              className="nav block lg:hidden w-9"
              onClick={open}
              src={hamburger}
              alt=""
            />
          </div>

          <div className="info flex-center">
            <img src={notifyIcon} alt="bell" className="w-6 h-6 mr-6" />
            <img
              key={user.profilePic}
              src={(user && user.profilePic) || user_icon}
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-3"
            />

            <p className="text-txt text-sm">
              {user && `${user.firstName} ${user.lastName}`}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
