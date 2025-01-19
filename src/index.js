"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program_1 = require("./program");
var printLn_1 = require("./printLn");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
Promise.resolve((0, program_1.default)(printLn_1.default)).then().catch(console.error);
console.log('worked');
