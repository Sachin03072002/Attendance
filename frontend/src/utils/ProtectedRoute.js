import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated ? (
                <Redirect to="/dashboard" /> // Redirect to the dashboard or any other authorized page
            ) : (
                <Component {...props} />
            )
        }
    />
);

export default ProtectedRoute;
