import React from 'react'
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogContentText from "@material-ui/core/DialogContentText/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import TextField from "@material-ui/core/TextField/index";
import InputLabel from "@material-ui/core/InputLabel/index";
import Select from "@material-ui/core/Select/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import Input from "@material-ui/core/Input/index";
import FormControl from "@material-ui/core/FormControl/index";
import {connect} from "react-redux";
import {
    createFunction,
    deleteFunction,
    editSelectedFunction,
    hideAddFuncDialog,
    hideDeleteFuncDialog,
    hideEditFuncDialog,
    showFuncLoader,
    updateFunction
} from 'actions/Function';
import CircularProgress from "@material-ui/core/CircularProgress/index";
import {FUNC_GROUP_SORT, FUNC_MODEL} from "constants/utils/FunctionUtils";

class FunctionActionDialogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newFuncInfo: {
                ...FUNC_MODEL
            },

            deleteFuncId: null
        }
    }

    render() {
        const {funcLoader, allFunctions, isOpenAdd, isOpenEdit, isOpenDelete, selectedFunc} = this.props;
        const {newFuncInfo} = this.state;
        const parentFunctions = allFunctions.filter(func => func.level === 0);

        return (
            <div>
                <Dialog open={isOpenAdd}>
                    <DialogTitle>Thêm mới chức năng</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn hãy cung cấp đầy đủ thông tin chức năng cần thêm mới
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField
                                    label="Tên rút gọn"
                                    margin="normal"
                                    value={newFuncInfo.short}
                                    onChange={(event) => this.setState({
                                        newFuncInfo: {
                                            ...newFuncInfo,
                                            short: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Tên đầy đủ"
                                    margin="normal"
                                    value={newFuncInfo.name}
                                    onChange={(event) => this.setState({
                                        newFuncInfo: {
                                            ...newFuncInfo,
                                            name: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Mô tả"
                                    margin="normal"
                                    multiline
                                    rowsMax="2"
                                    value={newFuncInfo.description}
                                    onChange={(event) => this.setState({
                                        newFuncInfo: {
                                            ...newFuncInfo,
                                            description: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcLevel">Cấp độ</InputLabel>
                                    <Select
                                        value={newFuncInfo.level}
                                        onChange={(event) => this.setState({
                                            newFuncInfo: {
                                                ...newFuncInfo,
                                                level: event.target.value
                                            }
                                        })}
                                        input={<Input id="funcLevel"/>}
                                    >
                                        <MenuItem value={0}>Chức năng cha</MenuItem>
                                        <MenuItem value={1}>Chức năng con</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2" disabled={this.state.newFuncInfo.level === 0}>
                                    <InputLabel htmlFor="funcParent">Thuộc chức năng cha</InputLabel>
                                    <Select
                                        value={newFuncInfo.parent_id}
                                        onChange={(event) => this.setState({
                                            newFuncInfo: {
                                                ...newFuncInfo,
                                                parent_id: event.target.value
                                            }
                                        })}
                                        input={<Input id="funcParent"/>}
                                    >
                                        {
                                            parentFunctions.map(func => {
                                                return (
                                                    <MenuItem key={func.id} value={func.id}>{func.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcStatus">Trạng thái</InputLabel>
                                    <Select
                                        value={newFuncInfo.status}
                                        onChange={(event) => this.setState({
                                            newFuncInfo: {
                                                ...newFuncInfo,
                                                status: event.target.value
                                            }
                                        })}
                                        input={<Input id="funcStatus"/>}
                                    >
                                        <MenuItem value={0}>Không hoạt động</MenuItem>
                                        <MenuItem value={1}>Có hoạt động</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcOnMenu">Hiển thị trên Menu</InputLabel>
                                    <Select
                                        value={newFuncInfo.on_menu}
                                        onChange={(event) => this.setState({
                                            newFuncInfo: {
                                                ...newFuncInfo,
                                                on_menu: event.target.value
                                            }
                                        })}
                                        input={<Input id="funcOnMenu"/>}
                                    >
                                        <MenuItem value={0}>Không hiển thị</MenuItem>
                                        <MenuItem value={1}>Có hiển thị</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcOnMenu">Nhóm xếp</InputLabel>
                                    <Select
                                        value={newFuncInfo.sort}
                                        onChange={(event) => this.setState({
                                            newFuncInfo: {
                                                ...newFuncInfo,
                                                sort: event.target.value
                                            }
                                        })}
                                        input={<Input id="funcOnMenu"/>}
                                    >
                                        {
                                            FUNC_GROUP_SORT.map(func => {
                                                return (
                                                    <MenuItem key={func.id} value={func.id}>{func.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Biểu tượng"
                                    margin="normal"
                                    value={newFuncInfo.icon}
                                    onChange={(event) => this.setState({
                                        newFuncInfo: {
                                            ...newFuncInfo,
                                            icon: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Đường dẫn"
                                    margin="normal"
                                    value={newFuncInfo.link}
                                    onChange={(event) => this.setState({
                                        newFuncInfo: {
                                            ...newFuncInfo,
                                            link: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({newFuncInfo: {...FUNC_MODEL}});
                            this.props.hideAddFuncDialog()
                        }} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showFuncLoader();
                            this.props.createFunction(this.state.newFuncInfo)
                        }} color="primary">
                            Thêm mới
                        </Button>
                    </DialogActions>

                    {
                        funcLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
                <Dialog open={isOpenEdit}>
                    <DialogTitle>Chỉnh sửa chức năng</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn hãy cung cấp đầy đủ thông tin chức năng cần chỉnh sửa
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField
                                    label="Tên rút gọn"
                                    margin="normal"
                                    value={selectedFunc.short}
                                    onChange={(event) => this.props.editSelectedFunction({
                                        ...selectedFunc,
                                        short: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Tên đầy đủ"
                                    margin="normal"
                                    value={selectedFunc.name}
                                    onChange={(event) => this.props.editSelectedFunction({
                                        ...selectedFunc,
                                        name: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Mô tả"
                                    margin="normal"
                                    multiline
                                    rowsMax="2"
                                    value={selectedFunc.description}
                                    onChange={(event) => this.props.editSelectedFunction({
                                        ...selectedFunc,
                                        description: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcLevel">Cấp độ</InputLabel>
                                    <Select
                                        value={selectedFunc.level}
                                        onChange={(event) => this.props.editSelectedFunction({
                                            ...selectedFunc,
                                            level: event.target.value
                                        })}
                                        input={<Input id="funcLevel"/>}
                                    >
                                        <MenuItem value={0}>Chức năng cha</MenuItem>
                                        <MenuItem value={1}>Chức năng con</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2" disabled={selectedFunc.level === 0}>
                                    <InputLabel htmlFor="funcParent">Thuộc chức năng cha</InputLabel>
                                    <Select
                                        value={selectedFunc.parent_id}
                                        onChange={(event) => this.props.editSelectedFunction({
                                            ...selectedFunc,
                                            parent_id: event.target.value
                                        })}
                                        input={<Input id="funcParent"/>}
                                    >
                                        {
                                            parentFunctions.map(func => {
                                                return (
                                                    <MenuItem key={func.id} value={func.id}>{func.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcStatus">Trạng thái</InputLabel>
                                    <Select
                                        value={selectedFunc.status}
                                        onChange={(event) => this.props.editSelectedFunction({
                                            ...selectedFunc,
                                            status: event.target.value
                                        })}
                                        input={<Input id="funcStatus"/>}
                                    >
                                        <MenuItem value={0}>Không hoạt động</MenuItem>
                                        <MenuItem value={1}>Có hoạt động</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcOnMenu">Hiển thị trên Menu</InputLabel>
                                    <Select
                                        value={selectedFunc.on_menu}
                                        onChange={(event) => this.props.editSelectedFunction({
                                            ...selectedFunc,
                                            on_menu: event.target.value
                                        })}
                                        input={<Input id="funcOnMenu"/>}
                                    >
                                        <MenuItem value={0}>Không hiển thị</MenuItem>
                                        <MenuItem value={1}>Có hiển thị</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="funcOnMenu">Nhóm xếp</InputLabel>
                                    <Select
                                        value={selectedFunc.sort}
                                        onChange={(event) => this.props.editSelectedFunction({
                                            ...selectedFunc,
                                            sort: event.target.value
                                        })}
                                        input={<Input id="funcOnMenu"/>}
                                    >
                                        {
                                            FUNC_GROUP_SORT.map(func => {
                                                return (
                                                    <MenuItem key={func.id} value={func.id}>{func.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Biểu tượng"
                                    margin="normal"
                                    value={selectedFunc.icon}
                                    onChange={(event) => this.props.editSelectedFunction({
                                        ...selectedFunc,
                                        icon: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Đường dẫn"
                                    margin="normal"
                                    value={selectedFunc.link}
                                    onChange={(event) => this.props.editSelectedFunction({
                                        ...selectedFunc,
                                        link: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.hideEditFuncDialog()} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showFuncLoader();
                            this.props.updateFunction(selectedFunc)
                        }} color="primary">
                            Lưu chỉnh sửa
                        </Button>
                    </DialogActions>

                    {
                        funcLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
                <Dialog open={isOpenDelete}>
                    <DialogTitle>Xác nhận xoá?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn đã chắc chắn xoá chức năng này? Quá trình này sẽ không thể hoàn tác trong tương lai
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.hideDeleteFuncDialog()} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showFuncLoader();
                            this.props.deleteFunction(selectedFunc)
                        }} color="primary">
                            Đồng ý
                        </Button>
                    </DialogActions>

                    {
                        funcLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({func}) => {
    const {funcLoader, allFunctions, isOpenAdd, isOpenEdit, isOpenDelete, selectedFunc} = func;
    return {funcLoader, allFunctions, isOpenAdd, isOpenEdit, isOpenDelete, selectedFunc}
};

export default connect(mapStateToProps,
    {
        createFunction,
        updateFunction,
        deleteFunction,
        hideAddFuncDialog,
        hideEditFuncDialog,
        hideDeleteFuncDialog,
        showFuncLoader,
        editSelectedFunction
    }
)(FunctionActionDialogs);


