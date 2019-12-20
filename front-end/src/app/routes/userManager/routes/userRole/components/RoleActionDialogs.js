import React from 'react'
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogContentText from "@material-ui/core/DialogContentText/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {connect} from "react-redux";
import {
    createRole,
    deleteRole,
    editSelectedRole,
    hideAddRoleDialog,
    hideAssignRoleDialog,
    hideDeleteRoleDialog,
    hideEditRoleDialog,
    showRoleLoader,
    updateRole
} from 'actions/Role';
import CircularProgress from "@material-ui/core/CircularProgress/index";
import {ROLE_MODEL} from "constants/utils/RoleUtils";
import RoleFunctionList from "./RoleFunctionList";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

class RoleActionDialogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRoleInfo: {
                ...ROLE_MODEL
            },

            deleteRoleId: null
        }
    }

    render() {
        const {roleLoader, isOpenAssign, isOpenAdd, isOpenEdit, isOpenDelete, selectedRole} = this.props;
        const {newRoleInfo} = this.state;

        return (
            <div>
                <Dialog open={isOpenAssign}>
                    <DialogTitle>Phân quyền chức năng</DialogTitle>
                    <DialogContent className="pb-0">
                        <DialogContentText>
                            Hãy chọn chức năng bạn muốn cấp hoặc huỷ quyền cho vai trò này
                        </DialogContentText>
                        <RoleFunctionList/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.props.hideAssignRoleDialog()
                        }} color="primary">
                            Xong
                        </Button>
                    </DialogActions>

                    {
                        roleLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
                <Dialog open={isOpenAdd}>
                    <DialogTitle>Thêm mới vai trò</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn hãy cung cấp đầy đủ thông tin vai trò cần thêm mới
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField
                                    label="Tên rút gọn"
                                    margin="normal"
                                    value={newRoleInfo.label}
                                    onChange={(event) => this.setState({
                                        newRoleInfo: {
                                            ...newRoleInfo,
                                            label: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Tên đầy đủ"
                                    margin="normal"
                                    value={newRoleInfo.name}
                                    onChange={(event) => this.setState({
                                        newRoleInfo: {
                                            ...newRoleInfo,
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
                                    value={newRoleInfo.description}
                                    onChange={(event) => this.setState({
                                        newRoleInfo: {
                                            ...newRoleInfo,
                                            description: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="roleChangeable">Thay đổi được</InputLabel>
                                    <Select
                                        value={newRoleInfo.is_changeable}
                                        onChange={(event) => this.setState({
                                            newRoleInfo: {
                                                ...newRoleInfo,
                                                is_changeable: event.target.value
                                            }
                                        })}
                                        input={<Input id="roleChangeable"/>}
                                    >
                                        <MenuItem value={0}>Không</MenuItem>
                                        <MenuItem value={1}>Có</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({newRoleInfo: {...ROLE_MODEL}});
                            this.props.hideAddRoleDialog()
                        }} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showRoleLoader();
                            this.props.createRole(this.state.newRoleInfo)
                        }} color="primary">
                            Thêm mới
                        </Button>
                    </DialogActions>

                    {
                        roleLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
                <Dialog open={isOpenEdit}>
                    <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn hãy cung cấp đầy đủ thông tin vai trò cần chỉnh sửa
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField
                                    label="Tên rút gọn"
                                    margin="normal"
                                    value={selectedRole.label}
                                    onChange={(event) => this.props.editSelectedRole({
                                        ...selectedRole,
                                        label: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Tên đầy đủ"
                                    margin="normal"
                                    value={selectedRole.name}
                                    onChange={(event) => this.props.editSelectedRole({
                                        ...selectedRole,
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
                                    value={selectedRole.description}
                                    onChange={(event) => this.props.editSelectedRole({
                                        ...selectedRole,
                                        description: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="roleChangeable">Thay đổi được</InputLabel>
                                    <Select
                                        value={selectedRole.is_changeable}
                                        onChange={(event) => this.props.editSelectedRole({
                                            ...selectedRole,
                                            is_changeable: event.target.value
                                        })}
                                        input={<Input id="roleChangeable"/>}
                                    >
                                        <MenuItem value={0}>Không</MenuItem>
                                        <MenuItem value={1}>Có</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.hideEditRoleDialog()} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showRoleLoader();
                            this.props.updateRole(selectedRole)
                        }} color="primary">
                            Lưu chỉnh sửa
                        </Button>
                    </DialogActions>

                    {
                        roleLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
                <Dialog open={isOpenDelete}>
                    <DialogTitle>Xác nhận xoá?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn đã chắc chắn xoá vai trò này? Quá trình này sẽ không thể hoàn tác trong tương lai
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.hideDeleteRoleDialog()} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showRoleLoader();
                            this.props.deleteRole(selectedRole)
                        }} color="primary">
                            Đồng ý
                        </Button>
                    </DialogActions>

                    {
                        roleLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({role}) => {
    const {roleLoader, isOpenAssign, isOpenAdd, isOpenEdit, isOpenDelete, selectedRole} = role;
    return {roleLoader, isOpenAssign, isOpenAdd, isOpenEdit, isOpenDelete, selectedRole}
};

export default connect(mapStateToProps,
    {
        createRole,
        updateRole,
        deleteRole,
        hideAssignRoleDialog,
        hideAddRoleDialog,
        hideEditRoleDialog,
        hideDeleteRoleDialog,
        showRoleLoader,
        editSelectedRole
    }
)(RoleActionDialogs);


