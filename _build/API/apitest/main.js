(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../JSON/clone", "../../JSON/Patch"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var clone_1 = require("../../JSON/clone");
    var Patch_1 = require("../../JSON/Patch");
    /*
    { op: OP.REPLACE, path: new JsonPointer('/bar'), value: 'bar' }
    */
    var OP;
    (function (OP) {
        OP["ADD"] = "add";
        OP["REMOVE"] = "remove";
        OP["REPLACE"] = "replace";
        OP["TEST"] = "test";
    })(OP = exports.OP || (exports.OP = {}));
    function JSONvalue(v) { return typeof v === 'undefined' ? null : v; }
    exports.JSONvalue = JSONvalue;
    function exec(parts, modules) {
        var targetIndex;
        var patches = parts.reduce(function (a, p, i) {
            if (!!p.basePath) {
                var args = !!p.args ? p.args :
                    (!!i && parts[i - 1].patch.hasOwnProperty('value') ? [parts[i - 1].patch.value] : []);
                p.target = Reflect.construct(modules[i].default, args);
                targetIndex = i;
                if (!!p.target) {
                    p.patch.value = { value: p.target.value };
                }
                //console.log('!', p.target );
                //console.log(Reflect.get(p.target, parts[i+1].prop))
            }
            else {
                var fn = void 0, fnTarget = void 0;
                if (!p.patch.path) {
                    p.patch.path = parts[targetIndex].patch.path + "/" + p.path;
                }
                if (Reflect.has(parts[targetIndex].target, p.prop)) {
                    //Reflect.apply(modules[i].default, args);
                    fnTarget = parts[targetIndex].target;
                    fn = Reflect.get(fnTarget, p.prop);
                    console.log('__', fn);
                    p.targetIndex = targetIndex;
                }
                else {
                    for (var j = targetIndex - 1; j > -1; j--) {
                        if (parts[j].hasOwnProperty('target') && Reflect.has(parts[j].target, p.prop)) {
                            fnTarget = parts[j].target;
                            fn = Reflect.get(fnTarget, p.prop);
                            p.targetIndex = j;
                            break;
                        }
                    }
                }
                if (!!fn) {
                    p.patch.value = clone_1.default(p.args ? Reflect.apply(fn, fnTarget, p.args) : fn, true);
                }
            }
            if (p.patch.hasOwnProperty('value') && typeof p.patch.value !== 'undefined') {
                a.push(p.patch);
            }
            return a;
        }, []);
        console.log('PATCHES', patches);
        var o = new Patch_1.default({});
        console.log('RESULT:::', o.apply(patches));
        // TODO FINAL RESULT FIXME
        return patches;
    }
    function fluent(registry, terminators, executor, ctx) {
        if (terminators === void 0) { terminators = {}; }
        if (executor === void 0) { executor = exec; }
        if (ctx === void 0) { ctx = null; }
        var parts = [];
        var cur = {};
        var proxy = new Proxy(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (typeof terminators[cur.action] === 'function') {
                var basePath = terminators[cur.action].call(ctx, parts, cur, args);
                if (typeof basePath === 'string') {
                    cur.basePath = basePath;
                }
                return proxy;
            }
            else if (!!args.length) {
                console.log('args', cur.action, args);
                parts[parts.length - 1].args = args;
                return proxy;
            }
            // LOAD + EXEC
            var LOAD = parts.reduce(function (a, p, i) {
                var _a;
                if (!!p.basePath) {
                    a.push((_a = "." + p.basePath, __syncRequire ? Promise.resolve().then(function () { return require(_a); }) : new Promise(function (resolve_1, reject_1) { require([_a], resolve_1, reject_1); })));
                    parts[i].targetIndex = i;
                }
                return a;
            }, []);
            console.log('loading', LOAD);
            return Promise.all(LOAD).then(function (modules) {
                var returnVal = executor.call(ctx, parts, modules);
                parts = [];
                console.log('returnVal', returnVal, returnVal.then);
                return returnVal;
            });
            // <--
        }, {
            // proxy traps
            has: function () { return true; },
            get: function (target, prop) {
                console.log(prop, typeof prop);
                var part = { prop: prop, patch: {} };
                cur.action = prop;
                if (!!terminators[prop]) {
                    return proxy;
                }
                if (!!registry[prop]) {
                    cur = registry[prop];
                    part.patch.op = OP.ADD;
                    part.basePath = cur.basePath;
                    console.log('evt. LOAD // new', part);
                }
                else {
                    var isSpec = (!!cur.specOps && cur.specOps[prop]);
                    part.patch.op = isSpec ? cur.specOps[prop] : OP.ADD;
                    part.path = "" + (isSpec ? prop : 'value');
                    console.log('op', part);
                }
                parts.push(part);
                return proxy;
            }
        });
        return proxy;
    }
    var testRegistry = {
        array: {
            basePath: '/Array',
            specOps: { count: OP.ADD }
        },
        thing: {
            basePath: '/Thing'
        }
    };
    var JSON_PATCH_TERMINATORS = {
        as: function (parts, current, args) {
            var L = parts.length;
            var LAST = !!L && parts[L - 1];
            if (!!LAST && !!args.length) {
                if (LAST.hasOwnProperty('basePath')) {
                    LAST.patch.path = (args[0].charAt(0) === '/') ? args[0] : "/" + args[0];
                    return LAST.patch.path;
                }
                LAST.patch.path = (args[0].charAt(0) === '/') ? args[0] : current.basePath + "/" + args[0];
            }
        }
    };
    var r = fluent(testRegistry, JSON_PATCH_TERMINATORS, exec);
    r.array([1, false, 2]).as('Users').pushIt(3).as('allCurrentUsers').filter(function (v) { return !!v; }).count.do().then(function (x) {
        console.log('');
        console.log(':::');
        console.log(x);
    });
});
//# sourceMappingURL=main.js.map