import React from "react";
import SignUpForm from "./components/SignUpForm";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProfile, LoginForm } from "./components";
import PATHS from "./configs/routes-config";
import ProtectedRoute from "./components/ProtectedRoute";
import SnackbarProvider from "./contexts/SnackBarContext";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <ProtectedRoute
              exact
              path={PATHS.DASHBOARD}
              component={Dashboard}
            />
            <ProtectedRoute exact path={PATHS.FOLDERS} component={Dashboard} />
            <ProtectedRoute
              path={PATHS.USER_PROFILE}
              component={UserProfile}
              exact
            />
            <Route path={PATHS.LOGIN} component={LoginForm} exact />
            <Route path={PATHS.SIGN_UP} component={SignUpForm} exact />
            <Route
              path={PATHS.FORGOT_PASSWORD}
              component={ForgotPassword}
              exact
            />
            <ProtectedRoute
              path={PATHS.UPDATE_PROFILE}
              component={UpdateProfile}
              exact
            />
          </Switch>
        </Router>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;
