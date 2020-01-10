(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../dojo/core/main", "@dojo/framework/shim/Promise", "./Tv4async", "./ldo", "../pointer/main", "../../util/main", "path"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var main_1 = require("../../../dojo/core/main");
    var Promise_1 = require("@dojo/framework/shim/Promise");
    var Tv4async_1 = require("./Tv4async");
    var ldo_1 = require("./ldo");
    var main_2 = require("../pointer/main");
    var main_3 = require("../../util/main");
    var path = require("path");
    /* TODO - FIXME
    - see comment in https://github.com/geraintluff/schema-org-gen/pull/4 array/coerce:
    (schema.org): EVENTUAL deprecate generate changes and use coerce for schema.org
    
    - tv4 - logic in coerce : ENUM schemas MUST NOT have `type` !!!
    */
    var Schema = /** @class */ (function (_super) {
        tslib_1.__extends(Schema, _super);
        function Schema(schema, language, baseUrl, fixes, dereference, checkRecursive, banUnknown, useDefault) {
            if (language === void 0) { language = 'en'; }
            if (baseUrl === void 0) { baseUrl = undefined; }
            if (fixes === void 0) { fixes = {}; }
            if (dereference === void 0) { dereference = false; }
            if (checkRecursive === void 0) { checkRecursive = true; }
            if (banUnknown === void 0) { banUnknown = false; }
            if (useDefault === void 0) { useDefault = true; }
            var _this = _super.call(this) || this;
            _this.schema = schema;
            _this.language = language;
            _this.baseUrl = baseUrl;
            _this.fixes = fixes;
            _this.dereference = dereference;
            _this.checkRecursive = checkRecursive;
            _this.banUnknown = banUnknown;
            _this.useDefault = useDefault;
            _this.isObject(schema) && schema.hasOwnProperty('schema') &&
                !('$schema' in schema) && main_1.lang.mixin(_this, schema);
            if (!_this.baseUrl) {
                _this.baseUrl = process.cwd() || _this._getCallerDir();
            }
            _this.init();
            return _this;
        }
        Schema.prototype.init = function () {
            var _this = this;
            for (var code in this.fixes) {
                Schema.addFix(code, this.fixes[code]);
            }
            this.schemaUrl = this.schema;
            if (main_3.is(this.schema, 'string')) {
                // check if this.schema is still a JSON schema
                try {
                    this.schema = JSON.parse(this.schema);
                    this.schemaUrl = this._getUrl(this.schema.id);
                }
                catch (err) { }
            }
            this.promise = new Promise_1.default(function (resolve, reject) {
                var derefCB = function (err, fullSchema) {
                    if (err) {
                        return reject(err);
                    }
                    _this.schema = fullSchema;
                    return resolve(fullSchema);
                };
                var returnSchema = function (s) {
                    if (main_3.is(s, 'object')) {
                        _this.schema = s;
                    }
                    if (_this.dereference) {
                        try {
                            var deref = require('json-schema-deref');
                            deref(_this.schema, derefCB);
                        }
                        catch (e) { }
                    }
                    else {
                        return resolve(_this.schema);
                    }
                };
                if (main_3.is(_this.schema, 'object')) {
                    returnSchema();
                }
                else if (main_3.is(_this.schema, 'string')) {
                    // load ...
                    _this.schemaUrl = _this._getUrl(_this.schema);
                    _this.baseUrl = path.dirname(_this.schemaUrl);
                    _this.get({ url: _this.schemaUrl, responseType: 'json' }).then(returnSchema, _this.schemaErr('load', _this.schema));
                }
            });
        };
        Schema.prototype._getProperty = function (key, schema) {
            if (schema.hasOwnProperty(key)) {
                return schema[key];
            }
            else if (schema.hasOwnProperty('$ref')) {
                return this._getProperty(key, this.tv4.getSchema(schema['$ref']));
            }
            return null;
        };
        Schema.prototype._getCallerDir = function () {
            var originalFunc = Error.prepareStackTrace;
            var callerfile;
            try {
                var err = new Error();
                var currentfile;
                Error.prepareStackTrace = function (err, stack) {
                    return stack;
                };
                currentfile = err.stack['shift']().getFileName();
                while (err.stack.length) {
                    callerfile = err.stack['shift']().getFileName();
                    if (currentfile !== callerfile)
                        break;
                }
            }
            catch (e) { }
            Error.prepareStackTrace = originalFunc;
            return path.dirname(callerfile);
        };
        Schema.prototype.schemaErr = function (verb, url) {
            if (verb === void 0) { verb = 'process'; }
            if (url === void 0) { url = ''; }
            /* TODO - FIXME */
            return function (err) {
                console.log(['Could not', verb, 'Schema:', url].join(' '), err);
            };
        };
        Schema.prototype.fromPath = function (schema, path) {
            var parts = path.split('/').slice(1);
            while (parts.length) {
                if (main_3.is(schema['$ref'], 'string')) {
                    schema = this.tv4.getSchema(schema['$ref']);
                }
                var part = parts.shift().replace(/~1/g, '/').replace(/~0/g, '~');
                schema = schema[part];
            }
            return schema;
        };
        Schema.prototype.deref = function () {
            /*LEGACY, if you want do defer deref and created schema w. {deref: false} */
            if (this.dereference === true) {
                return this.promise;
            }
            this.dereference = true;
            this.init();
            return this.promise;
        };
        Schema.prototype.getProperty = function (key, schemas) {
            if (typeof schemas !== 'object') {
                schemas = [this.schema];
            }
            else if (!main_3.is('array', schemas)) {
                schemas = [schemas];
            }
            for (var i = 0; i < schemas.length; i++) {
                var schema = schemas[i];
                var prop = this._getProperty(key, schema);
                if (prop !== null)
                    return prop;
            }
            return null;
        };
        Schema.prototype.coerce = function (data, customSchema) {
            var _this = this;
            var _coerce = function (schema) {
                var seenErrors = {};
                return _this.tv4.validate(data, schema).then(function (result) {
                    var changes = 1;
                    while (changes) {
                        changes = 0;
                        result.data = data;
                        result.schema = schema;
                        // console.log('result.errors',result.errors);
                        for (var i = 0; i < result.errors.length; i++) {
                            var e = result.errors[i];
                            var signature = JSON.stringify([e.code, e.dataPath, e.schemaPath]);
                            if (seenErrors[signature])
                                continue;
                            changes++;
                            seenErrors[signature] = true;
                            var subData = main_2.default(data, e.dataPath);
                            var schemaValue = _this.fromPath(schema, e.schemaPath);
                            var fixes = Schema.fixes[e.code] || [];
                            for (var j = 0; j < fixes.length; j++) {
                                var fixFunction = fixes[j].bind(_this);
                                var fixedValue = fixFunction(subData, schemaValue, e, schema, data);
                                if (typeof fixedValue !== 'undefined') {
                                    if (e.dataPath) {
                                        main_2.default(data, e.dataPath, fixedValue);
                                    }
                                    else {
                                        data = fixedValue;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    return _this.tv4.validate(result.data, schema).then(function (vO) {
                        return main_1.lang.mixin(vO, {
                            data: result.data,
                            schema: result.schema
                        });
                    });
                });
            };
            return (customSchema) ? _coerce(customSchema) : this.promise.then(_coerce, this.schemaErr());
        };
        Schema.prototype.validate = function (data, multipleErr) {
            var _this = this;
            if (multipleErr === void 0) { multipleErr = true; }
            return this.promise.then(function (schema) {
                return _this.tv4.validate(data, schema, _this.checkRecursive, _this.banUnknown);
            });
        };
        /* EXTENSION FUNCTIONS FOR express w. Schema */
        Schema.prototype.validateRoute = function (req, res, next) {
            var trailingRegex = new RegExp('\\' + path.sep + '+$', 'g');
            var allParams = req.ldo.fromUri(req.url.replace(trailingRegex, ""));
            var body = req.body || {};
            /* TODO support (unspecified) URL-params validation of heroku
            // /{(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)} */
            var data = main_1.lang.mixin(allParams, body);
            if (!main_3.is(req.linkId, 'integer') || !(Object.keys(data).length)) {
                // nothing to validate ...
                next();
                return Promise_1.default.resolve({
                    errors: [],
                    missing: [],
                    valid: true,
                    data: (data || {}),
                    schema: {}
                });
            }
            var urlToLDO = [this.schemaUrl, '#/links/', req.linkId, '/schema'].join('');
            var schema = { '$ref': urlToLDO };
            var option = { params: {}, query: {}, body: {} };
            return this.coerce(data, schema).then(function (coerceResult) {
                var type = '';
                for (var key in data) {
                    if (typeof req.body === 'object' && req.body.hasOwnProperty(key)) {
                        type = 'body';
                    }
                    else {
                        type = (req.query.hasOwnProperty(key)) ? 'query' : 'params';
                    }
                    option[type][key] = data[key];
                }
                console.log('data', option.query);
                Object.defineProperty(req, 'params', {
                    enumerable: true,
                    writable: true,
                    value: option.params
                });
                Object.defineProperty(req, 'query', {
                    enumerable: true,
                    writable: true,
                    value: option.query
                });
                Object.defineProperty(req, 'body', {
                    enumerable: true,
                    writable: true,
                    value: option.body
                });
                next();
                return req; //coerceResult;
            }, function (e) {
                /* TODO FIXME !!!!!! - error handling and REJECT ROUTE */
                next(e);
                return e;
            });
        };
        Schema.prototype.route = function (router) {
            this.promise.then(function (schema) {
                if (schema.links && Array.isArray(schema.links)) {
                    schema.links.map(ldo_1.default.bind(router));
                }
                return schema;
            }, function (err) {
                return err;
            });
            return this;
        };
        /* STATIC FUNCTIONS */
        Schema.addFix = function (code /*string|string[]*/, fixFunction) {
            if (Array.isArray(code)) {
                code.map(function (c) {
                    Schema.addFix(c, fixFunction);
                });
                return Schema;
            }
            if (typeof Schema.errorCodes[code] === 'undefined') {
                code = ['"', code, '"'].join('');
                var keys = JSON.stringify(Object.keys(Schema.errorCodes));
                main_3.log([{
                        error: ['Could not add Fix: Code', code, 'is not an Error Code.'].join(' ')
                    }, { warning: 'MUST be one of:' }, { warning: keys }]);
                return Schema;
            }
            code = Schema.errorCodes[code].toString();
            Schema.fixes[code] = Schema.fixes[code] || [];
            Schema.fixes[code].push(fixFunction);
            return Schema;
        };
        Schema.fixes = {};
        return Schema;
    }(Tv4async_1.default));
    /* OUR FIXES for .coerce - they run in the scope of Schema's instance */
    var DEFAULT_FALLBACK = [
        'ENUM_MISMATCH', 'NUMBER_MULTIPLE_OF', 'NUMBER_MINIMUM', 'NUMBER_MINIMUM_EXCLUSIVE',
        'NUMBER_MAXIMUM_EXCLUSIVE', 'NUMBER_NOT_A_NUMBER',
        'STRING_LENGTH_LONG', 'STRING_LENGTH_SHORT', 'STRING_PATTERN',
        'ARRAY_LENGTH_SHORT', 'ARRAY_LENGTH_LONG', 'ARRAY_UNIQUE',
        'OBJECT_PROPERTIES_MINIMUM', 'OBJECT_PROPERTIES_MAXIMUM'
    ];
    function truncateArray(data, p) {
        return data.slice(0, p);
    }
    function removeAdditional(d, p, e, s, baseData) {
        if (e.hasOwnProperty('dataPath')) {
            main_2.default(baseData).remove(e.dataPath);
        }
        return;
    }
    function useDefaultProperty(data, property, error, baseSchema) {
        if (!this.useDefault || !property || !baseSchema) {
            return data;
        }
        var missingPath = error.dataPath + '/' + property.replace(/~/g, '~0').replace(/\//g, '~1'); // as JSON Pointer
        var possibleSchemas = Schema.possibleSchemas(baseSchema, missingPath);
        data[property] = this.getProperty('default', possibleSchemas);
        return data;
    }
    function useDefault(data, property, error, baseSchema) {
        if (!this.useDefault || !baseSchema) {
            return data;
        }
        var missingPath = error.dataPath;
        var possibleSchemas = Schema.possibleSchemas(baseSchema, missingPath);
        data = this.getProperty('default', possibleSchemas);
        return data;
    }
    /** Coerce Fix: Basic type-juggling */
    Schema.addFix('INVALID_TYPE', main_3.to);
    /** Coerce Fix: x */
    Schema.addFix('STRING_LENGTH_LONG', main_3.truncate);
    /** Coerce Fix: x */
    Schema.addFix('ARRAY_LENGTH_LONG', truncateArray);
    /** Coerce Fix: x */
    Schema.addFix('ARRAY_ADDITIONAL_ITEMS', removeAdditional); /* TODO : test it */
    /** Coerce Fix: x */
    Schema.addFix('OBJECT_ADDITIONAL_PROPERTIES', removeAdditional);
    /** Coerce Fix: Required properties in objects, fill with `default` */
    Schema.addFix('OBJECT_REQUIRED', useDefaultProperty);
    /** Coerce Fix: Schema having `default`, fill with `default` */
    Schema.addFix(DEFAULT_FALLBACK, useDefault);
    /* Coerce Fix: TODO FIXME : Schema.addFormat incl. coerce :
    Schema.addFix('FORMAT_CUSTOM', (data: any, property: string, error: any, baseSchema: any) => {
      console.log(data,property,error,baseSchema)
    });
    // and KEYWORD_CUSTOM ? */
    exports.default = Schema;
});
//# sourceMappingURL=index.js.map