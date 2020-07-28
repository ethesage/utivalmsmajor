import React from "react";
import { Route, Redirect } from "react-router-dom";
import { get_user } from "../../helpers";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  const the_user = get_user();

  return (
    <Route
      {...rest}
      render={(props) =>
        !!user || !!the_user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
