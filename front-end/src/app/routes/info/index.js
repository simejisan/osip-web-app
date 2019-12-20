import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Pages = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/general`}/>
            <Route path={`${match.url}/general`} component={asyncComponent(() => import('./routes/general'))}/>
            <Route path={`${match.url}/contact-us`} component={asyncComponent(() => import('./routes/contactUs'))}/>
        </Switch>
    </div>
);

export default Pages;
