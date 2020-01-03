
exports.getUser = function (body) {
    return {
        firstName: body.first_name,
        lastName: body.last_name
    };
};

exports.getUserInfo = function (body) {
    return {
        email: body.email,
        password: body.password
    }
};

exports.validateUser = function (req) {
    let userInfo = this.getUserInfo(req.body);
    let password = userInfo.password;
    return !(!userInfo.email || !password);


};