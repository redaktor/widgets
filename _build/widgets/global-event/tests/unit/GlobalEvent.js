(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/shim/global", "./../../index", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var sinon_1 = require("sinon");
    var global_1 = require("@dojo/framework/shim/global");
    var index_1 = require("./../../index");
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var windowAddEventlistenerStub;
    var documentAddEventlistenerStub;
    var windowRemoveEventlistenerStub;
    var documentRemoveEventlistenerStub;
    if (!global_1.default.document) {
        global_1.default.document = {
            addEventListener: function () { },
            removeEventListener: function () { }
        };
    }
    if (!global_1.default.window) {
        global_1.default.window = {
            addEventListener: function () { },
            removeEventListener: function () { }
        };
    }
    var TestGlobalEvent = /** @class */ (function (_super) {
        tslib_1.__extends(TestGlobalEvent, _super);
        function TestGlobalEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestGlobalEvent.prototype.onAttach = function () {
            _super.prototype.onAttach.call(this);
        };
        TestGlobalEvent.prototype.onDetach = function () {
            _super.prototype.onDetach.call(this);
        };
        return TestGlobalEvent;
    }(index_1.GlobalEvent));
    registerSuite('GlobalEvent', {
        beforeEach: function () {
            windowAddEventlistenerStub = sinon_1.stub(global_1.default.window, 'addEventListener');
            documentAddEventlistenerStub = sinon_1.stub(global_1.default.document, 'addEventListener');
            windowRemoveEventlistenerStub = sinon_1.stub(global_1.default.window, 'removeEventListener');
            documentRemoveEventlistenerStub = sinon_1.stub(global_1.default.document, 'removeEventListener');
        },
        afterEach: function () {
            windowAddEventlistenerStub.restore();
            documentAddEventlistenerStub.restore();
            windowRemoveEventlistenerStub.restore();
            documentRemoveEventlistenerStub.restore();
        },
        tests: {
            'Registers window listeners on attach': function () {
                var widget = new TestGlobalEvent();
                var globalEvent = function () { };
                var focusEvent = function () { };
                widget.__setProperties__({ window: { focus: globalEvent }, key: 'global' });
                assert.strictEqual(windowAddEventlistenerStub.callCount, 1);
                widget.__setProperties__({ window: { focus: globalEvent }, key: 'global' });
                assert.strictEqual(windowAddEventlistenerStub.callCount, 1);
                widget.__setProperties__({ window: { focus: focusEvent, keydown: function () { } }, key: 'global' });
                assert.strictEqual(windowAddEventlistenerStub.callCount, 3);
                assert.strictEqual(windowRemoveEventlistenerStub.callCount, 1);
                widget.__setProperties__({ window: { focus: focusEvent }, key: 'global' });
                assert.strictEqual(windowAddEventlistenerStub.callCount, 3);
                assert.strictEqual(windowRemoveEventlistenerStub.callCount, 2);
                widget.onDetach();
                assert.strictEqual(windowRemoveEventlistenerStub.callCount, 3);
            },
            'Registers document listeners on attach': function () {
                var widget = new TestGlobalEvent();
                var globalEvent = function () { };
                var focusEvent = function () { };
                widget.__setProperties__({ document: { focus: globalEvent }, key: 'global' });
                assert.strictEqual(documentAddEventlistenerStub.callCount, 1);
                widget.__setProperties__({ document: { focus: globalEvent }, key: 'global' });
                assert.strictEqual(documentAddEventlistenerStub.callCount, 1);
                widget.__setProperties__({ document: { focus: focusEvent, keydown: function () { } }, key: 'global' });
                assert.strictEqual(documentAddEventlistenerStub.callCount, 3);
                assert.strictEqual(documentRemoveEventlistenerStub.callCount, 1);
                widget.__setProperties__({ document: { focus: focusEvent }, key: 'global' });
                assert.strictEqual(documentAddEventlistenerStub.callCount, 3);
                assert.strictEqual(documentRemoveEventlistenerStub.callCount, 2);
                widget.onDetach();
                assert.strictEqual(documentRemoveEventlistenerStub.callCount, 3);
            },
            'Returns null when there are no children': function () {
                var h = harness_1.harness(function () { return d_1.w(index_1.GlobalEvent, {}); });
                h.expect(function () { return null; });
            },
            'Returns children if they exist': function () {
                var h = harness_1.harness(function () { return d_1.w(index_1.GlobalEvent, {}, ['child']); });
                h.expect(function () { return ['child']; });
            }
        }
    });
});
//# sourceMappingURL=GlobalEvent.js.map