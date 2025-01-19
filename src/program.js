"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var fleetController_1 = require("./fleetController");
var customerListController_1 = require("./customerListController");
function getPrompt() {
    return __awaiter(this, void 0, void 0, function () {
        var prompt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([{ message: "Enter a selection: ", type: "input", name: "name" }])];
                case 1:
                    prompt = _a.sent();
                    return [2 /*return*/, prompt === null || prompt === void 0 ? void 0 : prompt.name];
            }
        });
    });
}
var program = function Program(printLnObj_1) {
    return __awaiter(this, arguments, void 0, function (printLnObj, promptFn) {
        var menuOptions, prompt, addedCab, removedCab, assignCustomer, assignCustomer, customerRide, customerRide, ex_1;
        if (promptFn === void 0) { promptFn = getPrompt; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    menuOptions = [
                        "0. Exit",
                        "1. (Incoming Radio) Add New Cab Driver",
                        "2. (Incoming Radio) Remove Cab Driver",
                        "3. (Outgoing Radio) Send Cab Driver Ride Request",
                        "4. (Incoming Radio) Cab Notifies Passenger Picked Up",
                        "5. (Incoming Radio) Cab Notifies Passenger Dropped Off",
                        "6. (Incoming Call) Cancel Cab Driver Fare",
                        "7. (Incoming Call) Customer Request Ride"
                    ];
                    prompt = undefined;
                    _a.label = 1;
                case 1:
                    if (!(prompt !== '0')) return [3 /*break*/, 18];
                    menuOptions.forEach(function (x) { return printLnObj.printLn(x); });
                    return [4 /*yield*/, promptFn()];
                case 2:
                    prompt = _a.sent();
                    printLnObj.printLn("You selected ".concat(prompt));
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 16, , 17]);
                    if (!(prompt !== undefined && +prompt === 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, fleetController_1.addCab)()];
                case 4:
                    addedCab = _a.sent();
                    if (addedCab.Status === 'Available') {
                        printLnObj.printLn('New cab was added');
                    }
                    _a.label = 5;
                case 5:
                    if (!(prompt !== undefined && +prompt === 2)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, fleetController_1.removeCab)()];
                case 6:
                    removedCab = _a.sent();
                    if (removedCab.CabName.length) {
                        printLnObj.printLn("Cab was removed");
                    }
                    _a.label = 7;
                case 7:
                    if (!(prompt !== undefined && +prompt === 3)) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, customerListController_1.cabRideRequest)()];
                case 8:
                    assignCustomer = _a.sent();
                    if (assignCustomer.CustomerName.length) {
                        printLnObj.printLn("Dispatch requested a cab.");
                    }
                    _a.label = 9;
                case 9:
                    if (!(prompt !== undefined && +prompt === 4)) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, customerListController_1.cabPickUpCustomer)()];
                case 10:
                    assignCustomer = _a.sent();
                    if (assignCustomer.CustomerName.length) {
                        printLnObj.printLn("Cab can pickup customer.");
                    }
                    _a.label = 11;
                case 11:
                    if (!(prompt !== undefined && +prompt === 5)) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, customerListController_1.cabDropOffCustomer)()];
                case 12:
                    customerRide = _a.sent();
                    if (!!customerRide) {
                        printLnObj.printLn("Cab dropped off a customer.");
                    }
                    _a.label = 13;
                case 13:
                    if (prompt !== undefined && +prompt === 6) {
                        printLnObj.printLn("Customer cancelled a ride.");
                    }
                    if (!(prompt !== undefined && +prompt === 7)) return [3 /*break*/, 15];
                    return [4 /*yield*/, (0, customerListController_1.customerCall)()];
                case 14:
                    customerRide = _a.sent();
                    if (!!customerRide) {
                        printLnObj.printLn("Customer called for a ride");
                    }
                    _a.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    ex_1 = _a.sent();
                    printLnObj.printLn(ex_1.message);
                    return [3 /*break*/, 17];
                case 17: return [3 /*break*/, 1];
                case 18: return [2 /*return*/];
            }
        });
    });
};
exports.default = program;
