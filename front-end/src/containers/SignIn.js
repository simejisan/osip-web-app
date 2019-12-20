import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import {showAuthLoader, userSignIn} from 'actions/Auth';
import validate from "helpers/validateHelpers";
import __ from "helpers/globalHelpers";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.authUser !== null) {
            this.props.history.push('/');
        }

        if (!__.jsonCompare(prevState, this.state)) validate.startCheck();
    }

    componentWillUnmount() {
        validate.stopCheck();
    }

    render() {
        const {
            email,
            password
        } = this.state;
        const {authLoader} = this.props;
        return (
            <div
                className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="app-login-main-content">

                    <div className="app-logo-content d-flex align-items-center justify-content-center">
                        <Link className="logo-lg d-flex align-items-center justify-content-center" to="/" title="Logo">
                            <img src={require("assets/images/logo-color.png")} alt="logo" title="logo" width="200px"/>
                        </Link>
                    </div>

                    <div className="app-login-content">
                        <div className="app-login-header">
                            <h1 className="font-weight-semibold text-uppercase"><IntlMessages id="appModule.signIn"/>
                            </h1>
                        </div>

                        <div className="app-login-form">
                            <form>
                                <fieldset>
                                    <TextField
                                        label={<IntlMessages id="appModule.email"/>}
                                        fullWidth
                                        onChange={(event) => this.setState({email: event.target.value})}
                                        placeholder="Nhập email của bạn"
                                        defaultValue={email}
                                        margin="normal"
                                        className="mt-0 mb-4"
                                        error={validate.validateEmail(email).isError}
                                        helperText={validate.validateEmail(email).message}
                                    />
                                    <TextField
                                        type="password"
                                        label={<IntlMessages id="appModule.password"/>}
                                        fullWidth
                                        onChange={(event) => this.setState({password: event.target.value})}
                                        placeholder="Nhập mật khẩu của bạn"
                                        defaultValue={password}
                                        margin="normal"
                                        className="mt-0 mb-4"
                                        error={validate.validatePassword(password).isError}
                                        helperText={validate.validatePassword(password).message}
                                    />

                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <Link to="/signup">
                                            <IntlMessages id="signIn.signUp"/>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                this.props.showAuthLoader();
                                                this.props.userSignIn({email, password});
                                            }} variant="contained" color="primary"
                                            disabled={
                                                !validate.isValidating()
                                                || validate.validateEmail(email).isError
                                                || validate.validatePassword(password).isError
                                            }
                                        >
                                            <IntlMessages id="appModule.signIn"/>
                                        </Button>
                                    </div>
                                </fieldset>
                            </form>
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
        );
    }
}

const mapStateToProps = ({auth}) => {
    const {authLoader, authUser} = auth;
    return {authLoader, authUser}
};

export default connect(mapStateToProps, {
    userSignIn,
    showAuthLoader
})(SignIn);
