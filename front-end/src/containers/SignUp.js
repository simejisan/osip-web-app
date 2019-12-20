import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import {
    checkSignupEmail,
    resetSignupEmail,
    sendSignupEmail,
    sendSignupEmailSuccess,
    showAuthLoader,
    userSignUp
} from 'actions/Auth';
import AvatarSelectSlider from "../components/AvatarSelectSlider";
import moment from "moment";
import __ from "helpers/globalHelpers";
import validate from "helpers/validateHelpers"

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            avatarUrl: '',
            code: '',
            timer: '0',
            countdownInterval: null
        }
    }

    componentDidMount() {
        let time = this.getTimer();

        if (time !== '0') {
            this.props.sendSignupEmailSuccess();
            this.startCountdown();
        } else this.stopCountdown();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.authUser !== null) {
            this.props.history.push('/');
        }

        if (!prevProps.isSignupSended && this.props.isSignupSended) this.startCountdown();

        if (
            !__.jsonCompare(prevState, this.state)
            && prevState.timer === this.state.timer
            && prevState.countdownInterval === this.state.countdownInterval
        ) validate.startCheck();

        if ((prevProps.isSignupSended !== this.props.isSignupSended) || (prevProps.isSignupChecked !== this.props.isSignupChecked)) {
            validate.stopCheck();
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.countdownInterval);
        this.props.resetSignupEmail();
        validate.stopCheck();
    }

    getTimer() {
        let res = '0';
        const {email} = this.state;

        if (email !== '') {
            let current = moment();
            let signupList = JSON.parse(localStorage.getItem('signupTimeout'));
            let createdTime = null;
            let index = signupList.findIndex(signup => signup.email === email);

            if (index >= 0) createdTime = signupList[index].timeout;

            if (createdTime) {
                let created = moment.unix(createdTime * 1.0);

                if (current.isAfter(created)) return res;

                res = __.getDiffOfTwoMomentWithFormat(current, created);
            }

            return res;
        }

        return res;
    }

    startCountdown() {
        this.setState({
            countdownInterval: setInterval(() => {
                let time = this.getTimer();

                if (time === '0') {
                    let signupList = JSON.parse(localStorage.getItem('signupTimeout'));
                    let index = signupList.findIndex(signup => signup.email === this.state.email);
                    signupList.splice(index, 1);
                    localStorage.setItem('signupTimeout', JSON.stringify(signupList));

                    this.stopCountdown();
                }

                this.setState({
                    timer: time
                });
            }, 1000)
        })
    }

    stopCountdown() {
        clearInterval(this.state.countdownInterval);
        this.setState({
            timer: '0',
            countdownInterval: null
        });
        this.props.resetSignupEmail();
    }

    getEmailVerifyStep() {
        const {email, code, timer} = this.state;
        const {isSignupSended} = this.props;
        return (
            <form>
                <TextField
                    type="email"
                    onChange={(event) => this.setState({email: event.target.value})}
                    label={<IntlMessages id="appModule.email"/>}
                    placeholder="Nhập email của bạn"
                    disabled={this.props.isSignupSended}
                    fullWidth
                    defaultValue={email}
                    margin="normal"
                    className="mt-0 mb-4"
                    error={validate.validateEmail(email).isError}
                    helperText={validate.validateEmail(email).message}
                />
                {
                    isSignupSended ?
                        <React.Fragment>
                            <TextField
                                type="text"
                                onChange={(event) => {
                                    const newCode = event.target.value;

                                    this.setState({code: newCode});

                                    if (newCode.length >= 10) this.handleCheckSignupEmail(newCode);
                                }}
                                label={<IntlMessages id="appModule.code"/>}
                                placeholder="Nhập mã xác thực nhận được"
                                fullWidth
                                defaultValue={code}
                                margin="normal"
                                className="mt-0 mb-4"
                                error={validate.validateRequired(code).isError}
                                helperText={validate.validateRequired(code).message}
                            />
                            <div className="mb-3 row">
                                <div className="col-md-5 pt-3">
                                    <Link to="/signin">
                                        <IntlMessages id="signUp.alreadyMember"/>
                                    </Link>
                                </div>
                                <div className="col-md-7 text-right">
                                    <h3 className="text-warning mb-0 font-weight-semibold">{timer}</h3>
                                    <span className="text-muted">để có thể gửi lại mã xác nhận</span>
                                </div>
                            </div>
                        </React.Fragment> :
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <Link to="/signin">
                                <IntlMessages id="signUp.alreadyMember"/>
                            </Link>
                            <Button variant="contained"
                                    color="primary"
                                    disabled={
                                        !validate.isValidating()
                                        || validate.validateEmail(email).isError
                                    }
                                    className="jr-btn text-white jr-btn-sm"
                                    onClick={() => {
                                        this.handleSendSignupEmail(email)
                                    }}
                            >
                                <i className="zmdi zmdi-shield-check zmdi-hc-fw"/>
                                <span>Xác thực email</span>
                            </Button>
                        </div>
                }
            </form>
        )
    }

    handleSendSignupEmail(email) {
        this.stopCountdown();

        let signupList = JSON.parse(localStorage.getItem('signupTimeout'));

        if (!signupList) signupList = [];

        let index = signupList.findIndex(signup => signup.email === email);

        let current = moment();
        let oldTimeout = null;

        if (index >= 0) oldTimeout = moment.unix(signupList[index].timeout);

        if (index < 0 || (oldTimeout && current.isSameOrAfter(oldTimeout))) {
            this.props.showAuthLoader();
            this.props.sendSignupEmail(email);
        } else {
            this.props.sendSignupEmailSuccess();
            __.createNotification("Mã xác nhận đã gửi tới email này trước đó, vui lòng nhập mã để tiếp tục đăng ký", "Email đã được gửi mã xác nhận", "success");
        }
    }

    handleCheckSignupEmail(code) {
        this.stopCountdown();

        this.props.showAuthLoader();
        this.props.checkSignupEmail(code);
    }

    getInfoStep() {
        const {name, email, password, rePassword, avatarUrl} = this.state;
        return (
            <form>
                <TextField
                    type="email"
                    disabled
                    label={<IntlMessages id="appModule.email"/>}
                    fullWidth
                    defaultValue={email}
                    margin="normal"
                    className="mt-0 mb-4"
                />

                <TextField
                    type="text"
                    label={<IntlMessages id="appModule.name"/>}
                    onChange={(event) => this.setState({name: event.target.value})}
                    placeholder="Nhập họ tên của bạn"
                    fullWidth
                    defaultValue={name}
                    margin="normal"
                    className="mt-0 mb-4"
                    error={validate.validateFullname(name).isError}
                    helperText={validate.validateFullname(name).message}
                />

                <TextField
                    type="password"
                    onChange={(event) => this.setState({password: event.target.value})}
                    label={<IntlMessages id="appModule.password"/>}
                    placeholder="Nhập mật khẩu"
                    fullWidth
                    defaultValue={password}
                    margin="normal"
                    className="mt-0 mb-4"
                    error={validate.validatePassword(password).isError}
                    helperText={validate.validatePassword(password).message}
                />

                <TextField
                    type="password"
                    onChange={(event) => this.setState({rePassword: event.target.value})}
                    label={<IntlMessages id="appModule.repassword"/>}
                    placeholder="Nhập lại mật khẩu"
                    fullWidth
                    defaultValue={rePassword}
                    margin="normal"
                    className="mt-0 mb-4"
                    error={validate.validateRePassword(rePassword, password).isError}
                    helperText={validate.validateRePassword(rePassword, password).message}
                />

                <AvatarSelectSlider
                    onChangeAvatar={(avatar) => this.setState({avatarUrl: avatar.url})}/>

                <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Link to="/signin">
                        <IntlMessages id="signUp.alreadyMember"/>
                    </Link>
                    <Button variant="contained"
                            onClick={() => {
                                this.props.showAuthLoader();
                                this.props.userSignUp({name, email, password, rePassword, avatarUrl});
                            }}
                            color="primary"
                            disabled={
                                !validate.isValidating()
                                || validate.validateEmail(email).isError
                                || validate.validateFullname(name).isError
                                || validate.validatePassword(password).isError
                                || validate.validateRePassword(rePassword, password).isError
                            }
                    >
                        <IntlMessages
                            id="appModule.regsiter"/>
                    </Button>
                </div>
            </form>
        )
    }

    getActiveStep() {
        const {isSignupChecked} = this.props;

        if (!isSignupChecked) return this.getEmailVerifyStep();

        return this.getInfoStep();
    }

    render() {
        const {authLoader} = this.props;
        return (
            <div
                className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="app-login-main-content">
                    <div className="app-logo-content d-flex align-items-center justify-content-center">
                        <Link className="logo-lg" to="/" title="Logo">
                            <img src={require("assets/images/logo-color.png")} alt="logo" title="logo" width="200px"/>
                        </Link>
                    </div>

                    <div className="app-login-content">
                        <div className="app-login-header">
                            <h1 className="font-weight-semibold text-uppercase"><IntlMessages
                                id="appModule.createAccount"/></h1>
                        </div>

                        <div className="app-login-form">
                            {this.getActiveStep()}
                        </div>
                    </div>
                </div>
                {
                    authLoader &&
                    <div className="loader-view">
                        <CircularProgress/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {authLoader, authUser, isSignupSended, isSignupChecked} = auth;
    return {authLoader, authUser, isSignupSended, isSignupChecked}
};

export default connect(mapStateToProps, {
    userSignUp,
    showAuthLoader,
    sendSignupEmail,
    checkSignupEmail,
    resetSignupEmail,
    sendSignupEmailSuccess
})(SignUp);
