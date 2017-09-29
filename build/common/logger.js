"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = 'info';
exports.default = logger;
