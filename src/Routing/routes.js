import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { Home, BookAdd } from '../Components';
import Home from './../Components/Home';

const AppRoute = () => (
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    </>
);

export default AppRoute;