import React from "react";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard, LoginForm } from "./components";
import PATHS from "./configs/routes_config";
import ProtectedRoute from "./components/ProtectedRoute";
import SnackbarProvider from "./contexts/SnackBarContext";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <div className="App">
          <Router>
            <Switch>
              <ProtectedRoute
                path={PATHS.DASHBOARD}
                component={Dashboard}
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
        </div>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;
