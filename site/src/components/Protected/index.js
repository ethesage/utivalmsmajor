import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../../components/Loading';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, user } = useSelector((state) => state.auth);

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
              pathname: `/auth/signin?redirect=${window.location.pathname}`,
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
