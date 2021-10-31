const getMessage = (code, defaultCode) =>  {
    let messageFile = require('./messages.json');
    return messageFile[code] ? messageFile[code] : messageFile[defaultCode];
};

exports.success = (res, data, code = '', statusCode = 200) => {
    const resData = {
        success: true,
        message: getMessage(code, 'DEFAULT'),
        statusCode: statusCode,
        data,
        messageCode: code
    };
    return res.status(statusCode).send(resData);
};

exports.sendUnexpected = (res, err, code, statusCode = 500) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: getMessage(code, 'DEFAULT_INTERNAL_SERVER_ERROR'),
        data: err,
        messageCode: code
    };
    return res.status(statusCode).send(resData);
};

exports.notFound = (res, code, statusCode = 404) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: getMessage(code, 'DEFAULT_ERR'),
        data: {},
        messageCode: code
    };
    return res.status(statusCode).send(resData);
};