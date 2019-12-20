import React from 'react';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";

import {getAllRole, hideRoleLoader, openAddRoleDialog, showRoleLoader} from 'actions/Role';
import {getAllFunction} from 'actions/Function';
import RoleCard from "./components/RoleCard";
import {Card} from 'reactstrap';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import RoleActionDialogs from "./components/RoleActionDialogs";

class UserRole extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filterRoles: [],
            isFiltering: false,
        };
    }

    componentDidMount() {
        this.props.hideRoleLoader();
        this.handleGetAllRoles();
        this.handleGetAllFunctions()
    }

    handleGetAllRoles() {
        this.props.showRoleLoader();
        this.props.getAllRole();
    }

    handleGetAllFunctions() {
        if (this.props.allFunctions.length <= 0) {
            this.props.getAllFunction();
        }
    }

    handleSearchValueChange = event => {
        const newValue = event.target.value;

        this.setState({
            searchValue: newValue
        });

        this.handleFilterRole(event, newValue);
    };

    handleFilterRole = (event, value = this.state.searchValue) => {
        event.preventDefault();

        if (value !== '') {
            this.setState({
                filterRoles: this.props.allRoles.filter(role => {
                    let label = role.label ? role.label.toLowerCase() : "";
                    let name = role.name ? role.name.toLowerCase() : "";
                    let description = role.description ? role.description.toLowerCase() : "";

                    return (
                        label.includes(value.toLowerCase()) ||
                        name.includes(value.toLowerCase()) ||
                        description.includes(value.toLowerCase())
                    )
                }),
                isFiltering: true
            })
        } else {
            this.setState({
                filterRoles: [],
                isFiltering: false
            })
        }
    };

    render() {
        const {roleLoader, allRoles} = this.props;

        let roleList = this.state.isFiltering ? this.state.filterRoles : allRoles;

        return (
            <div className="animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.userRole"/>}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow border-0 bg-white p-2">
                            <form className="m-0" role="search">
                                <div className="search-bar">
                                    <div className="form-group">
                                        <input type="search" className="form-control form-control-lg border-0"
                                               placeholder="Tìm kiếm tên hoặc mô tả vai trò..."
                                               onChange={this.handleSearchValueChange}/>
                                        <button className="search-icon" onClick={this.handleFilterRole}>
                                            <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            {
                                roleList.map(role => {
                                    return (
                                        <div key={role.id} className="col-lg-4 col-md-6">
                                            <RoleCard roleInfo={role}/>
                                        </div>
                                    )
                                })
                            }
                            <div className="col-lg-4 col-md-6">
                                <Tooltip id="tooltip-icon" title="Thêm mới" placement="bottom">
                                    <Card className="shadow border-0 bg-transparent">
                                        <Button
                                            className="w-100 d-flex justify-content-center h-100 text-primary p-5"
                                            onClick={() => {
                                                this.props.openAddRoleDialog()
                                            }}
                                        >
                                            <i className="zmdi zmdi-plus-1 zmdi-hc-5x m-5"/>
                                        </Button>
                                    </Card>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <RoleActionDialogs/>

                {
                    roleLoader &&
                    <div className="loader-view mt-3">
                        <CircularProgress/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({func, role}) => {
    const {allFunctions} = func;
    const {roleLoader, allRoles} = role;
    return {roleLoader, allFunctions, allRoles}
};

export default connect(mapStateToProps, {
    getAllRole,
    showRoleLoader,
    openAddRoleDialog,
    getAllFunction,
    hideRoleLoader
})(UserRole);
