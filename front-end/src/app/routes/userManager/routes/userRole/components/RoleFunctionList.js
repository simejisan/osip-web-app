import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import List from "@material-ui/core/List";

import {assignRoleToFunc, showRoleLoader, unassignRoleFromFunc} from 'actions/Role';
import Divider from "@material-ui/core/Divider";
import __ from "helpers/globalHelpers";

class RoleFunctionList extends React.Component {

    handleToggleAllAssignment(roleId, parent, isChecked) {
        this.handleToggleAssignment(roleId, parent.id, isChecked);

        parent.children.forEach(child => this.handleToggleAssignment(roleId, child.id, isChecked));
    }

    handleToggleAssignment(roleId, funcId, isChecked) {
        if (isChecked) {
            this.props.assignRoleToFunc({roleId, funcId})
        } else {
            this.props.unassignRoleFromFunc({roleId, funcId})
        }

        this.props.showRoleLoader();
    }

    checkRoleAssignedToFunction(role, funcId) {
        return role.funcs.findIndex(func => func.id === funcId) >= 0;
    }

    render() {
        const {selectedRole} = this.props;
        const funcs = __.formatFunctionsToTreeForm(this.props.allFunctions);

        return (
            <div className="mt-4">
                <List>
                    {
                        funcs.map(parent => (
                                <div key={parent.id}>
                                    <Divider className="mb-2"/>
                                    <ListItem button
                                              onClick={() => this.handleToggleAllAssignment(selectedRole.id, parent, !this.checkRoleAssignedToFunction(selectedRole, parent.id))}>
                                        <ListItemText>
                                            <h5 className="m-0 mt-1 font-weight-bold text-uppercase text-primary">{parent.name}</h5>
                                        </ListItemText>
                                        <Checkbox color="primary"
                                                  checked={this.checkRoleAssignedToFunction(selectedRole, parent.id)}
                                                  onChange={() => this.handleToggleAssignment(selectedRole.id, parent.id, !this.checkRoleAssignedToFunction(selectedRole, parent.id))}
                                        />
                                    </ListItem>
                                    <List>
                                        {
                                            parent.children.map(child => (
                                                <ListItem button key={child.id} className="px-5"
                                                          onClick={() => this.handleToggleAssignment(selectedRole.id, child.id, !this.checkRoleAssignedToFunction(selectedRole, child.id))}>
                                                    <ListItemText>
                                                        <h5 className="m-0 mt-1 text-muted">{child.name}</h5>
                                                    </ListItemText>
                                                    <Checkbox color="primary"
                                                              checked={this.checkRoleAssignedToFunction(selectedRole, child.id)}
                                                              onChange={() => this.handleToggleAssignment(selectedRole.id, child.id, !this.checkRoleAssignedToFunction(selectedRole, child.id))}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </div>
                            )
                        )
                    }
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({func, role}) => {
    const {allFunctions} = func;
    const {selectedRole} = role;
    return {allFunctions, selectedRole}
};

export default connect(mapStateToProps,
    {
        assignRoleToFunc,
        unassignRoleFromFunc,
        showRoleLoader
    }
)(RoleFunctionList);
