/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance, stringSearch } from 'helpers';
import { getAllUsers, updateUser } from 'g_actions/users';
import useFetch from 'Hooks/useFetch';
import Select from 'components/Select';
import Button from 'components/Button';
import user_icon from 'assets/user_icon.png';
import Input from 'components/Input';
import T from 'components/Table';
import Loader from 'components/Loading';
import './style.scss';

const Users = ({ sidebar }) => {
  let initialState = {
    nameFilter: '',
    searchUsers: [],
    select: 'reset',
  };

  const dispatch = useDispatch();
  const {
    users,
    auth: { isCompanyAdmin },
  } = useSelector((state) => state);
  const [displayUsers, setdisplayedUsers] = useState(users);
  const { addToast } = useToasts();
  const [state, setState] = useState(initialState);
  const { push } = useHistory();
  const [loading, error, fetch] = useFetch(dispatch, !users.length, true);
  const imgref = [];

  useEffect(() => {
    (async () => {
      if (loading) {
        fetch(() => getAllUsers());
      }
    })();
  }, [loading, fetch]);

  useEffect(() => {
    setdisplayedUsers(users);
  }, [users]);

  if (error) {
    <p>An Error ocurred</p>;
  }

  const updateUserStatus = async (id, status) => {
    try {
      let res = await axiosInstance.patch(
        status === 'active' ? `users/${id}/activate` : `users/${id}/deactivate`
      );
      addToast(`${res.data.Message}`, {
        appearance: res.data.status === 200 ? 'success' : 'error',
        autoDismiss: true,
      });
    } catch (error) {
      addToast('No network connection', {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 10000,
      });
    }
  };

  const handleChange = ({ target: { value } }) => {
    setState({ ...state, nameFilter: value });
    if (state.nameFilter !== '') {
      const searchResult = displayUsers.filter(
        ({ firstName, lastName, department, email, status }) =>
          stringSearch(value, firstName) ||
          stringSearch(value, lastName) ||
          stringSearch(value, department) ||
          stringSearch(value, email) ||
          stringSearch(value, status)
      );
      setState({ ...state, nameFilter: value, searchUsers: searchResult });
    } else {
      setState({
        ...state,
        searchUsers: [],
        nameFilter: value,
      });
    }
  };

  const handleSelect = ({ target: { value } }) => {
    const results =
      value === 'reset'
        ? []
        : displayUsers.filter((user) => user.status === value);
    setState({
      ...state,
      searchUsers: results,
      select: value,
    });
  };

  const handleUserStatusChange = (user) => {
    const status = user.status === 'active' ? 'inactive' : 'active';
    // dispatch(updateUser({ ...user, status }));
    updateUserStatus(user.id, status);
  };

  let usersToRender = state.searchUsers.length
    ? state.searchUsers
    : displayUsers;

  const onError = (ref) => {
    ref.src = user_icon;
  };

  return (
    <>
      {!loading ? (
        <section className="students dash-con flex-col al-start j-start">
          <nav className="filter-nav flex-row j-space">
            <Input
              inputValidate={false}
              placeHolder="Search Name"
              value={state.nameFilter || ''}
              handleChange={handleChange}
            />

            <Select
              inputs={[
                { name: 'All', value: 'reset' },
                { name: 'Active', value: 'active' },
                { name: 'Inactive', value: 'inactive' },
              ]}
              placeHolder="Status"
              value={state.select}
              handleSelect={handleSelect}
            />
          </nav>

          <T.Table keys={['S/N', 'Name', 'Email', 'Role', 'Enable User']}>
            {({ keys }) => (
              <T.Body keys={keys}>
                {usersToRender.map((user, i) => (
                  <T.Trow
                    key={`mkeys_${i}`}
                    values={{
                      Name: (
                        <div className="usr_img flex-row j-start">
                          <img
                            src={user.photo}
                            alt={''}
                            ref={(ref) => (imgref[i] = ref)}
                            onError={() => onError(imgref[i])}
                            key={user.photo}
                          />
                          <p>
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      ),
                      Email: user.email,
                      'S/N': i + 1,
                      'Enable User': (
                        // <Button.Toggle
                        //   key={user.email}
                        //   onClick={() => handleUserStatusChange(user)}
                        //   value={user.status === 'active' ? true : false}
                        // />
                        <div></div>
                      ),
                      'Staff ID': user.staffId,
                      Role: user?.role?.split('_').join(' '),
                    }}
                  />
                ))}
              </T.Body>
            )}
          </T.Table>
        </section>
      ) : (
        <Loader tempLoad={true} full={false} />
      )}
    </>
  );
};

export default Users;
//Add Staff ID
