const fail = (message, code) => {
    return {
        message: message,
        code: code,
    }
}

const success = (message) => {
    return {
        message: message,
        code: 200,
    }
}

module.exports = {
    fail,
    success,
}