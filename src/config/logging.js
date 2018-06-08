"use strict";
exports.__esModule = true;
var _a = require('winston'), createLogger = _a.createLogger, format = _a.format, transports = _a.transports;
exports.logger = createLogger({
    level: 'info',
    format: format.combine(format.splat(), format.json()),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
        new transports.Console({
            format: format.combine(format.splat(), format.simple())
        })
    ]
});
