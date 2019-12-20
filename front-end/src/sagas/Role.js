import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {ASSIGN_ROLE, CREATE_ROLE, DELETE_ROLE, GET_ALL_ROLE, UNASSIGN_ROLE, UPDATE_ROLE} from "constants/ActionTypes";
import {
    getAllRole,
    getAllRoleSuccess,
    hideAddRoleDialog,
    hideDeleteRoleDialog,
    hideEditRoleDialog,
    hideRoleLoader
} from "actions/Role";

import RoleService from 'apiUtils/services/roleService'
import __ from "helpers/globalHelpers";

const getAllRoleRequest = async () =>
    await RoleService.reqGetAllRole();

const assignRoleToRoleRequest = async (body) => {
    const {roleId, funcId} = body;
    return await RoleService.reqAssignRoleToFunc(roleId, funcId);
};

const unassignRoleToRoleRequest = async (body) => {
    const {roleId, funcId} = body;
    return await RoleService.reqUnassignRoleToFunc(roleId, funcId);
};

const createRoleRequest = async (body) => {
    const {name, label, description, is_changeable} = body;
    return await RoleService.reqCreateRole(name, label, description, is_changeable);
};

const updateRoleRequest = async (body) => {
    const {id, name, label, description, is_changeable} = body;
    return await RoleService.reqUpdateRole(id, name, label, description, is_changeable);
};

const deleteRoleRequest = async (body) => {
    const {id} = body;
    return await RoleService.reqDeleteRole(id);
};

function* getAllRoleHandler() {
    const failTitle = "Lấy danh sách vai trò người dùng thất bại";
    try {
        const roleList = yield call(getAllRoleRequest);

        if (roleList.message && roleList.code !== 200) {
            __.createNotification(`${roleList.code}: ${roleList.message}`, failTitle, "error");
            yield put(hideRoleLoader())
        } else {
            yield put(getAllRoleSuccess(roleList.data.roles));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideRoleLoader())
    }
}

function* assignRoleToRoleHandler({payload}) {
    const failTitle = "Tạo mới vai trò thất bại";
    try {
        const roleAssign = yield call(assignRoleToRoleRequest, payload);

        if (roleAssign.message && roleAssign.code !== 200) {
            __.createNotification(`${roleAssign.code}: ${roleAssign.message}`, failTitle, "error");
            yield put(hideRoleLoader())
        } else {
            __.createNotification(roleAssign.message, "Cấp vai trò cho vai trò thành công", "success");
            yield put(getAllRole());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideRoleLoader())
    }
}

function* unassignRoleToRoleHandler({payload}) {
    const failTitle = "Cập nhật vai trò thất bại";
    try {
        const roleUnassign = yield call(unassignRoleToRoleRequest, payload);

        if (roleUnassign.message && roleUnassign.code !== 200) {
            __.createNotification(`${roleUnassign.code}: ${roleUnassign.message}`, failTitle, "error");
            yield put(hideRoleLoader())
        } else {
            __.createNotification(roleUnassign.message, "Huỷ cấp vai trò cho vai trò thành công", "success");
            yield put(getAllRole());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideRoleLoader())
    }
}

function* createRoleHandler({payload}) {
    const failTitle = "Tạo mới vai trò thất bại";
    try {
        const roleNew = yield call(createRoleRequest, payload);

        if (roleNew.message && roleNew.code !== 200) {
            __.createNotification(`${roleNew.code}: ${roleNew.message}`, failTitle, "error");
            yield put(hideRoleLoader())
        } else {
            __.createNotification(roleNew.message, "Tạo mới vai trò thành công", "success");
            yield put(getAllRole());
            yield put(hideAddRoleDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideRoleLoader())
    }
}

function* updateRoleHandler({payload}) {
    const failTitle = "Cập nhật vai trò thất bại";
    try {
        const roleUpdated = yield call(updateRoleRequest, payload);

        if (roleUpdated.message && roleUpdated.code !== 200) {
            __.createNotification(`${roleUpdated.code}: ${roleUpdated.message}`, failTitle, "error");
            yield put(hideRoleLoader())
        } else {
            __.createNotification(roleUpdated.message, "Cập nhật vai trò thành công", "success");
            yield put(getAllRole());
            yield put(hideEditRoleDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideRoleLoader())
    }
}

function* deleteRoleHandler({payload}) {
    const failTitle = "Xoá vai trò thất bại";
    try {
        const roleDeleted = yield call(deleteRoleRequest, payload);

        if (roleDeleted.message && roleDeleted.code !== 200) {
            __.createNotification(`${roleDeleted.code}: ${roleDeleted.message}`, failTitle, "error");
            yield put(hideRoleLoader())
        } else {
            __.createNotification(roleDeleted.message, "Xoá vai trò thành công", "success");
            yield put(getAllRole());
            yield put(hideDeleteRoleDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideRoleLoader())
    }
}

export function* getAllRoles() {
    yield takeEvery(GET_ALL_ROLE, getAllRoleHandler);
}

export function* assignRoleToFunction() {
    yield takeEvery(ASSIGN_ROLE, assignRoleToRoleHandler);
}

export function* unassignRoleToFunction() {
    yield takeEvery(UNASSIGN_ROLE, unassignRoleToRoleHandler);
}

export function* createRole() {
    yield takeEvery(CREATE_ROLE, createRoleHandler);
}

export function* updateRole() {
    yield takeEvery(UPDATE_ROLE, updateRoleHandler);
}

export function* deleteRole() {
    yield takeEvery(DELETE_ROLE, deleteRoleHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllRoles),
        fork(assignRoleToFunction),
        fork(unassignRoleToFunction),
        fork(createRole),
        fork(updateRole),
        fork(deleteRole)
    ]);
}
