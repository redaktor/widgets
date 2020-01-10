(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../dojo/core/main", "../../util/main", "minimatch", "uri-templates"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* Contributor: Sebastian Lasse, redaktor NOTE:
     * This modified file adds JSON hyper-schema routing / RFC 6570
     * see file ./index, '-mod' comments for usage in an Express Router
     */
    var main_1 = require("../../../dojo/core/main");
    var main_2 = require("../../util/main");
    var minimatch = require("minimatch");
    var uriTemplates = require("uri-templates");
    /* SCHEMA related */
    function expressSyntax(arg, ldo, customCat) {
        // ...* = explode = array
        // ...: = maxLength
        var explode = (arg.slice(-1) === '*') ? '*' : '';
        var key = ((explode === '*') ? arg.slice(0, -1) : arg).split(':')[0];
        var cat = (customCat) ? customCat : 'params'; // becomes default of customCat in TS
        if (typeof ldo === 'object' && ldo.hasOwnProperty('schema')) {
            var res = main_2.getProperty(ldo.schema, ['properties', cat, 'properties', key, 'pattern'].join('.'));
            if (res) {
                return [key, '(', res, ')', explode].join('');
            }
        }
        return [key, explode].join('');
    }
    function expressPath(_, op, args) {
        // path seperator '.' OR '/'
        // runs in scope of ldo
        return args.split(',').map(function (arg) {
            return [op, ':', expressSyntax(arg, this)].join('');
        }).join('');
    }
    function expressAnchor(_, arg) {
        // crosshatch anchor
        // runs in scope of ldo
        return ['(?:[/]*)?#:', expressSyntax(arg, this, 'anchor')].join('');
    }
    function toRoutes(ldo, i) {
        if (ldo === void 0) { ldo = {}; }
        if (!this._if) {
            this._if = {};
        }
        var ID = (typeof ldo.id === 'string' && ldo.id.length) ? ldo.id.replace(/(^[#]*)/, '') : 'link' + i;
        /* TODO - see https://github.com/geraintluff/uri-templates/issues/19 */
        var ldoTpl = Object.create(uriTemplates(ldo.href));
        ldo = main_1.lang.mixin(ldoTpl, ldo);
        for (var glob in this._if) {
            if (ID != glob && minimatch(ID, glob)) {
                if (!this._if.hasOwnProperty(ID)) {
                    this._if[ID] = new Array();
                }
                Array.prototype.push.apply(this._if[ID], this._if[glob]);
            }
        }
        var o = {
            linkId: i,
            ldo: ldo,
            method: (ldo.method || 'GET').toLowerCase(),
            path: ldo.href.replace(/(\{\+)/g, '{') // '+' encoding
                .replace(/(\{[?&].*\})/g, '') // query
                .replace(/\{([./])?([^}]*)\}/g, expressPath.bind(ldo))
                .replace(/\{[#]([^}]*)\}/g, expressAnchor.bind(ldo))
        };
        /* 'ldo: '
        { fill: [Function], fromUri: [Function],
      varNames: [ 'id', 'x', 'y' ], template: '/person{/id}{?x,y}' }
        */
        if (this._if.hasOwnProperty(ID)) {
            this._if[ID].unshift(o);
            this[o.method].apply(this, this._if[ID]);
        }
        return o;
    }
    exports.default = toRoutes;
});
/**/
//# sourceMappingURL=ldo.js.map