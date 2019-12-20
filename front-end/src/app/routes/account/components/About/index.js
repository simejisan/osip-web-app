import React from "react";
import Widget from "components/Widget/index";
import AboutItem from "./AboutItem";
import Avatar from "@material-ui/core/Avatar";
import __ from "helpers/globalHelpers";
import {connect} from "react-redux";

class About extends React.Component {

    getRoleNameById(roleId) {
        let index = this.props.allRoles.findIndex(role => role.id === roleId);

        if (index >= 0) return this.props.allRoles[index].name;

        return "-"
    }

    render() {
        let avatar = __.getAvatarImageByUrl(__.getSavedAccountInfo().user.avatar_url);
        avatar = avatar ? avatar : require('assets/images/avatars/avatar_unknown.png');

        const aboutList = [
            {
                id: 1,
                title: 'Họ tên',
                icon: 'pin-account',
                userList: '',
                desc: [__.getSavedAccountInfo().user.name]
            },
            {
                id: 2,
                title: 'Email',
                icon: 'email',
                userList: '',
                desc: [__.getSavedAccountInfo().user.email]
            },
            {
                id: 3,
                title: 'Vai trò',
                icon: 'account-circle',
                userList: '',
                desc: [this.getRoleNameById(__.getSavedAccountInfo().user.role_id)]
            },
            {
                id: 4,
                title: 'Ảnh đại diện',
                icon: 'image',
                userList: [<Avatar key={0} alt=".." className="size-30" src={avatar}/>],
                desc: []
            }
        ];

        return (
            <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
                <div className="jr-tabs-classic">
                    <div className="jr-tabs-content jr-task-list">
                        <div className="row">
                            {
                                aboutList.map((about, index) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                                        <AboutItem data={about}/>
                                    </div>)
                                )
                            }
                        </div>
                    </div>
                </div>
            </Widget>
        );
    }
}


const mapStateToProps = ({role}) => {
    const {allRoles} = role;
    return {allRoles}
};

export default connect(mapStateToProps)(About);
