import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../../Loading';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isTrainer, loading } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loader tempLoad={true} full={true} />
        ) : !!user && isTrainer ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/signin?redirect=${window.location.pathname}`,
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
