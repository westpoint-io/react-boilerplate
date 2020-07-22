import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login/Login';
// import Login from '@pages/Login/Login';

export default function Routes() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
        </Switch>
    );
}
