import React from 'react';
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import {hideFrameDialog} from 'actions/Promotion';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PromotionFrameDialog extends React.Component {

    handleRequestClose = () => {
        this.props.hideFrameDialog();
    };

    render() {
        return (
            <Dialog
                fullScreen
                open={this.props.isOpenFrame}
                TransitionComponent={Transition}
            >
                <AppBar className="position-relative bg-light">
                    <Toolbar>
                        <IconButton onClick={this.handleRequestClose} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                        <h4 className="m-0 ml-3 font-weight-bold">Supported by <a href="https://jamja.vn/"
                                                                                  target="_blank"
                                                                                  rel="noopener noreferrer"><span
                            className="text-danger">JAMJA.VN</span></a>
                        </h4>
                    </Toolbar>
                </AppBar>
                <iframe src={this.props.currentURL} frameborder="0" title="Jamja URL" width="100%" height="100%"/>
            </Dialog>
        )
    }
}

const mapStateToProps = ({promotion}) => {
    const {currentURL, isOpenFrame} = promotion;
    return {currentURL, isOpenFrame}
};

export default connect(mapStateToProps, {
    hideFrameDialog
})(PromotionFrameDialog);
