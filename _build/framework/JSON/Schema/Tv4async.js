(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/shim/Promise", "../../Request/main", "../../url/main", "path", "tv4"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Promise_1 = require("@dojo/framework/shim/Promise");
    var main_1 = require("../../Request/main");
    var main_2 = require("../../url/main");
    var path = require("path");
    var tv4 = require("tv4");
    var Tv4async = /** @class */ (function (_super) {
        tslib_1.__extends(Tv4async, _super);
        function Tv4async() {
            var _this = _super.call(this) || this;
            _this.schema = {};
            _this.failed = {};
            // Provides support for asynchronous validation (fetching schemas) using redaktor.RequestMixin
            // Callback is optional third argument to tv4.validate() - if not present, Promise
            //     callback(result, error);
            if (typeof tv4.hasAsync === 'undefined') {
                tv4.hasAsync = true;
                tv4.syncValidate = tv4.validate;
                tv4.validate = function (data, schema, callback, checkRecursive, banUnknown, multipleErr) {
                    if (multipleErr === void 0) { multipleErr = true; }
                    //const tv4V = tv4[['validate',((multipleErr)?'Multiple':'Result')].join('')];
                    return new Promise_1.default(function (resolve, reject) {
                        var result = tv4.syncValidate(data, schema, checkRecursive, banUnknown);
                        var missingSchemas = _this.tv4.missing.reduce(function (a, s) {
                            if (a.indexOf(s) < 0 && !_this.failed.hasOwnProperty(s)) {
                                a.push(s);
                            }
                            else if (_this.failed.hasOwnProperty(s)) {
                                if (Date.now() - _this.failed[s] > 30000) {
                                    a.push(s);
                                }
                            }
                            return a;
                        }, []);
                        if (!missingSchemas.length) {
                            //console.log(tv4.validateMultiple(data, schema, checkRecursive, banUnknown));
                            if (typeof callback != 'function') {
                                resolve(tv4.validateMultiple(data, schema, checkRecursive, banUnknown));
                            }
                            else {
                                callback(result);
                            }
                        }
                        else {
                            // Make a request for each missing schema
                            missingSchemas = _this.tv4.missing.map(function (schemaUri) {
                                var hasSchema = tv4.getSchema(schemaUri);
                                //console.log('missing',hasSchema,schemaUri);
                                if (hasSchema) {
                                    return Promise_1.default.resolve(hasSchema);
                                }
                                /* TODO - check if failed before - FIXME */
                                return _this.get({ url: _this._getUrl(schemaUri), responseType: 'json' }).then(function (fetchedSchema) {
                                    tv4.addSchema(schemaUri, fetchedSchema);
                                    return fetchedSchema;
                                }, function (e) {
                                    _this.failed[schemaUri] = Date.now();
                                    /* If there's an error, just use an empty schema */
                                    tv4.addSchema(schemaUri, {});
                                    return {};
                                });
                            });
                            Promise_1.default.all(missingSchemas).then(function (schemas) {
                                resolve(tv4.validate(data, schema, callback, checkRecursive, banUnknown));
                            }, function (e) {
                                reject(e);
                            });
                        }
                    });
                };
            }
            _this.tv4 = tv4;
            return _this;
        }
        Tv4async.prototype._getUrl = function (u) {
            var _url = main_2.default.parse(u);
            if ((!(_url.host) || !_url.host.length) && _url.pathname.charAt(0) != path.sep) {
                /* TODO FIXME file:// protocol */
                return path.join(this.baseUrl, u);
            }
            return u;
        };
        Tv4async.possibleSchemas = function (schema, dataPath) {
            var parts = dataPath.split('/').slice(1);
            var options = [schema];
            while (parts.length) {
                var part = parts.shift().replace(/~1/g, '/').replace(/~0/g, '~');
                // Expand all $refs, anyOf, allOf, oneOf
                var expandedOptions = [];
                while (options.length) {
                    var option = options.shift();
                    if (typeof option['$ref'] == 'string') {
                        option = tv4.getSchema(option['$ref']);
                    }
                    if (expandedOptions.indexOf(option) !== -1)
                        continue;
                    if (option.allOf) {
                        options = [].concat(option.allOf).concat(options);
                    }
                    if (option.anyOf) {
                        options = [].concat(option.anyOf).concat(options);
                    }
                    if (option.oneOf) {
                        options = [].concat(option.oneOf).concat(options);
                    }
                    expandedOptions.push(option);
                }
                var newOptions = [];
                while (expandedOptions.length) {
                    var option = expandedOptions.shift();
                    if (/^(0|[1-9][0-9]*)$/.test(part)) {
                        if (Array.isArray(option.items)) {
                            if (option.items[part]) {
                                newOptions.push(option.items[part]);
                            }
                            else if (option.additionalItems) {
                                newOptions.push(option.additionalItems);
                            }
                        }
                        else if (option.items) {
                            newOptions.push(option.items);
                        }
                    }
                    if (option.properties && option.properties[part]) {
                        newOptions.push(option.properties[part]);
                    }
                    else if (option.additionalProperties) {
                        newOptions.push(option.additionalProperties);
                    }
                }
                options = newOptions;
            }
            return options;
        };
        Tv4async.errorCodes = tv4.errorCodes;
        return Tv4async;
    }(main_1.default));
    exports.default = Tv4async;
});
//# sourceMappingURL=Tv4async.js.map