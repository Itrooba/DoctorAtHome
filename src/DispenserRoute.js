import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './helpers/auth';

const DispenserRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() && isAuthenticated().role === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default DispenserRoute;