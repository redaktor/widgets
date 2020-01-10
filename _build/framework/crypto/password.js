/* TODO FIXME : crypto-browserify */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/i18n/main", "zxcvbn", "../../framework/String/repeat", "../../framework/uuid", "./nls/"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * redaktor/password
     *
     * TODO FIXME - DESCRIPTION when alpha
     *
     * Copyright (c) 2016 Sebastian Lasse, redaktor foundation
     * TODO FIXME - CLEAR LICENSE when alpha
     */
    var main_1 = require("@dojo/framework/i18n/main");
    var zxcvbnFn = require("zxcvbn");
    var repeat_1 = require("../../framework/String/repeat");
    var uuid_1 = require("../../framework/uuid");
    var nls_1 = require("./nls/");
    function zxcvbnI18n(s) {
        var messages = main_1.getCachedMessages(nls_1.default, main_1.default.locale) || {};
        if (!s.length) {
            return '';
        }
        var id = "zxcvbn_" + uuid_1.default(s).split('-')[0];
        return messages[id] || s;
    }
    function strengthBar(score, max) {
        if (score === void 0) { score = 0; }
        if (max === void 0) { max = 5; }
        max = Math.round(max);
        score = Math.round(Math.max(0, Math.min(score, max)));
        return [repeat_1.repeat('█', score), repeat_1.repeat('█', max - score)];
    }
    exports.strengthBar = strengthBar;
    function strength(password, user_inputs) {
        if (user_inputs === void 0) { user_inputs = []; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var messages, inputs, zxcvbn, score, message, bar, _a, _b, suggestions, _c, warning;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user_inputs = Array.isArray(user_inputs) ? user_inputs : [];
                        return [4 /*yield*/, main_1.default(nls_1.default, main_1.default.locale)];
                    case 1:
                        messages = _d.sent();
                        inputs = user_inputs.concat(['redaktor', 'lorem ipsum', 'dolor']);
                        zxcvbn = zxcvbnFn(password, inputs);
                        score = zxcvbn.score < 4 ? zxcvbn.score : (zxcvbn.guesses_log10 < 16 ? 4 : 5);
                        message = messages.yourPW + " " + messages.scores + " " + score + "/5";
                        bar = strengthBar(score);
                        _a = zxcvbn.feedback, _b = _a.suggestions, suggestions = _b === void 0 ? [] : _b, _c = _a.warning, warning = _c === void 0 ? '' : _c;
                        warning = zxcvbnI18n(warning);
                        suggestions = suggestions.map(zxcvbnI18n);
                        warning = (warning.length ? warning : '');
                        return [2 /*return*/, { score: score, message: message, suggestions: suggestions, warning: warning, bar: bar, zxcvbn: zxcvbn }];
                }
            });
        });
    }
    exports.strength = strength;
});
//# sourceMappingURL=password.js.map