import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {FLASHSALE_SOURCE} from 'constants/utils/FlashsaleUtils'
import {Card, CardBody} from "reactstrap";
import {
    changeFilterInfo,
    clearFlashsales,
    getAllFlashsale,
    hideFlashsaleLoader,
    showFlashsaleLoader
} from 'actions/Flashsale';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

class FlashsaleFilter extends React.Component {
    componentDidMount() {
        this.props.hideFlashsaleLoader();
        this.handleGetAllFlashsales()
    }

    handleGetAllFlashsales() {
        const {filterInfo} = this.props;

        this.props.clearFlashsales();
        this.props.showFlashsaleLoader();
        this.props.getAllFlashsale(filterInfo);
    }

    render() {
        const {filterInfo} = this.props;
        return (
            <Card className="shadow border-0">
                <CardBody className="pt-2">
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl className="w-100 mt-3 mb-2">
                                <InputLabel htmlFor="source">Trang thương mại</InputLabel>
                                <Select
                                    value={filterInfo.source}
                                    onChange={(event) => this.props.changeFilterInfo({
                                        ...filterInfo,
                                        source: event.target.value
                                    })}
                                    input={<Input id="source"/>}
                                >
                                    {
                                        FLASHSALE_SOURCE.map((source, index) => {
                                            return (
                                                <MenuItem key={index} value={source.value}>{source.text}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-12">
                            <Button variant="contained" color="primary"
                                    className="jr-btn text-uppercase text-white btn-block mt-3"
                                    onClick={() => {
                                        this.props.clearFlashsales();
                                        this.handleGetAllFlashsales()
                                    }}
                            >
                                <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                <span>Tìm flash sale</span>
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = ({flashsale}) => {
    const {filterInfo} = flashsale;
    return {filterInfo}
};

export default connect(mapStateToProps,
    {
        showFlashsaleLoader,
        hideFlashsaleLoader,
        getAllFlashsale,
        clearFlashsales,
        changeFilterInfo
    }
)(FlashsaleFilter);
