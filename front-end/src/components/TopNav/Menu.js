import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import IntlMessages from 'util/IntlMessages';

class Menu extends Component {

    componentDidMount() {
        const {history} = this.props;

        const pathname = `#${history.location.pathname}`;// get current path
        const mainMenu = document.getElementsByClassName('nav-item');
        for (let i = 0; i < mainMenu.length; i++) {
            mainMenu[i].onclick = function () {
                for (let j = 0; j < mainMenu.length; j++) {
                    if (mainMenu[j].classList.contains('active')) {
                        mainMenu[j].classList.remove('active')
                    }
                }
                this.classList.toggle('active');
            }
        }
        const subMenuLi = document.getElementsByClassName('nav-arrow');
        for (let i = 0; i < subMenuLi.length; i++) {
            subMenuLi[i].onclick = function () {
                for (let j = 0; j < subMenuLi.length; j++) {
                    if (subMenuLi[j].classList.contains('active')) {
                        subMenuLi[j].classList.remove('active')
                    }
                }
                this.classList.toggle('active');
            }
        }
        const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
        try {
            const activeNav = this.closest(activeLi, 'ul'); // select closest ul
            if (activeNav.classList.contains('sub-menu')) {
                this.closest(activeNav, 'li').classList.add('active');
            } else {
                this.closest(activeLi, 'li').classList.add('active');
            }
            const parentNav = this.closest(activeNav, '.nav-item');
            if (parentNav) {
                parentNav.classList.add('active');
            }

        } catch (e) {

        }

    }

    closest(el, selector) {
        try {
            let matchesFn;
            // find vendor prefix
            ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                if (typeof document.body[fn] === 'function') {
                    matchesFn = fn;
                    return true;
                }
                return false;
            });

            let parent;

            // traverse parents
            while (el) {
                parent = el.parentElement;
                if (parent && parent[matchesFn](selector)) {
                    return parent;
                }
                el = parent;
            }
        } catch (e) {

        }

        return null;
    }


    render() {
        return (
            <div className="app-main-menu d-none d-md-block">
                <ul className="navbar-nav navbar-nav-mega">

                    <li className="nav-item">
                        <span className="nav-link"><IntlMessages id="sidebar.main"/></span>
                        <ul className="sub-menu">

                            <li className="nav-arrow">
                <span className="nav-link">
                  <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                  <span className="nav-text">
                                        <IntlMessages id="sidebar.dashboard"/>
                                    </span>
                </span>
                                <ul className="sub-menu">
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/dashboard/crypto">
                                            <span className="nav-text"><IntlMessages
                                                id="sidebar.dashboard.crypto"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/dashboard/listing">
                                            <span className="nav-text"><IntlMessages
                                                id="sidebar.dashboard.listing"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/dashboard/crm">
                                            <span className="nav-text"><IntlMessages id="sidebar.dashboard.crm"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/dashboard/intranet">
                                            <span className="nav-text"><IntlMessages
                                                id="sidebar.dashboard.intranet"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                        id="sidebar.dashboard.ecommerce"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/dashboard/news">
                                            <span className="nav-text"><IntlMessages
                                                id="sidebar.dashboard.news"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/dashboard/misc">
                                            <span className="nav-text"><IntlMessages
                                                id="sidebar.dashboard.misc"/></span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-arrow">
                <span className="nav-link">
                  <i className="zmdi zmdi-widgets zmdi-hc-fw"/>
                  <span className="nav-text">
                            <IntlMessages id="sidebar.widgets"/>
                                    </span>
                </span>
                                <ul className="sub-menu">
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/widgets/classic">
                                            <span className="nav-text"><IntlMessages id="sidebar.classic"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/widgets/modern">
                                            <span className="nav-text"><IntlMessages id="sidebar.modern"/></span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-arrow">
                   <span className="nav-link">
                   <i className="zmdi zmdi-trending-up zmdi-hc-fw"/>
                  <span className="nav-text">
                            <IntlMessages id="sidebar.metrics"/>
                                    </span>
                </span>

                                <ul className="sub-menu">
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/metrics/classic">
                                            <span className="nav-text"><IntlMessages id="sidebar.classic"/></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="prepend-icon" to="/app/metrics/modern">
                                            <span className="nav-text"><IntlMessages id="sidebar.modern"/></span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Menu);
