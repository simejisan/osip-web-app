import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CustomScrollbars from 'util/CustomScrollbars';
import __ from "helpers/globalHelpers";
import {connect} from "react-redux";

class SidenavContent extends Component {
    componentDidMount() {
        const {history} = this.props;
        const that = this;
        const pathname = `${history.location.pathname}`;// get current path

        const menuLi = document.getElementsByClassName('menu');
        for (let i = 0; i < menuLi.length; i++) {
            menuLi[i].onclick = function (event) {
                for (let j = 0; j < menuLi.length; j++) {
                    const parentLi = that.closest(this, 'li');
                    if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
                        menuLi[j].classList.remove('open')
                    }
                }
                this.classList.toggle('open');
            }
        }

        const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
        try {
            const activeNav = this.closest(activeLi, 'ul'); // select closest ul
            if (activeNav.classList.contains('sub-menu')) {
                this.closest(activeNav, 'li').classList.add('open');
            } else {
                this.closest(activeLi, 'li').classList.add('open');
            }
        } catch (error) {

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContent) {
        const {history} = nextProps;
        const pathname = `${history.location.pathname}`;// get current path

        const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
        try {
            const activeNav = this.closest(activeLi, 'ul'); // select closest ul
            if (activeNav.classList.contains('sub-menu')) {
                this.closest(activeNav, 'li').classList.add('open');
            } else {
                this.closest(activeLi, 'li').classList.add('open');
            }
        } catch (error) {

        }
    }

    closest(el, selector) {
        try {
            let matchesFn;
            // find vendor prefix
            ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                if (typeof document.body[fn] == 'function') {
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
        const menuFunctions = __.formatFunctionsToMenuForm(this.props.userInfo.functions);

        return (
            <CustomScrollbars className=" scrollbar">
                <ul className="nav-menu">
                    {
                        menuFunctions.map((group, index) => (
                            <React.Fragment key={index}>
                                {
                                    group.parents.length > 0 ?
                                        <li className="nav-header">
                                            {group.name}
                                        </li> : <></>
                                }
                                {
                                    group.parents.map(parent => {
                                        if (parent.link && parent.link !== "") {
                                            return (
                                                <li className="menu no-arrow" key={parent.id}>
                                                    <NavLink to={parent.link}>
                                                        <i className={parent.icon}/>
                                                        <span className="nav-text">{parent.name}</span>
                                                    </NavLink>
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li className="menu" key={parent.id}>
                                                    <Button>
                                                        <i className={parent.icon}/>
                                                        <span className="nav-text">{parent.name}</span>
                                                    </Button>
                                                    <ul className="sub-menu">
                                                        {
                                                            parent.children.map(child => (
                                                                <li key={child.id}>
                                                                    <NavLink className="prepend-icon"
                                                                             to={child.link}>
                                                                        <span className="nav-text">{child.name}</span>
                                                                    </NavLink>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </React.Fragment>
                        ))
                    }
                </ul>
            </CustomScrollbars>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const {userInfo} = auth;
    return {userInfo}
};

export default withRouter(connect(mapStateToProps)(SidenavContent));
