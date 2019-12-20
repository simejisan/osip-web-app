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
    hideAccountLoader,
    hideChangePassAccountDialog,
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
            newPass: '',
            profile: {
                ...this.props.userInfo.user
            }
        };
    }

    render() {
        const {accLoader, isOpenEdit, isOpenChangePass, allRoles} = this.props;
        const {newPass, profile} = this.state;

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
                            Bạn hãy cung cấp đầy đủ thông tin cần chỉnh sửa
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField
                                    label="Họ tên"
                                    margin="normal"
                                    value={profile.name}
                                    onChange={(event) => this.setState({
                                        profile: {
                                            ...profile,
                                            name: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    value={profile.email}
                                    onChange={(event) => this.setState({
                                        profile: {
                                            ...profile,
                                            email: event.target.value
                                        }
                                    })}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl className="w-100 mt-3 mb-2">
                                    <InputLabel htmlFor="accountRole">Vai trò</InputLabel>
                                    <Select
                                        value={profile.role_id}
                                        onChange={(event) => this.setState({
                                            profile: {
                                                ...profile,
                                                role_id: event.target.value
                                            }
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
                                        value={profile.status}
                                        onChange={(event) => this.setState({
                                            profile: {
                                                ...profile,
                                                status: event.target.value
                                            }
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
                                    initialUrl={profile.avatar_url}
                                    onChangeAvatar={(avatar) => this.setState({
                                        profile: {
                                            ...profile,
                                            avatar_url: avatar.url
                                        }
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
                                    id: profile.id,
                                    name: profile.name,
                                    email: profile.email,
                                    role_id: profile.role_id,
                                    avatar_url: profile.avatar_url,
                                    status: profile.status
                                },
                                true
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
                                    value={newPass}
                                    type="password"
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
                        <Button onClick={() => this.props.hideChangePassAccountDialog()} color="secondary">
                            Huỷ bỏ
                        </Button>
                        <Button onClick={() => {
                            this.props.showAccountLoader();
                            this.props.changePassAccount(
                                {
                                    userId: profile.id,
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
            </div>
        )
    }
}

const mapStateToProps = ({auth, account, role}) => {
    const {userInfo} = auth;
    const {accLoader, isOpenEdit, isOpenChangePass} = account;
    const {allRoles} = role;
    return {userInfo, accLoader, isOpenEdit, isOpenChangePass, allRoles}
};

export default connect(mapStateToProps,
    {
        hideEditAccountDialog,
        hideChangePassAccountDialog,
        showAccountLoader,
        hideAccountLoader,
        updateAccount,
        changePassAccount
    }
)(UserAccountActionDialogs);


