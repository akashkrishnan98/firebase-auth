import React from "react";
import { RouteProps } from "react-router";
import { Route, Redirect } from "react-router-dom";
import PATHS from "../configs/routes_config";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser && Component ? (
          <Component {...props} />
        ) : (
          <Redirect to={PATHS.LOGIN} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
