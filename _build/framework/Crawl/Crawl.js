(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Content = /** @class */ (function () {
        /**
       * @param {!Puppeteer.Page} page
       * @param {!Object} options
       * @param {!number} depth
       * @param {string} previousUrl
       */
        function Content(page, options, depth, previousUrl
        //protected root: any = {}, protected options: PatchOptions = POINTER_OPTIONS
        ) {
            this.page = page;
            //	this.options = {...{}, ...POINTER_OPTIONS, ...options};
        }
        return Content;
    }());
    exports.Content = Content;
    exports.default = Content;
});
//# sourceMappingURL=Crawl.js.map