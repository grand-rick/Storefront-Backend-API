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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = __importDefault(require("../order"));
var product_1 = __importDefault(require("../product"));
var user_1 = __importDefault(require("../user"));
var store = new order_1.default();
var user_store = new user_1.default();
var product_store = new product_1.default();
describe('Order Model', function () {
    it('should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('create method should add an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1, product1, order1, user, product, newOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = {
                        first_name: 'Some',
                        last_name: 'Name',
                        username: 'Test User',
                        hash_password: 'randomPassword'
                    };
                    product1 = {
                        name: 'Bed',
                        price: '500'
                    };
                    order1 = {
                        status: 'active',
                        product_quantity: '50',
                        product_id: '2',
                        user_id: '2'
                    };
                    return [4 /*yield*/, user_store.create(user1)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, product_store.create(product1)];
                case 2:
                    product = _a.sent();
                    return [4 /*yield*/, store.create(order1)];
                case 3:
                    newOrder = _a.sent();
                    expect(newOrder).toEqual({
                        id: 1,
                        status: 'active',
                        product_quantity: '50',
                        product_id: 2,
                        user_id: 2
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.index()];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([
                        {
                            id: 1,
                            status: 'active',
                            product_quantity: '50',
                            product_id: 2,
                            user_id: 2
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.show('1')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        id: 1,
                        status: 'active',
                        product_quantity: '50',
                        product_id: 2,
                        user_id: 2
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete method should remove the order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_store.delete('1')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, product_store.delete('1')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, store.delete('1')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, store.index()];
                case 4:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
