import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';


const ExtraPages = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/account`}/>
            <Route path={`${match.url}/account`} component={asyncComponent(() => import('./routes/userAccount'))}/>
            <Route path={`${match.url}/role`} component={asyncComponent(() => import('./routes/userRole'))}/>
            <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
        </Switch>
    </div>
);

export default ExtraPages;
