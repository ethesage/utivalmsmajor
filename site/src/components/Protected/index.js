import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../../components/Loading';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect');

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loader tempLoad={true} full={true} />
        ) : !!user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/signin${redirect ? `redirect=${redirect}` : ''}`,
            }}
          />
        )
      }
    />
  );
};

export default memo(PrivateRoute);
