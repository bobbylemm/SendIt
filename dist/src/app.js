'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.port || 5000;

app.use((0, _morgan2.default)('dev'));

app.listen(PORT, function () {
    console.log('Express server running on port ' + PORT);
});
//# sourceMappingURL=app.js.map