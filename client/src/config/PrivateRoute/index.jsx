import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../Context";
import LoadingPage from "../../components/atoms/LoadingPage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  const { isLogin, isLoading } = state;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <LoadingPage />
        ) : isLogin == true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
