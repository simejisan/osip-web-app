import React from 'react';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import CommonDataTable from 'components/CommonDataTable'
import TableRow from "@material-ui/core/TableRow/index";
import TableCell from "@material-ui/core/TableCell/index";
import Button from '@material-ui/core/Button/index';
import Tooltip from '@material-ui/core/Tooltip/index';
import UserAccountActionDialogs from "./components/UserAccountActionDialogs";

import {
    getAllAccount,
    hideAccountLoader,
    openChangePassAccountDialog,
    openDeleteAccountDialog,
    openEditAccountDialog,
    showAccountLoader
} from 'actions/Account';
import {getAllRole} from 'actions/Role';

class UserAccount extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filterAccounts: [],
            isFiltering: false,
        };
    }

    componentDidMount() {
        this.props.hideAccountLoader();
        this.handleGetAllAccounts();
        this.handleGetAllRoles()
    }

    handleGetAllAccounts() {
        this.props.showAccountLoader();
        this.props.getAllAccount();
    }

    handleGetAllRoles() {
        if (this.props.allRoles.length <= 0) {
            this.props.getAllRole();
        }
    }

    handleSearchValueChange = event => {
        const newValue = event.target.value;

        this.setState({
            searchValue: newValue
        });

        this.handleFilterAccount(event, newValue);
    };

    handleFilterAccount = (event, value) => {
        event.preventDefault();

        if (value !== '') {
            this.setState({
                filterAccounts: this.props.allAccounts.filter(account => {
                    let name = account.name ? account.name.toLowerCase() : "";
                    let email = account.email ? account.email.toLowerCase() : "";

                    return (
                        name.includes(value.toLowerCase()) ||
                        email.includes(value.toLowerCase())
                    )
                }),
                isFiltering: true
            })
        } else {
            this.setState({
                filterAccounts: [],
                isFiltering: false
            })
        }
    };

    formatAccountStatus(status) {
        return {
            color: status === 0 ? "text-danger" : "text-success",
            text: status === 0 ? "Dừng hoạt động" : "Đang hoạt động"
        }
    }

    getRoleNameById(roleId) {
        let index = this.props.allRoles.findIndex(role => role.id === roleId)

        if (index >= 0) return this.props.allRoles[index].name;

        return "-"
    }

    render() {
        const {accLoader, allAccounts} = this.props;
        const accountFields = [
            {id: 'name', numeric: false, disablePadding: false, label: 'HỌ TÊN', style: 'w-auto'},
            {id: 'email', numeric: false, disablePadding: false, label: 'EMAIL', style: 'w-auto'},
            {id: 'role', numeric: false, disablePadding: false, label: 'VAI TRÒ', style: 'w-15'},
            {id: 'status', numeric: false, disablePadding: false, label: 'TRẠNG THÁI', style: 'w-15'},
            {id: 'actions', numeric: false, disablePadding: false, label: 'TUỲ CHỌN', style: 'w-15'},
        ];

        return (
            <div className="animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.userAccount"/>}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow border-0 bg-white p-2">
                            <form className="m-0" role="search">
                                <div className="search-bar">
                                    <div className="form-group">
                                        <input type="search" className="form-control form-control-lg border-0"
                                               placeholder="Tìm kiếm tên hoặc email tài khoản người dùng..."
                                               onChange={this.handleSearchValueChange}/>
                                        <button className="search-icon" onClick={this.handleFilterAccount}>
                                            <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <CommonDataTable
                            data={this.state.isFiltering ? this.state.filterAccounts : allAccounts}
                            fields={accountFields}
                            tableRows={item =>
                                <TableRow hover key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{this.getRoleNameById(item.role_id)}</TableCell>
                                    <TableCell className={this.formatAccountStatus(item.status).color}>
                                        {this.formatAccountStatus(item.status).text}
                                    </TableCell>

                                    <TableCell>
                                        <div className="d-flex align-items-center">
                                            <Tooltip id="tooltip-icon" title="Chỉnh sửa" placement="bottom">
                                                <Button variant="contained"
                                                        className="jr-btn bg-info text-white jr-btn-sm"
                                                        onClick={() => {
                                                            this.props.openEditAccountDialog(item)
                                                        }}
                                                >
                                                    <i className="zmdi zmdi-edit zmdi-hc-fw"/>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip id="tooltip-icon" title="Đổi mật khẩu" placement="bottom">
                                                <Button variant="contained"
                                                        className="jr-btn bg-warning text-white jr-btn-sm"
                                                        onClick={() => {
                                                            this.props.openChangePassAccountDialog(item)
                                                        }}
                                                >
                                                    <i className="zmdi zmdi-lock zmdi-hc-fw"/>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip id="tooltip-icon" title="Xoá" placement="bottom">
                                                <Button variant="contained"
                                                        className="jr-btn bg-danger text-white jr-btn-sm"
                                                        onClick={() => {
                                                            this.props.openDeleteAccountDialog(item)
                                                        }}
                                                >
                                                    <i className="zmdi zmdi-delete zmdi-hc-fw"/>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            }
                        />
                    </div>
                </div>

                <UserAccountActionDialogs/>

                {
                    accLoader &&
                    <div className="loader-view mt-3">
                        <CircularProgress/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({account, role}) => {
    const {accLoader, allAccounts} = account;
    const {allRoles} = role;
    return {accLoader, allAccounts, allRoles}
};

export default connect(mapStateToProps, {
    getAllAccount,
    showAccountLoader,
    openEditAccountDialog,
    openChangePassAccountDialog,
    openDeleteAccountDialog,
    getAllRole,
    hideAccountLoader
})(UserAccount);
