"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPrintLnObj = void 0;
var printLnObj = {
    printLn: function (message) {
        console.log(message);
        this.messages = __spreadArray(__spreadArray([], this.messages, true), [message], false);
    },
    messages: []
};
var testPrintLnObj = {
    printLn: function (message) {
        this.messages = __spreadArray(__spreadArray([], this.messages, true), [message], false);
    },
    messages: []
};
exports.testPrintLnObj = testPrintLnObj;
exports.default = printLnObj;
