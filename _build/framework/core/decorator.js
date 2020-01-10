(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "ajv"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var AJV = require("ajv");
    var ajv = new AJV({ useDefaults: true, jsonPointers: true, verbose: true });
    /*
    const a: [string,number,number] = ['a',1,2];
    const s: any = {"type":"array","items":[{"type":"string"},{"type":"number"},{"type":"number"}]};
    console.log(ajv.validate(s, a));
    console.log('---');
    */
    /**
     * Parameterized decorators are treated like decorator factories and are expected to return a decorator to be
     * applied.
     * @param args an argument for the decorator factory
     * @return the decorator to be applied
     */
    function API(SCHEMA, INITIALIZERS) {
        if (SCHEMA === void 0) { SCHEMA = {}; }
        if (INITIALIZERS === void 0) { INITIALIZERS = {}; }
        var vFn = ajv.compile(SCHEMA);
        var toObj = function (o, c, i) { o[i.toString()] = c; return o; };
        var fullErr = function (err) {
            var name = (err.parentSchema && typeof err.parentSchema.title === 'string') ?
                err.parentSchema.title : err.dataPath;
            return tslib_1.__assign({}, err, { name: name, text: "There was an error with the request. Parameter \"" + name + "\" " + err.message });
        };
        /**
         * The class decorator can be used to override the constructor function of a class.
         *
         * @param target the class being decorated
         * @return A new constructor producing an identical structure
         */
        return function validate(target) {
            var e_1, _a;
            var _loop_1 = function (k) {
                var descriptor = Object.getOwnPropertyDescriptor(target.prototype, k);
                var isMethod = descriptor.value instanceof Function;
                if (!isMethod)
                    return "continue";
                var originalMethod = descriptor.value;
                // console.log('key:', k);
                /* TODO ASYNC, INITIALIZERS */
                descriptor.value = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _a;
                    if (typeof INITIALIZERS[k] === 'function') {
                        var INITS_1 = INITIALIZERS[k].apply(this);
                        args = args.map(function (arg, i) { return (arg === void 0) ? INITS_1[i] : arg; });
                    }
                    var o = (_a = {}, _a[k] = args.reduce(toObj, {}), _a);
                    var VALID = vFn(o);
                    console.log("!The method args are: " + JSON.stringify(args));
                    // IF DEBUG
                    /*
                            console.log(`The method args are: ${JSON.stringify(args)}`);
                            console.log(`The method args are: ${
                             VALID ? 'VALID!' : `INVALID: ${JSON.stringify(originalMethod.errors)}`
                            }`);
                    */
                    // <--
                    this.errors = (!VALID && vFn.errors) ? vFn.errors.map(fullErr) : void 0;
                    return originalMethod.apply(this, args);
                };
                Object.defineProperty(target.prototype, k, descriptor);
            };
            try {
                for (var _b = tslib_1.__values(Object.getOwnPropertyNames(Object.getPrototypeOf(new target()))), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var k = _c.value;
                    _loop_1(k);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return /** @class */ (function (_super) {
                tslib_1.__extends(class_1, _super);
                function class_1() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _this = _super.apply(this, tslib_1.__spread(args)) || this;
                    var o = { _constructor: args.reduce(toObj, {}) };
                    var VALID = vFn(o);
                    console.log("cThe method args are: " + (VALID ? 'VALID!' : "INVALID: " + JSON.stringify(vFn.errors)));
                    return _this;
                }
                return class_1;
            }(target));
        };
    }
    exports.default = API;
});
/* --------------------------------
 // Example:
 -------------------------------- */
/*
@API({ hello: 'world'})
export class C {
    constructor() {
        console.log('I am the original constructor!')
    }
    b(x:any){ return ' ' }
}

@API({ hello: 'world'})
export class D {

}
*/
//# sourceMappingURL=decorator.js.map