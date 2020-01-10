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
    var fileExtensions = "doc|docx|log|msg|odt|pages|rtf|tex|txt|wpd|wps|csv|dat|ged|key|\npps|ppt|pptx|sdf|tar|vcf|xml|aif|iff|m3u|m4a|mid|mp3|mpa|wav|wma|3g2|3gp|asf|avi|flv|\nm4v|mov|mp4|mpg|rm|srt|swf|vob|wmv|3dm|3ds|max|obj|bmp|dds|gif|jpg|png|psd|tga|thm|tif|\ntiff|yuv|ai|eps|ps|svg|indd|pct|pdf|xlr|xls|xlsx|accdb|db|dbf|mdb|pdb|sql|apk|app|bat|cgi|\ncom|exe|gadget|jar|wsf|dem|gam|nes|rom|sav|dwg|dxf|gpx|kml|kmz|asp|aspx|cer|cfm|csr|css|htm|\nhtml|json|rb|js|ts|d|jsp|php|rss|xhtml|crx|plugin|fnt|fon|otf|ttf|cab|cpl|cur|dll|dmp|drv|\nicns|ico|lnk|sys|cfg|ini|prf|hqx|mim|uue|7z|cbr|deb|gz|pkg|rar|rpm|sitx|tar|gz|zip|zipx|bin|\ncue|dmg|iso|mdf|toast|vcd|c|class|cpp|cs|dtd|fla|h|java|lua|m|pl|py|sh|sln|swift|vb|vcxproj|\nbak|tmp|ics|msi|part|keychain|xcodeproj|crdownload|torrent";
    exports.default = fileExtensions;
});
//# sourceMappingURL=fileExtension.js.map