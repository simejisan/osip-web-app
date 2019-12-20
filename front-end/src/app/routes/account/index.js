import React, {Component} from "react";
import About from "./components/About/index";
import ProfileHeader from "./components/ProfileHeader";
import Auxiliary from "../../../util/Auxiliary";
import ProfileActionDialogs from "./components/ProfileActionDialogs";
import Favorite from "./components/Favorite";
import {hideAccountLoader} from 'actions/Account';
import {getAllFavorite, hideFavoriteLoader, showFavoriteLoader} from 'actions/Favorite';
import {connect} from "react-redux";
import {getAllRole} from 'actions/Role';

class Profile extends Component {

    componentDidMount() {
        this.props.hideAccountLoader();
        this.props.hideFavoriteLoader();

        this.handleGetAllRoles();
        this.handleGetAllFavorites();
    }

    handleGetAllRoles() {
        if (this.props.allRoles.length <= 0) {
            this.props.getAllRole();
        }
    }

    handleGetAllFavorites() {
        if (this.props.allFavorites.length <= 0) {
            this.props.showFavoriteLoader();
            this.props.getAllFavorite(this.props.userInfo.user.id);
        }
    }

    render() {
        return (
            <div className="app-wrapper">
                <Auxiliary>
                    <ProfileHeader/>
                    <div className="jr-profile-content">
                        <div className="row">
                            <div className="col-md-12">
                                <About/>
                            </div>
                            <div className="col-md-12">
                                <Favorite/>
                            </div>
                        </div>
                    </div>
                </Auxiliary>

                <ProfileActionDialogs/>
            </div>
        );
    }
}

const mapStateToProps = ({auth, role, favorite}) => {
    const {userInfo} = auth;
    const {allRoles} = role;
    const {allFavorites} = favorite;
    return {userInfo, allRoles, allFavorites}
};

export default connect(mapStateToProps,
    {
        getAllRole,
        getAllFavorite,
        hideAccountLoader,
        hideFavoriteLoader,
        showFavoriteLoader
    }
)(Profile);



