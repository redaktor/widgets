(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "."], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    import { _ } from '../util/string';
    
    const o = 'World';
    const tpl = _`Hello ${o}
      I am multiline
      and so`;
    
    console.log(tpl);
    */
    var _1 = require(".");
    var auth = new _1.default({ debug: true });
    auth.get({ url: 'https://indieweb.org/Events', responseType: 'mf' }).then(function (res) {
        console.log(JSON.stringify(res.data));
    });
});
/*
var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function(){
  console.log('Time for tea!');
});
*/
//# sourceMappingURL=testTpl.js.map