'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _route = require('../routes/route');

var _route2 = _interopRequireDefault(_route);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 5000;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/api/v1/', _route2.default);
// catching an error before passing it to the erro handler
app.use(function (req, res, next) {
    var err = new Error('this page was not found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});
// this api is hosted here
// https://fathomless-spire-38172.herokuapp.com/api/v1/users

app.listen(PORT, function () {
    console.log('Express server running on port ' + PORT);
});

exports.default = app;
//# sourceMappingURL=app.js.map