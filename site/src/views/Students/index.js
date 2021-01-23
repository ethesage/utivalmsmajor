/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { axiosInstance, stringSearch } from 'helpers';
import { getAllUsers, updateUser, getMoreUsers } from 'g_actions/users';
import useFetch from 'Hooks/useFetch';
import Select from 'components/Select';
import Toggle from 'components/Toggle';
import user_icon from 'assets/user_icon.png';
import Input from 'components/Input';
import T from 'components/Table';
import Loader from 'components/Loading';
import './style.scss';

const Users = () => {
  let initialState = {
    nameFilter: '',
    searchUsers: [],
    select: 'reset',
  };

  const dispatch = useDispatch();
  const { users, count, pageCount, currentPage } = useSelector(
    (state) => state.users
  );

  const [displayUsers, setdisplayedUsers] = useState(users);
  const { addToast } = useToasts();
  const [state, setState] = useState(initialState);
  const [loading, error, fetch] = useFetch(dispatch, !users.length, true);
  const [loadMore, setloadMore] = useState(false);
  const [pageNo, setPageNo] = useState(1);
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

  const getMore = async (num) => {
    setPageNo(num);

    setloadMore(true);
    await dispatch(getMoreUsers(num));
    setloadMore(false);
  };

  if (error) {
    <p>An Error ocurred</p>;
  }

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

  const updateUserStatus = async (id, status, user, role) => {
    try {
      let res = await axiosInstance.patch(
        role
          ? `user/changeRole/${id}/${role}`
          : status === 'active'
          ? `user/activate/${id}`
          : `user/deactivate/${id}`
      );

      document.querySelector('body').classList.remove('spinner1');

      addToast(`${res.data.message}`, {
        appearance: res.data.status === 200 ? 'success' : 'error',
        autoDismiss: true,
      });
    } catch (error) {
      const stat = status === 'active' ? 'inactive' : 'active';

      dispatch(
        updateUser({
          ...user,
          status: stat,
        })
      );

      if (state.select) {
        const name = role ? 'role' : 'status';
        const value = role ? user.role : stat;

        const newState = state.searchUsers.map((s_user) => {
          if (s_user.id === user.id) {
            return { ...user, [name]: value };
          }
          return s_user;
        });

        setState({
          ...state,
          searchUsers: newState,
        });
      }

      document.querySelector('body').classList.remove('spinner1');

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
        ({ firstName, lastName, location, email, occupation, role }) =>
          stringSearch(value, firstName) ||
          stringSearch(value, lastName) ||
          stringSearch(value, location) ||
          stringSearch(value, email) ||
          stringSearch(value, occupation) ||
          stringSearch(value, role)
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

  const handleUserStatusChange = (user) => {
    document.querySelector('body').classList.add('spinner1');
    const status = user.status === 'active' ? 'inactive' : 'active';
    dispatch(updateUser({ ...user, status }));

    if (state.searchUsers.length > 0) {
      const newState = state.searchUsers.map((s_user) => {
        if (s_user.id === user.id) {
          return { ...user, status };
        }
        return s_user;
      });

      setState({
        ...state,
        searchUsers: newState,
      });
    }

    updateUserStatus(user.id, status, user);
  };

  const handleRoleChange = async ({ target: { value, user } }) => {
    document.querySelector('body').classList.add('spinner1');

    await updateUserStatus(user.id, '', user, value);
    if (state.searchUsers.length > 0) {
      const newState = state.searchUsers.map((s_user) => {
        if (s_user.id === user.id) {
          return { ...user, role: user };
        }
        return s_user;
      });

      setState({
        ...state,
        searchUsers: newState,
      });
    }

    dispatch(updateUser({ ...user, role: value }));
  };

  let usersToRender = state.searchUsers.length
    ? state.searchUsers
    : displayUsers.splice(300 * (currentPage - 1), 300 * currentPage);

  const onError = (ref) => {
    ref.src = user_icon;
  };

  console.log(users);

  return (
    <>
      {!loading || loadMore ? (
        <section className="students dash-con flex-col al-start j-start">
          <nav className="filter-nav flex-row j-space">
            <div className="flex-row inp_sec j-start">
              <Input
                inputValidate={false}
                placeHolder="Search"
                value={state.nameFilter || ''}
                handleChange={handleChange}
                name="search"
                label="Search"
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
                label="Status"
              />
            </div>

            <Pagination
              activePage={Number(pageNo)}
              itemsCountPerPage={pageCount}
              totalItemsCount={count}
              pageRangeDisplayed={5}
              onChange={(num) => getMore(num)}
            />

            {/* <Select
              inputs={[
                { name: 'All', value: 'reset' },
                { name: 'Admin', value: 'admin' },
                { name: 'Trainer', value: 'trainer' },
                { name: 'Student', value: 'student' },
              ]}
              placeHolder="Role"
              value={state.select}
              handleSelect={handleSelect}
              label="Role"
            /> */}
          </nav>

          <T.Table
            keys={[
              'S/N',
              'Name',
              'Email',
              'Occupation',
              'Location',
              'Change Role',
              'Status',
            ]}
          >
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
                      //find a way to start from 300
                      'S/N': i + 300 * (currentPage - 1),
                      Occupation: user.occupation,
                      Location: user.region,
                      Status: (
                        <Toggle
                          key={user.email}
                          onClick={() => handleUserStatusChange(user)}
                          value={user.status === 'active' ? true : false}
                        />
                      ),
                      'Change Role': (
                        <Select
                          key={`${user.email}${user.occupation}`}
                          inputs={[
                            { name: 'Admin', value: 'admin' },
                            { name: 'Trainer', value: 'trainer' },
                            { name: 'Student', value: 'student' },
                          ]}
                          value={user.role}
                          handleSelect={(e) => {
                            handleRoleChange({ target: { ...e.target, user } });
                          }}
                        />
                      ),
                    }}
                  />
                ))}
              </T.Body>
            )}
          </T.Table>

          <div className="pn">
            <Pagination
              activePage={Number(pageNo)}
              itemsCountPerPage={100}
              totalItemsCount={count}
              pageRangeDisplayed={5}
              onChange={(num) => getMore(num)}
            />
          </div>
        </section>
      ) : (
        <Loader tempLoad={true} full={false} />
      )}
    </>
  );
};

export default Users;
//Add Staff ID
