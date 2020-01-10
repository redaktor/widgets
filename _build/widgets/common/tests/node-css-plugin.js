intern.registerPlugin('node-css', function () {
    require.extensions['.css'] = function (module, filename) {
        require.extensions['.js'](module, filename + ".js");
    };
});
//# sourceMappingURL=node-css-plugin.js.map