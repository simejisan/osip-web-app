import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import {connect} from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {userSignOut} from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import __ from "helpers/globalHelpers";
import { withRouter } from "react-router-dom";

class UserInfo extends React.Component {

    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleRequestProfile() {
        this.props.history.push("/app/account");
        this.handleRequestClose();
    };

    render() {
        const {userInfo} = this.props;

        let avatar = __.getAvatarImageByUrl(userInfo.user.avatar_url);
        avatar = avatar ? avatar : require('assets/images/avatars/avatar_unknown.png');

        return (
            <div className="user-profile d-flex flex-row align-items-center">
                <Avatar
                    alt='Ảnh đại diện'
                    src={avatar}
                    className="user-avatar"
                />
                <div className="user-detail">
                    <h4 className="user-name" onClick={this.handleClick}>
                        {userInfo.user.name}
                        <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
                    </h4>
                </div>
                <Menu className="user-info"
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={this.state.open}
                      onClose={this.handleRequestClose}
                      PaperProps={{
                          style: {
                              minWidth: 120,
                              paddingTop: 0,
                              paddingBottom: 0
                          }
                      }}
                >
                    <MenuItem onClick={() => {this.handleRequestProfile()}}>
                        <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
                        <IntlMessages id="popup.profile"/>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        this.handleRequestClose();
                        this.props.userSignOut()
                    }}>
                        <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

                        <IntlMessages id="popup.logout"/>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = ({auth, settings}) => {
    const {locale} = settings;
    const {userInfo} = auth;
    return {userInfo, locale}
};
export default withRouter(connect(mapStateToProps, {userSignOut})(UserInfo));


