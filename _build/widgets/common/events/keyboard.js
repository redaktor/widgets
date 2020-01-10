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
    var Key;
    (function (Key) {
        Key[Key["Unidentified"] = 0] = "Unidentified";
        Key[Key["Cancel"] = 3] = "Cancel";
        Key[Key["Help"] = 6] = "Help";
        Key[Key["Backspace"] = 8] = "Backspace";
        Key[Key["Tab"] = 9] = "Tab";
        Key[Key["Clear"] = 12] = "Clear";
        Key[Key["Enter"] = 13] = "Enter";
        Key[Key["Shift"] = 16] = "Shift";
        Key[Key["Control"] = 17] = "Control";
        Key[Key["Alt"] = 18] = "Alt";
        Key[Key["Pause"] = 19] = "Pause";
        Key[Key["CapsLock"] = 20] = "CapsLock";
        Key[Key["Escape"] = 27] = "Escape";
        Key[Key["Convert"] = 28] = "Convert";
        Key[Key["NonConvert"] = 29] = "NonConvert";
        Key[Key["Accept"] = 30] = "Accept";
        Key[Key["ModeChange"] = 31] = "ModeChange";
        Key[Key[" "] = 32] = " ";
        Key[Key["PageUp"] = 33] = "PageUp";
        Key[Key["PageDown"] = 34] = "PageDown";
        Key[Key["End"] = 35] = "End";
        Key[Key["Home"] = 36] = "Home";
        Key[Key["ArrowLeft"] = 37] = "ArrowLeft";
        Key[Key["ArrowUp"] = 38] = "ArrowUp";
        Key[Key["ArrowRight"] = 39] = "ArrowRight";
        Key[Key["ArrowDown"] = 40] = "ArrowDown";
        Key[Key["Select"] = 41] = "Select";
        Key[Key["Print"] = 42] = "Print";
        Key[Key["Execute"] = 43] = "Execute";
        Key[Key["PrintScreen"] = 44] = "PrintScreen";
        Key[Key["Insert"] = 45] = "Insert";
        Key[Key["Delete"] = 46] = "Delete";
        /* Printable ASCII */
        Key[Key["Meta"] = 91] = "Meta";
        Key[Key["ContextMenu"] = 93] = "ContextMenu";
        /* ... NumPad */
        Key[Key["*"] = 106] = "*";
        Key[Key["+"] = 107] = "+";
        Key[Key["-"] = 109] = "-";
        Key[Key["."] = 110] = ".";
        Key[Key["/"] = 111] = "/";
        /* ... F Keys */
        Key[Key["NumLock"] = 144] = "NumLock";
        Key[Key["ScrollLock"] = 145] = "ScrollLock";
        Key[Key["VolumeMute"] = 181] = "VolumeMute";
        Key[Key["VolumeDown"] = 182] = "VolumeDown";
        Key[Key["VolumeUp"] = 183] = "VolumeUp";
        Key[Key["AltGraph"] = 225] = "AltGraph";
        Key[Key["Attn"] = 246] = "Attn";
        Key[Key["CrSel"] = 247] = "CrSel";
        Key[Key["ExSel"] = 248] = "ExSel";
        Key[Key["EraseEof"] = 249] = "EraseEof";
        Key[Key["Play"] = 250] = "Play";
        Key[Key["ZoomOut"] = 251] = "ZoomOut";
    })(Key = exports.Key || (exports.Key = {}));
    function keyShim(event) {
        /*
        IE9:
        The Scroll Lock key is reported as "Scroll" instead of "ScrollLock"
        IE9, FF (per bug 1232918) :
        The Windows key is reported as "OS" instead of "Meta".
        These keys are returned as "OS" by Firefox:
        VK_LWIN (91) and VK_RWIN (92) on Windows, and GDK_KEY_Super_L (0xFFEB),
        GDK_KEY_Super_R (0xFFEC), GDK_KEY_Hyper_L (0xFFED), and GDK_KEY_Hyper_R (0xFFEE) on Linux.
        */
        if (typeof event.key === 'string' && event.key !== 'OS') {
            if (event.key === 'Scroll') {
                return 'ScrollLock';
            }
            return event.key;
        }
        // IE fires the `keypress` event when a user types an emoji via
        // Touch keyboard of Windows.  In such a case, the `char` property
        // holds an emoji character like `\uD83D\uDE0A`.  Because its length
        // is 2, the property `which` does not represent an emoji correctly.
        // In such a case, we directly return the `char` property instead of
        // using `which`.
        if ((event.ctrlKey || event.altKey || event.metaKey) &&
            !(event.ctrlKey && event.altKey)) {
            if (event.char && event.char.length > 1) {
                return event.char;
            }
            else if (event.which) {
                return String.fromCharCode(event.which);
            }
        }
        // event has no .key
        var i = event.which || event.keyCode || event.charCode;
        if (!i || typeof i !== 'number') {
            return 'Unidentified';
        }
        if (i === 16 || i === 160 || i === 161) {
            return 'Shift';
        }
        if (i === 17 || i === 162 || i === 163) {
            return 'Control';
        }
        if (i === 18 || i === 164 || i === 165) {
            return 'Alt';
        }
        if (i === 91 || i === 92 || i === 224) {
            return 'Meta';
        }
        var key = String.fromCharCode(i);
        if (i > 64 && i < 91) {
            return !event.shiftKey ? key.toLowerCase() : key;
        }
        else if (i > 111 && i < 136) {
            return "F" + (i - 111);
        }
        else if (i > 95 && i < 106) {
            return String.fromCharCode(i - 48);
        }
        return Key[i] || key || 'Unidentified';
    }
    function key(event, qKey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        var _key = keyShim(event);
        return qKey ? (tslib_1.__spread([qKey], keys).some(function (k) { return (_key === k); }) ? _key : false) : _key;
    }
    exports.key = key;
    function keyName(event, qKey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        var _key = keyShim(event);
        return qKey ? (tslib_1.__spread([qKey], keys).some(function (k) { return (_key === k); }) ? _key : false) :
            (_key in Key ? key(event) : 'Unidentified');
    }
    exports.keyName = keyName;
    function keyboard(event) {
        if (!event.key) {
            Object.defineProperty(event, 'key', {
                value: key(event),
                writable: false
            });
        }
        Object.defineProperty(event, 'KEY', {
            value: keyName(event),
            writable: false
        });
        Object.defineProperty(event, 'isStart', {
            value: (event.which === 229),
            writable: false
        });
        Object.defineProperty(event, 'isEnd', {
            value: (event.which === 9 || event.which === 13 || event.which === 27 || event.which === 32),
            writable: false
        });
        Object.defineProperty(event, 'isCommand', {
            value: (event.ctrlKey || event.altKey || event.metaKey) &&
                !(event.ctrlKey && event.altKey),
            writable: false
        });
        return event;
    }
    exports.default = keyboard;
});
//# sourceMappingURL=keyboard.js.map