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
import FunctionActionDialogs from "./components/FunctionActionDialogs";
import {FUNC_GROUP_SORT} from 'constants/utils/FunctionUtils'

import {
    getAllFunction,
    hideFuncLoader,
    openAddFuncDialog,
    openDeleteFuncDialog,
    openEditFuncDialog,
    showFuncLoader
} from 'actions/Function';

class FunctionList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filterFuncs: [],
            isFiltering: false,
        };
    }

    componentDidMount() {
        this.props.hideFuncLoader();
        this.handleGetAllFunctions()
    }

    handleGetAllFunctions() {
        this.props.showFuncLoader();
        this.props.getAllFunction();
    }

    handleSearchValueChange = event => {
        const newValue = event.target.value;

        this.setState({
            searchValue: newValue
        });

        this.handleFilterFunction(event, newValue);
    };

    handleFilterFunction = (event, value = this.state.searchValue) => {
        event.preventDefault();

        if (value !== '') {
            this.setState({
                filterFuncs: this.props.allFunctions.filter(func => {
                    let shortName = func.short ? func.short.toLowerCase() : "";
                    let fullName = func.name ? func.name.toLowerCase() : "";
                    let desc = func.description ? func.description.toLowerCase() : "";

                    return (
                        shortName.includes(value.toLowerCase()) ||
                        fullName.includes(value.toLowerCase()) ||
                        desc.includes(value.toLowerCase())
                    )
                }),
                isFiltering: true
            })
        } else {
            this.setState({
                filterFuncs: [],
                isFiltering: false
            })
        }
    };

    formatStatus(status) {
        return {
            text: status === 0 ? "Không" : "Có",
            color: status === 0 ? "text-danger" : "text-success"
        }
    }

    getLevelNameById(level) {
        return level === 0 ? "Chức năng cha" : "Chức năng con"
    }

    getFuncNameById(id) {
        let index = this.props.allFunctions.findIndex(func => func.id === id);
        if (index >= 0) return this.props.allFunctions[index].name;

        return "-";
    }

    getFuncGroupNameById(id) {
        let index = FUNC_GROUP_SORT.findIndex(func => func.id === id);
        if (index >= 0) return FUNC_GROUP_SORT[index].name;

        return "-";
    }

    render() {
        const {funcLoader, allFunctions} = this.props;
        const functionFields = [
            {id: 'name', numeric: false, disablePadding: false, label: 'TÊN ĐẦY ĐỦ', style: 'w-10'},
            {id: 'description', numeric: false, disablePadding: false, label: 'MÔ TẢ', style: 'w-auto'},
            {id: 'level', numeric: false, disablePadding: false, label: 'CẤP ĐỘ', style: 'w-10'},
            {id: 'sort', numeric: false, disablePadding: false, label: 'NHÓM XẾP', style: 'w-10'},
            {id: 'parentFunc', numeric: false, disablePadding: false, label: 'CHỨC NĂNG CHA', style: 'w-10'},
            {id: 'status', numeric: false, disablePadding: false, label: 'TRẠNG THÁI', style: 'w-10'},
            {id: 'onMenu', numeric: false, disablePadding: false, label: 'HIỂN THỊ TRÊN MENU', style: 'w-10'},
            {id: 'link', numeric: false, disablePadding: false, label: 'ĐƯỜNG DẪN', style: 'w-auto'},
            {id: 'actions', numeric: false, disablePadding: false, label: 'TUỲ CHỌN', style: 'w-auto'},
        ];

        return (
            <div className="app-wrapper animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.functionManager"/>}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow border-0 bg-white p-2">
                            <form className="m-0" role="search">
                                <div className="search-bar">
                                    <div className="form-group">
                                        <input type="search" className="form-control form-control-lg border-0"
                                               placeholder="Tìm kiếm tên hoặc mô tả chức năng..."
                                               onChange={this.handleSearchValueChange}/>
                                        <button className="search-icon" onClick={this.handleFilterFunction}>
                                            <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <CommonDataTable
                            data={this.state.isFiltering ? this.state.filterFuncs : allFunctions}
                            fields={functionFields}
                            tableRows={item =>
                                <TableRow hover key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{this.getLevelNameById(item.level)}</TableCell>
                                    <TableCell>{this.getFuncGroupNameById(item.sort)}</TableCell>
                                    <TableCell>{this.getFuncNameById(item.parent_id)}</TableCell>
                                    <TableCell
                                        className={this.formatStatus(item.status).color}>{this.formatStatus(item.status).text}</TableCell>
                                    <TableCell
                                        className={this.formatStatus(item.on_menu).color}>{this.formatStatus(item.on_menu).text}</TableCell>
                                    <TableCell>{item.link}</TableCell>
                                    <TableCell>
                                        <div className="d-flex align-items-center">
                                            <Tooltip id="tooltip-icon" title="Chỉnh sửa" placement="bottom">
                                                <Button variant="contained"
                                                        className="jr-btn bg-info text-white jr-btn-sm"
                                                        onClick={() => {
                                                            this.props.openEditFuncDialog(item)
                                                        }}
                                                >
                                                    <i className="zmdi zmdi-edit zmdi-hc-fw"/>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip id="tooltip-icon" title="Xoá" placement="bottom">
                                                <Button variant="contained"
                                                        className="jr-btn bg-danger text-white jr-btn-sm"
                                                        onClick={() => {
                                                            this.props.openDeleteFuncDialog(item)
                                                        }}
                                                >
                                                    <i className="zmdi zmdi-delete zmdi-hc-fw"/>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            }
                            slotTableFooter={
                                <Button variant="contained"
                                        className="jr-btn jr-btn-label bg-success text-white jr-btn-sm left"
                                        onClick={() => {
                                            this.props.openAddFuncDialog()
                                        }}
                                >
                                    <i className="zmdi zmdi-plus-1 zmdi-hc-fw"/>
                                    <span>Thêm mới</span>
                                </Button>
                            }
                        />
                    </div>
                </div>

                <FunctionActionDialogs/>

                {
                    funcLoader &&
                    <div className="loader-view mt-3">
                        <CircularProgress/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({func}) => {
    const {funcLoader, allFunctions} = func;
    return {funcLoader, allFunctions}
};

export default connect(mapStateToProps, {
    getAllFunction,
    showFuncLoader,
    openAddFuncDialog,
    openEditFuncDialog,
    openDeleteFuncDialog,
    hideFuncLoader
})(FunctionList);
