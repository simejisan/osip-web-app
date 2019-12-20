var isChecking = false;

function startCheck() {
    isChecking = true;
}

function stopCheck() {
    isChecking = false;
}

function isValidating() {
    return isChecking;
}

function validatePhone(value) {
    if (!isValidating()) return {
        isError: false,
        message: ''
    };

    if (value === null || value === '') {
        return {
            isError: true,
            message: 'Số điện thoại không được để trống'
        }
    } else {
        let check = new RegExp('((03|09|08|01[2|6|8|9])+([0-9]{8})\\b)|(84+([0-9]{9})\\b)').test(value);

        if (!check) {
            return {
                isError: true,
                message: 'Số điện thoại sai định dạng cho phép'
            }
        } else {
            return {
                isError: false,
                message: ''
            }
        }
    }
}

function validateEmail(value) {
    if (!isValidating()) return {
        isError: false,
        message: ''
    };

    if (value === null || value === '') {
        return {
            isError: true,
            message: 'Địa chỉ email không được để trống'
        }
    } else {
        let check = new RegExp("^[a-z][a-z0-9_\\.]{1,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$").test(value);

        if (!check) {
            return {
                isError: true,
                message: 'Địa chỉ email sai định dạng cho phép (example@abc.xyz)'
            }
        } else {
            return {
                isError: false,
                message: ''
            }
        }
    }
}

function validateFullname(value) {
    if (!isValidating()) return {
        isError: false,
        message: ''
    };

    if (value === null || value === '') {
        return {
            isError: true,
            message: 'Họ tên không được để trống'
        }
    } else {
        let check = new RegExp("^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s*]*$").test(value);

        if (!check) {
            return {
                isError: true,
                message: 'Họ tên sai định dạng cho phép (Nguyen Van A)'
            }
        } else {
            return {
                isError: false,
                message: ''
            }
        }
    }
}

function validatePassword(value) {
    if (!isValidating()) return {
        isError: false,
        message: ''
    };

    if (value === null || value === '') {
        return {
            isError: true,
            message: 'Mật khẩu không được để trống'
        }
    } else if (value.length < 3) {
        return {
            isError: true,
            message: 'Mật khẩu phải dài ít nhất 3 kí tự'
        }
    } else {
        // let check = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}$").test(value);
        let check = true;

        if (!check) {
            return {
                isError: true,
                message: 'Mật khẩu không đúng định dạng (ít nhất 1 chữ hoa, 1 chữ thường và 1 số)'
            }
        } else {
            return {
                isError: false,
                message: ''
            }
        }
    }
}

function validateRePassword(value, compareValue) {
    if (!isValidating()) return {
        isError: false,
        message: ''
    };

    if (value === compareValue) {
        return validatePassword(value)
    } else return {
        isError: true,
        message: 'Mật khẩu nhập lại chưa khớp'
    }
}

function validateRequired(value) {
    if (!isValidating()) return {
        isError: false,
        message: ''
    };

    if (value === null || value === '') {
        return {
            isError: true,
            message: 'Không được để trống'
        }
    } else {
        return {
            isError: false,
            message: ''
        }
    }
}

export default {
    isValidating,
    startCheck,
    stopCheck,
    validatePhone,
    validateEmail,
    validateFullname,
    validatePassword,
    validateRePassword,
    validateRequired
}
