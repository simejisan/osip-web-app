import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from 'containers/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'containers/Footer';

import {
    ABOVE_THE_HEADER,
    BELOW_THE_HEADER,
    COLLAPSED_DRAWER,
    FIXED_DRAWER,
    HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import {isIOS, isMobile} from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';

import {setThemeColor} from 'actions/index';

import Tips from './routes/tips'
import Info from './routes/info'
import UserManager from './routes/userManager'

import __ from "helpers/globalHelpers";

class App extends React.Component {

    componentDidMount() {
        document.body.classList.add(this.props.themeColor);
        __.createNotification(`Chào mừng ${this.props.userInfo.user.name} đã quay trở lại!`, "Welcome back!", "success");
    }

    render() {

        const {match, drawerType, navigationStyle, horizontalNavPosition} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

        //set default height and overflow for iOS mobile Safari 10+ support.
        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height')
        } else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height')
        }

        return (
            <div className={`app-container ${drawerStyle}`}>
                {/*<Tour/>*/}

                <Sidebar/>
                <div className="app-main-container">
                    <div
                        className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
                        <TopNav styleName="app-top-header"/>}
                        <Header/>
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
                        <TopNav/>}
                    </div>

                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <Switch>
                                <Redirect exact from={`${match.url}/`} to={`${match.url}/trending`}/>

                                <Route path={`${match.url}/trending`}
                                       component={asyncComponent(() => import('./routes/trending'))}/>
                                <Route path={`${match.url}/suggestion`}
                                       component={asyncComponent(() => import('./routes/suggestion'))}/>
                                <Route path={`${match.url}/promotion`}
                                       component={asyncComponent(() => import('./routes/promotion'))}/>
                                <Route path={`${match.url}/flash-sale`}
                                       component={asyncComponent(() => import('./routes/flashsale'))}/>
                                <Route path={`${match.url}/function-manager`}
                                       component={asyncComponent(() => import('./routes/functionManager'))}/>
                                <Route path={`${match.url}/user-manager`}
                                       component={UserManager}/>
                                <Route path={`${match.url}/info`}
                                       component={Info}/>
                                <Route path={`${match.url}/tips`}
                                       component={Tips}/>
                                <Route path={`${match.url}/account`}
                                       component={asyncComponent(() => import('./routes/account'))}/>

                                <Route component={asyncComponent(() => import('./routes/extraPages/routes/404'))}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({auth, settings}) => {
    const {userInfo} = auth;
    const {themeColor, drawerType, navigationStyle, horizontalNavPosition} = settings;
    return {userInfo, themeColor, drawerType, navigationStyle, horizontalNavPosition}
};

export default withRouter(connect(mapStateToProps, {setThemeColor})(App));
