import React from "react";
import Avatar from '@material-ui/core/Avatar/index';
import __ from "helpers/globalHelpers";
import Button from "@material-ui/core/Button/index";
import {connect} from "react-redux";

import {openChangePassAccountDialog, openEditAccountDialog, showAccountLoader} from 'actions/Account';

class ProfileHeader extends React.Component {

    render() {
        const {userInfo} = this.props;
        let avatar = __.getAvatarImageByUrl(userInfo.user.avatar_url);
        avatar = avatar ? avatar : require('assets/images/avatars/avatar_unknown.png');

        return (
            <div className="jr-profile-banner">
                <div className="jr-profile-container">
                    <div className="jr-profile-banner-top">
                        <div className="jr-profile-banner-top-left">
                            <div className="jr-profile-banner-avatar">
                                <Avatar alt='Ảnh đại diện'
                                        src={avatar}
                                        className="size-90"/>
                            </div>
                            <div className="jr-profile-banner-avatar-info">
                                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">
                                    {userInfo.user.name}
                                </h2>
                                <p className="mb-0 jr-fs-lg text-center text-sm-left">Việt Nam</p>
                            </div>
                        </div>
                        <div className="jr-profile-banner-top-right">
                            <div className="d-flex align-items-center">
                                <Button variant="contained"
                                        className="jr-btn bg-info text-white jr-btn-sm"
                                        onClick={() => {
                                            this.props.openEditAccountDialog(userInfo.user)
                                        }}
                                >
                                    <i className="zmdi zmdi-info zmdi-hc-fw"/>
                                    <span>Cập nhật thông tin</span>
                                </Button>
                                <Button variant="contained"
                                        className="jr-btn bg-warning text-white jr-btn-sm"
                                        onClick={() => {
                                            this.props.openChangePassAccountDialog(userInfo.user)
                                        }}
                                >
                                    <i className="zmdi zmdi-lock zmdi-hc-fw"/>
                                    <span>Đổi mật khẩu</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {userInfo} = auth;
    return {userInfo}
};

export default connect(mapStateToProps, {
    showAccountLoader,
    openEditAccountDialog,
    openChangePassAccountDialog
})(ProfileHeader);

