/* import * as jsonPointer from 'json-pointer'; TODO */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /* TODO :
    http://blog.rodneyrehm.de/archives/14-Sorting-Were-Doing-It-Wrong.html
    */
    function _createTree(array, rootNodes, idProperty) {
        var tree = [];
        for (var n in rootNodes) {
            var node = rootNodes[n];
            var childNode = array[node[idProperty]];
            if (!node && !rootNodes.hasOwnProperty(n)) {
                continue;
            }
            if (childNode) {
                node.children = _createTree(array, childNode, idProperty);
            }
            tree.push(node);
        }
        return tree;
    }
    ;
    function _groupByParents(array, options) {
        return array.reduce(function (prev, item) {
            var parentId = item[options.parentProperty] || options.rootID;
            if (parentId && prev.hasOwnProperty(parentId)) {
                prev[parentId].push(item);
                return prev;
            }
            prev[parentId] = [item];
            return prev;
        }, {});
    }
    ;
    function flatten() {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        var flat = [].concat.apply([], tslib_1.__spread(arr));
        return flat.some(Array.isArray) ? flatten(flat) : flat;
    }
    exports.flatten = flatten;
    function flattenTree(arr, cKey) {
        if (cKey === void 0) { cKey = 'children'; }
        if (!Array.isArray(arr)) {
            arr = [arr];
        }
        var flatTree = function (o) {
            if (Array.isArray(o[cKey]) && o[cKey].length) {
                arr = arr.concat(o[cKey]);
                o[cKey].map(flatTree);
            }
        };
        arr.map(flatTree);
        return arr;
    }
    exports.flattenTree = flattenTree;
    /**
     * arrayToTree
     * Convert a plain array of nodes (with pointers to parent nodes) to a nested
     * data structure
     *
     * @name arrayToTree
     * @function
     *
     * @param {Array} data An array of data
     * @param {Object} options An object containing the following fields:
     *
     *  - `parentProperty` (String): A name of a property where a link to
     *     a parent node could be found. Default: 'parent_id'
     *  - `idProperty` (String): An unique node identifier. Default: 'id'
     *
     * @return {Array} Result of transformation
     */
    function toTree(data, options) {
        if (typeof data != 'object') {
            return [{
                    id: 'root',
                    parent: null,
                    children: [],
                    value: data
                }];
        }
        else {
            /* TODO FIXME - plain objects and maps ... */
            if (!Array.isArray(data)) {
                data = [data];
            }
        }
        options = tslib_1.__assign({
            idProperty: 'id',
            parentProperty: 'parent',
            id: 'root',
            rootID: '$0' // used internal
        }, options);
        var grouped = _groupByParents(data, options);
        return _createTree(grouped, grouped[options.rootID], options.idProperty);
    }
    exports.toTree = toTree;
    ;
    /* for reduce TODO FIXME DOC */
    function toObject(keys) {
        return (keys && Array.isArray(keys)) ?
            function (o, v, i) { o[keys[i]] = v; return (o || {}); } :
            function (o, v, i) { o[i] = v; return (o || {}); };
    }
    exports.toObject = toObject;
    /* array.length TODO FIXME */
    function hasL(a, l) {
        if (!l)
            l = 0;
        return (a && a instanceof Array && a.length > l) ? a.length : 0;
    }
    exports.hasL = hasL;
});
//# sourceMappingURL=index.js.map