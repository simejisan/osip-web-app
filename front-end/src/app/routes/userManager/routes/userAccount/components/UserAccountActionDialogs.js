import React from 'react'
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogContentText from "@material-ui/core/DialogContentText/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import InputLabel from "@material-ui/core/InputLabel/index";
import Select from "@material-ui/core/Select/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import Input from "@material-ui/core/Input/index";
import FormControl from "@material-ui/core/FormControl/index";
import {connect} from "react-redux";
import {
    changePassAccount,
    deleteAccountByEmail,
    editSelectedAccount,
    hideChangePassAccountDialog,
    hideDeleteAccountDialog,
    hideEditAccountDialog,
    showAccountLoader,
    updateAccount
} from 'actions/Account';
import CircularProgress from "@material-ui/core/CircularProgress/index";
import TextField from "@material-ui/core/TextField";
import AvatarSelectSlider from "components/AvatarSelectSlider";

class UserAccountActionDialogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newPass: ''
        }
    }

    render() {
        const {accLoader, isOpenEdit, isOpenChangePass, isOpenDelete, selectedAccount, allRoles} = this.props;

        const avatarOptions = {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 8,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 950,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 3,
                        dots: true
                    }
                },
                {
                    breakpoint: 560,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true
                    }
                }
            ]
        };

        return (
            <div>
                <Dialog open={isOpenEdit} onClose={this.handleRequestClose}>
                    <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn hãy cung cấp đầy đủ thông tin tài khoản cần chỉnh sửa
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField
                                    label="Họ tên"
                                    margin="normal"
                                    value={selectedAccount.name}
                                    onChange={(event) => this.props.editSelectedAccount({
                                        ...selectedAccount,
                                        name: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    value={selectedAccount.email}
                                    onChange={(event) => this.props.editSelectedAccount({
                                        ...selectedAccount,
                                        email: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="accountRole">Vai trò</InputLabel>
                                    <Select
                                        value={selectedAccount.role_id}
                                        onChange={(event) => this.props.editSelectedAccount({
                                            ...selectedAccount,
                                            role_id: event.target.value
                                        })}
                                        input={<Input id="accountRole"/>}
                                    >
                                        {
                                            allRoles.map(role => (
                                                <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="accountStatus">Trạng thái</InputLabel>
                                    <Select
                                        value={selectedAccount.status}
                                        onChange={(event) => this.props.editSelectedAccount({
                                            ...selectedAccount,
                                            status: event.target.value
                                        })}
                                        input={<Input id="accountStatus"/>}
                                    >
                                        <MenuItem value={0}>Dừng hoạt động</MenuItem>
                                        <MenuItem value={1}>Đang hoạt động</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-12 pt-3">
                                <AvatarSelectSlider
                                    options={avatarOptions}
                                    initialUrl={selectedAccount.avatar_url}
                                    onChangeAvatar={(avatar) => this.props.editSelectedAccount({
                                        ...selectedAccount,
                                        avatar_url: avatar.url
                                    })}/>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.hideEditAccountDialog()} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showAccountLoader();
                            this.props.updateAccount(
                                {
                                    id: selectedAccount.id,
                                    name: selectedAccount.name,
                                    email: selectedAccount.email,
                                    role_id: selectedAccount.role_id,
                                    avatar_url: selectedAccount.avatar_url,
                                    status: selectedAccount.status
                                }
                            )
                        }} color="primary">
                            Lưu chỉnh sửa
                        </Button>
                    </DialogActions>

                    {
                        accLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
                <Dialog open={isOpenChangePass} onClose={this.handleRequestClose}>
                    <DialogTitle>Đổi mật khẩu</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn hãy cung cấp mật khẩu mới cần đổi
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-12">
                                <TextField
                                    label="Mật khẩu mới"
                                    margin="normal"
                                    type="password"
                                    value={this.state.newPass}
                                    onChange={(event) => this.setState({
                                        newPass: event.target.value
                                    })
                                    }
                                    fullWidth
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({newPass: ""});
                            this.props.hideChangePassAccountDialog()
                        }} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showAccountLoader();
                            this.props.changePassAccount(
                                {
                                    userId: selectedAccount.id,
                                    newPass: this.state.newPass
                                }
                            )
                        }} color="primary">
                            Thay đổi
                        </Button>
                    </DialogActions>

                    {
                        accLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
                <Dialog open={isOpenDelete} onClose={this.handleRequestClose}>
                    <DialogTitle>Xác nhận xoá?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn đã chắc chắn xoá tài khoản này? Quá trình này sẽ không thể hoàn tác trong tương lai
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.hideDeleteAccountDialog()} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showAccountLoader();
                            this.props.deleteAccountByEmail(selectedAccount.email)
                        }} color="primary">
                            Đồng ý
                        </Button>
                    </DialogActions>

                    {
                        accLoader &&
                        <div className="loader-view mb-4">
                            <CircularProgress/>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({account, role}) => {
    const {accLoader, isOpenEdit, isOpenChangePass, isOpenDelete, selectedAccount} = account;
    const {allRoles} = role;
    return {accLoader, isOpenEdit, isOpenChangePass, isOpenDelete, selectedAccount, allRoles}
};

export default connect(mapStateToProps,
    {
        hideDeleteAccountDialog,
        hideEditAccountDialog,
        hideChangePassAccountDialog,
        showAccountLoader,
        editSelectedAccount,
        updateAccount,
        deleteAccountByEmail,
        changePassAccount
    }
)(UserAccountActionDialogs);
