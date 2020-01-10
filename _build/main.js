(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/mixins/Themed", "@dojo/framework/widget-core/Registry", "./App", "./widgets/themes/redaktor-default", "@dojo/shim"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
    var Registry_1 = require("@dojo/framework/widget-core/Registry");
    var App_1 = require("./App");
    var redaktor_default_1 = require("./widgets/themes/redaktor-default");
    require("@dojo/shim");
    var themes = {
        r: redaktor_default_1.default,
        vanilla: undefined
    };
    var registry = new Registry_1.Registry();
    var themeContext = Themed_1.registerThemeInjector(redaktor_default_1.default, registry);
    registry.defineInjector('theme-context', function () {
        return function () { return ({
            get: function () { return themeContext; },
            set: function (theme) { return themeContext.set(theme); }
        }); };
    });
    var initialAppState = {
        registry: registry,
        themes: Object.keys(themes),
        currentTheme: 'redaktor-default',
        onThemeChange: _onThemechange
    };
    var Projector = Projector_1.ProjectorMixin(App_1.default);
    var projector = new Projector();
    projector.setProperties(initialAppState);
    function _onThemechange(theme) {
        themeContext.set(themes[theme]);
        projector.setProperties(tslib_1.__assign({}, initialAppState, { currentTheme: theme }));
    }
    projector.append();
});
//# sourceMappingURL=main.js.map