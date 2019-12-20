import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, CardText} from 'reactstrap';
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import {openAssignRoleDialog, openDeleteRoleDialog, openEditRoleDialog} from 'actions/Role';
import {connect} from "react-redux";

class RoleCard extends React.Component {

    getStyleOfRole(roleInfo) {
        let bgColor = "";
        let textColor = "text-dark";

        if (!roleInfo.is_changeable) {
            bgColor = "bg-dark";
            textColor = "text-white";
        }

        return {
            assignable: true,
            editable: true,
            deleteable: roleInfo.is_changeable,
            background: bgColor,
            text: textColor,
        }
    }

    render() {
        const {roleInfo} = this.props;

        return (
            <Card
                className={`shadow border-0 ${this.getStyleOfRole(roleInfo).background} ${this.getStyleOfRole(roleInfo).text}`}>
                <CardHeader>
                    <h3 className="font-weight-bold mb-2 text-uppercase">{roleInfo.name}</h3>
                    <div>{roleInfo.label}</div>
                </CardHeader>
                <CardBody>
                    <CardText>
                        {roleInfo.description}
                    </CardText>
                </CardBody>
                <CardFooter>
                    <div className="d-flex align-items-center">
                        {this.getStyleOfRole(roleInfo).assignable ?
                            <Tooltip id="tooltip-icon" title="Phân quyền" placement="bottom">
                                <Button variant="contained"
                                        className="jr-btn bg-warning text-white jr-btn-sm"
                                        onClick={() => {
                                            this.props.openAssignRoleDialog(roleInfo)
                                        }}
                                >
                                    <i className="zmdi zmdi-apps zmdi-hc-fw"/>
                                </Button>
                            </Tooltip> : <></>}

                        {this.getStyleOfRole(roleInfo).editable ?
                            <Tooltip id="tooltip-icon" title="Chỉnh sửa" placement="bottom">
                                <Button variant="contained"
                                        className="jr-btn bg-info text-white jr-btn-sm"
                                        onClick={() => {
                                            this.props.openEditRoleDialog(roleInfo)
                                        }}
                                >
                                    <i className="zmdi zmdi-edit zmdi-hc-fw"/>
                                </Button>
                            </Tooltip> : <></>}

                        {this.getStyleOfRole(roleInfo).deleteable ?
                            <Tooltip id="tooltip-icon" title="Xoá" placement="bottom">
                                <Button variant="contained"
                                        className="jr-btn bg-danger text-white jr-btn-sm"
                                        onClick={() => {
                                            this.props.openDeleteRoleDialog(roleInfo)
                                        }}
                                >
                                    <i className="zmdi zmdi-delete zmdi-hc-fw"/>
                                </Button>
                            </Tooltip> : <></>}
                    </div>
                </CardFooter>
            </Card>
        )
    }
}

export default connect(null, {
    openAssignRoleDialog,
    openDeleteRoleDialog,
    openEditRoleDialog
})(RoleCard);

RoleCard.propTypes = {
    roleInfo: PropTypes.object.isRequired
};
