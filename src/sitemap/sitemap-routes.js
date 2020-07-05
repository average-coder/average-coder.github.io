import React from 'react';
import { Route, Switch } from 'react-router';

export default (
    <Switch>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/post/:slug" />
        <Route path="/search/:title" />
        <Route path="/request-post" />
    </Switch>
);