'use script';

module.exports = function (app) {
    app.errors = {
        BadRequest: function (message = 'Bad Request') {

            Error.captureStackTrace(this, this.constructor);

            this.name = this.constructor.name;
            this.message = message;
            this.errorCode = 400;
        },
        Unauthorized: function (message = 'Unauthorized') {

            Error.captureStackTrace(this, this.constructor);

            this.name = this.constructor.name;
            this.message = message;
            this.errorCode = 401;
        },
        Forbidden: function (message = 'Forbiddend') {

            Error.captureStackTrace(this, this.constructor);

            this.name = this.constructor.name;
            this.message = message;
            this.errorCode = 403;
        },
        NotFound: function (message = 'Not Found') {

            Error.captureStackTrace(this, this.constructor);

            this.name = this.constructor.name;
            this.message = message;
            this.errorCode = 404;
        }
    }
};
